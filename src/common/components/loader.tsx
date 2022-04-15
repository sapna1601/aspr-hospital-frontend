import { Box } from "@material-ui/core";
import React from "react";
import loaderGif from "src/assets/loader.gif";
interface IProps {
  message?: string;
}

const Loader: React.FC<IProps> = ({ message }) => {
  return (
    <Box className="loader justify-center items-center flex w-screen h-screen">
      <img src={loaderGif} alt={"loader"} />
    </Box>
  );
};

export default Loader;
