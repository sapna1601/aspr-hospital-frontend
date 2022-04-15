import { Box, Checkbox } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Input, Text } from "src/common/components";
import { disease } from "src/common/const";
import { useApi } from "src/hooks";
import { ApiMethods, Booking, Doctor, Patient } from "src/model";

interface IProps {
  onGetPatientClick: (phoneNumber: string) => void;
  patient: Patient | null;
}

const PatientAndDoctorAllocation: React.FC<IProps> = ({
  onGetPatientClick,
  patient,
}) => {
  const [fetchDoctors] = useApi<Array<Doctor>>();
  const [doctors, setDoctors] = useState<Array<Doctor>>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agree, setAgree] = useState(false);
  const [selectedDoctors, setSelectedDoctors] = useState<Array<Doctor>>([]);
  const [patientBookingDetails, setPatientBookingDetails] =
    useState<Booking | null>();
  const [fetchPatientBookingDetails] = useApi<Booking>();
  const [addPatientForOperation] = useApi<void>();

  useEffect(() => {
    fetchDoctors("/hospital/doctors", ApiMethods.GET).then((res) => {
      setDoctors(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (patient) {
      fetchPatientBookingDetails(
        `/ipd-opd/patient/ipd/${patient.id}`,
        ApiMethods.GET
      )
        .then((res) => {
          setPatientBookingDetails(res.data);
        })
        .catch(() => {
          toast.error("No booking found for this patient");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient]);
  const handleSelectDoctor = useCallback(
    (doctor: Doctor) => {
      const newSelectedDoctors = selectedDoctors.slice();
      if (newSelectedDoctors.includes(doctor)) {
        const index = newSelectedDoctors.indexOf(doctor);
        newSelectedDoctors.splice(index, 1);
      } else {
        newSelectedDoctors.push(doctor);
      }
      setSelectedDoctors(newSelectedDoctors);
    },
    [selectedDoctors]
  );
  const handleSubmit = useCallback(() => {
    const { id: _, ...restPatient } = patient;
    const { id: bookingId, ...restPatientBookingDetails } =
      patientBookingDetails;
    toast
      .promise(
        addPatientForOperation("/ot/add-patient", ApiMethods.POST, {
          ...restPatient,
          ...restPatientBookingDetails,
          doctorTeam: selectedDoctors.map((doctor) => doctor.id),
          agreementSign: agree,
          bookingId,
          operation: "",
        }),
        {
          loading: "Adding Patient",
          success: "Patient Added Successfully",
          error: "Error in adding patient",
        }
      )
      .then(() => {
        window.location.reload();
      });
  }, [patient, patientBookingDetails, selectedDoctors]);
  return (
    <Box className="w-full">
      {patient && patientBookingDetails ? (
        <Box>
          <Text variant="h4">Patient Details</Text>
          <Box className="flex flex-col shadow-2xl w-[90%] mx-auto rounded-md p-4">
            <Box className="flex flex-wrap gap-4 justify-evenly">
              <Box className="text-center">
                <Text variant="subtitle1">Name</Text>
                <Text variant="caption">{`${patient.firstName} ${patient.lastName}`}</Text>
              </Box>
              <Box className="text-center">
                <Text variant="subtitle1">Age</Text>
                <Text variant="caption">{`${patient.age}`}</Text>
              </Box>
              <Box className="text-center">
                <Text variant="subtitle1">Phone number</Text>
                <Text variant="caption">{`${patient.phoneNumber}`}</Text>
              </Box>
            </Box>
            <Box className="flex flex-wrap gap-4 justify-evenly">
              <Box className="text-center">
                <Text variant="subtitle1">Treatment type</Text>
                <Text variant="caption">{`${patientBookingDetails?.treatmentType}`}</Text>
              </Box>
              <Box className="text-center">
                <Text variant="subtitle1">Doctor allocated</Text>
                <Text variant="caption">{`${
                  disease.find(
                    (item) =>
                      item.doctorAssociated.id ===
                      patientBookingDetails?.doctorId
                  )?.doctorAssociated.name
                }`}</Text>
              </Box>
              <Box className="text-center">
                <Text variant="subtitle1">Appointment date time</Text>
                <Text variant="caption">{`${patientBookingDetails?.dateAndTime}`}</Text>
              </Box>
            </Box>
            <Box className="flex flex-wrap gap-4 justify-evenly">
              <Box className="text-center">
                <Text variant="subtitle1">Booking Id</Text>
                <Text variant="caption">{`#${patientBookingDetails?.id}`}</Text>
              </Box>
              <Box className="text-center">
                <Text variant="subtitle1">Patient Id</Text>
                <Text variant="caption">{`#${patient?.id}`}</Text>
              </Box>
            </Box>
          </Box>
          <Box className="my-5">
            <Text variant="h4">Select Doctors</Text>
            <Box className="flex flex-wrap justify-evenly gap-4 my-5">
              {doctors.map((doctor) => (
                <Box
                  onClick={() => handleSelectDoctor(doctor)}
                  className={`w-[200px] h-[200px] rounded-full relative cursor-pointer ${
                    selectedDoctors.includes(doctor)
                      ? "border-8 border-primary"
                      : ""
                  }`}
                >
                  <img
                    src={doctor.profilePic}
                    alt={doctor.fullName}
                    className="w-full h-full object-fill rounded-full"
                  />
                  <Box className="flex justify-center flex-col items-center w-full h-full bg-gradient-to-tr from-slate-500 absolute top-0 left-0 rounded-full">
                    <Text className="text-white font-bold" variant="subtitle1">
                      {`${doctor.honorific}.${doctor.fullName}`}
                    </Text>
                    <Text className="text-white" variant="caption">
                      {doctor.expertise.join(", ")}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="h-[200px] w-full overflow-auto border-2 border-dashed">
            <Text variant="h6">Terms & Condition</Text>
            <Text variant="body1">
              Please read through ALL the information below before signing. The
              surgery will take a copy and will keep it in your personal records
              to show you agreed to the practices terms and conditions.
              Disclosure I the patient agree to disclose all material facts
              regarding my health to my general practitioner and other clinical
              staff. Treatment of staff I agree with the policy of zero
              tolerance of abuse towards all staff, also not to behave in an
              abusive, threatening or otherwise aggressive manner with any
              member of the practice. I Acknowledge the right of the practice to
              remove me from the surgery list without appeal should I behave in
              a manner prohibited. Repeat prescription I agree to request any
              repeat prescriptions two full working days before collection and
              give three full working days when a bank holiday arises. I
              understand I can only request prescriptions within the surgery by
              filling out a form or online, I cannot request over the telephone.
              Complaints I understand that if I am dissatisfied with the
              services at Herschel Medical Centre, I must speak to a senior
              member of staff or write my complaint in writing. Confidentiality
              Herschel medical centre declares that all matters and information
              pertaining to the patient shall not be released without the
              patients consent. Appointments and emergency appointments I agree
              to attend on time for all appointments that I book with the
              practice and cancel any I cannot attend in advance but contacting
              the surgery or personally information the member of staff at
              reception. I acknowledge that if I arrive late for an appointment,
              I may be asked to rebook for another time. I agree to only use
              emergency appointments for medical conditions that require
              immediate treatment. Home visits I shall only request a home visit
              from the practice under circumstances where I cannot physically
              attend the practice for an appointment. Chaperones I understand
              that a chaperone is available for any consultation at any stage
              and that I can request this via the reception staff or any clinic
              staff.
            </Text>
            <Box className="text-center">
              <Checkbox
                onChange={({ target: { checked } }) => {
                  setAgree(checked);
                }}
              />{" "}
              I agree to the terms and conditions
            </Box>
          </Box>
          <Box onClick={handleSubmit} className="w-full text-center my-2">
            <Button
              disabled={!agree || selectedDoctors.length === 0}
              label="Submit"
            />
          </Box>
        </Box>
      ) : (
        <>
          <Box className="w-full gap-2 flex justify-center items-center">
            <Input
              label="phoneNumber"
              onChange={({ target: { value } }) => setPhoneNumber(value)}
              placeholder="Enter phone number"
              value={phoneNumber}
            />
            <Button
              label="Get Patient"
              onClick={() => onGetPatientClick(phoneNumber)}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default PatientAndDoctorAllocation;
