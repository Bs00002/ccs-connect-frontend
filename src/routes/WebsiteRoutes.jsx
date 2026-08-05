import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';

// Render simple placeholder layouts since we just want a simple modern landing page
const WebsiteLayout = Loadable(lazy(() => import('pages/website/layout')));
const Home = Loadable(lazy(() => import('pages/website/home')));
const About = Loadable(lazy(() => import('pages/website/about')));
const Products = Loadable(lazy(() => import('pages/website/products')));
const Contact = Loadable(lazy(() => import('pages/website/contact')));
const Gallery = Loadable(lazy(() => import('pages/website/gallery')));
const Testimonials = Loadable(lazy(() => import('pages/website/testimonials')));
const Locator = Loadable(lazy(() => import('pages/website/locator')));

const WebsiteRoutes = {
  path: '/',
  element: <WebsiteLayout />,
  children: [
    { index: true, element: <Home /> },
    { path: 'about', element: <About /> },
    { path: 'products', element: <Products /> },
    { path: 'contact', element: <Contact /> },
    { path: 'gallery', element: <Gallery /> },
    { path: 'testimonials', element: <Testimonials /> },
    { path: 'locator', element: <Locator /> }
  ]
};

export default WebsiteRoutes;
