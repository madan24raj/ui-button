import React,{useState,useEffect} from "react";
import styled from  'styled-components';
import { ButtonProps } from "./Button.type";
import Loader from "./Loader";
import ConfirmTooltip from './ConfirmToolTip';
import ProgressBar from './ProgressBar';

const  StyledButton = styled.button<ButtonProps>`
line-height:1;
border: 2px solid #000;
border-radius: 8px;
font-size: 16px;
cursor: pointer;
display:inline-block;
padding: ${(props)=> props.size==="small" ? "7px 25px 8px" : props.size==="medium" ?"9px 30px 11px" :  props.size==="large" ? "14px 30px 16px" : "6px 20px 9px"};
width: ${(props)=> props.size==="small" ? "120px" : props.size==="medium" ?"150px" :  props.size==="large" ? "180px" : "120px"};
background-color:${(props)=>props.primary?"#6bedb5":"#ffffff"};
color: ${(props) => (props.primary ? "#ffffff" : "#000")};
opacity: ${(props) => (props.disabled ? 0.5 : 1)};
&:hover {
    background-color:${(props)=>props.primary?"#55bd90":"#6bedb5"};
}
&:active {
    border: solid 2px #ffffff;
    padding: ${(props)=> props.size=="small"  ? "5px 23px 6px"  : props.size === "medium" ? "7px 28px 9px" : "12px 28px 14px" };
}
`
const SvgTick = styled.svg`
  width: 100%;
  height: 18px;
  opacity:1;
  transition: opacity 0.3s ease-in-out;

  text.done {
    font-size: 25rem;
    fill: #000;
    animation: opacity 1.2s ease-out;
  }
  @keyframes opacity {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
 

  polyline.tick {
    stroke-dasharray: 350;
    stroke-dashoffset: 350;
    transform: translateX(-580px);
    transition: stroke-dashoffset 0.5s ease-in-out;
    animation: drawTick .8s ease-out;
    animation-fill-mode: forwards;
    animation-delay: .5s;
  }

  @keyframes drawTick {
    0% {
      stroke-dashoffset: 350;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

const Button: React.FC<ButtonProps> = ({
    isLoading: externalIsLoading = false,
    showPercentage=false,
    progress=0,
    confirmTooltip,
    confirmText,
    size, 
    primary, 
    disabled, 
    text, 
    onClick,
    children, 
    backgroundColor,
    ...props
}) => {
  
  const [confirmed, setConfirmed] = useState(false);
  const [isActionConfirmed, setIsActionConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(externalIsLoading);
  const[hideText,setHideText] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setIsActionConfirmed(true); 
  };

  const handleCancel = () => {
    setConfirmed(false);
    setIsActionConfirmed(true); 
  };

  const handleClick = () => {
    setIsActionConfirmed(false); // Reset action confirmation
    if ((confirmTooltip && !confirmed) || progress) {
      // Show confirm tooltip if not already confirmed
      return;
    }
   
    setHideText(true);
    setIsLoading(true); // Start loading
    setTimeout(() => {
      setIsLoading(false); 
      setConfirmed(true);
      setIsActionConfirmed(true); 
     
    }, 1500);
  };


  useEffect(() => {
    if (progress === 100) {
      setIsActionConfirmed(true); // Set the action as confirmed when the progress reaches 100%
    }
  }, [handleClick,progress]);

    return (
      <StyledButton
      isLoading={isLoading}
      type="button"
      style={{ backgroundColor }}
      onClick={handleClick}
      primary={primary}
      size={size}
      disabled={disabled}
      {...props}
    >
      {!hideText && text}
      {isLoading && !confirmed ? (
        <Loader />
      ) : (
        <>
          {confirmTooltip && !confirmed && !isActionConfirmed ? (
            <ConfirmTooltip text={confirmTooltip} onConfirm={handleConfirm} onCancel={handleCancel}>
              {confirmText}
            </ConfirmTooltip>
          ) : (
            <>
              {isActionConfirmed || confirmed ? (
                <>
                  <SvgTick viewBox="0 0 400 400">
                    <polyline
                      fill="none"
                      stroke="#0e4300"
                      strokeWidth="100"
                      points="88,214 173,284 304,138"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="tick"
                    />
                    <text x="300" y="340" textAnchor="middle" className="done">
                      Done
                    </text>
                  </SvgTick>
                </>
              ) : null}

              {showPercentage && !isLoading && !isActionConfirmed && (
                <ProgressBar progress={progress} />
              )}
            </>
          )}
        </>
      )}
    </StyledButton>
  );
};

export default Button;