import { useMemo } from 'react';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { retrieveLaunchParams, useSignal, isMiniAppDark } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { routes } from '@/navigation/routes.tsx';

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  const isDark = useSignal(isMiniAppDark);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
      className="min-h-[100dvh]"
    >
      <div
        className="mx-auto w-full max-w-[480px] md:max-w-[640px] px-3 py-2"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top) + 8px)',
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)',
          paddingLeft: 'calc(env(safe-area-inset-left) + 12px)',
          paddingRight: 'calc(env(safe-area-inset-right) + 12px)'
        }}
      >
        <HashRouter>
          <Routes>
            {routes.map((route) => <Route key={route.path} {...route} />)}
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
        </HashRouter>
      </div>
    </AppRoot>
  );
}
