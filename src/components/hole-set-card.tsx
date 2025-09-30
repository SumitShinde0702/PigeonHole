import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Coins, Calendar, Sparkles } from 'lucide-react';
import { HoleSet } from '@/types/hole-sets';

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
      relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl
      bg-gradient-to-br ${colors.bg} border-2 ${colors.border}
      ${holeSet.isActive ? 'opacity-100' : 'opacity-60'}
    `}>
      {/* Theme Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/10"></div>
      </div>

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">
              {holeSet.name}
            </h3>
            <p className="text-white/80 text-sm mb-2">
              {holeSet.description}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Badge 
              variant="secondary" 
              className={`${colors.accent} bg-white/20 border-white/30`}
            >
              {holeSet.theme}
            </Badge>
            
            {holeSet.releaseDate && (
              <div className="flex items-center gap-1 text-xs text-white/60">
                <Calendar className="w-3 h-3" />
                <span>{new Date(holeSet.releaseDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/80">Progress</span>
            <span className="text-sm font-semibold text-white">
              {openedCount}/{holeSet.totalHoles}
            </span>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${colors.button.replace('bg-gradient-to-r ', '').replace(' hover:from-purple-700 hover:to-pink-700', '').replace(' hover:from-green-700 hover:to-emerald-700', '').replace(' hover:from-orange-700 hover:to-yellow-700', '').replace(' hover:from-blue-700 hover:to-indigo-700', '').replace(' hover:from-gray-700 hover:to-gray-800', '')}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Package className="w-4 h-4 text-white/60" />
              <span className="text-xs text-white/60">Remaining</span>
            </div>
            <span className="text-lg font-bold text-white">{remainingCount}</span>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Coins className="w-4 h-4 text-white/60" />
              <span className="text-xs text-white/60">Cost per Hole</span>
            </div>
            <span className="text-lg font-bold text-white">{holeSet.costPerHole}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onSelect(holeSet.id)}
          disabled={!holeSet.isActive || !canAfford}
          className={`
            w-full ${colors.button} text-white font-bold
            ${!holeSet.isActive || !canAfford ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
            transition-all duration-200
          `}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {holeSet.isActive ? 'Open Collection' : 'Coming Soon'}
        </Button>

        {/* Insufficient Credits Warning */}
        {!canAfford && holeSet.isActive && (
          <p className="text-xs text-red-400 text-center mt-2">
            Need {holeSet.costPerHole} coins to open holes
          </p>
        )}
      </div>

      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} blur-xl opacity-30 pointer-events-none`}></div>
    </Card>
  );
};

