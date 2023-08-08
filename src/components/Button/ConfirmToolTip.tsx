import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {ConfirmTooltipProps} from'./Button.type';

const ButtonWrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
cursor: pointer;
flex-direction: revert;
 margin: 1rem;

  button {
    padding: 6px 12px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #2980b9;
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
background-color: rgba(0, 0, 0, 0.5);
z-index:1;
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

