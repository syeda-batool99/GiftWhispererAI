import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import ResultsPage from './components/ResultsPage';

function App() {
  const [view, setView] = useState('landing');
  const [recommendations, setRecommendations] = useState([]);
  const [note, setNote] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleStartQuiz = () => {
    setView('quiz');
  };

  const handleQuizComplete = async (answers, requestBundle) => {
    try {
      const response = await axios.post('/api/recommendations', { answers, requestBundle });
      setRecommendations(response.data.gifts);
      setNote(response.data.note);
      setView('results');
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleChatSubmit = async (newMessage) => {
    const updatedHistory = [...conversationHistory, { sender: 'user', text: newMessage }];
    setConversationHistory(updatedHistory);

    try {
      const response = await axios.post('/api/chat', { conversation: updatedHistory });
      setConversationHistory(response.data.conversation);
    } catch (error) {
      console.error('Error chatting with assistant:', error);
    }
  };

  return (
    <div className="App">
      {view === 'landing' && <LandingPage onStartQuiz={handleStartQuiz} />}
      {view === 'quiz' && <Quiz onQuizComplete={handleQuizComplete} />}
      {view === 'results' && (
        <ResultsPage
          recommendations={recommendations}
          note={note}
          conversationHistory={conversationHistory}
          onChatSubmit={handleChatSubmit}
        />
      )}
    </div>
  );
}

export default App;
