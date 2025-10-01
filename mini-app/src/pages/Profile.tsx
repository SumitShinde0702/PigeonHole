import React from 'react';
import { AppRoot, Title, Text, Card } from '@telegram-apps/telegram-ui';

export const Profile: React.FC = () => {
  return (
    <AppRoot appearance="dark" platform="base">
      <div style={{ padding: '20px' }}>
        <Title level="2">Profile</Title>
        <div style={{ height: 16 }} />
        <Card>
          <Text>Account details and settings.</Text>
        </Card>
      </div>
    </AppRoot>
  );
};