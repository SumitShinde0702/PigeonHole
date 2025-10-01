import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { AppRoot, Card, Title, Text, Badge } from '@telegram-apps/telegram-ui';

interface User {
  username: string;
  credits: number;
}

interface PokemonSet {
  id: string;
  name: string;
  year: string;
  description: string;
  totalCards: number;
  costPerPack: number;
  isActive: boolean;
}

const mockSets: PokemonSet[] = [
  {
    id: 'base-set',
    name: 'Base Set',
    year: '1999',
    description: 'The original 102 cards featuring Charizard, Blastoise, and Venusaur',
    totalCards: 102,
    costPerPack: 1,
    isActive: true
  },
  {
    id: 'jungle',
    name: 'Jungle',
    year: '1999',
    description: '64 cards including Scyther, Vaporeon, and Wigglytuff',
    totalCards: 64,
    costPerPack: 1,
    isActive: true
  },
  {
    id: 'fossil',
    name: 'Fossil',
    year: '1999',
    description: '62 cards featuring Aerodactyl, Kabutops, and legendary birds',
    totalCards: 62,
    costPerPack: 1,
    isActive: true
  }
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [collection, setCollection] = useState<any[]>([]);

  useEffect(() => {
    // Initialize user from Telegram or localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Create user from Telegram data
      const lp = retrieveLaunchParams();
      const tgUser = (lp as any)?.initDataUnsafe?.user;
      const username = tgUser?.username || tgUser?.first_name || 'Collector';
      const newUser = { username, credits: 5 };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    }

    // Load collection
    const savedCollection = localStorage.getItem('collection');
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection));
    }
  }, []);

  const handleSetSelect = (setId: string) => {
    navigate(`/set/${setId}`);
  };

  if (!user) {
    return (
      <AppRoot appearance="dark" platform="base">
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Text>Loading...</Text>
        </div>
      </AppRoot>
    );
  }

  return (
    <AppRoot appearance="dark" platform="base">
      <div style={{ padding: '20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <Title level="2">Welcome back, {user.username}!</Title>
            <Text>Choose a Pokemon set to start collecting</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Badge type="number">{user.credits}</Badge>
            <Text>coins</Text>
          </div>
        </div>

        {/* Pokemon Sets */}
        <div style={{ marginBottom: '24px' }}>
          {mockSets.map((set) => (
            <Card key={set.id} style={{ marginBottom: '12px', cursor: 'pointer' }} onClick={() => handleSetSelect(set.id)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Title level="3">{set.name}</Title>
                    <Badge type="number">{Number(set.year)}</Badge>
                  </div>
                  <Text>{set.description}</Text>
                  <div style={{ height: 8 }} />
                  <Text>{set.totalCards} cards • {set.costPerPack} coin per pack</Text>
                </div>
                <Text>→</Text>
              </div>
            </Card>
          ))}
        </div>

        {/* Collection Stats */}
        <Card>
          <Title level="3">Your Collection</Title>
          <div style={{ height: 12 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>Total Cards</Text>
            <Text>{collection.length}</Text>
          </div>
          <div style={{ height: 8 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>Sets Completed</Text>
            <Text>0</Text>
          </div>
        </Card>
      </div>
    </AppRoot>
  );
};