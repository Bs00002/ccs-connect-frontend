// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';

// project imports
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import useAuth from 'hooks/useAuth';

// assets
import { MessageOutlined, PlusOutlined } from '@ant-design/icons';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { user } = useAuth();
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const currentDate = format(new Date(), 'EEEE, dd MMMM yyyy');

  const role = (user?.role || '').toLowerCase();
  const isDealer = role === 'dealer' || (window.location.pathname || '').toLowerCase().startsWith('/dealer');

  return (
    <>
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      
      <Box sx={{ flexGrow: 1 }} />

      {/* Date */}
      {!downLG && (
        <Typography variant="body2" color="textSecondary" sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          {currentDate}
        </Typography>
      )}

      {/* Quick Create Button (Hidden for Dealers) */}
      {!downLG && !isDealer && (
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<PlusOutlined />}
          size="small"
          sx={{ mr: 2, boxShadow: 'none' }}
        >
          Create New
        </Button>
      )}

      {/* Messages */}
      <IconButton
        disableRipple
        color="secondary"
        title="Messages"
        sx={{ color: 'text.primary', bgcolor: 'grey.100', mr: 1.5 }}
      >
        <MessageOutlined />
      </IconButton>

      <Notification />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
