import { Box } from "@material-ui/core";
import React from "react";
import {
  Button,
  FooterV2,
  HeaderAndDrawer,
  Modal,
  Text,
} from "src/common/components";
import useOt from "./container";
import ListOfPatient from "./ListOfOperationPatient";
import PatientAndDoctorAllocation from "./PatientAndDoctorAllocation";
const OPerationTheater: React.FC<{}> = () => {
  const {
    openModal,
    setOpaModal,
    handleGetPatientByPhoneNumber,
    patient,
    fetchOtPatientsState,
  } = useOt();
  return (
    <>
      <HeaderAndDrawer />
      <Box>
        <Box className="flex justify-between items-center p-4">
          <Text variant="h4">Operation Theater</Text>
          <Button label="Add Patient" onClick={() => setOpaModal(true)} />
        </Box>
        <ListOfPatient OperationPatientList={fetchOtPatientsState.data} />
        <Modal
          open={openModal}
          onClose={() => {
            setOpaModal(false);
          }}
        >
          <Box className="h-[90%] w-1/2 bg-white p-4 overflow-auto">
            <PatientAndDoctorAllocation
              patient={patient}
              onGetPatientClick={handleGetPatientByPhoneNumber}
            />
          </Box>
        </Modal>
      </Box>
      <FooterV2 />
    </>
  );
};

export default OPerationTheater;
