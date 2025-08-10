import Header from './components/Header';
import Hero from './components/Hero';
import PlatformSection from './components/PlatformSection';
import Testimonials from './components/Testimonials';
import PricingSummary from './components/PricingSummary';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Play, Users, TrendingUp } from 'lucide-react';

function App() {
  const twitchPackages = [
    {
      name: 'Basic Path-to-Affiliate',
      price: '$200',
      description: 'Custom strategy + content guidance to reach Affiliate level',
      features: [
        'Custom growth strategy',
        'Content creation guidance',
        'Stream scheduling optimization',
        'Community building tips',
        'Progress tracking & reports',
        'Live proof screenshots',
        'Affiliate status achievement'
      ]
    },
    {
      name: 'Partner Accelerator',
      price: '$500',
      description: 'Advanced growth plan from affiliate → partner status',
      features: [
        'Everything in Basic plan',
        'Advanced audience retention strategies',
        'Monetization optimization',
        'Brand partnership guidance',
        'Weekly strategy calls',
        'Partner achievement roadmap',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Community Growth & Partner Path',
      price: '$800-1,000',
      description: 'Full community building toolkit + partner support',
      features: [
        'Everything in Partner plan',
        'Full community management',
        'Livestream strategy development',
        'Brand development package',
        'Partner application support',
        'Discord setup & management',
        'Custom emote design'
      ]
    }
  ];

  const youtubePackages = [
    {
      name: 'Starter Monetization Setup',
      price: '$1,000+',
      description: 'Complete monetization funnel for YouTube success',
      features: [
        'Ad revenue optimization',
        'Channel setup & branding',
        'Metadata strategy',
        'SEO optimization',
        'Brand sponsorship pitches',
        'Analytics setup',
        'Monetization compliance'
      ]
    },
    {
      name: 'Video Editing Suite',
      price: 'Custom Pricing',
      description: 'Professional video editing based on your needs',
      features: [
        '10-20 videos/month options',
        'Custom thumbnails & titles',
        'SEO tags optimization',
        'Channel trailer creation',
        'Intro/outro design',
        'Analytics reporting',
        'Turnaround time guarantee'
      ],
      popular: true
    },
    {
      name: 'Full Monetization Build',
      price: '$5,000',
      description: 'Complete YouTube empire with multiple revenue streams',
      features: [
        'Everything in other plans',
        'Sponsorship deal negotiation',
        'Superchat optimization',
        'Membership tier setup',
        'Course creation guidance',
        'Affiliate marketing setup',
        'Long-term growth strategy'
      ]
    }
  ];

  const tiktokPackages = [
    {
      name: 'Growth Bronze',
      price: 'Custom',
      description: '5,000 new followers in 30 days guarantee',
      features: [
        '5,000+ follower guarantee',
        'Trend tracking & research',
        'Hashtag optimization',
        'Content calendar creation',
        'Basic video editing',
        'Performance reporting',
        'Growth analytics'
      ]
    },
    {
      name: 'Growth Silver',
      price: 'Custom',
      description: '15,000+ followers + viral video strategy',
      features: [
        '15,000+ follower guarantee',
        'Viral video strategy',
        'Advanced trend analysis',
        'Custom content creation',
        'Video editing (20 TikToks)',
        'Engagement optimization',
        'Weekly strategy calls'
      ],
      popular: true
    },
    {
      name: 'Growth Gold',
      price: 'Custom',
      description: '30,000+ followers + trending content calendar',
      features: [
        '30,000+ follower guarantee',
        'Full trending content calendar',
        'Premium video editing',
        'Influencer collaboration setup',
        'Brand partnership opportunities',
        'Live streaming strategy',
        'Long-term viral planning'
      ]
    }
  ];

  const kickPackages = [
    {
      name: 'Kick Affiliate Path',
      price: '$200',
      description: 'Fastest route to Kick affiliate status',
      features: [
        'Platform-specific strategy',
        'Community building tactics',
        'Streaming schedule optimization',
        'Viewer engagement techniques',
        'Affiliate achievement roadmap',
        'Progress tracking',
        'Live support'
      ]
    },
    {
      name: 'Kick Partner Accelerator',
      price: '$500',
      description: 'Advanced growth from affiliate to partner',
      features: [
        'Everything in Affiliate plan',
        'Advanced monetization strategies',
        'Brand partnership preparation',
        'Community management tools',
        'Weekly growth reviews',
        'Partner application support',
        'Premium support access'
      ],
      popular: true
    },
    {
      name: 'Community Growth to Partner',
      price: '$800-1,000',
      description: 'Complete community building & partner achievement',
      features: [
        'Full service community building',
        'Advanced streaming strategies',
        'Viewer retention optimization',
        'Brand development package',
        'Partner status achievement',
        'Long-term growth planning',
        'Dedicated account manager'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      <PlatformSection
        id="twitch"
        title="Twitch Services"
        subtitle="Path-to-Affiliate → Path-to-Partner with proven strategies and live proof of results"
        packages={twitchPackages}
        bgColor="bg-gradient-to-br from-purple-900 to-purple-800"
        accentColor="bg-purple-600"
        icon={<Play className="h-8 w-8 text-white" />}
      />
      
      <PlatformSection
        id="youtube"
        title="YouTube Services"
        subtitle="Complete monetization funnel with branding, editing, and revenue optimization"
        packages={youtubePackages}
        bgColor="bg-gradient-to-br from-red-950 to-gray-900"
        accentColor="bg-red-600"
        icon={<Play className="h-8 w-8 text-white" />}
      />
      
      <PlatformSection
        id="tiktok"
        title="TikTok Services"
        subtitle="Follower guarantees, viral strategies, and professional video editing"
        packages={tiktokPackages}
        bgColor="bg-gradient-to-br from-black to-gray-900"
        accentColor="bg-pink-600"
        icon={<TrendingUp className="h-8 w-8 text-white" />}
      />
      
      <PlatformSection
        id="kick"
        title="Kick Services"
        subtitle="Specialized growth strategies for the fastest-growing streaming platform"
        packages={kickPackages}
        bgColor="bg-gradient-to-br from-black to-green-900"
        accentColor="bg-green-600"
        icon={<Users className="h-8 w-8 text-white" />}
      />
      
      <Testimonials />
      <div id="pricing">
        <PricingSummary />
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default App;