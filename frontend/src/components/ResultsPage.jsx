import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { getGiftRecommendations } from '../services/api';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const ResultsPageContainer = styled.div`
  background-color: #F7EBE2;
  flex: 1;
  font-family: 'Winky Rough', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
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

const ResultsContent = styled.div`
  max-width: 1200px;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 3rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const GiftCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const GiftCard = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  width: calc(33.333% - 1.5rem);
  box-sizing: border-box;
`;

const GiftImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: #F7EBE2;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-family: 'Winky Rough', sans-serif;
`;

const SaveButton = styled(Button)`
  background-color: #E6BDBA;
  color: white;
  border: none;
`;

const BackButtonContainer = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 1rem;
`;

const BackButton = styled(Button)``;

const NoMatchContainer = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  text-align: center;
`;

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendations, noMatch, imageAnalysis } = location.state || { recommendations: [], noMatch: false, imageAnalysis: null };
  const [loading, setLoading] = useState(false);

  const confettiColors = ['#E6BDBA', '#6B9A99', '#F7EBE2', '#333'];
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 4 + 4,
  }));

  const handleGeneralSearch = () => {
    navigate('/quiz', { state: { answers: location.state.answers } });
  };

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loader
  }

  return (
    <ResultsPageContainer>
      <ConfettiContainer>
        {confettiPieces.map(p => (
          <Confetti key={p.id} {...p} />
        ))}
      </ConfettiContainer>
      <ResultsContent>
        <BackButtonContainer>
          <BackButton onClick={() => navigate('/quiz')}>Back to Quiz</BackButton>
        </BackButtonContainer>
        <Title>Here are {recommendations.length} thoughtful gift ideas for your loved one!</Title>
        {noMatch && (
          <NoMatchContainer>
            <p>We couldn't find a suitable match from the provided store. Would you like to get some general gift ideas?</p>
            <Button onClick={handleGeneralSearch}>Yes, get general ideas</Button>
          </NoMatchContainer>
        )}
        {imageAnalysis && (
          <div>
            <h3>Based on the photo, we think...</h3>
            <p>{imageAnalysis.analysis}</p>
          </div>
        )}
        <GiftCardContainer>
          {recommendations.map((gift, index) => (
            <GiftCard key={index}>
              <GiftImage src={gift.image} alt={gift.name} />
              <CardTitle>{gift.name}</CardTitle>
              <CardText>{gift.description}</CardText>
              <ButtonContainer>
                <Button as="a" href={gift.link} target="_blank" rel="noopener noreferrer">See more</Button>
                <SaveButton>Save</SaveButton>
              </ButtonContainer>
            </GiftCard>
          ))}
        </GiftCardContainer>
      </ResultsContent>
    </ResultsPageContainer>
  );
};

export default ResultsPage;