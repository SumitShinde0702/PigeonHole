import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/pigeonhole/components/ui/navbar';
import { HoleSetCard } from '@/pigeonhole/components/hole-set-card';
import { CardPack } from '@/pigeonhole/components/card-pack';
import { RevealedCard } from '@/pigeonhole/types/hole-sets';
import { Card } from '@/pigeonhole/components/ui/card';
import { Package, Sparkles, TrendingUp } from 'lucide-react';
import { toast } from '@/pigeonhole/hooks/use-toast';
import { holeSets } from '@/pigeonhole/data/hole-sets';
import { HoleSet } from '@/pigeonhole/types/hole-sets';

interface User {
  username: string;
  email: string;
  credits: number;
}

// Mock card database
/*
const mockCards: Omit<RevealedCard, 'id'>[] = [
  {
    name: 'Cyber Pigeon',
    rarity: 'common',
    image: '/placeholder.svg',
    description: 'A tech-savvy pigeon with glowing cyan circuits.'
  },
  {
    name: 'Golden Feather',
    rarity: 'rare',
    image: '/placeholder.svg',
    description: 'A majestic pigeon with shimmering golden plumage.'
  },
  {
    name: 'Void Walker',
    rarity: 'grail',
    image: '/placeholder.svg',
    description: 'Legendary pigeon that travels between dimensions.'
  },
  {
    name: 'Arcade Master',
    rarity: 'rare',
    image: '/placeholder.svg',
    description: 'The ultimate retro gaming pigeon champion.'
  },
  {
    name: 'Street Pigeon',
    rarity: 'common',
    image: '/placeholder.svg',
    description: 'A humble city pigeon with street smarts.'
  }
];
*/

export const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [revealedCard, setRevealedCard] = useState<RevealedCard | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [collection, setCollection] = useState<RevealedCard[]>([]);
  const [userHoleSets, setUserHoleSets] = useState<HoleSet[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/');
    }

    // Load collection
    const savedCollection = localStorage.getItem('collection');
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection));
    }

    // Load user's hole sets progress
    const savedHoleSets = localStorage.getItem('userHoleSets');
    if (savedHoleSets) {
      setUserHoleSets(JSON.parse(savedHoleSets));
    } else {
      // Initialize with default hole sets
      setUserHoleSets(holeSets);
    }
  }, [navigate]);

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updateCollection = (newCollection: RevealedCard[]) => {
    setCollection(newCollection);
    localStorage.setItem('collection', JSON.stringify(newCollection));
  };

  /*
  const updateHoleSets = (newHoleSets: HoleSet[]) => {
    setUserHoleSets(newHoleSets);
    localStorage.setItem('userHoleSets', JSON.stringify(newHoleSets));
  };
  */

  const handleHoleSetSelect = (holeSetId: string) => {
    navigate(`/hole-set/${holeSetId}`);
  };

  // Advent Calendar removed


  const handleKeep = (card: RevealedCard) => {
    const newCollection = [...collection, card];
    updateCollection(newCollection);
    setIsRevealing(false);
    setRevealedCard(null);
    
    toast({
      title: 'Card added to collection!',
      description: `${card.name} is now in your collection.`,
    });
  };

  const handleTrade = (card: RevealedCard) => {
    // Mock trade - just add to collection for now
    handleKeep(card);
    toast({
      title: 'Trade feature coming soon!',
      description: 'For now, the card has been added to your collection.',
    });
  };

  const handleResell = (card: RevealedCard) => {
    if (!user) return;
    
    // Mock resell - return some credits
    const creditReturn = card.rarity === 'legendary' ? 3 : card.rarity === 'rare' || card.rarity === 'epic' ? 2 : 1;
    const updatedUser = { ...user, credits: user.credits + creditReturn };
    updateUser(updatedUser);
    
    setIsRevealing(false);
    setRevealedCard(null);
    
    toast({
      title: 'Card resold!',
      description: `You received ${creditReturn} Pigeon Coins.`,
    });
  };

  /*
  const handleBuyCredits = () => {
    if (!user) return;
    
    // Mock credit purchase
    const updatedUser = { ...user, credits: user.credits + 10 };
    updateUser(updatedUser);
    
    toast({
      title: 'Credits purchased!',
      description: 'You received 10 Pigeon Coins.',
    });
  };
  */

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pb-20">
      <Navbar 
        credits={user.credits}
        username={user.username}
      />

      <main className="pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Header */}
          <div className="text-center py-8">
            <h1 className="text-4xl font-bold text-gradient-primary mb-2">
              Welcome back, {user.username}!
            </h1>
            <p className="text-muted-foreground">
              Ready to discover your next graded Pokemon card?
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Featured Collections */}
            <div className="text-center py-4">
              <h2 className="text-3xl font-bold text-gradient-primary mb-2">
                Choose Your Pokemon Set
              </h2>
              <p className="text-muted-foreground">
                Each set features authenticated graded cards from classic Pokemon TCG eras
              </p>
            </div>

            {/* Advent Calendar section removed */}

            {/* Hole Sets List (horizontal cards stacked) */}
            <div className="grid grid-cols-1 gap-4">
              {userHoleSets.map((holeSet) => (
                <HoleSetCard
                  key={holeSet.id}
                  holeSet={holeSet}
                  onSelect={handleHoleSetSelect}
                  userCredits={user?.credits || 0}
                />
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/50 border-border text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Package className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-lg">Total Cards</h3>
                </div>
                <div className="text-3xl font-bold text-gradient-primary">
                  {collection.length}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  In your collection
                </p>
              </Card>

              <Card className="p-6 bg-card/50 border-border text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  <h3 className="font-semibold text-lg">Gem Mint & Black Labels</h3>
                </div>
                <div className="text-3xl font-bold text-gradient-accent">
                  {collection.filter(c => c.rarity === 'legendary').length}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  PSA 10 / BGS 10 perfection
                </p>
              </Card>

              <Card className="p-6 bg-card/50 border-border text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                  <h3 className="font-semibold text-lg">Collections</h3>
                </div>
                <div className="text-3xl font-bold text-gradient-secondary">
                  {userHoleSets.filter(set => set.openedHoles.length > 0).length}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Active sets
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Card Pack Modal */}
      <CardPack
        card={revealedCard}
        isRevealing={isRevealing}
        onKeep={handleKeep}
        onTrade={handleTrade}
        onResell={handleResell}
        onClose={() => {
          setIsRevealing(false);
          setRevealedCard(null);
        }}
      />
    </div>
  );
};