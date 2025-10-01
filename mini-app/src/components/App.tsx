import { useMemo } from 'react';
import { Navigate, Route, Routes, HashRouter, NavLink } from 'react-router-dom';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { AppRoot, Tabbar } from '@telegram-apps/telegram-ui';

import { routes } from '@/navigation/routes.tsx';

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);

  return (
    <AppRoot
      appearance={'dark'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
      className="min-h-[100dvh]"
    >
      <HashRouter>
        <div
          className="mx-auto w-full max-w-[480px] md:max-w-[640px] px-3 pt-2 pb-20"
          style={{
            paddingTop: 'calc(env(safe-area-inset-top) + 8px)',
            paddingBottom: 'calc(env(safe-area-inset-bottom) + 64px)',
            paddingLeft: 'calc(env(safe-area-inset-left) + 12px)',
            paddingRight: 'calc(env(safe-area-inset-right) + 12px)'
          }}
        >
          <Routes>
            {routes.map((route) => <Route key={route.path} {...route} />)}
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40">
          <div className="mx-auto w-full max-w-[480px] md:max-w-[640px]">
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
        </div>
      </HashRouter>
    </AppRoot>
  );
}
