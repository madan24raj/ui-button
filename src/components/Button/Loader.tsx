import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
margin: auto;
border: 2px solid #EAF0F6;
border-radius: 50%;
border-top: 2px solid #FF7A59;
width: 15px;
height: 15px;
animation: ${spinAnimation} 1s ease infinite;
  }

`;

const Loader: React.FC = () => {
  return <LoaderWrapper />;
};

export default Loader;
