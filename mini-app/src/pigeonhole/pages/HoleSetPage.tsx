import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/pigeonhole/components/ui/navbar';
import { PigeonHole } from '@/pigeonhole/components/pigeon-hole';
import { CardPack } from '@/pigeonhole/components/card-pack';
import { RevealedCard } from '@/pigeonhole/types/hole-sets';
import { PullRates } from '@/pigeonhole/components/pull-rates';
import { CardGallery } from '@/pigeonhole/components/card-gallery';
import { Button } from '@/pigeonhole/components/ui/button';
import { Card } from '@/pigeonhole/components/ui/card';
import { ArrowLeft, Package, Coins, Gift } from 'lucide-react';
import { toast } from '@/pigeonhole/hooks/use-toast';
import { holeSets } from '@/pigeonhole/data/hole-sets';
import { HoleSet } from '@/pigeonhole/types/hole-sets';

interface User {
  username: string;
  email: string;
  credits: number;
}

export const HoleSetPage: React.FC = () => {
  const { holeSetId } = useParams<{ holeSetId: string }>();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<User | null>(null);
  const [holeSet, setHoleSet] = useState<HoleSet | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [revealedCard, setRevealedCard] = useState<RevealedCard | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [collection, setCollection] = useState<RevealedCard[]>([]);
  const [pendingHoleNumber, setPendingHoleNumber] = useState<number | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/');
      return;
    }

    // Load collection
    const savedCollection = localStorage.getItem('collection');
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection));
    }

    // Find the hole set
    const savedHoleSets = localStorage.getItem('userHoleSets');
    let userHoleSets: HoleSet[];
    
    if (savedHoleSets) {
      userHoleSets = JSON.parse(savedHoleSets);
    } else {
      userHoleSets = holeSets;
    }

    const foundHoleSet = userHoleSets.find(set => set.id === holeSetId);
    if (foundHoleSet) {
      setHoleSet(foundHoleSet);
    } else {
      navigate('/dashboard');
    }
  }, [holeSetId, navigate]);

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updateCollection = (newCollection: RevealedCard[]) => {
    setCollection(newCollection);
    localStorage.setItem('collection', JSON.stringify(newCollection));
  };

  const updateHoleSet = (updatedHoleSet: HoleSet) => {
    setHoleSet(updatedHoleSet);
    
    // Update in localStorage
    const savedHoleSets = localStorage.getItem('userHoleSets');
    let userHoleSets: HoleSet[];
    
    if (savedHoleSets) {
      userHoleSets = JSON.parse(savedHoleSets);
    } else {
      userHoleSets = holeSets;
    }

    const updatedHoleSets = userHoleSets.map(set => 
      set.id === holeSetId ? updatedHoleSet : set
    );
    
    localStorage.setItem('userHoleSets', JSON.stringify(updatedHoleSets));
  };

  const handleOpenHole = async (holeNumber: number): Promise<void> => {
    if (!user || !holeSet || user.credits < holeSet.costPerHole) return;

    setIsOpening(true);

    // Simulate hole opening delay with physical animation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Random card selection with rarity weights
    const rarity = Math.random();
    let selectedRarity: 'common' | 'rare' | 'epic' | 'legendary';
    
    if (rarity < 0.7) selectedRarity = 'common';      // 70%
    else if (rarity < 0.9) selectedRarity = 'rare';   // 20%
    else if (rarity < 0.98) selectedRarity = 'epic';   // 8%
    else selectedRarity = 'legendary';                // 2%

    const cardsOfRarity = holeSet.cardPool[selectedRarity];
    const selectedCard = cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
    
    const newCard: RevealedCard = {
      ...selectedCard,
      id: Date.now().toString(),
      holeSetId: holeSet.id,
      rarity: selectedRarity
    };

    // Do NOT deduct or mark opened yet; wait until user actually opens the pack
    setPendingHoleNumber(holeNumber);

    setRevealedCard(newCard);
    setIsOpening(false);
    setIsRevealing(true);

    // Do not toast spoilers here; wait until user confirms opening the pack
  };

  const handleOpenAll = async (): Promise<void> => {
    if (!user || !holeSet) return;

    const remainingHoles = holeSet.totalHoles - holeSet.openedHoles.length;
    const discountedCost = Math.floor(remainingHoles * holeSet.costPerHole * holeSet.discountMultiplier);
    
    if (user.credits < discountedCost) return;

    setIsOpening(true);

    // Simulate opening all holes with staggered animation
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate multiple cards
    const cards: RevealedCard[] = [];
    
    for (let i = 0; i < remainingHoles; i++) {
      const rarity = Math.random();
      let selectedRarity: 'common' | 'rare' | 'epic' | 'legendary';
      
      if (rarity < 0.7) selectedRarity = 'common';      // 70%
      else if (rarity < 0.9) selectedRarity = 'rare';   // 20%
      else if (rarity < 0.98) selectedRarity = 'epic';   // 8%
      else selectedRarity = 'legendary';                // 2%

      const cardsOfRarity = holeSet.cardPool[selectedRarity];
      const selectedCard = cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
      
      cards.push({
        ...selectedCard,
        id: `${Date.now()}-${i}`,
        holeSetId: holeSet.id,
        rarity: selectedRarity
      });
    }

    // Deduct credits (with discount) and mark all holes as opened
    const updatedUser = { ...user, credits: user.credits - discountedCost };
    updateUser(updatedUser);
    
    const updatedHoleSet = {
      ...holeSet,
      openedHoles: Array.from({ length: holeSet.totalHoles }, (_, i) => i + 1)
    };
    updateHoleSet(updatedHoleSet);

    // Add all cards to collection
    const newCollection = [...collection, ...cards];
    updateCollection(newCollection);

    setIsOpening(false);

    toast({
      title: `All holes opened!`,
      description: `You found ${cards.length} cards! Check your collection.`,
    });
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
    const creditReturn = card.rarity === 'legendary' ? 3 : card.rarity === 'rare' ? 2 : 1;
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

  if (!user || !holeSet) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const closedHoles = holeSet.totalHoles - holeSet.openedHoles.length;
  const openAllDiscount = Math.floor(closedHoles * holeSet.costPerHole * holeSet.discountMultiplier);

  return (
    <div className="min-h-screen pb-20">
      <Navbar 
        credits={user.credits}
        username={user.username}
      />

      <main className="pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collections
          </Button>

          {/* Hole Set Header */}
          <div className="text-center py-8">
            <h1 className="text-4xl font-bold text-gradient-primary mb-2">
              {holeSet.name}
            </h1>
            <p className="text-muted-foreground mb-4">
              {holeSet.description}
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-semibold">
                  {holeSet.openedHoles.length}/{holeSet.totalHoles}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-gradient-primary"
                  style={{ width: `${(holeSet.openedHoles.length / holeSet.totalHoles) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Card Gallery */}
          <div className="mb-8">
            <Card className="p-6 bg-card/50 border-border">
              <CardGallery cardPool={holeSet.cardPool} theme={holeSet.theme} />
            </Card>
          </div>

          {/* Main Content - stacked for mobile */}
          <div className="grid gap-8">
            {/* Pigeon Hole */}
            <Card className="p-6 sm:p-8 bg-card/50 border-border text-center">
              <PigeonHole
                credits={user.credits}
                onOpenHole={handleOpenHole}
                onOpenAll={handleOpenAll}
                isOpening={isOpening}
                openedHoles={holeSet.openedHoles}
                pendingHoleNumber={pendingHoleNumber}
              />
            </Card>

            {/* Grade Distribution (Pull Rates) stacked below */}
            <PullRates theme={holeSet.theme} />

            {/* Collection Stats */}
              <Card className="p-6 bg-card/50 border-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Collection Stats
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Cards:</span>
                    <span className="font-semibold">{collection.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gem Mint (PSA 10):</span>
                    <span className="font-semibold text-yellow-400">
                      {collection.filter(c => c.rarity === 'legendary').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PSA 9.5-10:</span>
                    <span className="font-semibold text-purple-400">
                      {collection.filter(c => c.rarity === 'epic').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PSA 8-9:</span>
                    <span className="font-semibold text-blue-400">
                      {collection.filter(c => c.rarity === 'rare').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Set:</span>
                    <span className="font-semibold text-secondary">
                      {collection.filter(c => c.holeSetId === holeSet.id).length}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 bg-card/50 border-border">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    onClick={handleBuyCredits}
                    className="w-full bg-gradient-secondary hover:bg-secondary/90 arcade-button"
                  >
                    <Coins className="w-4 h-4 mr-2" />
                    Buy Credits
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10"
                    onClick={() => navigate('/collection')}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    View Collection
                  </Button>
                </div>
              </Card>

              {/* Set Info */}
              <Card className="p-6 bg-card/50 border-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-accent" />
                  Set Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Theme:</span>
                    <span className="font-semibold capitalize">{holeSet.theme}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost per Hole:</span>
                    <span className="font-semibold">{holeSet.costPerHole} coins</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining:</span>
                    <span className="font-semibold">{closedHoles} holes</span>
                  </div>
                  {closedHoles >= 5 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Open All:</span>
                      <span className="font-semibold text-accent">{openAllDiscount} coins</span>
                    </div>
                  )}
                </div>
              </Card>
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
        onConfirmOpen={() => {
          if (!user || !holeSet) return;
          // Deduct single-hole cost only when user commits to opening the pack
          const updatedUser = { ...user, credits: user.credits - holeSet.costPerHole };
          updateUser(updatedUser);
          // Mark the pending hole as opened only now
          if (pendingHoleNumber && !holeSet.openedHoles.includes(pendingHoleNumber)) {
            const updatedHoleSet = {
              ...holeSet,
              openedHoles: [...holeSet.openedHoles, pendingHoleNumber]
            };
            updateHoleSet(updatedHoleSet);
          }
          setPendingHoleNumber(null);
          // Subtle toast without revealing the card yet
          toast({
            title: `Hole opened!`,
            description: `Tearing the pack...`,
          });
        }}
        onClose={() => {
          setIsRevealing(false);
          setRevealedCard(null);
          // If user closes without opening, ensure pending hole is cleared
          setPendingHoleNumber(null);
        }}
      />
    </div>
  );
};
