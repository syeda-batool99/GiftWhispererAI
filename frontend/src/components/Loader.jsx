import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import giftImage from '../assets/gift.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoaderContainer = styled.div`
  background-color: #F7EBE2;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  font-family: 'Winky Rough', sans-serif;

  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: #E6BDBA;
    opacity: 0.2;
  }

  &::before {
    width: 800px;
    height: 800px;
    top: -400px;
    left: -200px;
  }

  &::after {
    width: 600px;
    height: 600px;
    bottom: -300px;
    right: -200px;
  }
`;

const ContentBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  position: relative;
  z-index: 2;
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GiftImage = styled.img`
  width: 150px;
  margin-bottom: 2rem;
`;

const LoadingTextContainer = styled.div`
  height: 30px; /* Reserve space for the text */
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin: 0.5rem 0;
  opacity: 0;
  animation: ${fadeIn} 1.5s ease-in-out forwards;
  animation-delay: ${props => props.delay}s;
`;

const Loader = () => {
  const loadingMessages = [
    "Whispering to the gifting gods...",
    "Checking what makes them smile...",
    "Handpicking joy..."
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  return (
    <LoaderContainer>
      <ContentBox>
        <GiftImage src={giftImage} alt="Gift Box" />
        <LoadingTextContainer>
          {loadingMessages.map((msg, index) => (
            <LoadingText key={index} delay={0} style={{ display: index === currentMessageIndex ? 'block' : 'none' }}>
              {msg}
            </LoadingText>
          ))}
        </LoadingTextContainer>
      </ContentBox>
    </LoaderContainer>
  );
};

export default Loader;