import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import {ConfirmTooltipProps} from'./Button.type';

const zoom = keyframes`
  0% { transform: scale(0); }
  100% { transform: scale(1); }
`;

const ButtonWrapper = styled.div`
position: relative;
display: flex;
flex-direction: rows;
justify-content: center;
align-items: center;
cursor: pointer;
gap:2.5rem;
 margin: 1rem;
 animation: ${zoom} .8s  cubic-bezier(0.34, 1.56, 0.64, 1);


  button {
    padding: 6px 12px;
    background-color: #6fcf75;
    color: #075315;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;

    &:hover {
      background-color: #a4d9a7;
    }
  }
`;



const TooltipWrapper = styled.div<{ show: boolean }>`
display: flex;
justify-content: center;
align-items: center;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
flex-direction: column;
visibility: ${props => (props.show ? 'visible' : 'hidden')};
color:#fff;
background-color: rgba(0, 0, 0, 0.5);
z-index:1;
    font-size:20px;

`;

const TooltipContainer = styled.div`
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

cursor: pointer;

  }
`;

const ConfirmTooltip: React.FC<ConfirmTooltipProps> = ({ text, onConfirm, onCancel, children }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setShowTooltip(!showTooltip);
    setIsLoading(false);
  }, [showTooltip]);

  const handleConfirm = useCallback(() => {
    setIsLoading(true);
    onConfirm();
    setShowTooltip(false);
    setIsLoading(false);
  }, [onConfirm]);

  const handleCancel = useCallback(() => {
    setShowTooltip(false);
    onCancel();
    setIsLoading(false);
  }, [onCancel]);



  return (
    <TooltipContainer onClick={handleClick}>
    {children}
    {showTooltip && (<TooltipWrapper show={showTooltip} ref={tooltipRef}>
      {text}
      <ButtonWrapper>
      
        <button onClick={handleConfirm} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Confirm'}
        </button>
        <button onClick={handleCancel}>  {isLoading ? 'Loading...' : 'Cancel'}</button>
      </ButtonWrapper>
    </TooltipWrapper>
    )
}
  </TooltipContainer>
  );
};

export default ConfirmTooltip;

