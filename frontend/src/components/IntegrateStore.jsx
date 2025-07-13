import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #6B9A99;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
`;

const IntegrateStore = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    fetch('/src/assets/products.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            navigate('/quiz', { state: { products: results.data } });
            onClose();
          }
        });
      });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>Integrate Your Store</Title>
        <p>Click the button to load products from your store.</p>
        <Button onClick={handleSubmit}>Load Products</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default IntegrateStore;