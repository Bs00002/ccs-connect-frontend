import PropTypes from 'prop-types';

// material-ui
import { Grid, Box, Typography, Divider } from '@mui/material';
import MainCard from 'components/MainCard';

// ==============================|| RESPONSIVE FORM CONTAINER ||============================== //

export default function FormContainer({ title, icon: Icon, children }) {
  return (
    <MainCard content={false}>
      <Box sx={{ p: 3 }}>
        {title && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              {Icon && <Icon style={{ fontSize: '1.25rem' }} />}
              <Typography variant="h5">{title}</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
          </>
        )}
        <Grid container spacing={3}>
          {children}
        </Grid>
      </Box>
    </MainCard>
  );
}

FormContainer.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.elementType,
  children: PropTypes.node
};

// Usage: Children should be <Grid item xs={12} md={6}> to achieve 2 columns on desktop
