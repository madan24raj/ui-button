import React,{useRef} from 'react';
import styled,{keyframes} from 'styled-components';
import { ProgressBarProps } from './Button.type';




const PercentageText = styled.span`
  font-size:15px;
  padding:.5rem;
  text-align:center;
  position:absolute;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ddd;
  border-radius: 4px;
  overflow: hidden;
  position:relative;
`;

const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: #015501;
  transition: width 0.2s linear;
  text-align:center;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  return ( 
    <ProgressContainer>
      <ProgressBarFill progress={progress}>
          <PercentageText>{`${progress}%`}</PercentageText>
        </ProgressBarFill>
    </ProgressContainer>
  );
};

export default ProgressBar;
