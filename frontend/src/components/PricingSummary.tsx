import React from 'react';
import { Play, TrendingUp, Users, Zap } from 'lucide-react';

const pricingData = [
  {
    platform: 'Twitch',
    icon: <Play className="h-6 w-6" />,
    packages: [
      { name: 'Basic Affiliate', price: '$200' },
      { name: 'Partner Path (Full)', price: '$800-1,000' }
    ],
    color: 'bg-purple-600'
  },
  {
    platform: 'YouTube',
    icon: <Play className="h-6 w-6" />,
    packages: [
      { name: 'Monetization Starter', price: '$1,000+' },
      { name: 'Video Editing Suite', price: 'Custom' }
    ],
    color: 'bg-red-600'
  },
  {
    platform: 'TikTok',
    icon: <TrendingUp className="h-6 w-6" />,
    packages: [
      { name: 'Growth Bronze → Gold', price: 'Variants' },
      { name: 'Video Editing Add-On', price: '$200/10 videos' }
    ],
    color: 'bg-pink-600'
  },
  {
    platform: 'Kick',
    icon: <Users className="h-6 w-6" />,
    packages: [
      { name: 'Same as Twitch', price: 'Similar' },
      { name: 'Community Growth', price: '$800-1,000' }
    ],
    color: 'bg-orange-600'
  },
  {
    platform: 'All Platforms',
    icon: <TrendingUp className="h-6 w-6" />,
    packages: [
      { name: 'Multi-Platform Bundle', price: '$2,500' },
      { name: 'Enterprise Package', price: '$5,000+' }
    ],
    color: 'bg-gradient-to-r from-purple-600 to-pink-600'
  }
];

const PricingSummary = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Pricing Overview</h2>
          <p className="text-xl text-gray-300">Choose the platform that fits your goals</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-6 text-white font-semibold">Platform</th>
                <th className="text-left p-6 text-white font-semibold">Package Name</th>
                <th className="text-left p-6 text-white font-semibold">Starting Price</th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((platform, index) => (
                platform.packages.map((pkg, pkgIndex) => (
                  <tr key={`${index}-${pkgIndex}`} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    {pkgIndex === 0 && (
                      <td className="p-6" rowSpan={platform.packages.length}>
                        <div className="flex items-center space-x-3">
                          <div className={`${platform.color} p-2 rounded-lg`}>
                            {platform.icon}
                          </div>
                          <span className="text-white font-semibold">{platform.platform}</span>
                        </div>
                      </td>
                    )}
                    <td className="p-6 text-gray-300">{pkg.name}</td>
                    <td className="p-6 text-white font-semibold">{pkg.price}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Payment Methods Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">We Accept All Payment Methods</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <p className="text-white font-semibold">PayPal</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <p className="text-white font-semibold">CashApp</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gray-800 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-sm">🍎</span>
              </div>
              <p className="text-white font-semibold">Apple Pay</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <p className="text-white font-semibold">Chime</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-sm">💳</span>
              </div>
              <p className="text-white font-semibold">Credit Card</p>
            </div>
          </div>
          <p className="text-gray-400 mt-6">Secure payments processed with industry-standard encryption</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSummary;