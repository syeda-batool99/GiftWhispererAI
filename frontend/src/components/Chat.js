import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';

const Chat = ({ conversation, onSendMessage, isThinking }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
      <Paper elevation={0} sx={{ height: '400px', overflowY: 'auto', p: 2, mb: 2 }}>
        {conversation &&
          conversation.map((entry, index) => (
            <Box
              key={index}
              sx={{
                textAlign: entry.sender === 'user' ? 'right' : 'left',
                mb: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: 'inline-block',
                  p: 1,
                  borderRadius: '10px',
                  backgroundColor: entry.sender === 'user' ? '#dcf8c6' : '#f1f1f1',
                }}
              >
                {entry.text}
              </Typography>
            </Box>
          ))}
      </Paper>
      <Box sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isThinking}
          onKeyPress={(e) => e.key === 'Enter' && !isThinking && handleSend()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={isThinking}
          sx={{ ml: 1 }}
        >
          {isThinking ? 'Thinking...' : 'Send'}
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;