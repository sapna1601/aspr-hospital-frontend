import { Box } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FooterV2,
  HeaderAndDrawer,
  Input,
  Modal,
} from "src/common/components";
import AppointmentBookingList from "src/pages/ipd-opd/appointmentBookedList";
import BookAppointment from "src/pages/ipd-opd/bookAppointment";
import useIpdOpdContainer from "src/pages/ipd-opd/container";
import RegisterPatient from "src/pages/ipd-opd/registerPatient";

interface IProps {}
const IPD_OPD: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const {
    phoneNumber,
    setPhoneNumber,
    handlePhoneNumberSubmit,
    patientRegistrationData,
    handlePatientRegisteredChanges,
    handleBackButton,
    fetchPatientByPhoneNumberState,
    handlePatientRegisterSubmit,
    screen,
  } = useIpdOpdContainer();
  const handleOnBookingDone = useCallback(() => {
    setOpen(false);
    window.location.reload();
  }, []);
  return (
    <>
      <HeaderAndDrawer />
      <Box className="min-w-full min-h-screen flex flex-col bg-none">
        <Box className="flex justify-end items-center my-2 p-2 gap-7">
          <Button
            variant="text"
            onClick={() => navigate("/online-appointment")}
            label="Approve online appointments"
          />
          <Button onClick={() => setOpen(true)} label="Book Appointment" />
        </Box>
        <AppointmentBookingList />
        <Modal onClose={() => setOpen(false)} open={open}>
          <Box className="bg-white relative md:w-[50%] w-[40%] sm:w-[90%] min-h-[50%] p-5 flex flex-col justify-center items-center">
            {(screen.patientAppointmentScreen ||
              screen.patientRegisterScreen) && (
              <Button
                onClick={handleBackButton}
                label="Back"
                style={{ position: "absolute", top: 10, left: 10 }}
              />
            )}
            {screen.patientExistScreen && (
              <Box className="flex justify-center flex-col min-w-[300px] items-center">
                <Input
                  value={phoneNumber.phoneNumber}
                  onChange={({ target: { value } }) =>
                    setPhoneNumber({ phoneNumber: value, error: "" })
                  }
                  type="number"
                  label="Mobile number"
                  error={phoneNumber.error ? true : false}
                  helperText={phoneNumber.error}
                />
                <Button
                  onClick={handlePhoneNumberSubmit}
                  style={{ marginTop: "5px" }}
                  label="Submit"
                  loading={fetchPatientByPhoneNumberState.loading}
                />
              </Box>
            )}
            {screen.patientRegisterScreen && (
              <RegisterPatient
                onRegisterClick={handlePatientRegisterSubmit}
                onChange={handlePatientRegisteredChanges}
                data={patientRegistrationData.patient}
                phoneNumber={phoneNumber.phoneNumber}
              />
            )}
            {screen.patientAppointmentScreen && (
              <BookAppointment
                onBookingDone={handleOnBookingDone}
                patientData={patientRegistrationData.patient}
              />
            )}
          </Box>
        </Modal>
      </Box>
      <FooterV2 />
    </>
  );
};

export default IPD_OPD;
