import React from "react";
import Skeleton from "../SkeletonStyles/Skeleton";
import SkeletonAnimation from "../SkeletonStyles/SkeletonAnimation";

const SkeletonLoad = () => {
  return (
    <div className={"skeletonWrapper light"}>
      <div className="skeletonData">
        <Skeleton type="title" />
      </div>
      <div>
        <Skeleton type="text" />
        <Skeleton type="text" />
        <Skeleton type="text" />
      </div>
      <SkeletonAnimation />
    </div>
  );
};

export default SkeletonLoad;
