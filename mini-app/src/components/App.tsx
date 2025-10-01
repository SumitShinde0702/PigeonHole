import { useMemo } from 'react';
import { Navigate, Route, Routes, HashRouter, NavLink } from 'react-router-dom';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { AppRoot, Tabbar } from '@telegram-apps/telegram-ui';

import { routes } from '@/navigation/routes.tsx';

function AppContent() {
  
  return (
    <>
      <div style={{ paddingBottom: '60px' }}>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40 }}>
        <Tabbar>
          <NavLink to="/dashboard">
            {({ isActive }) => (
              <Tabbar.Item selected={isActive} text="Dashboard" />
            )}
          </NavLink>
          <NavLink to="/inventory">
            {({ isActive }) => (
              <Tabbar.Item selected={isActive} text="Inventory" />
            )}
          </NavLink>
          <NavLink to="/profile">
            {({ isActive }) => (
              <Tabbar.Item selected={isActive} text="Profile" />
            )}
          </NavLink>
        </Tabbar>
      </div>
    </>
  );
}

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);

  return (
    <AppRoot
      appearance="dark"
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppRoot>
  );
}
