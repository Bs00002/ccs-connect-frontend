// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMemo } from 'react';
import useAuth from 'hooks/useAuth';

// project import
import NavGroup from './NavGroup';
import adminMenu from 'menu-items/adminMenu';
import distributorMenu from 'menu-items/distributorMenu';
import dealerMenu from 'menu-items/dealerMenu';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const { user } = useAuth();
  const role = user?.role || 'Dealer';

  const navGroups = useMemo(() => {
    let menuToRender = dealerMenu; // default to Dealer

    if (role === 'Super Admin' || role === 'Admin') {
      menuToRender = adminMenu;
    } else if (role === 'Distributor' || role === 'Employee' || role === 'Sales Manager') {
      menuToRender = distributorMenu;
    } else if (role === 'Dealer') {
      menuToRender = dealerMenu;
    }

    return menuToRender.items.map((item) => {
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
  }, [role]);

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}
