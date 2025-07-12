import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import GiftBox from './GiftBox';

const LandingPageContainer = styled.div`
  background-color: #F7EBE2;
  min-height: 100vh;
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

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  position: relative;
  z-index: 10;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
`;

const Button = styled.button`
  background-color: #6B9A99;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-family: 'Winky Rough', sans-serif;
`;

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  position: relative;
  z-index: 10;
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

const StartButton = styled(Button)`
  padding: 0.75rem 2rem;
  border-radius: 9999px;
`;

const OptionsContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 2rem;
`;

const Option = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RadioInput = styled.input`
  accent-color: #6B9A99;
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
      <Nav>
        <LogoContainer>
          <Logo />
          <LogoText>GIFTWHISPERER AI</LogoText>
        </LogoContainer>
        <NavLinks>
          <NavLink href="#">Home</NavLink>
          <NavLink href="#">Take Quiz</NavLink>
          <NavLink href="#">Upload Photo</NavLink>
          <Button>Integrate your Store</Button>
        </NavLinks>
      </Nav>
      <Main>
        <Content>
          <Title>
            Struggling to find the perfect gift? Let AI handle it.
          </Title>
          <Subtitle>
            Answer a few quick questions and get beautifully tailored gift ideas..
          </Subtitle>
          <ButtonContainer>
            <StartButton>Start Now</StartButton>
            <StartButton>Learn More</StartButton>
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