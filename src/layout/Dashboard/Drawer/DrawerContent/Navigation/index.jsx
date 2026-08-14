// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import NavGroup from './NavGroup';
import adminMenu from 'menu-items/adminMenu';
import dealerMenu from 'menu-items/dealerMenu';
import distributorMenu from 'menu-items/distributorMenu';
import useAuth from 'hooks/useAuth';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const { user } = useAuth();
  
  const role = (user?.role || '').toLowerCase();
  const path = (window.location.pathname || '').toLowerCase();
  
  // Determine which menu to show based on user role or URL route
  let menuItems = adminMenu;
  
  if (role === 'dealer' || path.startsWith('/dealer')) {
    menuItems = dealerMenu;
  } else if (role === 'field' || role === 'distributor' || role === 'employee' || role === 'sales manager' || path.startsWith('/field')) {
    menuItems = distributorMenu;
  }

  const navGroups = menuItems.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" sx={{ color: 'error.main', textAlign: 'center' }}>
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}
