import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Layout = ({ children, openModal }) => {
  return (
    <AppContainer>
      <Header openModal={openModal} />
      <MainContent>{children}</MainContent>
      <Footer />
    </AppContainer>
  );
};

export default Layout;