import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  Switch,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { CardGiftcard } from '@mui/icons-material';

const LandingPage = ({ onStartQuiz }) => {
  const [diyGifts, setDiyGifts] = useState(false);
  const [giftBundles, setGiftBundles] = useState(false);

  const handleStartQuiz = () => {
    onStartQuiz({ diyGifts, giftBundles });
  };

  return (
    <Box sx={{ backgroundColor: '#F0F4F8', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4 }}>
        <Toolbar>
          <CardGiftcard sx={{ mr: 1, color: '#E57373' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#333' }}>
            GiftWhisperer AI
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Struggling to find the perfect gift? Let AI handle it.
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Answer a few quick questions and get beautifully tailored gift ideas.
            </Typography>
            <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <FormControlLabel
                control={<Switch checked={diyGifts} onChange={(e) => setDiyGifts(e.target.checked)} />}
                label="I prefer DIY gifts"
              />
              <FormControlLabel
                control={<Switch checked={giftBundles} onChange={(e) => setGiftBundles(e.target.checked)} />}
                label="Suggest gift bundles"
              />
            </Box>
            <Button variant="contained" size="large" onClick={handleStartQuiz} sx={{ backgroundColor: '#66BB6A', '&:hover': { backgroundColor: '#4CAF50' } }}>
              Start Now
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://storage.googleapis.com/gemini-generative-ai-api-ref-files/images/2024-05-22/3a7cf2d3-a2e3-4b6c-939a-81c4181c61d1.png"
              alt="Gift illustration"
              sx={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                borderRadius: '16px',
                display: 'block',
                mx: 'auto'
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;