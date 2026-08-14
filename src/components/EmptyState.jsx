import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// assets
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';

// ==============================|| EMPTY STATE ||============================== //

export default function EmptyState({ title, description, icon: Icon, actionTitle, onAction }) {
  const DisplayIcon = Icon || InboxOutlined;

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <DisplayIcon style={{ fontSize: '4rem', color: '#bfbfbf', marginBottom: '16px' }} />
      <Typography variant="h5" color="textPrimary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3, maxWidth: 400 }}>
        {description}
      </Typography>
      {actionTitle && onAction && (
        <Button variant="contained" color="primary" startIcon={<PlusOutlined />} onClick={onAction}>
          {actionTitle}
        </Button>
      )}
    </Box>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.elementType,
  actionTitle: PropTypes.string,
  onAction: PropTypes.func
};
