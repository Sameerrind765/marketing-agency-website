import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Alex StreamKing",
    platform: "Twitch",
    result: "0 → 5,000 followers in 45 days",
    quote: "SocialSphereSt helped me reach Affiliate status faster than I ever imagined. Their strategy was spot-on!",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    name: "Sarah ContentPro",
    platform: "YouTube",
    result: "15k → 85k subscribers in 4 months",
    quote: "The monetization setup was incredible. I'm now earning $3k/month from my channel!",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    name: "Mike ViralTik",
    platform: "TikTok",
    result: "12k followers gained in 3 weeks",
    quote: "My videos started trending consistently after following their content strategy. Amazing results!",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
          <p className="text-xl text-gray-300">Real results from real creators</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <Quote className="h-8 w-8 text-purple-400 mb-4" />
              
              <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
              
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.platform} Creator</p>
                  <p className="text-green-400 text-sm font-semibold">{testimonial.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;