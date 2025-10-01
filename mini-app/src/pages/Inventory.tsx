import React from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';

export const Inventory: React.FC = () => {
  return (
    <div className="py-4">
      <h1 className="text-lg font-semibold mb-2">Inventory</h1>
      <p className="text-sm text-muted-foreground">Your owned cards will appear here.</p>
    </div>
  );
};

export default Inventory;


