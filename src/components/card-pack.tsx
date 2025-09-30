import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Heart, DollarSign } from 'lucide-react';
import { RevealedCard } from '@/types/hole-sets';
import pigeonLogo from '@/assets/pigeon-logo.png';

interface CardPackProps {
  card: RevealedCard | null;
  isRevealing: boolean;
  onKeep: (card: RevealedCard) => void;
  onTrade: (card: RevealedCard) => void;
  onResell: (card: RevealedCard) => void;
  onClose: () => void;
  onConfirmOpen?: () => void;
}

const rarityConfig = {
  common: {
    color: 'text-gray-400',
    glow: 'shadow-lg',
    border: 'border-gray-500/50',
    bg: 'bg-gray-500/10',
    packColor: 'from-slate-400 to-slate-600',
    foilColor: 'from-gray-300 to-gray-500'
  },
  rare: {
    color: 'text-blue-400',
    glow: 'shadow-blue-500/50 shadow-2xl',
    border: 'border-blue-500/50',
    bg: 'bg-blue-500/10',
    packColor: 'from-blue-400 to-blue-600',
    foilColor: 'from-blue-200 to-blue-400'
  },
  epic: {
    color: 'text-purple-400',
    glow: 'shadow-purple-500/50 shadow-2xl',
    border: 'border-purple-500/50',
    bg: 'bg-purple-500/10',
    packColor: 'from-purple-400 to-purple-600',
    foilColor: 'from-purple-200 to-purple-400'
  },
  legendary: {
    color: 'text-yellow-400',
    glow: 'shadow-yellow-500/50 shadow-2xl animate-glow',
    border: 'border-yellow-500/50',
    bg: 'bg-yellow-500/10',
    packColor: 'from-yellow-400 to-orange-600',
    foilColor: 'from-yellow-200 to-orange-400'
  }
};

