import { useState } from 'react';
import UploadDiv from './uploaddiv';

const baseUrl = "https://marketing-agency-website-backend-production.up.railway.app"

// Simple icon components
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="m4 4 16 0 0 16 -16 0 z m 0 4 8 4 8 -4"></path>
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

interface CheckoutCardProps {
  packageTitle: string;
  price: string;
  period: string;
  platform: string;
  show: boolean;
  onClose: () => void;
}

const platformIcons = {
  youtube: "🎥",
  twitch: "🎮",
  tiktok: "🎵",
  kick: "⚡"
};


export function CheckoutCard({ packageTitle, price, period, platform, show, onClose }: CheckoutCardProps) {
  const [step, setStep] = useState<'details' | 'payment-select' | 'payment' | 'screenshot' | 'complete'>('details');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    socialHandle: '',
    requirements: '',
    screenshot: "",
    packageTitle,
    price,
    period,
    platform,
  });
  const [uploading, setUploading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [startUpload, setStartUpload] = useState(false)
  const [hasFile, setHasFile] = useState(false);

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay securely with your PayPal account',
      icon: '💳',
      url: 'https://paypal.me/saroshfarrukh'
    },
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Visa, MasterCard, American Express',
      icon: '💎',
      url: 'https://checkout.stripe.com'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank transfer or wire payment',
      icon: '🏦',
      url: 'https://banking.example.com/transfer'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Bitcoin, Ethereum, and other cryptocurrencies',
      icon: '₿',
      url: 'https://crypto-pay.example.com'
    }
  ];

  const CloseButton = () => {
    return (
      <button
        className="absolute right-4 top-4 h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        onClick={onClose}
      >
        <XIcon className="h-4 w-4" />
      </button>
    );
  };


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProceedToPaymentSelect = () => {
    setStep('payment-select');
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    setStep('payment');
  };

  const handlePaymentConfirm = () => {
    const selectedMethod = paymentMethods.find(method => method.id === selectedPaymentMethod);
    const paymentUrl = selectedMethod?.url;
    window.open(paymentUrl, '_blank');
    setStep('screenshot');
  };

  // async function test() {
  //   console.log("test is running")


  // }


  const handleCompletePurchase = async (filename: string) => {
    const updatedFormData = {
      ...formData,
      screenshot: "https://res.cloudinary.com/dzqtygtxd/image/upload/v1754439466/" + filename,
    };

    setFormData(updatedFormData);
    console.log('Updated Form Data:', updatedFormData);

    try {
      const response = await fetch(baseUrl + "/send-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setStep('complete');
      console.log("Form submitted successfully");

    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setUploading(false)
    setStep("complete")
  };


  const isFormValid = () => {
    return formData.fullName && formData.email && formData.phone && formData.socialHandle;
  };

  const renderStepContent = () => {
    switch (step) {
      case 'details':
        return (
          <>
            <div className="space-y-4">
              <hr className='border-gray-300' />
              {/* First row - Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Second row - Phone and Social Handle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="social" className="block text-sm font-medium text-gray-700">{platform.charAt(0).toUpperCase() + platform.slice(1)} Handle/Channel *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400 text-sm">@</span>
                    <input
                      id="social"
                      value={formData.socialHandle}
                      onChange={(e) => handleInputChange('socialHandle', e.target.value)}
                      placeholder={`Your ${platform} username/handle`}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Full width - Requirements */}
              <div className="space-y-2 pb-2">
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Special Requirements or Notes</label>
                <textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="Any specific requirements, goals, or notes for your campaign..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{price}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee:</span>
                <span>$2.99</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${(parseFloat(price.replace('$', '')) + 2.99).toFixed(2)}</span>
              </div>
            </div>
          </>
        );

      case 'payment-select':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Choose Payment Method</h3>
              <p className="text-gray-600 mb-6">
                Select your preferred payment option to complete your purchase
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-700">
                        {method.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Total Amount:</span>
                <span className="text-xl font-bold text-gray-900">
                  ${(parseFloat(price.replace('$', '')) + 2.99).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="text-center space-y-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <CreditCardIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ready for {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name} Payment
              </h3>
              <p className="text-gray-600 mb-4">
                Click below to proceed to {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name} to complete your purchase.
              </p>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-2xl font-bold text-gray-900">
                  ${(parseFloat(price.replace('$', '')) + 2.99).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">{packageTitle} - {platform.toUpperCase()}</div>
                <div className="text-sm text-blue-600 mt-1">
                  via {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                </div>
              </div>
            </div>
          </div>
        );

      case 'screenshot':
        return (
          <div className="space-y-6 relative">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Payment Screenshot *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center hover:border-gray-400 transition-colors">
                <UploadDiv
                  fileName={null}
                  startUpload={startUpload}
                  onFileSelected={(fileExists) => setHasFile(fileExists)} // ✅ listens to file selection
                  onStarting={(name) => console.log('Starting upload for', name)}
                  onUploadComplete={(result) => {
                    if(result){
                      handleCompletePurchase(result.url)
                    }
                  }}
                />
              </div>
            </div>
          </div>
        );


      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Order Complete!</h3>
              <p className="text-gray-600 mb-4">
                Thank you for your purchase. We'll begin working on your {platform} campaign within 24 hours.
              </p>
              <div className="bg-white p-4 rounded-lg border text-left">
                <div className="text-sm space-y-1">
                  <div><strong>Package:</strong> {packageTitle}</div>
                  <div><strong>Platform:</strong> {platform.toUpperCase()}</div>
                  <div><strong>Total:</strong> ${(parseFloat(price.replace('$', '')) + 2.99).toFixed(2)}</div>
                  <div><strong>Handle:</strong> @{formData.socialHandle}</div>
                  <div><strong>Payment Method:</strong> {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}</div>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                You'll receive a confirmation email shortly with next steps.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderFooterButtons = () => {
    switch (step) {
      case 'details':
        return (
          <>
            <button
              className={`flex-1 py-3 px-4 rounded-lg transition-colors duration-200 ${isFormValid()
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              onClick={handleProceedToPaymentSelect}
              disabled={!isFormValid()}
            >
              Choose Payment Method
            </button>
            <button
              className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
          </>
        );

      case 'payment-select':
        return (
          <button
            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200"
            onClick={() => setStep('details')}
          >
            Back to Details
          </button>
        );

      case 'payment':
        return (
          <>
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200"
              onClick={handlePaymentConfirm}
            >
              Proceed to {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
            </button>
            <button
              className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200"
              onClick={() => setStep('payment-select')}
            >
              Change Payment Method
            </button>
          </>
        );

      case 'screenshot':
        return (
          <>
            <button
              disabled={!hasFile}
              onClick={() => setStartUpload(true)}
              className={`px-4 py-2 rounded m-w-[50%] ${hasFile
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
            >
              Start Upload
            </button>
            <button
              className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200"
              onClick={() => setStep('payment')}
            >
              Back to Payment
            </button>
          </>
        );

      case 'complete':
        return (
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200"
            onClick={onClose}
          >
            Close
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4 ${show ? "" : "hidden"}`}
    >
      <div className="w-full max-w-2xl bg-white rounded-xl border shadow-lg h-[97vh] scroll-container overflow-y-scroll">
        {/* Header */}
        <div className="relative py-1 pt-4">
          <CloseButton />
          <h2 className="text-xl text-center mb-4">Complete Your Order</h2>
          <div className="text-center">
            <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm mb-2">
              {platformIcons[platform as keyof typeof platformIcons]} {platform.toUpperCase()}
            </span>
            <h3 className="text-lg mb-2">{packageTitle}</h3>
            <p className="text-2xl">
              {price}<span className="text-gray-600 text-base">/{period}</span>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="py-3 px-7 pt-[19vh] lg:pt-[34vh]">
          {/* Overlay loading spinner when uploading */}
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg z-10">
              <div className="h-12 w-12 border-4 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
            </div>
          )}
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <div className="flex flex-col sm:flex-row gap-3">
            {renderFooterButtons()}
          </div>

        </div>
      </div>
    </div>
  );
}