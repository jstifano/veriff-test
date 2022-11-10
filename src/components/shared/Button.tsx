import React, { FunctionComponent } from "react";
import { ButtonProps } from "../../types/button"

/**
 * Component used to display the Submit Button (Can be re-usable)
 * @param disabled Prop to know if the button should be disabled 
 * @param onClick Callback function that is used to react when the user clicks the button
 * @param children Children component/information passed through parent component
 * @returns 
 */
const Button: FunctionComponent<ButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <button className="Button" onClick={() => onClick()} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;