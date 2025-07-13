import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const QuizPageContainer = styled.div`
  background-color: #F7EBE2;
  flex: 1;
  font-family: 'Winky Rough', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background: #6B9A99;
    clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 100%);
    opacity: 0.3;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: #E6BDBA;
    clip-path: polygon(0 100%, 100% 100%, 0 0);
    opacity: 0.3;
  }
`;

const ConfettiContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const Confetti = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${props => props.color};
  border-radius: 50%;
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
`;

const QuizForm = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const QuestionCounter = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

const PillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Pill = styled.div`
  background-color: ${props => props.selected ? '#6B9A99' : '#F7EBE2'};
  color: ${props => props.selected ? 'white' : '#333'};
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-family: 'Winky Rough', sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  background-color: #E6BDBA;
  color: #333;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  font-family: 'Winky Rough', sans-serif;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #d4a9a7;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #6B9A99;

  &:hover {
    background-color: #5a8a89;
  }
`;

const questions = [
    { id: 1, text: "For what occasion?", type: 'single', options: ['Birthday', 'Anniversary', 'Engagement', 'New Baby', 'Housewarming', 'Graduation', 'Retirement'] },
    { id: 2, text: "Your Relationship", type: 'single', options: ['Parent', 'Friend', 'Colleague', 'Spouse', 'Sibling'] },
    { id: 3, text: "What is their gender?", type: 'single', options: ['Male', 'Female'] },
    { id: 4, text: "How would you describe their personality? (Select up to 3 tags)", type: 'multi', options: ['Creative', 'Practical', 'Funny', 'Thoughtful', 'Outgoing', 'Quiet', 'Adventurous', 'Sentimental'] },
    { id: 5, text: "How do they usually spend their free time?", type: 'single', options: ['Reading or watching shows', 'Traveling and exploring', 'Creating (art, music, crafts)', 'Playing video games or tech stuff', 'Hanging out with friends', 'Relaxing solo at home'] },
    { id: 6, text: "What’s their communication style like?", type: 'single', options: ['Very expressive and chatty', 'Warm but reserved', 'Mostly quiet and observant', 'Deep and thoughtful'] },
    { id: 7, text: "What makes them smile the most?", type: 'single', options: ['Surprises', 'Inside jokes', 'Thoughtful gestures', 'Tech or gadgets', 'A beautiful book, piece of art, or quote'] },
    { id: 8, text: "How do they feel about gifts?", type: 'single', options: ['They love practical stuff they’ll use', 'They like personalized or handmade gifts', 'They enjoy fun or novelty items', 'They appreciate luxury or premium gifts'] },
    { id: 9, text: "If they had a free weekend, what would they most likely do?", type: 'single', options: ['Explore a new city', 'Stay home and binge a show', 'Work on a personal project', 'Visit friends or family', 'Go on a nature walk or hike'] },
    { id: 10, text: "What’s their aesthetic or vibe?", type: 'single', options: ['Minimalist', 'Cozy', 'Bright and fun', 'Natural/earthy', 'Sleek and modern'] },
    { id: 11, text: "If they were a color, what would they be?", type: 'single', options: ['Warm beige', 'Bold red', 'Ocean blue', 'Sunset orange', 'Forest green', 'Soft lavender'] },
    { id: 12, text: "How long have you known them?", type: 'text' },
    { id: 13, text: "Any additional information?", type: 'text' }
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const confettiColors = ['#E6BDBA', '#6B9A99', '#F7EBE2', '#333'];
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 4 + 4,
  }));

  const handleSingleSelect = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleMultiSelect = (questionId, option) => {
    setAnswers(prev => {
      const existing = prev[questionId] || [];
      if (existing.includes(option)) {
        return { ...prev, [questionId]: existing.filter(item => item !== option) };
      }
      if (existing.length < 3) {
        return { ...prev, [questionId]: [...existing, option] };
      }
      return prev;
    });
  };

  const handleTextChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = () => {
    navigate('/loader', { state: { answers } });
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = answers[currentQuestion.id] && (currentQuestion.type !== 'multi' || answers[currentQuestion.id].length > 0);

  return (
    <QuizPageContainer>
      <ConfettiContainer>
        {confettiPieces.map(p => (
          <Confetti key={p.id} {...p} />
        ))}
      </ConfettiContainer>
      <QuizForm>
        <Title>Tell us about them!</Title>
        <QuestionCounter>Question {currentQuestionIndex + 1} of {questions.length}</QuestionCounter>
        <Section>
          <SectionTitle>{currentQuestion.text}</SectionTitle>
          {currentQuestion.type === 'text' ? (
            <textarea onChange={(e) => handleTextChange(currentQuestion.id, e.target.value)} />
          ) : (
            <PillContainer>
              {currentQuestion.options.map(opt => (
                <Pill 
                  key={opt} 
                  selected={currentQuestion.type === 'multi' ? answers[currentQuestion.id]?.includes(opt) : answers[currentQuestion.id] === opt}
                  onClick={() => currentQuestion.type === 'multi' ? handleMultiSelect(currentQuestion.id, opt) : handleSingleSelect(currentQuestion.id, opt)}
                >
                  {opt}
                </Pill>
              ))}
            </PillContainer>
          )}
        </Section>
        <ButtonContainer>
          <Button onClick={handleBack}>Back</Button>
          {currentQuestionIndex < questions.length - 1 ? (
            <Button onClick={handleNext} disabled={!isAnswered}>Next</Button>
          ) : (
            <SubmitButton onClick={handleSubmit} disabled={!isAnswered}>Get my gift ideas</SubmitButton>
          )}
        </ButtonContainer>
      </QuizForm>
    </QuizPageContainer>
  );
};

export default QuizPage;