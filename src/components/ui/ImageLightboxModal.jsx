import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography, IconButton, Stack, Tooltip } from '@mui/material';
import { CloseOutlined, DownloadOutlined, ZoomInOutlined, ZoomOutOutlined, RotateRightOutlined } from '@ant-design/icons';

export default function ImageLightboxModal({ open, onClose, title, imageSrc, downloadName = 'receipt-image' }) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!open) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `${downloadName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'primary.main', color: 'white', py: 1.5, px: 2.5 }}>
        <Typography variant="h6" fontWeight={600}>{title || 'Image Preview'}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Zoom In">
            <IconButton onClick={handleZoomIn} sx={{ color: 'white' }} size="small"><ZoomInOutlined /></IconButton>
          </Tooltip>
          <Tooltip title="Zoom Out">
            <IconButton onClick={handleZoomOut} sx={{ color: 'white' }} size="small"><ZoomOutOutlined /></IconButton>
          </Tooltip>
          <Tooltip title="Rotate">
            <IconButton onClick={handleRotate} sx={{ color: 'white' }} size="small"><RotateRightOutlined /></IconButton>
          </Tooltip>
          <Tooltip title="Reset Zoom">
            <Button size="small" onClick={handleReset} sx={{ color: 'white', minWidth: 'auto', px: 1 }}>Reset</Button>
          </Tooltip>
          <IconButton onClick={onClose} sx={{ color: 'white' }} size="small"><CloseOutlined /></IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers sx={{ bgcolor: 'grey.900', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 450, overflow: 'hidden', p: 2 }}>
        {imageSrc ? (
          <Box
            component="img"
            src={imageSrc}
            alt={title}
            sx={{
              maxHeight: '70vh',
              maxWidth: '100%',
              objectFit: 'contain',
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transition: 'transform 0.2s ease-in-out',
              borderRadius: 1,
              boxShadow: 24
            }}
          />
        ) : (
          <Typography color="grey.400">No Image Available</Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: 'background.paper', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="textSecondary">
          Zoom: {Math.round(zoom * 100)}% | Rotation: {rotation}°
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={onClose}>Close</Button>
          <Button variant="contained" color="primary" startIcon={<DownloadOutlined />} onClick={handleDownload} disabled={!imageSrc}>
            Download Image
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
