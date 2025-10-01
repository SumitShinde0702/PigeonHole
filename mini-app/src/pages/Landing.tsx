import React from 'react';
import { useNavigate } from 'react-router-dom';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { AppRoot, Button, Card, Title, Text } from '@telegram-apps/telegram-ui';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    const lp = retrieveLaunchParams();
    const tgUser = (lp as any)?.initDataUnsafe?.user;
    const username = tgUser?.username || tgUser?.first_name || 'Collector';
    
    localStorage.setItem('user', JSON.stringify({
      username,
      credits: 5,
    }));
    
    navigate('/dashboard');
  };

  return (
    <AppRoot appearance="dark" platform="base">
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Title level="1">PigeonHole</Title>
        <div style={{ height: 16 }} />
        <Text>Collect graded Pokemon cards</Text>
        <div style={{ height: 8 }} />
        <Text>Open packs, reveal PSA/BGS slabs, and build your collection</Text>
        <div style={{ height: 24 }} />
        
        <Button size="l" onClick={handleStart}>
          Start Collecting
        </Button>
        
        <div style={{ height: 32 }} />
        
        <Card>
          <Title level="2">Features</Title>
          <div style={{ height: 16 }} />
          <Text>• Graded Cards: Collect authenticated PSA & BGS graded Pokemon cards</Text>
          <div style={{ height: 8 }} />
          <Text>• Pigeon Coins: Earn and spend coins to unlock rare collectibles</Text>
          <div style={{ height: 8 }} />
          <Text>• Grail Cards: Hunt for PSA 10 Gem Mints and BGS 10 Black Labels</Text>
        </Card>
      </div>
    </AppRoot>
  );
};