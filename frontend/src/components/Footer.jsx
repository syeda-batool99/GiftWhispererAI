import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #F7EBE2;
  padding: 0.5rem;
  text-align: center;
  color: #333;
  position: relative;
  z-index: 10;
  border-top: 1px solid #E6BDBA;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.05);
`;

const Footer = () => {
  return (
    <FooterContainer>
      &copy; {new Date().getFullYear()} GiftWhispeer AI
    </FooterContainer>
  );
};

export default Footer;