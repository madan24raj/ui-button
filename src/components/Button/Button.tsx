import React,{useState,useEffect} from "react";
import styled from  'styled-components';
import { ButtonProps } from "./Button.type";
import Loader from "./Loader";
import ConfirmTooltip from './ConfirmToolTip';
import ProgressBar from './ProgressBar';
import LoaderSVG from "./LoaderSVG";

const  StyledButton = styled.button<ButtonProps>`
line-height:1;
position:relative;
border: none;
box-shadow: 1px 1px 10px 0px #a6b1a5;
border-radius: 8px;
font-size: 16px;
font-weight:bold;
cursor: pointer;
display:inline-block;
font-size: ${(props)=> props.size==="small" ? "16px" : props.size==="medium" ?"18px" :  props.size==="large" ? "22px" : "16px"};
padding: ${(props)=> props.size==="small" ? "5px 5px" : props.size==="medium" ?"10px 10px" :  props.size==="large" ? "15px 15px" : "5px 5px"};
width: ${(props)=> props.size==="small" ? "120px" : props.size==="medium" ?"150px" :  props.size==="large" ? "180px" : "120px"};
height: ${(props)=> props.size==="small" ? "40px" : props.size==="medium" ?"50px" :  props.size==="large" ? "60px" : "40px"};
background-color:${(props)=>props.primary?"#529b50":"#ffffff"};
color: ${(props) => (props.primary ? "#ffffff" : "#529b50")};
opacity: ${(props) => (props.disabled ? 0.5 : 1)};
&:hover {
    background-color:#b1e7af;
    color:#25991e;
  
}
&:active {
    border: solid 2px #ffffff;
    padding: ${(props)=> props.size=="small"  ? "5px 23px 6px"  : props.size === "medium" ? "7px 28px 9px" : "12px 28px 14px" };
}
`

const Button: React.FC<ButtonProps> = ({
    isLoading: externalIsLoading = false,
    showPercentage:externalpercentage=false,
    progress:externalprogress=0,
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
  const [showProgress, setShowProgress] = useState(externalpercentage);
  const [progress, setProgress] = useState(externalprogress);

  const handleConfirm = () => {
    setConfirmed(true);
    setShowProgress(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
         
          setIsActionConfirmed(true); 
          clearInterval(interval);
          setShowProgress(false);
          return prevProgress;
        }
        return prevProgress + 1;
      });
    }, 50);
    
  };

  const handleCancel = () => {
    setConfirmed(false);
    setIsActionConfirmed(false); 
    setShowProgress(false);
  };

  
  const handleClick = () => {
    
    if ((confirmTooltip && !confirmed) || progress || isActionConfirmed) {
      return;
    }
    
  
    // Start loading
    if(isLoading){
        setConfirmed(true);
      setHideText(true);
      setTimeout(() => {
        setIsLoading(!isLoading); 
        setIsActionConfirmed(true); 
      
      }, 1500);
    }
    else{
      setIsActionConfirmed(false); 
      setConfirmed(false);
      
    }
  
  };




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
      {isLoading && confirmed ? (
        <Loader  />
      ) : (
        <>
          {confirmTooltip && !confirmed && !isActionConfirmed ? (
            <ConfirmTooltip text={confirmTooltip} onConfirm={handleConfirm} onCancel={handleCancel}>
              {confirmText}
            </ConfirmTooltip>
          ) : (
            <>
              {(isActionConfirmed && confirmed) && (!isLoading) && (
                <>
                 <LoaderSVG ></LoaderSVG> Done
                </>
             ) }

            {showProgress ? <ProgressBar progress={progress} /> : null}   
            </>
          )}
        </>
      )}
    </StyledButton>
  );
};

export default Button;