import { Box, Container, Typography, Grid, Paper, Tabs, Tab, Modal, IconButton } from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const galleryCategories = ['All', 'Factory', 'Products', 'Warehouse', 'Farmer Meetings', 'Exhibitions', 'Team'];

const galleryItems = [
  { id: 1, category: 'Factory', title: 'Automated Formulation Plant', img: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800' },
  { id: 2, category: 'Factory', title: 'Quality Control Lab', img: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800' },
  { id: 3, category: 'Products', title: 'Water-Soluble Fertilizers Range', img: 'https://images.unsplash.com/photo-1627920769840-69237691656b?w=800' },
  { id: 4, category: 'Products', title: 'Crop Protection Solutions', img: 'https://images.unsplash.com/photo-1586771107445-d3afcb8da0ce?w=800' },
  { id: 5, category: 'Warehouse', title: 'Gujarat Distribution Hub', img: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663be?w=800' },
  { id: 6, category: 'Warehouse', title: 'Logistics and Loading', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800' },
  { id: 7, category: 'Farmer Meetings', title: 'Village Agronomy Workshop', img: 'https://images.unsplash.com/photo-1592982537447-6f23f81eb5d5?w=800' },
  { id: 8, category: 'Farmer Meetings', title: 'Crop Seminar in Gujarat', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800' },
  { id: 9, category: 'Exhibitions', title: 'Kisan Agri Expo 2024', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800' },
  { id: 10, category: 'Team', title: 'Annual Sales Meet', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800' },
];

export default function Gallery() {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = tabIndex === 0 
    ? galleryItems 
    : galleryItems.filter(item => item.category === galleryCategories[tabIndex]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
      <Helmet>
        <title>Media Gallery | Chitra Crop Science</title>
        <meta name="description" content="View our state-of-the-art facilities, product lineup, and on-ground farmer outreach programs across India." />
      </Helmet>

      {/* Header */}
      <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" gutterBottom>Media Gallery</Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9 }}>
            A glimpse into our state-of-the-art facilities, product lineup, and on-ground farmer outreach programs.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: -4 }}>
        <Paper elevation={12} sx={{ borderRadius: 4, mb: 6, bgcolor: 'background.paper' }}>
          <Tabs 
            value={tabIndex} 
            onChange={(e, val) => setTabIndex(val)} 
            variant="scrollable" 
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider', px: 2, '& .MuiTab-root': { fontWeight: 'bold', fontSize: '1rem', py: 2.5 } }}
          >
            {galleryCategories.map((cat, i) => (
              <Tab key={i} label={cat} />
            ))}
          </Tabs>
        </Paper>

        <Grid container spacing={3}>
          {filteredItems.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box 
                sx={{ 
                  position: 'relative', 
                  borderRadius: 3, 
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: '4/3',
                  '&:hover img': { transform: 'scale(1.05)' },
                  '&:hover .overlay': { opacity: 1 }
                }}
                onClick={() => setSelectedImage(item)}
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                />
                <Box className="overlay" sx={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, p: 3,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  opacity: 0, transition: 'opacity 0.3s', color: 'white'
                }}>
                  <Typography variant="body2" fontWeight="bold" color="primary.light">{item.category}</Typography>
                  <Typography variant="h6" fontWeight="bold">{item.title}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Lightbox Modal */}
      <Modal open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0,0,0,0.9)' }}>
        <Box sx={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}>
          <IconButton sx={{ position: 'absolute', top: -50, right: -10, color: 'white' }} onClick={() => setSelectedImage(null)}>
            <CloseOutlined style={{ fontSize: 30 }} />
          </IconButton>
          {selectedImage && (
            <>
              <img src={selectedImage.img} alt={selectedImage.title} style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 8 }} />
              <Typography variant="h5" color="white" mt={2} textAlign="center">{selectedImage.title}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
