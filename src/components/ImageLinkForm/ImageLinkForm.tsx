import React from "react";

interface IProps {
  onInputChange: (e: any) => void;
  onSubmit: () => void;
}

const ImageLinkForm = ({ onInputChange, onSubmit }: IProps) => {
  return (
    <div>
      <p className="f3">
        {"This magic brain will detect faces in your images. Give it a try"}
      </p>
      <div className="center">
        <div
          style={{
            background: "linear-gradient(89deg, #04C8DE 0%, #FF5EDF 100%)",
          }}
          className="center pa4 br3 shadow-5"
        >
          <input
            onChange={onInputChange}
            className="f4 pa2 w-100 center"
            type="text"
            name=""
            id=""
          />
          <button
            onClick={onSubmit}
            className="grow f4 link ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
