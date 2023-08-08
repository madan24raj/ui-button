import React,{useRef} from 'react';
import styled from 'styled-components';
import { ProgressBarProps } from './Button.type';


const ProgressContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ddd;
  border-radius: 4px;
  overflow: hidden;
  text-align:center;
`;

const PercentageText = styled.span`
  font-size:10px;
  padding:.25rem;
`;

const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  
  background-color: #3498db;
  transition: width 3s ease-in-out;
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
