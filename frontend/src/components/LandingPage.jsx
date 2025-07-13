import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import GiftBox from './GiftBox';

const LandingPageContainer = styled.div`
  background-color: #F7EBE2;
  flex: 1;
  font-family: 'Winky Rough', sans-serif;
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

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  position: relative;
  z-index: 10;
  height: 100%;
`;

const Content = styled.div`
  width: 50%;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  color: #333;
  margin-top: 1rem;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`;

const StartButton = styled(Link)`
  background-color: #6B9A99;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  text-decoration: none;
  font-family: 'Winky Rough', sans-serif;
`;

const IllustrationContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LandingPage = () => {
  return (
    <LandingPageContainer>
      <Main>
        <Content>
          <Title>
            Struggling to find the perfect gift? Let AI handle it.
          </Title>
          <Subtitle>
            Answer a few quick questions and get beautifully tailored gift ideas..
          </Subtitle>
          <ButtonContainer>
            <StartButton to="/quiz">Start Now</StartButton>
            <StartButton to="/quiz">Learn More</StartButton>
          </ButtonContainer>
        </Content>
        <IllustrationContainer>
          <GiftBox />
        </IllustrationContainer>
      </Main>
    </LandingPageContainer>
  );
};

export default LandingPage;