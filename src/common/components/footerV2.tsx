import { Box, IconButton } from "@material-ui/core";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import React from "react";
import Text from "./text";
import logo from "src/assets/hospital1.png";
import { useNavigate } from "react-router-dom";

const FooterV2: React.FC = () => {
  const navigation = useNavigate();
  return (
    <Box className="bg-[#282C34] relative p-4 w-screen h-[70vh] flex-col flex gap-10 justify-start items-center">
      <Box className="flex gap-10">
        <img height="70" width="70" src={logo} alt="logo" />
        <Text className="text-white" variant={"h3"}>
          ASPR Hospital
        </Text>
      </Box>

      <Box className="flex w-full justify-evenly my-10 items-center flex-wrap ">
        <Box className="text-center flex flex-col gap-2">
          <Text variant={"h5"} className="text-white">
            Our Doctors
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
          >
            Dr. Priyanka
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
          >
            Dr. Sapana
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
          >
            Dr. Aishvarya
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
          >
            Dr. Reshma
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
          >
            Dr. Yogita
          </Text>
        </Box>
        <Box className="text-center flex flex-col gap-2">
          <Text variant={"h5"} className="text-white">
            Our Expertise
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
          >
            Cancer
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
          >
            Dengue
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
          >
            Diabetes
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
          >
            Corona
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
          >
            Obstetrician
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
          >
            General Physician
          </Text>
        </Box>
        <Box className="text-center flex flex-col gap-2">
          <Text variant={"h5"} className="text-white">
            Facility
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
            onClick={() => navigation("/ipd-opd")}
          >
            IPD & OPD Ward
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
            onClick={() => navigation("/inventory")}
          >
            Inventory
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
            onClick={() => navigation("/operation-theatre")}
          >
            Operation Theater
          </Text>
          <Text
            variant={"caption"}
            className="text-white hover:text-gray-300 hover:underline"
            onClick={() => navigation("/reports")}
          >
            HMS
          </Text>
        </Box>
      </Box>

      <Box className="my-10 absolute bottom-0 justify-evenly items-center flex w-96">
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
  );
};

export default FooterV2;
