import { Box } from "@material-ui/core";
import React from "react";
import hms from "src/assets/hms.jpg";
import inventory from "src/assets/inventory.jpg";
import ipdopd from "src/assets/ipd.jpg";
import ot from "src/assets/ot.jpg";
import { Button, Footer, Input, Text } from "src/common/components";
import ChatBot from "src/pages/chatBot";
import useLoginContainer from "src/pages/login/container";
import { InputContainer } from "src/pages/login/style";
import "./heartPulse.css";
const Login: React.FC = () => {
  const { loginState, handleChange, handleSubmit, isPatientLogin } =
    useLoginContainer();
  return (
    <>
      <Box className=" h-screen w-screen flex justify-center items-center page-1 relative gap-10">
        <div className="light x1"></div>
        <div className="light x2"></div>
        <div className="light x3"></div>
        <div className="light x4"></div>
        <div className="light x5"></div>
        <div className="light x6"></div>
        <div className="light x7"></div>
        <div className="light x8"></div>
        <div className="light x9"></div>
        <Text className="text-white" variant="h1">
          ASPR Hospital
        </Text>
        <form>
          <InputContainer>
            <Text
              className=" font-bold"
              style={{ margin: "10px 0", color: "white" }}
              variant="h4"
            >
              Login
            </Text>
            <Input
              fullWidth
              onChange={handleChange}
              name="hospitalId"
              value={loginState.hospitalId}
              style={{ margin: "10px 0" }}
              variant="outlined"
              label={"Id"}
              className="border border-primary bg-white rounded"
            />
            {!isPatientLogin && (
              <Input
                autoComplete="on"
                fullWidth
                onChange={handleChange}
                name={"password"}
                type={"password"}
                value={loginState.password}
                style={{ margin: "10px 0" }}
                variant="outlined"
                label={"Password"}
                className="border border-primary bg-white rounded"
              />
            )}
            <Box className="flex gap-10">
              <Button
                onClick={handleSubmit}
                style={{ margin: "10px 0", color: "white" }}
                label={isPatientLogin ? "Patient Login" : "Login"}
              />
            </Box>
          </InputContainer>
        </form>
      </Box>
      <Box className="page-2 w-screen h-screen relative">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <Box className="flex justify-center items-center w-full h-full gap-10">
          <Box>
            <Text variant="h3" className="text-white">
              Inventory
            </Text>
            <img src={inventory} className="mt-10" />
          </Box>
          <Box className="h-1/2 w-[1px] bg-white"></Box>
          <Box className="w-1/2 pr-3">
            <Text className="text-white w-[70%]">
              The inventory module spreads across the entire hospital from
              wards, OT, pharmacies etc. and regulates the complete stock
              movement across the entire hospital.
            </Text>
            <Text className="text-primary" align="left" variant="h5">
              Features
            </Text>
            <ul className="list-none text-white">
              <li>Purchase indents and approval</li>
              <li>Stock reorder</li>
            </ul>
          </Box>
        </Box>
      </Box>
      <Box className="page-3 w-screen h-screen flex justify-center items-center gap-10">
        <Box className="w-1/2 text-right">
          <Text className="text-white" align="right">
            Operation theater module caters to the scheduling of operation
            theaters, surgery team, patient tracking, operation theater
            consumable management, accounting and Operation theater roster and
            notes with Death and Birth status.
          </Text>
          <Text className="text-primary" variant="h5" align="right">
            Features
          </Text>
          <ul className="list-none text-white">
            <li>O.T. Reservation for a scheduled surgery</li>
            <li>Team of Doctors/Assistants involved in the operation</li>
            <li>Consultant Instructions in O.T</li>
            <li>Birth / Death Certificates</li>
          </ul>
        </Box>

        <Box className="h-1/2 w-[1px] bg-white"></Box>
        <Box className="w-1/2">
          <Text align="left" variant="h3" className="text-white">
            Operation Theater
          </Text>
          <img src={ot} className="mt-10" />
        </Box>
      </Box>
      <Box className="flex justify-center items-center w-full h-full gap-10 page-4">
        <Box className="w-[40%]">
          <Text align="right" variant="h3" className="text-white">
            IPD/OPD
          </Text>
          <img src={ipdopd} className="mt-10 ml-auto" />
        </Box>
        <Box className="h-1/2 w-[1px] bg-white"></Box>
        <Box className="w-[60%] pr-3">
          <Text className="text-white w-[70%]">
            In an effective OPD, the entire cycle from Registration, To Patient
            History, Diagnosis to Prescription is stored and managed
            efficiently. Patient registration in the OPD as well as to book,
            confirm and cancel appointments. The IPD module commences when the
            patient is being registered and allotted bed in the ward. It deals
            with the complete treatment and services provided to the patient
            during his stay in the hospital.
          </Text>
          <Text className="text-primary w-1/2" align="left" variant="h5">
            Features
          </Text>
          <ul className="list-none text-white">
            <li>Daily Appointment scheduler</li>
            <li>Appointment SMS alerts to Patients</li>
            <li> Assign ward and bed to patient</li>
            <li> Admission and Bed Allocation</li>
            <li>Details of disease. Print bill quickly for Visit charges</li>
          </ul>
        </Box>
      </Box>
      <Box className="page-2 w-screen h-screen relative">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <Box className="flex justify-center items-center w-full h-full gap-10">
          <Box className="w-1/2 text-right">
            <Text align="right" className="text-white">
              User wise Collection reports, Department wise Sales and Daily OPD
              / IPD Report (Department wise).
            </Text>
            <Text align="right" variant="h5" className="text-primary">
              Features
            </Text>
            <ul className="list-none text-white">
              <li>Statistical report of death/birth</li>
              <li>Statistical report of diseases</li>
            </ul>
          </Box>

          <Box className="h-1/2 w-[1px] bg-white"></Box>
          <Box>
            <Text variant="h3" className="text-white">
              HMS
            </Text>
            <img src={hms} className="mt-10" />
          </Box>
        </Box>
      </Box>
      <Footer />
      <ChatBot />
    </>
  );
};

export default Login;
