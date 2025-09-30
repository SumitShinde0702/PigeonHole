import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Coins, Package, Gift } from 'lucide-react';
import pigeonLogo from '@/assets/pigeon-logo.png';

interface PigeonHoleProps {
  credits: number;
  onOpenHole: (holeNumber: number) => Promise<any>;
  onOpenAll: () => Promise<any>;
  isOpening: boolean;
  openedHoles: number[];
  pendingHoleNumber?: number | null;
}

interface Hole {
  id: number;
  isOpen: boolean;
  isOpening: boolean;
  hasPackage: boolean;
}

export const PigeonHole: React.FC<PigeonHoleProps> = ({
  credits,
  onOpenHole,
  onOpenAll,
  isOpening,
  openedHoles,
  pendingHoleNumber
}) => {
  const [holes, setHoles] = useState<Hole[]>(
    Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      isOpen: openedHoles.includes(i + 1),
      isOpening: false,
      hasPackage: Math.random() > 0.3 // 70% chance of having a package
    }))
  );

  // Keep local state in sync with authoritative openedHoles prop
  useEffect(() => {
    setHoles(prev => prev.map(hole => ({
      ...hole,
      isOpen: openedHoles.includes(hole.id)
    })));
  }, [openedHoles]);

  const handleOpenHole = async (holeNumber: number) => {
    if (credits < 1 || isOpening) return;
    
    // Start hole opening animation
    setHoles(prev => prev.map(hole => 
      hole.id === holeNumber 
        ? { ...hole, isOpening: true }
        : hole
    ));

    try {
      await onOpenHole(holeNumber);
      
      // Stop local opening animation; do NOT mark open here.
      setTimeout(() => {
        setHoles(prev => prev.map(hole => 
          hole.id === holeNumber 
            ? { ...hole, isOpening: false }
            : hole
        ));
      }, 600);
    } catch (error) {
      // Reset on error
      setHoles(prev => prev.map(hole => 
        hole.id === holeNumber 
          ? { ...hole, isOpening: false }
          : hole
      ));
    }
  };

  const handleOpenAll = async () => {
    if (credits < 20 || isOpening) return;
    
    // Mark all unopened holes as opening
    setHoles(prev => prev.map(hole => 
      !hole.isOpen ? { ...hole, isOpening: true } : hole
    ));

    try {
      await onOpenAll();
      
      // Mark all as opened after animation
      setTimeout(() => {
        setHoles(prev => prev.map(hole => ({
          ...hole,
          isOpen: true,
          isOpening: false
        })));
      }, 1000);
    } catch (error) {
      // Reset on error
      setHoles(prev => prev.map(hole => ({ ...hole, isOpening: false })));
    }
  };

  const closedHoles = holes.filter(hole => !hole.isOpen).length;
  const openAllDiscount = Math.floor((24 - closedHoles) * 0.8); // 20% discount

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Hole Grid */}
      <div className="relative">
        <div className="grid grid-cols-6 gap-3 p-6 bg-gradient-to-br from-destructive/20 to-destructive/40 rounded-xl border-2 border-destructive/50 shadow-2xl">
          {holes.map((hole) => (
            <button
              key={hole.id}
              onClick={() => handleOpenHole(hole.id)}
              disabled={hole.isOpen || hole.isOpening || credits < 1 || isOpening}
              className={`
                relative w-16 h-16 rounded-lg border-2 transition-all duration-300
                ${hole.isOpen 
                  ? 'bg-background/80 border-muted shadow-inner cursor-default' 
                  : hole.isOpening
                  ? 'bg-primary/30 border-primary shadow-lg animate-hole-open animate-physical-shake'
                  : 'bg-gradient-secondary border-secondary/60 hover:border-secondary hover:shadow-lg hover:scale-105 arcade-button cursor-pointer animate-hole-glow'
                }
                ${credits < 1 || isOpening ? 'opacity-50 cursor-not-allowed' : ''}
                ${pendingHoleNumber === hole.id && !hole.isOpen ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''}
              `}
            >
              {/* Hole Number */}
              <span className={`
                absolute inset-0 flex items-center justify-center font-bold text-sm
                ${hole.isOpen ? 'text-muted-foreground' : 'text-secondary-foreground'}
              `}>
                {hole.id}
              </span>

              {/* Package Indicator */}
              {!hole.isOpen && hole.hasPackage && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse">
                  <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-75"></div>
                  {hole.isOpening && (
                    <div className="absolute inset-0 bg-accent rounded-full animate-package-tear"></div>
                  )}
                </div>
              )}

              {/* Hole Opening Animation */}
              {hole.isOpening && (
                <div className="absolute inset-0 bg-primary/60 rounded-lg animate-pulse"></div>
              )}

              {/* Empty Hole */}
              {hole.isOpen && (
                <div className="absolute inset-2 bg-background/60 rounded border border-muted-foreground/30"></div>
              )}
            </button>
          ))}
        </div>

        {/* Glow Effect for Active State */}
        {isOpening && (
          <div className="absolute inset-0 bg-primary/10 rounded-xl blur-xl animate-glow pointer-events-none"></div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="text-center">
          <Button
            onClick={() => {}} 
            disabled={credits < 1 || isOpening}
            size="lg"
            className={`
              bg-gradient-secondary hover:bg-secondary/90 
              arcade-button text-secondary-foreground font-bold
              px-6 py-3 text-lg retro-border mb-2
              ${credits < 1 ? 'opacity-50 cursor-not-allowed' : 'hover-glow'}
            `}
          >
            <Coins className="w-5 h-5 mr-2" />
            Open Single Hole
          </Button>
          <p className="text-xs text-muted-foreground">
            Cost: <span className="text-secondary font-semibold">1 Pigeon Coin</span>
          </p>
        </div>

        {closedHoles >= 5 && (
          <div className="text-center">
            <Button
              onClick={handleOpenAll}
              disabled={credits < openAllDiscount || isOpening}
              size="lg"
              className={`
                bg-gradient-accent hover:bg-accent/90 
                arcade-button text-accent-foreground font-bold
                px-6 py-3 text-lg retro-border mb-2
                ${credits < openAllDiscount ? 'opacity-50 cursor-not-allowed' : 'hover-glow'}
              `}
            >
              <Gift className="w-5 h-5 mr-2" />
              Open All Remaining
            </Button>
            <div className="text-xs">
              <p className="text-muted-foreground">
                <span className="line-through text-muted-foreground/60">{closedHoles} coins</span>{' '}
                <span className="text-accent font-semibold">{openAllDiscount} coins</span>
              </p>
              <p className="text-accent/80">Save 20%!</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Package className="w-4 h-4" />
          <span>Opened: {24 - closedHoles}/24</span>
        </div>
        <div className="flex items-center gap-1">
          <Coins className="w-4 h-4" />
          <span>Credits: {credits}</span>
        </div>
      </div>

      {credits < 1 && (
        <p className="text-destructive text-sm text-center">
          Not enough coins! Buy more to continue opening holes.
        </p>
      )}
    </div>
  );
};