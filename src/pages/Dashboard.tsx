import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar';
import { HoleSetCard } from '@/components/hole-set-card';
import { CardPack, RevealedCard } from '@/components/card-pack';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Package, ShoppingCart, Users, Sparkles, TrendingUp, Calendar, Gift } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { holeSets } from '@/data/hole-sets';
import { HoleSet } from '@/types/hole-sets';

interface User {
  username: string;
  email: string;
  credits: number;
}

// Mock card database
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

  const updateHoleSets = (newHoleSets: HoleSet[]) => {
    setUserHoleSets(newHoleSets);
    localStorage.setItem('userHoleSets', JSON.stringify(newHoleSets));
  };

  const handleHoleSetSelect = (holeSetId: string) => {
    navigate(`/hole-set/${holeSetId}`);
  };

  const handleAdventCalendar = (holeSetId: string) => {
    navigate(`/advent-calendar/${holeSetId}`);
  };


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
    const creditReturn = card.rarity === 'grail' ? 3 : card.rarity === 'rare' ? 2 : 1;
    const updatedUser = { ...user, credits: user.credits + creditReturn };
    updateUser(updatedUser);
    
    setIsRevealing(false);
    setRevealedCard(null);
    
    toast({
      title: 'Card resold!',
      description: `You received ${creditReturn} Pigeon Coins.`,
    });
  };

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

            {/* Advent Calendar Feature */}
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Calendar className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-gradient-primary">Advent Calendar Mode</h3>
                  <Gift className="w-8 h-8 text-accent" />
                </div>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Experience the magic of opening graded card boxes with beautiful animations!
                  Each box has a unique design based on its grade tier, and you can choose
                  between pull-out or tear-open reveal animations.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {userHoleSets.slice(0, 4).map((holeSet) => (
                    <Button
                      key={holeSet.id}
                      onClick={() => handleAdventCalendar(holeSet.id)}
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-6 py-3"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {holeSet.name} Calendar
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Hole Sets Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
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