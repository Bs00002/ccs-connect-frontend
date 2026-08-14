// material-ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LogoIcon from './LogoIcon';

// ==============================|| CHITRA CROP SCIENCE LOGO MAIN ||============================== //

export default function LogoMain() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <LogoIcon />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 900,
            fontSize: '1.2rem',
            lineHeight: 1,
            background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1.5px',
            fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
            textTransform: 'uppercase'
          }}
        >
          CHITRA
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            color: '#1A237E',
            fontSize: '0.68rem',
            lineHeight: 1.2,
            letterSpacing: '0.8px',
            fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif'
          }}
        >
          Crop Science
        </Typography>
      </Box>
    </Box>
  );
}

