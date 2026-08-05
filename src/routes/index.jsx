import { createBrowserRouter } from 'react-router-dom';

// project imports
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

import WebsiteRoutes from './WebsiteRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([WebsiteRoutes, MainRoutes, LoginRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME });

export default router;
