import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const SvgAnimationWrapper = styled.div`
svg {
  width: 20%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 10%;
}


svg.animate path {
  animation: dash 0.5s linear both;
  animation-delay: 0s;
}

@keyframes dash {
  0% { stroke-dashoffset: 210; }
  75% { stroke-dashoffset: -220; }
  100% { stroke-dashoffset: -205; }
};
`;

const LoaderSVG = () => {
  return (
    <SvgAnimationWrapper>
      <svg viewBox="0 0 100 100" className="animate">
        <filter id="dropshadow" height="100%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
          <feFlood floodColor="rgba(76, 175, 80, 0.5)" floodOpacity="0.5" result="color"/>
          <feComposite in="color" in2="blur" operator="in" result="blur"/>
          <feMerge> 
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <circle cx="50" cy="50" r="46.5" fill="none" stroke="rgb(14, 131, 20, 1 )" strokeWidth="5"/>
        
        <path d="M67,93 A46.5,46.5 0,1,0 7,32 L43,67 L88,19" fill="none" stroke="rgb(20, 83, 23, 0.5)" strokeWidth="5" strokeLinecap="round" strokeDasharray="80 1000" strokeDashoffset="-220" style={{ filter: 'url(#dropshadow)' }}/>
      </svg>
    </SvgAnimationWrapper>
  );
};

export default LoaderSVG;
