import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import QuizPage from './components/QuizPage';
import Loader from './components/Loader';
import ResultsPage from './components/ResultsPage';
import IntegrateStore from './components/IntegrateStore';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/Layout';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <GlobalStyle />
      <Layout openModal={() => setIsModalOpen(true)}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Layout>
      {isModalOpen && <IntegrateStore onClose={() => setIsModalOpen(false)} />}
    </Router>
  );
}

export default App;
