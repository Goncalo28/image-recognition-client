import React from "react";
import "./faceRecognition.css";

interface IProps {
  src: string;
  box: any;
}

const FaceRecognition = ({ src, box }: IProps) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="input-image"
          src={src}
          alt="predicted"
          width={500}
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            bottom: box.bottomRow,
            left: box.leftCol,
            right: box.rightCol,
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
