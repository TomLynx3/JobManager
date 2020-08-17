import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Loader
        type="ThreeDots"
        color="#3f51b5"
        height={100}
        width={100}
        //timeout={3000}
      />
    </div>
  );
};

export default Loading;
