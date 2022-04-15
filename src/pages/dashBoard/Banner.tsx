import { Box } from "@material-ui/core";
import React from "react";
import { Text } from "src/common/components";

const Banner = () => {
  return (
    <Box className="h-[90%] w-[70%] mx-auto flex flex-col justify-center items-center my-10">
      <img
        className="h-[50%] w-1/2"
        height={550}
        width={550}
        src={
          "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
        }
        alt="doctors"
      />
      <Text variant={"h2"}>ASPR Hospital</Text>
      <Text>
        A “Smart Website for Efficient Management of Hitech-Hospitals" is
        proposed in order to help patients diagnose and prescribe their
        treatment. Among the features offered to users is the ability to book
        medical appointments, find the hospital location by using Google map,
        and view a graphical representation of the medical status of certain
        diseases.
      </Text>
    </Box>
  );
};

export default Banner;
