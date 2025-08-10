import express from "express";
import type { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

dotenv.config();

function getGoogleCredentials() {
  // Method 1: Base64 encoded JSON
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64) {
    try {
      return JSON.parse(
        Buffer.from(
          process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64,
          "base64"
        ).toString("utf8")
      );
    } catch (error) {
      console.error("Failed to decode base64 service account key:", error);
    }
  }

  // Method 2: Direct JSON string
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    try {
      return JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
    } catch (error) {
      console.error("Failed to parse service account JSON:", error);
    }
  }

  // Method 3: Individual components
  if (process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_CLIENT_EMAIL) {
    return {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    };
  }

  throw new Error("No valid Google service account credentials found");
}

const credentials = getGoogleCredentials();

const auth = new GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

interface customerData {
  fullName: string;
  email: string;
  phone: number;
  socialHandle: string;
  requirements: string;
  screenshot: string;
  packageTitle: string;
  price: number;
  period: string;
  platform: string;
  // time: string;
}

const app: Application = express();
app.use(cors());
app.use(bodyParser.json());
const SHEET_ID = process.env.SPREADSHEET_API;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const now = new Date();

// Convert to Pakistani time (UTC+5)
const options: Intl.DateTimeFormatOptions = {
  timeZone: "Asia/Karachi",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
};

