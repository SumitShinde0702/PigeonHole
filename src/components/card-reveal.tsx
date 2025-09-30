import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, ArrowRight, Heart, DollarSign } from 'lucide-react';
import cardTemplate from '@/assets/card-template.png';

export interface RevealedCard {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'grail';
  image: string;
  description: string;
  theme?: string;
  holeSetId?: string;
}

interface CardRevealProps {
  card: RevealedCard | null;
  isRevealing: boolean;
  onKeep: (card: RevealedCard) => void;
  onTrade: (card: RevealedCard) => void;
  onResell: (card: RevealedCard) => void;
  onClose: () => void;
}

const rarityConfig = {
  common: {
    color: 'text-foreground',
    glow: 'shadow-lg',
    border: 'border-border',
    bg: 'bg-muted/50'
  },
  rare: {
    color: 'text-primary',
    glow: 'shadow-primary/50 shadow-2xl',
    border: 'border-primary',
    bg: 'bg-primary/10'
  },
  grail: {
    color: 'text-accent',
    glow: 'shadow-accent/50 shadow-2xl animate-glow',
    border: 'border-accent',
    bg: 'bg-accent/10'
  }
};

export const CardReveal: React.FC<CardRevealProps> = ({
  card,
  isRevealing,
  onKeep,
  onTrade,
  onResell,
  onClose
}) => {
  const [showCard, setShowCard] = useState(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    if (isRevealing && card) {
      // Card flip animation sequence
      setTimeout(() => setShowCard(true), 300);
      setTimeout(() => setShowActions(true), 1200);
    } else {
      setShowCard(false);
      setShowActions(false);
    }
  }, [isRevealing, card]);

  if (!card || !isRevealing) return null;

  // Ensure we have a valid rarity configuration with fallback
  const config = rarityConfig[card.rarity] || rarityConfig.common;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card Container */}
        <div className="flex flex-col items-center gap-6">
          {/* Card Reveal */}
          <div className={`
            relative transition-all duration-800 transform
            ${showCard ? 'animate-card-reveal' : 'scale-75 opacity-0'}
          `}>
            <Card className={`
              p-6 ${config.bg} ${config.border} ${config.glow}
              border-2 retro-border relative overflow-hidden
            `}>
              {/* Card Template Background */}
              <div className="absolute inset-0 opacity-20">
                <img 
                  src={cardTemplate} 
                  alt="Card Template"
                  className="w-full h-full object-cover pixel-art"
                />
              </div>

              {/* Card Content */}
              <div className="relative z-10 text-center">
                {/* Rarity Indicator */}
                <div className="flex justify-center mb-2">
                  <span className={`
                    ${config.color} text-sm font-bold uppercase tracking-wider
                    px-2 py-1 rounded ${config.bg} border ${config.border}
                  `}>
                    {card.rarity}
                    {card.rarity === 'grail' && <Sparkles className="inline w-3 h-3 ml-1" />}
                  </span>
                </div>

                {/* Card Image Placeholder */}
                <div className={`
                  w-32 h-32 mx-auto mb-4 rounded-lg border-2 ${config.border}
                  bg-gradient-to-br from-primary/20 to-accent/20
                  flex items-center justify-center pixel-art
                `}>
                  <img 
                    src={card.image || '/placeholder.svg'} 
                    alt={card.name}
                    className="w-full h-full object-cover rounded-lg pixel-art"
                  />
                </div>

                {/* Card Info */}
                <h3 className={`text-xl font-bold ${config.color} mb-2`}>
                  {card.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {card.description}
                </p>
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className={`
            flex gap-3 transition-all duration-500 transform
            ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            <Button
              onClick={() => onKeep(card)}
              variant="default"
              className="bg-gradient-primary hover:bg-primary/90 arcade-button"
            >
              <Heart className="w-4 h-4 mr-2" />
              Keep
            </Button>

            <Button
              onClick={() => onTrade(card)}
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 arcade-button"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Trade
            </Button>

            <Button
              onClick={() => onResell(card)}
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 arcade-button"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Resell
            </Button>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};