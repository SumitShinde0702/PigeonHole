import React from 'react';
import { Button } from '@/pigeonhole/components/ui/button';
import { Sparkles, Coins, Users, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import pigeonMascot from '@/pigeonhole/assets/pigeon-mascot.png';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    const lp = retrieveLaunchParams();
    const tgUser = (lp as any)?.initDataUnsafe?.user;
    const inferredUsername = tgUser?.username || tgUser?.first_name || 'Collector';
    localStorage.setItem('user', JSON.stringify({
      username: inferredUsername,
      email: undefined,
      credits: 5,
    }));
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Sparkles,
      title: 'Graded Pokemon Cards',
      description: 'Collect authenticated PSA & BGS graded cards from classic Pokemon TCG sets'
    },
    {
      icon: Coins,
      title: 'Pigeon Coins',
      description: 'Earn and spend our special currency to unlock rare graded collectibles'
    },
    {
      icon: Users,
      title: 'Trade & Share',
      description: 'Connect with other collectors to trade your graded Pokemon cards'
    },
    {
      icon: Trophy,
      title: 'Grail Cards',
      description: 'Hunt for PSA 10 Gem Mints and BGS 10 Black Labels - the ultimate prizes'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md mx-auto text-center space-y-6">
          {/* Hero Mascot */}
          <div className="flex justify-center">
            <img 
              src={pigeonMascot}
              alt="PigeonHole Mascot"
              className="w-32 h-32"
            />
          </div>

          {/* Hero Text */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground">
              PigeonHole
            </h1>
            <p className="text-lg text-muted-foreground">
              Collect graded Pokemon cards
            </p>
            <p className="text-sm text-muted-foreground">
              Open holes, reveal PSA/BGS slabs, and build your collection
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button 
              size="lg"
              onClick={handleStart}
              className="w-full"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start Collecting
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="w-full"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-muted/20">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-center mb-6 text-foreground">
            Features
          </h2>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 bg-card rounded-lg"
              >
                <div className="p-2 rounded-md bg-muted">
                  <feature.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            &copy; 2024 PigeonHole
          </p>
        </div>
      </footer>
    </div>
  );
};