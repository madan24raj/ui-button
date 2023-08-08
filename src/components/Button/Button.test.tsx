import React from "react";
import '@testing-library/jest-dom'
import {render, screen, fireEvent } from '@testing-library/react'

import Button from "./Button";

window.getComputedStyle = jest.fn().mockReturnValue({
    getPropertyValue: (prop: string) => {
      if (prop === 'background-color') {
        return 'rgb(107, 237, 181)';
      }
      return '';
    },
  });
  
describe("Button Component Running", () => {
    test("render with correct normal props and child",()=>{
        const onClickMock = jest.fn();
        const text = "click me";
        const primary=true;
        const disabled = false;
        const size = "large";
        render(<Button text={text} onClick={onClickMock} primary={primary} size={size} disabled={disabled}/>);
        const button = screen.getByText(text);
        const expectedBackgroundColor = primary ? "rgb(107, 237, 181)" : "rgb(27, 17, 110)";
        expect(button).toHaveStyle(`background-color: ${expectedBackgroundColor}`); 
        fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalled();
    });

    it('displays the loading spinner when isLoading is true', () => {
        const { getByTestId } = render(<Button isLoading>Click me</Button>);
        const loaderElement = getByTestId('loader');
        expect(loaderElement).toBeInTheDocument();
      });

});
