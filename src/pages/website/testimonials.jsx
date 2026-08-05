import { Box, Container, Typography, Grid, Paper, Avatar, Rating } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const testimonials = [
  {
    name: 'Ramesh Patel',
    role: 'Distributor, Gujarat',
    rating: 5,
    text: 'Partnering with Chitra Crop Science was the best decision for my business. Their water-soluble fertilizers are in extremely high demand, and the margins are highly transparent. Best ERP support as well!',
    img: 'https://images.unsplash.com/photo-1555964821-657c913ee861?w=200'
  },
  {
    name: 'Suresh Kumar',
    role: 'Farmer, Punjab',
    rating: 5,
    text: 'Since I started using Chitra MEG Magnesium Sulphate, my yield has increased significantly. The plants look healthier, and the crops are disease-free. Very high-quality products.',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200'
  },
  {
    name: 'Anita Desai',
    role: 'Dealer, Maharashtra',
    rating: 4.5,
    text: 'The dispatch and delivery are extremely fast. The team at CCS is very supportive and helps with local agronomy camps which drives our sales up. Highly recommended!',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200'
  },
  {
    name: 'Govind Singh',
    role: 'Farmer, Haryana',
    rating: 5,
    text: 'Kill 71 is the most effective herbicide I have used. Clears the field entirely and gives my actual crop the space it needs to grow. Will buy again next season.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
  }
];

export default function Testimonials() {
  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
      <Helmet>
        <title>Testimonials | Chitra Crop Science</title>
        <meta name="description" content="Hear from the farmers and distributors who trust Chitra Crop Science every day." />
      </Helmet>

      {/* Header */}
      <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" gutterBottom>What Our Partners Say</Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9 }}>
            Don't just take our word for it. Hear from the farmers and distributors who trust Chitra Crop Science every day.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Grid container spacing={4}>
          {testimonials.map((t, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Paper elevation={0} sx={{ p: 5, borderRadius: 4, height: '100%', border: '1px solid rgba(0,0,0,0.05)', transition: '0.3s', '&:hover': { boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', transform: 'translateY(-5px)' } }}>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 3 }}>
                  <Avatar src={t.img} sx={{ width: 80, height: 80 }} />
                  <Box>
                    <Typography variant="h5" fontWeight="bold">{t.name}</Typography>
                    <Typography variant="subtitle1" color="primary.main" fontWeight="bold">{t.role}</Typography>
                    <Rating value={t.rating} precision={0.5} readOnly sx={{ mt: 0.5 }} />
                  </Box>
                </Box>
                <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8, fontStyle: 'italic' }}>
                  "{t.text}"
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
