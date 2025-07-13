import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import QuizPage from './components/QuizPage';
import Loader from './components/Loader';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/loader" element={<Loader />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
