import { Box, Divider, IconButton } from "@material-ui/core";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import React from "react";
import { Footer, HeaderAndDrawer, Text } from "src/common/components";
interface IProps {}

const ContactUs: React.FC<IProps> = () => {
  return (
    <>
      <HeaderAndDrawer />
      <Box className="w-full h-screen flex-col flex justify-center items-center">
        <Text variant="h1">ASPR Hospital</Text>
        <Divider light className="w-96" style={{ margin: "10px 0" }} />
        <Text variant="caption" className="mt-5">
          Aspr Hospital ,Sangli - Miraj Rd, Vishrambag, Sangli, Maharashtra
          416415
        </Text>
        <Text variant="caption">+91 1234567890 | +91 1234567895</Text>
        <Box className="my-10 justify-evenly items-center flex w-96">
          <IconButton href="https://www.facebook.com/">
            <Facebook className="text-blue-500" />
          </IconButton>
          <IconButton href="https://www.instagram.com/?hl=en">
            <Instagram className="text-red-500" />
          </IconButton>
          <IconButton href="https://twitter.com/login">
            <Twitter className="text-blue-300" />
          </IconButton>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ContactUs;
