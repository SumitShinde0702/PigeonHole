import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/pigeonhole/components/ui/button';
import { Card } from '@/pigeonhole/components/ui/card';
import { Badge } from '@/pigeonhole/components/ui/badge';
import { Coins, Gift, Star, Sparkles, Crown, Zap } from 'lucide-react';
import { holeSets } from '@/pigeonhole/data/hole-sets';
import { CardTemplate } from '@/pigeonhole/types/hole-sets';

interface AdventBox {
  id: number;
  isOpen: boolean;
  isOpening: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  card?: CardTemplate;
  animationType: 'pull' | 'tear';
}

export const AdventCalendar: React.FC = () => {
  const { holeSetId } = useParams<{ holeSetId?: string }>();
  const currentHoleSetId = holeSetId || 'cyberpunk-set';
  const [boxes, setBoxes] = useState<AdventBox[]>([]);
  const [credits, setCredits] = useState(100);
  const [isOpening, setIsOpening] = useState(false);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  // Use selectedBox to avoid unused variable warning
  console.log('Selected box:', selectedBox);
  const [revealedCard, setRevealedCard] = useState<CardTemplate | null>(null);

  const holeSet = holeSets.find(set => set.id === currentHoleSetId);

  // Initialize boxes with random rarities and animation types
  useEffect(() => {
    if (!holeSet) return;

    const initializeBoxes = () => {
      const newBoxes: AdventBox[] = [];
      
      // Create rarity distribution (similar to gacha rates)
      const rarityDistribution = {
        common: 0.7,    // 70%
        rare: 0.2,      // 20%
        epic: 0.08,     // 8%
        legendary: 0.02 // 2%
      };

      for (let i = 1; i <= 24; i++) {
        const random = Math.random();
        let rarity: 'common' | 'rare' | 'epic' | 'legendary' = 'common';
        
        if (random < rarityDistribution.legendary) rarity = 'legendary';
        else if (random < rarityDistribution.legendary + rarityDistribution.epic) rarity = 'epic';
        else if (random < rarityDistribution.legendary + rarityDistribution.epic + rarityDistribution.rare) rarity = 'rare';

        newBoxes.push({
          id: i,
          isOpen: false,
          isOpening: false,
          rarity,
          animationType: Math.random() > 0.5 ? 'pull' : 'tear'
        });
      }

      setBoxes(newBoxes);
    };

    initializeBoxes();
  }, [currentHoleSetId]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Star className="w-3 h-3" />;
      case 'rare': return <Sparkles className="w-3 h-3" />;
      case 'epic': return <Zap className="w-3 h-3" />;
      case 'legendary': return <Crown className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
    }
  };

  const getBoxDesign = (rarity: string) => {
    const baseDesign = "relative w-20 h-20 rounded-lg border-2 shadow-lg transition-all duration-500";
    
    switch (rarity) {
      case 'common':
        return `${baseDesign} bg-gradient-to-br from-gray-100 to-gray-300 border-gray-400 hover:shadow-xl`;
      case 'rare':
        return `${baseDesign} bg-gradient-to-br from-blue-100 to-blue-300 border-blue-400 hover:shadow-xl hover:shadow-blue-200`;
      case 'epic':
        return `${baseDesign} bg-gradient-to-br from-purple-100 to-purple-300 border-purple-400 hover:shadow-xl hover:shadow-purple-200`;
      case 'legendary':
        return `${baseDesign} bg-gradient-to-br from-yellow-100 to-yellow-300 border-yellow-400 hover:shadow-xl hover:shadow-yellow-200 animate-pulse`;
      default:
        return `${baseDesign} bg-gradient-to-br from-gray-100 to-gray-300 border-gray-400`;
    }
  };

  const getBoxPattern = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return (
          <div className="absolute inset-2 border border-gray-300 rounded">
            <div className="absolute top-1 left-1 w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        );
      case 'rare':
        return (
          <div className="absolute inset-2 border border-blue-300 rounded">
            <div className="absolute top-1 left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
        );
      case 'epic':
        return (
          <div className="absolute inset-2 border border-purple-300 rounded">
            <div className="absolute top-1 left-1 w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full"></div>
          </div>
        );
      case 'legendary':
        return (
          <div className="absolute inset-2 border border-yellow-300 rounded">
            <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleOpenBox = async (boxId: number) => {
    if (credits < 1 || isOpening) return;

    const box = boxes.find(b => b.id === boxId);
    if (!box || box.isOpen) return;

    setIsOpening(true);
    setSelectedBox(boxId);

    // Start opening animation
    setBoxes(prev => prev.map(b => 
      b.id === boxId ? { ...b, isOpening: true } : b
    ));

    // Simulate opening delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get random card from the rarity pool
    const rarityPool = holeSet?.cardPool[box.rarity] || [];
    const randomCard = rarityPool[Math.floor(Math.random() * rarityPool.length)];

    // Mark as opened and set card
    setBoxes(prev => prev.map(b => 
      b.id === boxId ? { ...b, isOpen: true, isOpening: false, card: randomCard } : b
    ));

    // Show revealed card
    setRevealedCard(randomCard);
    setCredits(prev => prev - 1);

    // Reset states
    setTimeout(() => {
      setIsOpening(false);
      setSelectedBox(null);
      setRevealedCard(null);
    }, 3000);
  };

  const handleOpenAll = async () => {
    const closedBoxes = boxes.filter(b => !b.isOpen);
    const cost = Math.floor(closedBoxes.length * 0.8); // 20% discount

    if (credits < cost || isOpening) return;

    setIsOpening(true);

    // Open all boxes with staggered animation
    for (let i = 0; i < closedBoxes.length; i++) {
      const box = closedBoxes[i];
      
      setTimeout(async () => {
        setBoxes(prev => prev.map(b => 
          b.id === box.id ? { ...b, isOpening: true } : b
        ));

        await new Promise(resolve => setTimeout(resolve, 800));

        const rarityPool = holeSet?.cardPool[box.rarity] || [];
        const randomCard = rarityPool[Math.floor(Math.random() * rarityPool.length)];

        setBoxes(prev => prev.map(b => 
          b.id === box.id ? { ...b, isOpen: true, isOpening: false, card: randomCard } : b
        ));
      }, i * 200);
    }

    setCredits(prev => prev - cost);
    
    setTimeout(() => {
      setIsOpening(false);
    }, closedBoxes.length * 200 + 1000);
  };

  const closedBoxes = boxes.filter(box => !box.isOpen).length;
  const openAllDiscount = Math.floor(closedBoxes * 0.8);

  if (!holeSet) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Hole Set Not Found</h1>
          <p className="text-muted-foreground">The requested hole set could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {holeSet.name} Calendar
          </h1>
          <p className="text-muted-foreground text-lg">Open graded card boxes - {holeSet.description}</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Coins className="w-4 h-4" />
              {credits} Credits
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Gift className="w-4 h-4" />
              {24 - closedBoxes}/24 Opened
            </Badge>
          </div>
        </div>

        {/* Advent Calendar Grid */}
        <div className="relative mb-8">
          <Card className="p-8 bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-primary/20">
            <div className="grid grid-cols-6 gap-4">
              {boxes.map((box) => (
                <div key={box.id} className="relative">
                  <button
                    onClick={() => handleOpenBox(box.id)}
                    disabled={box.isOpen || box.isOpening || credits < 1 || isOpening}
                    className={`
                      ${getBoxDesign(box.rarity)}
                      ${box.isOpen 
                        ? 'opacity-50 cursor-default' 
                        : box.isOpening
                        ? 'animate-pulse scale-110'
                        : 'hover:scale-105 cursor-pointer'
                      }
                      ${credits < 1 || isOpening ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {/* Box Number */}
                    <div className="absolute top-1 left-1 bg-background/80 rounded px-1 text-xs font-bold">
                      {box.id}
                    </div>

                    {/* Rarity Badge */}
                    <div className="absolute top-1 right-1">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs p-0.5 ${getRarityColor(box.rarity)} text-white`}
                      >
                        {getRarityIcon(box.rarity)}
                      </Badge>
                    </div>

                    {/* Box Pattern */}
                    {!box.isOpen && getBoxPattern(box.rarity)}

                    {/* Opening Animation */}
                    {box.isOpening && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {box.animationType === 'pull' ? (
                          <div className="relative">
                            {/* Pull-out animation */}
                            <div className="animate-pull-out text-2xl">📦</div>
                            <div className="absolute inset-0 animate-pull-glow bg-primary/20 rounded-lg"></div>
                            <div className="absolute -top-2 -left-2 w-2 h-2 bg-primary rounded-full animate-ping"></div>
                            <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-primary rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                            <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-primary rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
                          </div>
                        ) : (
                          <div className="relative">
                            {/* Tear animation */}
                            <div className="animate-tear-open text-2xl">🎁</div>
                            <div className="absolute inset-0 animate-tear-glow bg-accent/20 rounded-lg"></div>
                            {/* Tear lines */}
                            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-accent animate-tear-line"></div>
                            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-accent animate-tear-line" style={{animationDelay: '0.3s'}}></div>
                            {/* Sparkles */}
                            <div className="absolute top-1 left-1 w-1 h-1 bg-yellow-400 rounded-full animate-sparkle"></div>
                            <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-400 rounded-full animate-sparkle" style={{animationDelay: '0.2s'}}></div>
                            <div className="absolute bottom-1 left-1 w-1 h-1 bg-yellow-400 rounded-full animate-sparkle" style={{animationDelay: '0.4s'}}></div>
                            <div className="absolute bottom-1 right-1 w-1 h-1 bg-yellow-400 rounded-full animate-sparkle" style={{animationDelay: '0.6s'}}></div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Opened State */}
                    {box.isOpen && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-2xl opacity-50">✓</div>
                      </div>
                    )}
                  </button>

                  {/* Revealed Card Preview */}
                  {box.isOpen && box.card && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-6 h-8 bg-gradient-to-br from-primary to-accent rounded border border-primary/50 shadow-lg"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
          <div className="text-center">
            <Button
              onClick={() => {}}
              disabled={credits < 1 || isOpening}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold px-8 py-3"
            >
              <Gift className="w-5 h-5 mr-2" />
              Open Single Box
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Cost: <span className="text-primary font-semibold">1 Credit</span>
            </p>
          </div>

          {closedBoxes >= 5 && (
            <div className="text-center">
              <Button
                onClick={handleOpenAll}
                disabled={credits < openAllDiscount || isOpening}
                size="lg"
                className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground font-bold px-8 py-3"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Open All Remaining
              </Button>
              <div className="text-sm mt-2">
                <p className="text-muted-foreground">
                  <span className="line-through">{closedBoxes} credits</span>{' '}
                  <span className="text-accent font-semibold">{openAllDiscount} credits</span>
                </p>
                <p className="text-accent/80">Save 20%!</p>
              </div>
            </div>
          )}
        </div>

        {/* Revealed Card Modal */}
        {revealedCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="p-6 max-w-md mx-4 bg-background border-2 border-primary/50">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Card Revealed!</h3>
                <div className="mb-4">
                  <Badge className={`${getRarityColor(revealedCard.rarity)} text-white mb-2`}>
                    {getRarityIcon(revealedCard.rarity)} {revealedCard.rarity.toUpperCase()}
                  </Badge>
                </div>
                <div className="w-32 h-48 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-lg border-2 border-primary/50 flex items-center justify-center">
                  <span className="text-4xl">🕊️</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">{revealedCard.name}</h4>
                <p className="text-muted-foreground mb-4">{revealedCard.description}</p>
                <p className="text-sm text-muted-foreground">
                  Estimated Value: <span className="font-semibold text-primary">{revealedCard.estimatedValue} coins</span>
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Stats */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Each box contains a graded Pokemon card from the {holeSet.name}</p>
          <p>Higher grade boxes have better chances for PSA 10 / BGS 10 gems!</p>
        </div>
      </div>
    </div>
  );
};
