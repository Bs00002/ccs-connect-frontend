// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between', p: '24px 16px 24px', mt: 'auto' }}
    >
      <Typography variant="caption">
        &copy; 2026 CCS Connect ERP
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        Powered by Chitra Crop Science Pvt. Ltd.
      </Typography>
    </Stack>
  );
}
