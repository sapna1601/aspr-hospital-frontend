import { Box } from "@material-ui/core";
import React from "react";
import { Map } from "src/common/components";

const Footer: React.FC = () => {
  return (
    <Box className="flex flex-col w-full h-screen position border-2 border-solid border-red-100">
      <Map style={{ height: "100%", width: "100%" }} />
    </Box>
  );
};

export default Footer;
