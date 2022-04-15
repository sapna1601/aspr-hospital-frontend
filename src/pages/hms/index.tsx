import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { FooterV2, HeaderAndDrawer, Text } from "src/common/components";
import { useApi } from "src/hooks";
import { ApiMethods } from "src/model";
import BarChart from "./Bar";
import { PieChart } from "./pieChart";

const Dashboard = () => {
  const [fetchBirthAndDeathCnt] = useApi();
  const [fetchBookingsGraph] = useApi();
  const [birthAndDeathCnt, setBirthAndDeathCnt] = React.useState<any>({
    birth: 0,
    death: 0,
  });
  const [bookingsGraph, setBookingsGraph] = React.useState<any>({
    labels: [],
    data: [],
  });
  useEffect(() => {
    fetchBirthAndDeathCnt("/ot/birthAndDeath", ApiMethods.GET).then((res) => {
      setBirthAndDeathCnt(res.data);
    });
    fetchBookingsGraph("/graph/disease", ApiMethods.GET).then((res) => {
      const labels = [] as any;
      const data = [] as any;
      Object.keys(res.data).forEach((key) => {
        labels.push(key);
        data.push(res.data[key]);
      });
      setBookingsGraph({ labels, data });
    });
  }, []);
  return (
    <Box>
      <HeaderAndDrawer />
      <Box className="w-full text-center p-2">
        <Text variant="h4">Analytics</Text>
      </Box>
      <Box className="w-full flex justify-center items-center h-screen lg:flex-col">
        <Box className="w-1/2">
          <BarChart birthAndDeathCnt={birthAndDeathCnt} />
        </Box>
        <Box className="w-1/2" style={{ height: "500px", width: "500px" }}>
          <PieChart data={bookingsGraph} />
        </Box>
      </Box>
      <FooterV2 />
    </Box>
  );
};

export default Dashboard;
