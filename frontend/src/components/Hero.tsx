import { Star, TrendingUp, Users, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row justify-center items-center space-x-1 mb-6">
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-lg">Trusted by 500+ Creators</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Monetization & Growth
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">
            for Twitch, YouTube, TikTok & Kick
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your passion into profit. We help content creators achieve affiliate status,
            build thriving communities, and unlock multiple revenue streams across all major platforms.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Play className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-purple-300">Twitch Growth</h3>
            </div>
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Play className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-red-300">YouTube Success</h3>
            </div>
            <div className="text-center">
              <div className="bg-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-pink-300">TikTok Viral</h3>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-orange-300">Kick Partner</h3>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={() => {
              document.querySelector(".Accelerator1")?.scrollIntoView({
                behavior: "smooth",
              });
            }}>
              View Our Packages
            </button>
            <button className="border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300" onClick={() => {
              document.querySelector("#contact-form")?.scrollIntoView({
                behavior: "smooth",
              });
            }}>
              Schedule Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;