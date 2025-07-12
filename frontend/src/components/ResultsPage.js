import React from 'react';
import Chat from './Chat';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';

const ResultsPage = ({ recommendations, note, conversationHistory, onChatSubmit }) => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Gift Recommendations
      </Typography>
      {note && (
        <Typography variant="body1" align="center" sx={{ mb: 4, fontStyle: 'italic' }}>
          {note}
        </Typography>
      )}
      <Grid container spacing={4}>
        {recommendations &&
          recommendations.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Chat conversation={conversationHistory} onSendMessage={onChatSubmit} />
    </Container>
  );
};

export default ResultsPage;