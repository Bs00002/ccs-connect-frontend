import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// project imports
import router from 'routes';
import ThemeCustomization from 'themes';
import { AuthProvider } from 'contexts/AuthContext';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <HelmetProvider>
      <ThemeCustomization>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeCustomization>
    </HelmetProvider>
  );
}
