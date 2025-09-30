import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Coins, Sparkles } from 'lucide-react';
import gachaMachine from '@/assets/gacha-machine.png';

interface GachaMachineProps {
  credits: number;
  onSpin: () => Promise<any>;
  isSpinning: boolean;
}

export const GachaMachine: React.FC<GachaMachineProps> = ({
  credits,
  onSpin,
  isSpinning
}) => {
  const [machineShaking, setMachineShaking] = useState(false);

  const handleSpin = async () => {
    if (credits < 1 || isSpinning) return;
    
    setMachineShaking(true);
    
    try {
      await onSpin();
    } finally {
      setTimeout(() => setMachineShaking(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      {/* Gacha Machine */}
      <div className="relative">
        <div 
          className={`
            relative transition-all duration-300 hover-lift
            ${machineShaking ? 'animate-shake' : ''}
            ${isSpinning ? 'animate-glow' : ''}
          `}
        >
          <img 
            src={gachaMachine}
            alt="Retro Gacha Machine"
            className="w-80 h-96 pixel-art"
          />
          
          {/* Glow Effect */}
          {isSpinning && (
            <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl animate-glow" />
          )}
        </div>

        {/* Machine Status */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/30">
            <span className="text-primary text-sm font-semibold flex items-center gap-1">
              {isSpinning ? (
                <>
                  <Sparkles className="w-3 h-3 animate-spin" />
                  Spinning...
                </>
              ) : (
                'Ready to Play'
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={handleSpin}
          disabled={credits < 1 || isSpinning}
          size="lg"
          className={`
            bg-gradient-secondary hover:bg-secondary/90 
            arcade-button text-secondary-foreground font-bold
            px-8 py-3 text-lg retro-border
            ${credits < 1 ? 'opacity-50 cursor-not-allowed' : 'hover-glow'}
          `}
        >
          <Coins className="w-5 h-5 mr-2" />
          {isSpinning ? 'Spinning...' : 'Insert Coin'}
        </Button>

        {/* Cost Display */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Cost: <span className="text-secondary font-semibold">1 Pigeon Coin</span>
          </p>
          {credits < 1 && (
            <p className="text-destructive text-xs mt-1">
              Not enough coins! Buy more to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};