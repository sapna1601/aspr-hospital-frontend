import { Box } from "@material-ui/core";
import { Assessment, Healing, LocalHospital, Shop } from "@material-ui/icons";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@material-ui/lab";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text } from "src/common/components";
import ipdImg from "src/assets/ipd.jpg";
import ot from "src/assets/ot.jpg";
import inventory from "src/assets/inventory.jpg";
import hms from "src/assets/hms.jpg";

export default function TimeLineMenu() {
  const navigation = useNavigate();
  return (
    <Timeline align="alternate" className="h-auto my-10 min-h-screen">
      <TimelineItem className="h-96">
        <TimelineOppositeContent className="my-auto mx-0">
          Maintain patient bookings
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot variant="outlined">
            <LocalHospital className="text-red-500" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="my-auto relative">
          <Box className="w-[400px]">
            <img
              src={ipdImg}
              alt={"ipd image"}
              onClick={() => navigation("/ipd-opd")}
            />
            <Text align="left" variant={"h5"}>
              IPD/OPD Management
            </Text>
            <Text align="left" className="w-[350px]">
              Complete Inpatient Management Module that manages all your
              hospital inpatient functionality from Patient registration to the
              billing with a complete tracking of Patient records.
            </Text>
          </Box>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className="h-96">
        <TimelineOppositeContent className="my-auto mx-0">
          Commodity stocks
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot variant="outlined">
            <Shop className="text-green-500" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="my-auto relative">
          <Box className="text-right w-[400px] ml-auto">
            <img
              src={inventory}
              alt={"ot image"}
              onClick={() => navigation("/inventory")}
            />
            <Text align="right" variant={"h5"}>
              Inventory
            </Text>
            <Text align="right">
              The inventory module spreads across the entire hospital from
              wards, OT, pharmacies etc. and regulates the complete stock
              movement across the entire hospital.
            </Text>
          </Box>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className="h-96">
        <TimelineOppositeContent className="my-auto mx-0">
          Patient Operation
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot variant="outlined">
            <Healing className="text-blue-400" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="my-auto relative">
          <Box className="text-left w-[400px]">
            <img
              src={ot}
              alt={"ot image"}
              onClick={() => navigation("/operation-theatre")}
            />
            <Text align="left" variant={"h5"}>
              Operation Theater
            </Text>
            <Text align="left">
              Operation theater module caters to the scheduling of operation
              theaters, surgery team, patient tracking, operation theater
              consumable management, accounting and Operation theater roster and
              notes with Death and Birth certificates.
            </Text>
          </Box>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className="h-96">
        <TimelineOppositeContent className="my-auto mx-0">
          HMS
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot variant="outlined">
            <Assessment className="text-purple-500" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className="my-auto relative">
          <Box className="text-right ml-auto w-[400px]">
            <img
              src={hms}
              alt={"ot image"}
              onClick={() => navigation("/reports")}
            />
            <Text align="right" variant={"h5"}>
              H.M.S Report
            </Text>
            <Text align="right">
              User wise Collection reports, Department wise Sales and Daily OPD
              / IPD Report (Department wise).
            </Text>
          </Box>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
