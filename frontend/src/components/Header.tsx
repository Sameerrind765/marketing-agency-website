import { Play, Users, TrendingUp, Zap } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">SocialSphereSt</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#twitch" className="hover:text-purple-300 transition-colors flex items-center space-x-1">
              <Play className="h-4 w-4" />
              <span>Twitch</span>
            </a>
            <a href="#youtube" className="hover:text-red-300 transition-colors flex items-center space-x-1">
              <Play className="h-4 w-4" />
              <span>YouTube</span>
            </a>
            <a href="#tiktok" className="hover:text-pink-300 transition-colors flex items-center space-x-1">
              <Zap className="h-4 w-4" />
              <span>TikTok</span>
            </a>
            <a href="#kick" className="hover:text-orange-300 transition-colors flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>Kick</span>
            </a>
            <a href="#pricing" className="hover:text-green-300 transition-colors flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>Pricing</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;