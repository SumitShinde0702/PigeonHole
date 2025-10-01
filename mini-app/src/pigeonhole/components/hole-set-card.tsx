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
    <Card className="p-4 bg-card border-border hover:bg-muted/20 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">
              {holeSet.name}
            </h3>
            <Badge variant="outline" className="text-xs">
              {holeSet.theme}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {holeSet.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Progress: {openedCount}/{holeSet.totalHoles}</span>
            <span>Cost: {holeSet.costPerHole} coins</span>
          </div>
        </div>
        
        <Button
          onClick={() => onSelect(holeSet.id)}
          disabled={!holeSet.isActive || !canAfford}
          size="sm"
          className="ml-3"
        >
          {holeSet.isActive ? 'Open' : 'Soon'}
        </Button>
      </div>
    </Card>
  );
};

