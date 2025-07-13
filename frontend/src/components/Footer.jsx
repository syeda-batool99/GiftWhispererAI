import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #F7EBE2;
  padding: 0.5rem;
  text-align: center;
  color: #333;
  position: relative;
  z-index: 10;
`;

const Footer = () => {
  return (
    <FooterContainer>
      &copy; {new Date().getFullYear()} GiftWhisperer AI
    </FooterContainer>
  );
};

export default Footer;