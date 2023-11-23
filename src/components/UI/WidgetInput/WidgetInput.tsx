import React from "react";
import "./WidgetInput.scss";
import { InputProps } from "../../../types/globalTypes";

const WidgetInput: React.FC<InputProps> = ({
  widgetData,
  updateInput,
  checkedState,
  toggleStyles,
}) => {
  const handleClick = () => {
    updateInput(widgetData.id);
  };
  return (
    <div data-testid="linkedInput">
      {toggleStyles ? (
        <label className="switch">
          <input
            onClick={handleClick}
            checked={checkedState}
            readOnly
            type="checkbox"
            id="c1"
            name="cc"
          />
          <span className="slider round"></span>
        </label>
      ) : (
        <div data-testid="activeInput" className="profileCheckbox">
          <input
            onClick={handleClick}
            checked={checkedState}
            readOnly
            type="checkbox"
            id="c1"
            name="cc"
          />
          <label></label>
        </div>
      )}
    </div>
  );
};

export default WidgetInput;
