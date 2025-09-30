import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles, Filter } from 'lucide-react';
import { RevealedCard } from '@/components/card-reveal';

interface User {
  username: string;
  email: string;
  credits: number;
}

export const Collection: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [collection, setCollection] = useState<RevealedCard[]>([]);
  const [filter, setFilter] = useState<'all' | 'common' | 'rare' | 'epic' | 'legendary'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/');
    }

    // Load collection
    const savedCollection = localStorage.getItem('collection');
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection));
    }
  }, [navigate]);

  const filteredCollection = collection.filter(card => 
    filter === 'all' || card.rarity === filter
  );

  const rarityConfig: Record<string, { color: string; border: string }> = {
    common: {
      color: 'bg-gray-500/20 text-gray-400',
      border: 'border-gray-500/30'
    },
    rare: {
      color: 'bg-blue-500/20 text-blue-400',
      border: 'border-blue-500/30'
    },
    epic: {
      color: 'bg-purple-500/20 text-purple-400',
      border: 'border-purple-500/30'
    },
    legendary: {
      color: 'bg-yellow-500/20 text-yellow-400 animate-glow',
      border: 'border-yellow-500/30'
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pb-20">
      <Navbar 
        credits={user.credits}
        username={user.username}
      />

      <main className="pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <div>
              <h1 className="text-3xl font-bold text-gradient-primary">
                My Collection
              </h1>
              <p className="text-muted-foreground">
                {collection.length} cards collected
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="arcade-button"
            >
              <Filter className="w-4 h-4 mr-2" />
              All ({collection.length})
            </Button>
            <Button
              variant={filter === 'common' ? 'default' : 'outline'}
              onClick={() => setFilter('common')}
              className="arcade-button"
            >
              Common ({collection.filter(c => c.rarity === 'common').length})
            </Button>
            <Button
              variant={filter === 'rare' ? 'default' : 'outline'}
              onClick={() => setFilter('rare')}
              className="arcade-button"
            >
              Rare ({collection.filter(c => c.rarity === 'rare').length})
            </Button>
            <Button
              variant={filter === 'epic' ? 'default' : 'outline'}
              onClick={() => setFilter('epic')}
              className="arcade-button"
            >
              Epic ({collection.filter(c => c.rarity === 'epic').length})
            </Button>
            <Button
              variant={filter === 'legendary' ? 'default' : 'outline'}
              onClick={() => setFilter('legendary')}
              className="arcade-button"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Gem Mint ({collection.filter(c => c.rarity === 'legendary').length})
            </Button>
          </div>

          {/* Collection Grid */}
          {filteredCollection.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCollection.map((card) => {
                const config = rarityConfig[card.rarity];
                
                return (
                  <Card 
                    key={card.id}
                    className={`
                      p-4 hover-lift bg-card/50 transition-all duration-300
                      ${config.border} hover:${config.border.replace('/20', '/50')}
                    `}
                  >
                    {/* Card Image */}
                    <div className={`
                      aspect-square rounded-lg mb-3 border-2 ${config.border}
                      bg-gradient-to-br from-primary/20 to-accent/20
                      flex items-center justify-center overflow-hidden
                    `}>
                      <img 
                        src={card.image || '/placeholder.svg'}
                        alt={card.name}
                        className="w-full h-full object-cover pixel-art"
                      />
                    </div>

                    {/* Card Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate">{card.name}</h3>
                        <Badge className={config.color}>
                          {card.rarity === 'legendary' ? 'PSA 10' : card.rarity}
                          {card.rarity === 'legendary' && <Sparkles className="w-3 h-3 ml-1" />}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {card.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-6xl">🕳️</div>
                <h3 className="text-xl font-semibold text-muted-foreground">
                  {filter === 'all' ? 'No cards yet!' : `No ${filter} cards found`}
                </h3>
                <p className="text-muted-foreground">
                  {filter === 'all'
                    ? 'Start opening holes to build your graded Pokemon card collection!'
                    : `Try opening more holes to find ${filter === 'legendary' ? 'Gem Mint' : filter} graded cards, or check other grades.`
                  }
                </p>
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-primary hover:bg-primary/90 arcade-button"
                >
                  Start Collecting
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};