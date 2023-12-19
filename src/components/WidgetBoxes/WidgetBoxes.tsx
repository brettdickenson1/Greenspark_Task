import React, { useEffect } from "react";
import "./WidgetBoxes.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import {
  updateWidget,
  fetchWidgetData,
  activateBadge,
  activateLinked,
  updateWidgetState,
} from "../../store/features/widgetSlice";
import greenSparkLogo from "../../assets/images/logo.jpg";
// import greenSparkLogoGreen from "../../assets/images/greenspark-logo-green.svg";
// import greenSparkLogoBlack from "../../assets/images/greenspark-logo-black.svg";
import toolTipImg from "../../assets/images/Tooltip.svg";
import WidgetBtn from "../UI/WidgetBtn/WidgetBtn";
import WidgetInput from "../UI/WidgetInput/WidgetInput";
import SkeletonLoad from "../UI/SkeletonLoading/SkeletonLoad/SkeletonLoad";

const COLORS = {
  blue: "#2E3A8C",
  green: "#3B755F",
  creme: "#F2EBDB",
};

const COLORSMAP = {
  id: 1,
  id2: 2,
  id3: 3,
  id4: 4,
  id5: 5,
};

const WidgetBoxes: React.FC = () => {
  const dispatch = useAppDispatch();
  const widgetData = useAppSelector((state) => state.widgetData.widgetData);
  const loading = useAppSelector((state) => state.widgetData.loading);

  useEffect(() => {
    dispatch(fetchWidgetData())
      .unwrap()
      .then(() => dispatch(updateWidgetState()))
      .catch((e) => e);
  }, [dispatch]);

  const updateColor = (index: number, boxColor: string, colorID: number) => {
    dispatch(
      updateWidget({ id: index, selectedColor: boxColor, colorID: colorID })
    );
  };

  const updateInputLinked = (index: number) => {
    dispatch(activateLinked({ id: index }));
  };

  const updateInputBadge = (index: number) => {
    dispatch(activateBadge({ id: index }));
  };

  return (
    <div className="widgetBox" data-testid="widgetBox">
      <h3>Product Widgets</h3>
      <hr />
      {widgetData?.length > 0 && !loading ? (
        <div className={"innerBoxes"}>
          {widgetData.map((widget, i) => {
            return (
              <div key={i} className="outerBox">
                <div
                  style={{
                    background: widget.selectedColor,
                    color:
                      widget.selectedColor === COLORS.creme
                        ? COLORS.green
                        : widget.selectedColor === "white"
                        ? "black"
                        : "white",
                  }}
                  className="top"
                >
                  <img
                    style={{ height: 40, width: 40 }}
                    src={greenSparkLogo}
                    // src={
                    //   widget.selectedColor === COLORS.creme
                    //     ? greenSparkLogoGreen
                    //     : widget.selectedColor === "white"
                    //     ? greenSparkLogoBlack
                    //     : greenSparkLogo
                    // }
                    alt="greensparkLogo"
                  />
                  <div data-testid="widgetDesc" className="widgetContainer">
                    <p>This product {widget.action}</p>
                    <br />
                    <div className="widgetTitle">
                      {widget.type === "carbon" ? (
                        <>
                          <span>
                            {widget.amount}kgs of {widget.type}
                          </span>
                        </>
                      ) : (
                        <>
                          <span>
                            {widget.amount} {widget.type}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <div className="innerBottom">
                    <div className="publicProfile">
                      <p>Link to Public Profile</p>
                      <div className="tooltip">
                        <img src={toolTipImg} alt="toolTipImg" />
                        <span className="tooltiptext">
                          This widget links directly to your public profile so
                          that you can easily share your impact with your
                          customers. Turn it off here if you do not want the
                          badge to link to it.
                          <a
                            aria-disabled
                            href="https://brett-dickenson-portfolio.netlify.app/"
                          >
                            View Public Profile
                          </a>
                        </span>
                      </div>
                    </div>
                    <WidgetInput
                      toggleStyles={false}
                      checkedState={widget.linked ? true : false}
                      updateInput={updateInputLinked}
                      widgetData={widget}
                    />
                  </div>
                  <div className="coloredBtns">
                    <p>Badge color</p>
                    <div className="colorBox">
                      <WidgetBtn
                        updateColor={updateColor}
                        widgetData={widget}
                        boxColor={COLORS.blue}
                        colorID={COLORSMAP.id}
                      />
                      <WidgetBtn
                        updateColor={updateColor}
                        widgetData={widget}
                        boxColor={COLORS.green}
                        colorID={COLORSMAP.id2}
                      />
                      <WidgetBtn
                        updateColor={updateColor}
                        widgetData={widget}
                        boxColor={COLORS.creme}
                        colorID={COLORSMAP.id3}
                      />
                      <WidgetBtn
                        updateColor={updateColor}
                        widgetData={widget}
                        boxColor={"white"}
                        colorID={COLORSMAP.id4}
                      />
                      <WidgetBtn
                        updateColor={updateColor}
                        widgetData={widget}
                        boxColor={"black"}
                        colorID={COLORSMAP.id5}
                      />
                    </div>
                  </div>
                  <div className="activateBadge">
                    <p>Activate badge</p>
                    <WidgetInput
                      toggleStyles={true}
                      checkedState={widget.active ? true : false}
                      updateInput={updateInputBadge}
                      widgetData={widget}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="skeletonContainer">
          {[1, 2, 3].map((n) => (
            <SkeletonLoad key={n} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WidgetBoxes;
