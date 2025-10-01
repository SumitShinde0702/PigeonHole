import React from 'react';
import { Card } from '@/pigeonhole/components/ui/card';
import { Button } from '@/pigeonhole/components/ui/button';
import { Badge } from '@/pigeonhole/components/ui/badge';
import { Package, Coins, Calendar, Sparkles } from 'lucide-react';
import { HoleSet } from '@/pigeonhole/types/hole-sets';

interface HoleSetCardProps {
  holeSet: HoleSet;
  onSelect: (holeSetId: string) => void;
  userCredits: number;
}

export const HoleSetCard: React.FC<HoleSetCardProps> = ({
  holeSet,
  onSelect,
  userCredits
}) => {
  const openedCount = holeSet.openedHoles.length;
  const remainingCount = holeSet.totalHoles - openedCount;
  const progressPercentage = (openedCount / holeSet.totalHoles) * 100;
  const canAfford = userCredits >= holeSet.costPerHole;

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'cyberpunk':
        return {
          bg: 'from-purple-500/20 to-pink-500/20',
          border: 'border-purple-500/50',
          accent: 'text-purple-400',
          button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
        };
      case 'fantasy':
        return {
          bg: 'from-green-500/20 to-emerald-500/20',
          border: 'border-green-500/50',
          accent: 'text-green-400',
          button: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
        };
      case 'retro':
        return {
          bg: 'from-orange-500/20 to-yellow-500/20',
          border: 'border-orange-500/50',
          accent: 'text-orange-400',
          button: 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700'
        };
      case 'space':
        return {
          bg: 'from-blue-500/20 to-indigo-500/20',
          border: 'border-blue-500/50',
          accent: 'text-blue-400',
          button: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
        };
      default:
        return {
          bg: 'from-gray-500/20 to-gray-600/20',
          border: 'border-gray-500/50',
          accent: 'text-gray-400',
          button: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
        };
    }
  };

  const colors = getThemeColors(holeSet.theme);

  return (
    <Card className={`
      relative overflow-hidden transition-all duration-200 hover:shadow-xl
      bg-gradient-to-br ${colors.bg} border ${colors.border}
      ${holeSet.isActive ? 'opacity-100' : 'opacity-60'}
    `}>
      <div className="relative p-4">
        <div className="flex items-start gap-4">
          {/* Left column: name + description + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="text-base font-semibold text-white truncate">
                {holeSet.name}
              </h3>
              <Badge 
                variant="secondary" 
                className={`${colors.accent} bg-white/20 border-white/30 whitespace-nowrap`}
              >
                {holeSet.theme}
              </Badge>
            </div>
            <p className="text-white/75 text-xs line-clamp-2">
              {holeSet.description}
            </p>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-white/75">Progress</span>
                <span className="text-[11px] font-medium text-white">
                  {openedCount}/{holeSet.totalHoles}
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full bg-gradient-to-r ${colors.button.replace('bg-gradient-to-r ', '').replace(' hover:from-purple-700 hover:to-pink-700', '').replace(' hover:from-green-700 hover:to-emerald-700', '').replace(' hover:from-orange-700 hover:to-yellow-700', '').replace(' hover:from-blue-700 hover:to-indigo-700', '').replace(' hover:from-gray-700 hover:to-gray-800', '')}`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-3 flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-1 text-[11px]">
                <Package className="w-3.5 h-3.5 opacity-70" />
                <span>Remaining</span>
                <span className="font-semibold text-white ml-1">{remainingCount}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px]">
                <Coins className="w-3.5 h-3.5 opacity-70" />
                <span>Cost</span>
                <span className="font-semibold text-white ml-1">{holeSet.costPerHole}</span>
              </div>
              {holeSet.releaseDate && (
                <div className="ml-auto flex items-center gap-1 text-[11px] text-white/70">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(holeSet.releaseDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right column: action */}
          <div className="shrink-0 w-[140px] flex flex-col items-stretch gap-2">
            <Button
              onClick={() => onSelect(holeSet.id)}
              disabled={!holeSet.isActive || !canAfford}
              className={`
                ${colors.button} text-white font-semibold text-sm py-2
                ${!holeSet.isActive || !canAfford ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
              `}
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              {holeSet.isActive ? 'Open' : 'Soon'}
            </Button>
            {!canAfford && holeSet.isActive && (
              <p className="text-[11px] text-red-300 text-center">Need {holeSet.costPerHole} coins</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

