import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { retrieveLaunchParams, useSignal, isMiniAppDark } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Card } from '@/pigeonhole/components/ui/card';
import { Badge } from '@/pigeonhole/components/ui/badge';
import { Package, Coins, Calendar, ArrowRight } from 'lucide-react';

interface User {
  username: string;
  credits: number;
}

interface PokemonSet {
  id: string;
  name: string;
  year: string;
  description: string;
  totalCards: number;
  costPerPack: number;
  isActive: boolean;
}

const mockSets: PokemonSet[] = [
  {
    id: 'base-set',
    name: 'Base Set',
    year: '1999',
    description: 'The original 102 cards featuring Charizard, Blastoise, and Venusaur',
    totalCards: 102,
    costPerPack: 1,
    isActive: true
  },
  {
    id: 'jungle',
    name: 'Jungle',
    year: '1999',
    description: '64 cards including Scyther, Vaporeon, and Wigglytuff',
    totalCards: 64,
    costPerPack: 1,
    isActive: true
  },
  {
    id: 'fossil',
    name: 'Fossil',
    year: '1999',
    description: '62 cards featuring Aerodactyl, Kabutops, and legendary birds',
    totalCards: 62,
    costPerPack: 1,
    isActive: true
  },
  {
    id: 'gym-heroes',
    name: 'Gym Heroes',
    year: '2000',
    description: '132 cards including Blaine\'s Charizard and Sabrina\'s Alakazam',
    totalCards: 132,
    costPerPack: 1,
    isActive: true
  }
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [collection, setCollection] = useState<any[]>([]);
  const isDark = useSignal(isMiniAppDark);

  useEffect(() => {
    // Initialize user from Telegram or localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Create user from Telegram data
      const lp = retrieveLaunchParams();
      const tgUser = (lp as any)?.initDataUnsafe?.user;
      const username = tgUser?.username || tgUser?.first_name || 'Collector';
      const newUser = { username, credits: 5 };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    }

    // Load collection
    const savedCollection = localStorage.getItem('collection');
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection));
    }
  }, []);

  const handleSetSelect = (setId: string) => {
    navigate(`/set/${setId}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform="base"
    >
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="px-4 py-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Welcome back, {user.username}!
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Choose a Pokemon set to start collecting
              </p>
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
              <Coins className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{user.credits}</span>
            </div>
          </div>
        </div>

        {/* Pokemon Sets */}
        <div className="px-4 py-6 space-y-3">
          {mockSets.map((set) => (
            <Card 
              key={set.id}
              className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => handleSetSelect(set.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{set.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {set.year}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {set.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{set.totalCards} cards</span>
                    <span>{set.costPerPack} coin per pack</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>

        {/* Collection Stats */}
        <div className="px-4 py-6 border-t border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Collection</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Cards</span>
              </div>
              <span className="font-semibold">{collection.length}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sets Completed</span>
              </div>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </div>
      </div>
    </AppRoot>
  );
};
