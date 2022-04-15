import { Avatar, Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { FooterV2, HeaderAndDrawer, Text } from "src/common/components";
import { useApi } from "src/hooks";
import { ApiMethods, Doctor } from "src/model";
import Banner from "./Banner";
import TimeLineMenu from "./timeLineMenue";
import Dengue from "src/assets/dengu.jpg";
const Dashboard = () => {
  const [fetchDoctors, { data }] = useApi<Array<Doctor>>();
  useEffect(() => {
    fetchDoctors("/hospital/doctors", ApiMethods.GET);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      <HeaderAndDrawer />
      <Banner />
      <TimeLineMenu />
      <Text variant={"h4"}>Our Expertise</Text>
      <Box className="mb-10 mt-15 flex-wrap flex w-full justify-center items-center h-auto">
        {data?.length &&
          data.map((item) => (
            <Box className="p-5 mt-5 flex flex-col mx-10 justify-center w-60 items-center relative">
              <Box className="w-32 h-32 absolute blur-[100px] z-0 bg-primary"></Box>
              <Avatar
                style={{ height: "100px", width: "100px" }}
                alt="Remy Sharp"
                src={item.profilePic}
              />
              <Text variant="subtitle1">{`${item.honorific}. ${item.fullName}`}</Text>
              <Text variant="caption">{item.expertise.join(", ")}</Text>
            </Box>
          ))}
      </Box>

      <Text variant={"h4"}> We provide good facility for</Text>
      <Box className="my-10 w-screen flex justify-center items-center flex-wrap gap-10">
        {[
          {
            name: "Dengue",
            info: "We have facility for dengue patients, we do better treatment here",
          },
          {
            name: "Cancer",
            info: "We have better equipments and doctors for diagnose cancer",
          },
          {
            name: "Diabetes",
            info: "Treatment of type 2 diabetes primarily involves lifestyle changes, monitoring of your blood sugar",
          },
          {
            name: "Corona",
            info: "Ample amount of beds and good facility for corona patients",
          },
        ].map((item) => (
          <Box className="w-[300px] h-[350px] rounded shadow-xl text-center">
            <img src={Dengue} className="h-[250px] w-[300px]" />
            <Text variant={"h5"}>{item.name}</Text>
            <Text>{item.info}</Text>
          </Box>
        ))}
      </Box>
      <FooterV2 />
    </Box>
  );
};

export default Dashboard;
