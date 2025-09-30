import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Zap, Crown } from 'lucide-react';
import { CardPool } from '@/types/hole-sets';

interface CardGalleryProps {
  cardPool: CardPool;
  theme: string;
}

const rarityConfig = {
  common: {
    color: 'text-gray-400',
    bg: 'bg-gray-500/20',
    border: 'border-gray-500/50',
    icon: Star
  },
  rare: {
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/50',
    icon: Zap
  },
  epic: {
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/50',
    icon: Crown
  },
  legendary: {
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/50',
    icon: Crown
  }
};

export const CardGallery: React.FC<CardGalleryProps> = ({ cardPool, theme }) => {
  // Early return if cardPool is undefined
  if (!cardPool) {
    return (
      <div className="w-full text-center py-8">
        <h3 className="text-lg font-semibold mb-4">
          Possible Cards in {theme.charAt(0).toUpperCase() + theme.slice(1)} Collection
        </h3>
        <p className="text-muted-foreground">Loading card information...</p>
      </div>
    );
  }

  // Safely combine all cards from all rarities with fallbacks
  const uniqueCards = [
    ...(cardPool?.common || []).map(card => ({ ...card, rarity: 'common' as const })),
    ...(cardPool?.rare || []).map(card => ({ ...card, rarity: 'rare' as const })),
    ...(cardPool?.epic || []).map(card => ({ ...card, rarity: 'epic' as const })),
    ...(cardPool?.legendary || []).map(card => ({ ...card, rarity: 'legendary' as const }))
  ];

  // Generate 80 cards total by repeating cards from the pool
  // This represents all possible cards that could be pulled from holes
  const allCards = [];
  const targetCount = 80;
  
  // Repeat cards to reach 80 total
  for (let i = 0; i < targetCount; i++) {
    const cardIndex = i % uniqueCards.length;
    const baseCard = uniqueCards[cardIndex];
    allCards.push({
      ...baseCard,
      id: `${baseCard.id}-${i}`, // Unique ID for each instance
      instanceNumber: i + 1
    });
  }

  // If no cards available, show message
  if (allCards.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <h3 className="text-lg font-semibold mb-4">
          Possible Cards in {theme.charAt(0).toUpperCase() + theme.slice(1)} Collection
        </h3>
        <p className="text-muted-foreground">No cards available in this collection.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-center">
        All Possible Cards (80 total)
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Scroll to see all 80 possible cards that could be pulled
      </p>
      
      <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted gap-4 pb-4 max-h-48">
        {allCards.map((card) => {
          const config = rarityConfig[card.rarity];
          const Icon = config.icon;
          
          return (
            <div key={card.id} className="flex-shrink-0 w-32">
              <Card className={`
                p-3 ${config.bg} ${config.border} border
                hover:shadow-lg transition-all duration-200
                cursor-pointer hover:scale-105 mb-2
              `}>
                {/* Card Image Placeholder */}
                <div className="w-full h-20 bg-white/20 rounded border border-white/30 flex items-center justify-center mb-2">
                  <div className="text-white/60 text-xs">IMG</div>
                </div>
                
                {/* Rarity Badge */}
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon className={`w-3 h-3 ${config.color}`} />
                  <Badge variant="secondary" className={`text-xs ${config.color} ${config.bg} ${config.border} border`}>
                    {card.rarity.toUpperCase()}
                  </Badge>
                </div>
              </Card>
              
              {/* Card Info Below */}
              <div className="text-center">
                <h4 className={`font-semibold text-sm ${config.color} truncate`}>
                  {card.name}
                </h4>
                <p className="text-xs font-semibold text-secondary">
                  ${card.estimatedValue}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-muted-foreground">
          Scroll horizontally to see all <span className="font-semibold">80</span> possible cards
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Each card represents a potential pull from any hole
        </div>
      </div>
    </div>
  );
};