export const CardPack: React.FC<CardPackProps> = ({
  card,
  isRevealing,
  onKeep,
  onTrade,
  onResell,
  onClose,
  onConfirmOpen
}) => {
  const [packStage, setPackStage] = useState<'closed' | 'tearing' | 'opening' | 'revealed'>('closed');
  const [showCard, setShowCard] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [requiredClicks, setRequiredClicks] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  useEffect(() => {
    // Reset to closed and wait for user click to open
    if (isRevealing && card) {
      setPackStage('closed');
      setShowCard(false);
      setShowActions(false);
      // Set required taps based on rarity
      const tapsByRarity: Record<string, number> = {
        common: 1,
        rare: 2,
        epic: 3,
        legendary: 4,
      };
      setRequiredClicks(tapsByRarity[card.rarity] ?? 1);
      setClickCount(0);
      setHasConfirmed(false);
    } else {
      setPackStage('closed');
      setShowCard(false);
      setShowActions(false);
      setClickCount(0);
      setHasConfirmed(false);
    }
  }, [isRevealing, card]);

  const handlePackClick = () => {
    if (!card || !isRevealing) return;
    if (packStage !== 'closed') return;

    const next = clickCount + 1;
    setClickCount(next);

    if (next >= requiredClicks) {
      if (!hasConfirmed) {
        onConfirmOpen && onConfirmOpen();
        setHasConfirmed(true);
      }
      // User-initiated opening sequence
      setPackStage('tearing');
      setTimeout(() => setPackStage('opening'), 1600);
      setTimeout(() => setShowCard(true), 2600);
      setTimeout(() => setPackStage('revealed'), 3000);
      setTimeout(() => setShowActions(true), 3400);
    }
  };

  if (!card || !isRevealing) return null;

  const config = rarityConfig[card.rarity] || rarityConfig.common;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Pack Container */}
        <div className="flex flex-col items-center gap-6">
          
          {/* Card Pack */}
          <div className={`
            relative transition-all duration-1000 transform
            ${packStage === 'closed' ? 'scale-100 rotate-0 animate-idle-wobble' : ''}
            ${packStage === 'tearing' ? 'scale-105 rotate-2 animate-physical-shake' : ''}
            ${packStage === 'opening' ? 'scale-110 rotate-0 animate-pack-open-top' : ''}
            ${packStage === 'revealed' ? 'scale-100 rotate-0 opacity-0' : ''}
          `}>
            <Card onClick={handlePackClick} className={`
              w-64 h-80 p-6 bg-gradient-to-br from-purple-600 to-purple-800 pack-surface
              border-2 border-purple-500/50 shadow-2xl
              relative overflow-hidden cursor-pointer
            `}>
              {/* Optional jagged foil edges removed for now (looked odd on theme) */}
              {/* Purple Covering */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/90 to-purple-700/90"></div>
              
              {/* Pigeon Logo */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
                <img 
                  src={pigeonLogo}
                  alt="PigeonHole Logo"
                  className="w-16 h-16 pixel-art"
                />
              </div>
              
              {/* Metallic Foil Effect */}
              <div className="absolute inset-0 metallic-surface"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              <div className="absolute inset-0 foil-effect"></div>
              
              {/* Holographic Effect */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
              </div>
              
              {/* Pack Design */}
              <div className="relative z-10 h-full flex flex-col justify-between pt-16">
                {/* Top Section */}
                <div className="text-center">
                  <div className="text-white font-extrabold text-xl mb-2 drop-shadow-lg emboss-title tracking-wide">PIGEONHOLE</div>
                  <div className="text-white/90 text-sm mb-4 drop-shadow-md">TRADING CARDS</div>
                  
                  {/* Pack Art */}
                  <div className="w-32 h-24 mx-auto bg-gradient-to-br from-white/50 to-white/10 rounded-lg border-2 border-white/40 mb-4 flex items-center justify-center shadow-inner">
                    <div className="text-white/80 text-xs font-semibold drop-shadow-md">PACK ART</div>
                  </div>
                  
                  {/* Pack Seam */}
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent mb-2"></div>
                </div>

                {/* Bottom Section with strap */}
                <div className="text-center relative">
                  <div className="text-white font-bold text-sm mb-2 drop-shadow-md">{card.theme?.toUpperCase() || 'MYSTERY'}</div>
                  <div className="text-white/90 text-xs mb-3">5 CARDS INSIDE</div>
                  
                  {/* Pack Details */}
                  <div className="bg-white/10 rounded-lg p-2 mb-3 border border-white/20">
                    <div className="text-white/80 text-xs">GUARANTEED RARE</div>
                    <div className="text-white/60 text-xs">OR BETTER</div>
                  </div>
                  
                  {/* Rarity Indicator */}
                  <div className="px-3 py-1 bg-white/20 rounded-full inline-block border border-white/30">
                    <span className="text-white text-xs font-semibold drop-shadow-md">
                      {card.rarity.toUpperCase()}
                    </span>
                  </div>
                  
                  {/* Pack Seam */}
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent mt-2"></div>

                  {/* Strap & buckles */}
                  <div className="pack-strap -bottom-4 left-0 right-0"></div>
                  <div className="absolute -bottom-3 left-1/3 -translate-x-1/2 pack-buckle"></div>
                  <div className="absolute -bottom-3 left-2/3 -translate-x-1/2 pack-buckle"></div>
                </div>
              </div>

              {/* Tearing Effect */}
              {packStage === 'tearing' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/20 animate-pulse"></div>
                  {/* Vertical tear seam */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-white/40 animate-tear-line"></div>
                  {/* Paper rips */}
                  <div className="absolute inset-0 animate-pack-tear"></div>
                </>
              )}
              
              {packStage === 'opening' && (
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-red-500/30 animate-pack-open-top"></div>
              )}

              {/* Tap to open overlay */}
              {packStage === 'closed' && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-10 z-40">
                  <div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs shadow-lg">
                    {clickCount < requiredClicks
                      ? (requiredClicks - clickCount === 1
                          ? 'Tap to tear open'
                          : `${requiredClicks - clickCount} taps to open`)
                      : 'Releasing...'}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Card Reveal */}
          {showCard && (
            <div className={`
              absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              transition-all duration-1200
              ${showCard ? 'animate-card-pull-out' : 'translate-y-20 opacity-0'}
            `}>
              <Card className={`
                p-6 ${config.bg} ${config.border} ${config.glow}
                border-2 retro-border relative overflow-hidden
                w-64 h-80
              `}>
                {/* Card Template Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-br from-white/10 to-black/10 rounded-lg"></div>
                </div>

                {/* Card Content */}
                <div className="relative z-10 text-center h-full flex flex-col justify-between">
                  {/* Rarity Badge */}
                  <div className="flex justify-center mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${config.bg} ${config.border} border`}>
                      <span className={config.color}>{card.rarity.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Card Image */}
                  <div className="flex-1 flex items-center justify-center mb-4">
                    <div className="w-32 h-32 bg-white rounded-lg border-2 border-white/20 flex items-center justify-center">
                      <div className="text-gray-400 text-sm">CARD IMAGE</div>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${config.color}`}>
                      {card.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {card.description}
                    </p>
                    {card.theme && (
                      <div className="text-xs text-muted-foreground">
                        {card.theme.toUpperCase()} THEME
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Spacer so actions don't overlap the revealed card (smaller so Close stays visible) */}
          {showCard && (
            <div className="h-64" />
          )}

          {/* Action Buttons */}
          {showActions && (
            <div className={`
              -mt-10 flex gap-4 transition-all duration-500 transform
              ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              <Button
                onClick={() => onKeep(card)}
                className="bg-gradient-primary hover:bg-primary/90 text-primary-foreground px-6 py-2"
              >
                <Heart className="w-4 h-4 mr-2" />
                Keep
              </Button>
              
              <Button
                onClick={() => onTrade(card)}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-6 py-2"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Trade
              </Button>
              
              <Button
                onClick={() => onResell(card)}
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10 px-6 py-2"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Resell
              </Button>
            </div>
          )}

          {/* Close Button - pinned top-right */}
          <div className="fixed top-4 right-4 z-[60]">
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground bg-background/60"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
