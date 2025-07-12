import React from 'react';
import styled, { keyframes } from 'styled-components';
import giftImage from '../assets/gift.png';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const ConfettiContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
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

const GiftBoxContainer = styled.div`
  position: relative;
  animation: ${float} 6s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GiftImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  height: auto;
`;

const GiftBox = () => {
  const confettiColors = ['#E6BDBA', '#6B9A99', '#F7EBE2', '#333'];
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 4 + 4,
  }));

  return (
    <GiftBoxContainer>
      <ConfettiContainer>
        {confettiPieces.map(p => (
          <Confetti key={p.id} {...p} />
        ))}
      </ConfettiContainer>
      <GiftImage src={giftImage} alt="Gift Box" />
    </GiftBoxContainer>
  );
};

export default GiftBox;