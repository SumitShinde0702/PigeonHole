import React from 'react';
import { Card } from '@/pigeonhole/components/ui/card';
// import { Badge } from '@/pigeonhole/components/ui/badge';
import { DollarSign, Star, Zap, Crown } from 'lucide-react';

interface PullRatesProps {
  theme: string;
}

const pullRates = {
  common: {
    rate: '70%',
    color: 'text-gray-400',
    bg: 'bg-gray-500/20',
    border: 'border-gray-500/50',
    icon: Star,
    valueRange: '$18-$45',
    label: 'PSA 6-7 / BGS 6-7'
  },
  rare: {
    rate: '20%',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/50',
    icon: Zap,
    valueRange: '$180-$320',
    label: 'PSA 8-9 / BGS 8-9'
  },
  epic: {
    rate: '8%',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/50',
    icon: Crown,
    valueRange: '$1,100-$3,200',
    label: 'PSA 9.5-10 / BGS 9.5'
  },
  legendary: {
    rate: '2%',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/50',
    icon: Crown,
    valueRange: '$5,500-$15,000',
    label: 'BGS 10 Black Label / PSA 10 Pristine'
  }
};

export const PullRates: React.FC<PullRatesProps> = ({ theme: _theme }) => {
  return (
    <Card className="p-6 bg-card/50 border-border">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-primary" />
        Grade Distribution & Values
      </h3>
      
      <div className="space-y-3">
        {Object.entries(pullRates).map(([rarity, config]) => {
          const Icon = config.icon;
          return (
            <div key={rarity} className={`
              flex items-center justify-between p-3 rounded-lg border
              ${config.bg} ${config.border}
            `}>
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${config.color}`} />
                <div>
                  <div className={`font-semibold ${config.color}`}>
                    {config.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {config.valueRange}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`font-bold ${config.color}`}>
                  {config.rate}
                </div>
                <div className="text-xs text-muted-foreground">
                  chance
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <div className="text-sm text-muted-foreground text-center">
          <div className="font-semibold mb-1">Expected Value per Hole</div>
          <div className="text-lg font-bold text-primary">~$150-400</div>
          <div className="text-xs mt-1">
            Based on Pokemon TCG graded card market prices
          </div>
        </div>
      </div>
    </Card>
  );
};

