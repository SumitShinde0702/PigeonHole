import React from 'react';
import { useNavigate } from 'react-router-dom';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Button } from '@/pigeonhole/components/ui/button';
import { Card } from '@/pigeonhole/components/ui/card';
import { Sparkles, Package, Coins, Trophy } from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    const lp = retrieveLaunchParams();
    const tgUser = (lp as any)?.initDataUnsafe?.user;
    const username = tgUser?.username || tgUser?.first_name || 'Collector';
    
    localStorage.setItem('user', JSON.stringify({
      username,
      credits: 5,
    }));
    
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Package,
      title: 'Graded Cards',
      description: 'Collect authenticated PSA & BGS graded Pokemon cards'
    },
    {
      icon: Coins,
      title: 'Pigeon Coins',
      description: 'Earn and spend coins to unlock rare collectibles'
    },
    {
      icon: Trophy,
      title: 'Grail Cards',
      description: 'Hunt for PSA 10 Gem Mints and BGS 10 Black Labels'
    }
  ];

  return (
    <AppRoot appearance="dark" platform="base">
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="px-4 py-12 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              PigeonHole
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Collect graded Pokemon cards
            </p>
            <p className="text-sm text-muted-foreground">
              Open packs, reveal PSA/BGS slabs, and build your collection
            </p>
          </div>

          <Button 
            size="lg"
            onClick={handleStart}
            className="w-full mb-4"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Start Collecting
          </Button>
        </div>

        {/* Features */}
        <div className="px-4 py-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
            Features
          </h2>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <feature.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-6 text-center border-t border-border">
          <p className="text-xs text-muted-foreground">
            &copy; 2024 PigeonHole
          </p>
        </div>
      </div>
    </AppRoot>
  );
};
