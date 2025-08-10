import React, { useState } from 'react';
import { Check, Star} from 'lucide-react';
import { CheckoutCard } from './CheckoutCard';

interface Package {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface PlatformSectionProps {
  id: string;
  title: string;
  subtitle: string;
  packages: Package[];
  bgColor: string;
  accentColor: string;
  icon: React.ReactNode;
}

const PlatformSection: React.FC<PlatformSectionProps> = ({
  id, title, subtitle, packages, bgColor, accentColor, icon
}) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleCheckout = (i: number) => {
    setSelectedPackage(packages[i]); // store the clicked package
    setShowCheckout(true); // show the checkout card
  };


  return (
    <section id={id} className={`py-20 ${bgColor}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className={`${accentColor} p-3 rounded-full`}>
              {icon}
            </div>
            <h2 className="text-4xl font-bold text-white">{title}</h2>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border ${pkg.name+index} ${pkg.popular ? 'border-yellow-400 relative' : 'border-white/20'
                } hover:transform hover:scale-105 transition-all duration-300`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-white mb-2">{pkg.price}</div>
                <p className="text-gray-300">{pkg.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3 text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full ${accentColor} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`} onClick={() => handleCheckout(index)}>
                Choose Package
              </button>

            </div>
          ))}
        </div>

        {/* Success Guarantee */}
        {selectedPackage && (
          <CheckoutCard
            packageTitle={selectedPackage.name}
            price={selectedPackage.price}
            period="oneyear" // or selectedPackage.period if you have it
            platform={id} // or wherever you get the platform value from
            show={showCheckout}
            onClose={() => setShowCheckout(false)}
          />
        )}

        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Success Guarantee</h3>
            <p className="text-gray-300 mb-4">
              We guarantee results or your money back. All packages include live proof of progress
              with screenshots, analytics, and milestone achievements.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="text-green-400">✓ 30-Day Money Back</div>
              <div className="text-green-400">✓ Live Progress Reports</div>
              <div className="text-green-400">✓ 24/7 Support</div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default PlatformSection;