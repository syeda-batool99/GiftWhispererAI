import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  width: 40px;
  height: 40px;
`;

const Logo = () => (
  <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    {/* Speech bubble */}
    <path
      d="M20,10 C14.477,10 10,14.477 10,20 L10,50 C10,55.523 14.477,60 20,60 L40,60 L50,75 L60,60 L80,60 C85.523,60 90,55.523 90,50 L90,20 C90,14.477 85.523,10 80,10 L20,10 Z"
      fill="#E6BDBA"
    />
    {/* Gift icon inside speech bubble */}
    <g transform="translate(30, 25) scale(0.4)">
      <rect x="10" y="30" width="80" height="50" fill="#F7EBE2" stroke="#333" strokeWidth="5" />
      <line x1="50" y1="30" x2="50" y2="80" stroke="#333" strokeWidth="5" />
      <path d="M30,30 C30,10 70,10 70,30" fill="none" stroke="#333" strokeWidth="5" />
    </g>
  </Svg>
);

export default Logo;