const readableTime = now.toLocaleString("en-PK", options);
// Add this function after your existing appendToSheet function
async function appendCustomerData(customerData: customerData) {
  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  const values = [
    [
      customerData.fullName,
      customerData.email,
      customerData.phone?.toString().replace(/\+/g, ""),
      customerData.socialHandle,
      customerData.requirements,
      customerData.packageTitle,
      customerData.price,
      customerData.period,
      customerData.platform,
      readableTime,
      customerData.screenshot,
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `'Social Sphere'!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values,
    },
  });
}

// Add this new endpoint after your existing endpoints
app.get("/test", (req: Request, res: Response) => {
  try {
    res.status(201).json({
      message: "Your Route Points to Marketing Site Backend",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
});


app.post("/send-form", async (req: Request, res: Response) => {
  const customerData: customerData = req.body;
  type Platform = "twitch" | "youtube" | "tiktok" | "kick";

  const platform = (customerData.platform || "").toLowerCase() as Platform;
  const brandColors = {
    twitch: {
      start: "#9146FF",
      end: "#772CE8",
      accent: "#9146FF",
      footerBg: "#2D3748",
    },
    youtube: {
      start: "#FF0000",
      end: "#CC0000",
      accent: "#FF0000",
      footerBg: "#1A1A1A",
    },
    tiktok: {
      start: "#000000",
      end: "#333333",
      accent: "#000000",
      footerBg: "#111111",
    },
    kick: {
      start: "#00e701",
      end: "#0b0e0f",
      accent: "#00e701",
      footerBg: "#474f54",
    },
  };
  const colors = brandColors[platform] || {
    start: "#667eea",
    end: "#764ba2",
    accent: "#667eea",
    footerBg: "#2d3748",
  };
  const adminEmailHtml = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, ${
    colors.start
  } 0%, ${colors.end} 100%); padding: 0;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, ${colors.start} 0%, ${
    colors.end
  } 100%); padding: 30px; text-align: center; color: white;">
    <h1 style="margin: 0; font-size: 28px; font-weight: bold;">📝 New Customer Request</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">New inquiry from ${
      customerData.platform
    } platform</p>
  </div>

  <!-- Main Content -->
  <div style="background: white; padding: 40px 30px; color: #2d3748;">

    <h2 style="margin-bottom: 20px; font-size: 24px;">Hello Team,</h2>

    <p style="line-height: 1.6; margin-bottom: 25px; font-size: 16px;">
      You have received a new request for the <strong>${
        customerData.packageTitle
      }</strong> package.
    </p>

    <!-- Submission Details -->
    <div style="background: #f7fafc; border-left: 6px solid ${
      colors.accent
    }; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
      <h3 style="margin-top: 0; margin-bottom: 15px; font-size: 18px; color: ${
        colors.accent
      };">📋 Submission Details</h3>

      <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #4a5568;">
        <tbody>
          <tr><td style="padding: 8px; font-weight: 600;">Full Name:</td><td style="padding: 8px;">${
            customerData.fullName
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Email:</td><td style="padding: 8px;">${
            customerData.email
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Phone:</td><td style="padding: 8px;">${
            customerData.phone
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Social Handle:</td><td style="padding: 8px;">${
            customerData.socialHandle || "N/A"
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Package:</td><td style="padding: 8px;">${
            customerData.packageTitle
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Period:</td><td style="padding: 8px;">${
            customerData.period
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Price:</td><td style="padding: 8px;">${
            customerData.price
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Requirements:</td><td style="padding: 8px;">${
            customerData.requirements || "None"
          }</td></tr>
        </tbody>
      </table>
    </div>

    ${
      customerData.screenshot
        ? `<p style="margin-top: 20px; font-size: 14px; color: #555;">
             Screenshot uploaded: <br/>
             <img src="https://yourdomain.com/uploads/${customerData.screenshot}" alt="Screenshot" style="max-width: 100%; border: 1px solid #ccc;"/>
           </p>`
        : ""
    }

    <p style="line-height: 1.6; margin-top: 30px; font-size: 14px; color: #4a5568;">
      Please review this inquiry and follow up accordingly.
    </p>

  </div>

  <!-- Footer -->
  <div style="background: ${
    colors.footerBg
  }; color: #a0aec0; padding: 25px 30px; text-align: center; font-size: 14px;">
    <p style="margin: 0 0 10px 0; font-weight: 700; color: white;">Your Growth Agency Team</p>
    <p style="margin: 0;">Empowering creators since 2020</p>
    <p style="margin-top: 15px; font-size: 12px; opacity: 0.8;">Automated notification email</p>
  </div>

</div>
`;
  const customerEmailHtml = `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, ${
    colors.start
  } 0%, ${colors.end} 100%); padding: 0;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, ${colors.start} 0%, ${
    colors.end
  } 100%); padding: 30px; text-align: center; color: white;">
    <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🎯 Your Growth Agency</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your ${
      customerData.platform
    } Growth Partners</p>
  </div>

  <!-- Main Content -->
  <div style="background: white; padding: 40px 30px; color: #2d3748;">
    
    <h2 style="margin-bottom: 20px; font-size: 24px;">Hi ${
      customerData.fullName
    },</h2>
    
    <p style="line-height: 1.6; margin-bottom: 25px; font-size: 16px;">
      Thank you for your submission regarding our <strong>${
        customerData.packageTitle
      }</strong> package. We are excited to assist you in growing your ${
    customerData.platform
  } presence!
    </p>

    <!-- Submission Summary -->
    <div style="background: #f7fafc; border-left: 6px solid ${
      colors.accent
    }; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
      <h3 style="margin-top: 0; margin-bottom: 15px; font-size: 18px; color: ${
        colors.accent
      };">📋 Submission Summary</h3>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #4a5568;">
        <tbody>
          <tr><td style="padding: 8px; font-weight: 600;">Full Name:</td><td style="padding: 8px;">${
            customerData.fullName
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Email:</td><td style="padding: 8px;">${
            customerData.email
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Phone:</td><td style="padding: 8px;">${
            customerData.phone
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Social Handle:</td><td style="padding: 8px;">${
            customerData.socialHandle || "N/A"
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Package:</td><td style="padding: 8px;">${
            customerData.packageTitle
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Period:</td><td style="padding: 8px;">${
            customerData.period
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Price:</td><td style="padding: 8px;">${
            customerData.price
          }</td></tr>
          <tr><td style="padding: 8px; font-weight: 600;">Requirements:</td><td style="padding: 8px;">${
            customerData.requirements || "None"
          }</td></tr>
        </tbody>
      </table>
    </div>

    ${
      customerData.screenshot
        ? `<p style="margin-top: 20px; font-size: 14px; color: #555;">
            We have also received your uploaded screenshot.
           </p>`
        : ""
    }

    <!-- Next Steps -->
    <div style="background: linear-gradient(135deg, #e6fffa 0%, #f0fff4 100%); padding: 25px; border-radius: 10px; margin: 25px 0; color: #2d3748;">
      <h3 style="margin-top: 0; margin-bottom: 15px; font-size: 18px; color: ${
        colors.accent
      };">🚀 What Happens Next?</h3>
      <ol style="line-height: 1.8; margin: 0; padding-left: 20px;">
        <li><strong>Review (24 hours):</strong> Our team will analyze your submission.</li>
        <li><strong>Channel Analysis:</strong> We'll review your current ${
          customerData.platform
        } presence.</li>
        <li><strong>Custom Strategy:</strong> You'll receive a personalized growth proposal.</li>
        <li><strong>Consultation:</strong> We'll schedule a call to discuss your goals in detail.</li>
      </ol>
    </div>

    <p style="line-height: 1.6; margin: 25px 0; font-size: 16px; color: #4a5568;">
      If you have any immediate questions, feel free to reply to this email. We’re here to help!
    </p>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 30px 0;">
      <div style="display: inline-block; background: linear-gradient(135deg, ${
        colors.start
      } 0%, ${
    colors.end
  } 100%); padding: 15px 30px; border-radius: 25px; color: white; font-weight: 700; font-size: 16px; cursor: pointer;">
        🎯 Ready to Level Up Your ${customerData.platform} Channel
      </div>
    </div>

  </div>

  <!-- Footer -->
  <div style="background: ${
    colors.footerBg
  }; color: #a0aec0; padding: 25px 30px; text-align: center; font-size: 14px;">
    <p style="margin: 0 0 10px 0; font-weight: 700; color: white;">Your Growth Agency Team</p>
    <p style="margin: 0;">
      Empowering creators since 2020 | Follow us on ${
        customerData.platform
      } for tips and updates.
    </p>
    <p style="margin-top: 15px; font-size: 12px; opacity: 0.8;">
      Questions? Just reply to this email — we’re here to help! 💜
    </p>
  </div>

</div>`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerData.email,
      subject: `Thanks for your request on ${customerData.platform}!`,
      html: customerEmailHtml,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN,
      subject: `New request received on ${customerData.platform}!`,
      html: adminEmailHtml,
    });
    await appendCustomerData(customerData);
    res.status(201).json({
      message: "Twitch form submitted successfully and emails sent.",
      success: true,
    });
  } catch (error) {
    console.error("Error processing Twitch form:", error);
    res.status(500).json({
      message: "Error processing Twitch form submission",
      success: false,
    });
  }
});
app.post("/send-contact-form", async (req: Request, res: Response) => {
  try {
    const { platform, package: pkg, email, message } = req.body;

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Contact Form Submission - ${platform}`,
      text: `
            You have received a new contact form submission:

            Platform: ${platform}
            Package: ${pkg}
            Email: ${email}

            Message:
            ${message}
                  `,
      });

    await transporter.sendMail({
      from: `"Your Company" <${process.env.EMAIL_USER}>`,
      to: email, // user email
      subject: "We’ve received your message!",
      text: `
Hi,

Thank you for contacting us. Here’s a summary of your submission:

Platform: ${platform}
Package: ${pkg}
Email: ${email}

Message:
${message}

We’ll get back to you shortly.

Best regards,  
Your Company
      `,
    });

    res.status(201).json({
      message:
        "Contact form submitted successfully. Emails sent to admin and user.",
      success: true,
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({
      message: "Error processing contact form submission",
      success: false,
    });
  }
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
