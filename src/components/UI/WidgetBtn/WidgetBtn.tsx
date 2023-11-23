import React, { useEffect, useState } from "react";
import { BtnProps } from "../../../types/globalTypes";

const WidgetBtn: React.FC<BtnProps> = ({
  widgetData,
  boxColor,
  updateColor,
  colorID,
}) => {
  const [boxColorID, setBoxColorID] = useState<number>(0);
  const widgetBoxColors = widgetData?.boxColors;

  useEffect(() => {
    widgetBoxColors?.forEach((res) => {
      if (res.setFocus) {
        setBoxColorID(res.colorID);
      }
    });
  });

  const handleClick = () => {
    updateColor(widgetData.id, boxColor, colorID);
  };

  return (
    <div>
      <button
        data-testid="coloredBtns"
        style={
          colorID === boxColorID && widgetBoxColors?.length !== 0
            ? {
                height: 16,
                width: 16,
                border: "2px solid #B0B0B0",
                backgroundColor: boxColor,
                cursor: "pointer",
              }
            : {
                height: 16,
                width: 16,
                backgroundColor: boxColor,
                cursor: "pointer",
              }
        }
        onClick={handleClick}
      ></button>
    </div>
  );
};

export default WidgetBtn;
