import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #F7EBE2;
  position: relative;
  z-index: 10;
  border-bottom: 1px solid #E6BDBA;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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

const NavLink = styled(Link)`
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

const Header = () => {
  return (
    <Nav>
      <LogoContainer>
        <Logo />
        <LogoText>GIFTWHISPEER AI</LogoText>
      </LogoContainer>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/quiz">Take Quiz</NavLink>
        <Button>Integrate Your Store</Button>
      </NavLinks>
    </Nav>
  );
};

export default Header;