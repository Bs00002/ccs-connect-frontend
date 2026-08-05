import { Box, Container, Typography, Grid, Paper, Stack, Divider, Avatar } from '@mui/material';
import { AimOutlined, EyeOutlined, SafetyCertificateOutlined, CheckCircleFilled } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <Box sx={{ bgcolor: 'background.default', pb: 10 }}>
      <Helmet>
        <title>About Us | Chitra Crop Science</title>
        <meta name="description" content="Learn about Chitra Crop Science. Established by J Dan, we manufacture premium water-soluble fertilizers and agro-chemicals in Gujarat, India." />
      </Helmet>

      {/* Hero */}
      <Box sx={{ 
        bgcolor: 'primary.dark', 
        color: 'white', 
        py: { xs: 8, md: 12 }, 
        textAlign: 'center',
        backgroundImage: 'url(https://images.unsplash.com/photo-1586771107445-d3afcb8da0ce?auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(27, 94, 32, 0.85)',
        }
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>About Chitra Crop Science</Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9 }}>
            A legacy of excellence in crop science. We are dedicated to providing innovative, sustainable, and highly effective agricultural inputs to farmers nationwide.
          </Typography>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Container maxWidth="xl" sx={{ mt: -6, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, height: '100%', bgcolor: 'rgba(46, 125, 50, 0.05)', borderRadius: 4, border: '1px solid rgba(46, 125, 50, 0.1)' }}>
              <AimOutlined style={{ fontSize: '3rem', color: '#2e7d32', marginBottom: '16px' }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Our Mission</Typography>
              <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.8 }}>
                To provide high-quality, innovative, and sustainable crop protection solutions that empower farmers to increase their yield and profitability while preserving the environment for future generations.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={12} sx={{ p: 5, height: '100%', borderRadius: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 2, color: 'info.dark' }}><EyeOutlined style={{ fontSize: 32 }} /></Box>
                <Typography variant="h4" fontWeight="bold">Our Vision</Typography>
              </Stack>
              <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                To be the most trusted and innovative agricultural partner in India, recognized for uncompromising quality, scientific rigor, and a deep commitment to the prosperity of our farmers and distribution partners.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Story & Infrastructure */}
      <Container maxWidth="lg" sx={{ mt: 12 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="overline" color="primary" fontWeight="bold" fontSize="1rem">Our Journey</Typography>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mt: 1, mb: 3 }}>A Heritage of Growth</Typography>
            <Typography variant="body1" color="textSecondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Established in 2023 by Jethu Dan, Chitra Crop Science (CCS) was built with a singular goal: to solve the complex challenges faced by Indian farmers through modern scientific formulation.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Today, our state-of-the-art manufacturing facility in Gujarat produces high-efficacy formulations, distributed through our fast-growing network of dedicated dealers across India.
            </Typography>
            
            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h5" fontWeight="bold" gutterBottom>Manufacturing & Infrastructure</Typography>
            <Stack spacing={2} mt={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CheckCircleFilled style={{ color: '#2e7d32', fontSize: '20px' }} />
                <Typography variant="body1">Fully automated liquid & powder formulation plants</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <CheckCircleFilled style={{ color: '#2e7d32', fontSize: '20px' }} />
                <Typography variant="body1">NABL Accredited Quality Control Laboratories</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <CheckCircleFilled style={{ color: '#2e7d32', fontSize: '20px' }} />
                <Typography variant="body1">Modern warehouse network for next-day dispatch</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <img src="https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=800&q=80" alt="Factory" style={{ width: '100%', borderRadius: 16, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
              <img src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80" alt="Laboratory" style={{ width: '100%', borderRadius: 16, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Leadership */}
      <Box sx={{ bgcolor: 'white', py: 10, mt: 10 }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>Leadership</Typography>
          <Typography variant="h6" color="textSecondary" textAlign="center" sx={{ mb: 8, fontWeight: 400 }}>
            Guided by decades of industry expertise and a passion for Indian agriculture.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} textAlign="center">
              <Avatar src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80" sx={{ width: 120, height: 120, mx: 'auto', mb: 3 }} />
              <Typography variant="h5" fontWeight="bold">Jethu Dan (J Dan)</Typography>
              <Typography variant="subtitle1" color="primary.main" fontWeight="bold">Founder & Managing Director</Typography>
            </Grid>
            <Grid item xs={12} sm={6} textAlign="center">
              <Avatar src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80" sx={{ width: 120, height: 120, mx: 'auto', mb: 3 }} />
              <Typography variant="h5" fontWeight="bold">K Sharma</Typography>
              <Typography variant="subtitle1" color="primary.main" fontWeight="bold">Chief Executive Officer</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Quality Control */}
      <Box sx={{ bgcolor: '#f8fafc', py: 10 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <SafetyCertificateOutlined style={{ fontSize: 60, color: '#2e7d32', marginBottom: 20 }} />
          <Typography variant="h3" fontWeight="bold" gutterBottom>Uncompromising Quality</Typography>
          <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 400, lineHeight: 1.6 }}>
            Our ISO-certified laboratories conduct rigorous batch testing to ensure that every product meets international standards for efficacy, safety, and shelf-life. When you see the CCS logo, you are looking at guaranteed performance.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
