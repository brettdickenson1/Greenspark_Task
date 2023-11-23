import React from "react";
import "./Skeleton.scss";
import { SkeletonTypeProps } from "../../../../types/globalTypes";

const Skeleton: React.FC<SkeletonTypeProps> = ({ type }) => {
  const classes = `skeleton ${type}`;
  return <div className={classes}></div>;
};

export default Skeleton;
