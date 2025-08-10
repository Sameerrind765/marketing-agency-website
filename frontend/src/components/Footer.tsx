import { TrendingUp, ExternalLink } from 'lucide-react';

const Footer = () => {
  const proofItems = [
    {
      title: "Twitch Partner Badge",
      description: "Client achieved Partner status",
      image: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      title: "YouTube Analytics",
      description: "300% growth in 3 months",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      title: "TikTok Viral Video",
      description: "2.5M views achieved",
      image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      title: "Kick Growth Chart",
      description: "15K followers in 30 days",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Proof Gallery */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Proof of Success</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {proofItems.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.description}</p>
                <ExternalLink className="h-4 w-4 text-purple-400 mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold">SocialSphereSt</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering content creators to monetize their passion and build thriving communities
              across Twitch, YouTube, TikTok, and Kick.
            </p>
            <div className="flex space-x-4">
              <div className="flex flex-wrap gap-3 justify-center">

                {/* Success Rate */}
                <div className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-full text-sm sm:text-base font-semibold text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
                    />
                  </svg>
                  98% Success Rate
                </div>

                {/* Support */}
                <div className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full text-sm sm:text-base font-semibold text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 10c0-3.314-2.686-6-6-6S6 6.686 6 10s2.686 6 6 6a5.97 5.97 0 004.472-2.005M14 14l5 5"
                    />
                  </svg>
                  24/7 Support
                </div>
                {/* Happy Clients */}
                <div className="flex flex-1 max-w-[80vw] justify-center text-base items-center gap-2 bg-purple-600 px-4 py-2 rounded-full sm:text-base font-semibold text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  1000+ Happy Clients
                </div>
              </div>

            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#twitch" className="hover:text-white transition-colors">Twitch Growth</a></li>
              <li><a href="#youtube" className="hover:text-white transition-colors">YouTube Monetization</a></li>
              <li><a href="#tiktok" className="hover:text-white transition-colors">TikTok Viral Strategy</a></li>
              <li><a href="#kick" className="hover:text-white transition-colors">Kick Partnership</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">24/7 Live Chat</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Email Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Knowledge Base</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 SocialSphereSt. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Refund Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Success Guarantee</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;