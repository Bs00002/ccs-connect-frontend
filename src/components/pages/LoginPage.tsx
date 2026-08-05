import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, InputAdornment, IconButton, Alert, CircularProgress, Link as MuiLink } from '@mui/material';
import { LockOutlined, EyeOutlined, EyeInvisibleOutlined, PhoneOutlined } from '@ant-design/icons';
// @ts-ignore
import api from '../../api/client';
// @ts-ignore
import useAuth from '../../hooks/useAuth';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/login/', {
        email_or_username: identifier,
        password: password
      });
      const { user, access_token } = response.data;
      login(user, access_token);
      
      const role = user?.role;
      if (role === 'Super Admin' || role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (role === 'Distributor' || role === 'Employee' || role === 'Sales Manager') {
        navigate('/field/dashboard');
      } else {
        navigate('/dealer/dashboard');
      }
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      {/* Left side - Agro Image */}
      <Box sx={{
        width: { xs: '100%', md: '50%' },
        backgroundImage: 'url(https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1200&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, right: 0, bottom: 0, left: 0,
          backgroundColor: 'rgba(46, 125, 50, 0.7)',
          zIndex: 1
        }
      }}>
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white', px: 4 }}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>CCS Partners</Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>Empowering Agriculture, Together.</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>10k+</Typography>
              <Typography variant="body2">Happy Farmers</Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>500+</Typography>
              <Typography variant="body2">Dealers Network</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right side - Form */}
      <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 4 }}>
        <Paper elevation={24} sx={{ p: 5, width: '100%', maxWidth: 450, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <img src="/logo.png" alt="CCS Logo" style={{ height: 60, marginBottom: 16 }} onError={(e: any) => (e.currentTarget.style.display = 'none')} />
            <Typography variant="h4" color="textPrimary" gutterBottom sx={{ fontWeight: 'bold' }}>Welcome Back</Typography>
            <Typography variant="body1" color="textSecondary">Sign in to your CCS Connect account</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Mobile Number"
              variant="outlined"
              margin="normal"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><PhoneOutlined /></InputAdornment>
                }
              }}
              required
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><LockOutlined /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
              required
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 3 }}>
              <MuiLink component={Link} to="/forgot-password" variant="body2" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Forgot Password / OTP Login
              </MuiLink>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ py: 1.5, mb: 3, fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}
