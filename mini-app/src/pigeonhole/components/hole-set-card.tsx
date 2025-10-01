import React from 'react';
import { Card } from '@/pigeonhole/components/ui/card';
import { Button } from '@/pigeonhole/components/ui/button';
import { Badge } from '@/pigeonhole/components/ui/badge';
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
  const canAfford = userCredits >= holeSet.costPerHole;


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

