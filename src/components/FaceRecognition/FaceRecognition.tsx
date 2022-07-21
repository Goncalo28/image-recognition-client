import { IFaceBox } from "../../App";
import "./styles.css";

interface IProps {
  src: string;
  box: IFaceBox | null;
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
        {box && (
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              bottom: box.bottomRow,
              left: box.leftCol,
              right: box.rightCol,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
