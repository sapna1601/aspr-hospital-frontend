import {
  Avatar,
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  Button,
  DateTimePicker,
  DropDown,
  Input,
  Modal,
  Text,
} from "src/common/components";
import { disease } from "src/common/const";
import { useApi } from "src/hooks";
import { ApiMethods, Doctor, Patient } from "src/model";
import * as yup from "yup";

export const ChatStartMessage: React.FC<{}> = () => {
  useEffect(() => {
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    speech.text =
      "Hi, I'm your personal healthcare assistant. Please choose your option";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }, []);
  return (
    <Box>
      <Text>
        Hi, I'm your personal healthcare assistant. I can help you with
      </Text>
    </Box>
  );
};

interface IChatOption {
  selectedOption: (option: string) => void;
  disabledOptions?: boolean;
}
export const ChooseOption: React.FC<IChatOption> = ({
  selectedOption,
  disabledOptions = false,
}) => {
  const [value, setValue] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectedOption(event.target.value);
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <>
      <Box>
        <Text variant="h6">Choose an option</Text>
      </Box>
      <Box>
        <FormControl disabled={disabledOptions}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={handleChange}
            value={value}
          >
            <FormControlLabel
              value="appointment"
              control={<Radio color="primary" />}
              label="Book Appointment"
            />
            <FormControlLabel
              value="suggestion"
              control={<Radio color="primary" />}
              label="Doctor Suggestion"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export const DoctorsSuggestion: React.FC<{}> = () => {
  const [fetchDoctors, doctorRecord] = useApi<Array<Doctor>>();
  const [selectedDisease, setSelectedDisease] = useState<string>("");

  const handleDiseaseClick = useCallback((disease) => {
    setSelectedDisease(disease);
  }, []);
  useEffect(() => {
    fetchDoctors("/hospital/doctors", ApiMethods.GET);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Box className="flex flex-col gap-5">
        <Text>Choose Disease</Text>
        {[
          "cancer",
          "dengu",
          "diabetes",
          "corona",
          "general physician",
          "obstetrician",
        ].map((item) => (
          <Box
            onClick={() => handleDiseaseClick(item)}
            className="p-4 shadow-2xl cursor-pointer"
          >
            <Text>{item}</Text>
          </Box>
        ))}
      </Box>
      <Box>
        {doctorRecord.data?.map?.((item) => {
          return item.expertise.includes(selectedDisease) ? (
            <Box className="p-5 mt-5 flex flex-col mx-10 justify-center w-60 items-center relative">
              <Avatar
                style={{ height: "100px", width: "100px" }}
                alt="Remy Sharp"
                src={item.profilePic}
              />
              <Text variant="subtitle1">{`${item.honorific}. ${item.fullName}`}</Text>
              <Text variant="caption">{item.expertise.join(", ")}</Text>
            </Box>
          ) : null;
        })}
      </Box>
    </>
  );
};

/**
 *
 * @returns
 */
export const BookAppointmentOption: React.FC<{}> = () => {
  const [patientDetails, setPatientDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    doctorId: "",
    treatmentType: "",
    dateAndTime: new Date(),
  });
  const [otp, setOtp] = useState<number>(0);
  const [showOtpModal, setOtpShowModal] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showInputs, setShowInputs] = useState(false);
  const [showBookSuccessMessage, setShowBookSuccessMessage] = useState(false);
  const [fetchPatientByPhoneNumber, fetchPatientByPhoneNumberState] =
    useApi<Patient>();
  const [bookOnline, bookOnlineState] = useApi();
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPatientDetails({
        ...patientDetails,
        [event.target.name]: event.target.value,
      });
    },
    [patientDetails]
  );
  const [sendOtp] = useApi();
  const [verifyOtp] = useApi();

  const checkPatientExistOrNot = useCallback(() => {
    //verify mobile number using regex
    if (patientDetails.phoneNumber.match(/^[0-9]{10}$/)) {
      toast
        .promise(
          sendOtp(
            `/authUser/sendOtp/${patientDetails.phoneNumber}`,
            ApiMethods.GET
          ),
          {
            loading: "Sending OTP...",
            success: "OTP sent successfully",
            error: "Something went wrong",
          }
        )
        .then(() => {
          setOtpShowModal(true);
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    } else {
      toast.error("Please enter valid phone number");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientDetails]);

  const [diseaseSelect, setDiseaseSelect] = useState<string>("");
  const handleDiseaseSelect = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const value = event.target.value as string;
    const findDisease = disease.find((d: any) => d.name === value);
    setDiseaseSelect(value);
    setPatientDetails({
      ...patientDetails,
      treatmentType: value,
      doctorId: findDisease?.doctorAssociated.id || "",
    });
  };

  const handleVerifyOtpClick = useCallback(() => {
    verifyOtp("/authUser/verifyOtp", ApiMethods.POST, {
      otp: otp,
      phoneNumber: patientDetails.phoneNumber,
    })
      .then(() => {
        setOtpShowModal(false);
        toast.success("OTP verified successfully");
        if (patientDetails.phoneNumber) {
          fetchPatientByPhoneNumber(
            `/ipd-opd/patient/${patientDetails.phoneNumber}`,
            ApiMethods.GET
          )
            .then((res) => {
              setPatient(res.data);
              setShowInputs(true);
            })
            .catch((err) => {
              setPatient(null);
              setShowInputs(true);
            });
        }
      })
      .catch(() => {
        toast.error("Wrong OTP");
      });
  }, [patientDetails, otp]);

  const handleBookClick = useCallback(() => {
    let payload = {};
    if (patient) {
      const { id, ...rest } = patient;
      payload = { ...patientDetails, patientId: id, ...rest };
    } else {
      payload = { ...patientDetails };
    }
    const schema = yup.object().shape({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      age: yup.number().typeError("Invalid age").required("Age is required"),
      phoneNumber: yup.string().required("Phone number is required"),
      treatmentType: yup.string().required("Treatment type is required"),
      dateAndTime: yup.date().required("Date and time is required"),
    });
    if (payload.age <= 0) {
      toast.error("Age should be greater than 0");
      return;
    }
    schema
      .validate(payload)
      .then(() => {
        bookOnline(`/hospital/book-request`, ApiMethods.POST, payload).then(
          () => {
            setShowBookSuccessMessage(true);
            let speech = new SpeechSynthesisUtterance();
            speech.lang = "en-US";
            speech.text =
              "Your appointment has been sent, once our admin member accept your request we will inform you through SMS. Thanks for choosing us";
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;

            window.speechSynthesis.speak(speech);
          }
        );
      })
      .catch((err) => {
        toast.error(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientDetails, patient]);

  return (
    <>
      {!showBookSuccessMessage ? (
        <Box className="">
          {!showInputs && (
            <Box className="flex items-center justify-between">
              <Input
                placeholder="Enter mobile number"
                value={patientDetails.phoneNumber}
                onChange={handleChange}
                type="number"
                label="Mobile number"
                name="phoneNumber"
              />
              {fetchPatientByPhoneNumberState.loading ? (
                <CircularProgress />
              ) : (
                <IconButton onClick={checkPatientExistOrNot}>
                  <Send color="secondary" />
                </IconButton>
              )}
            </Box>
          )}
          {showInputs && (
            <Box className="flex items-center flex-col justify-between">
              {!patient && (
                <>
                  <Box className="my-2 w-full">
                    <Input
                      value={patientDetails.firstName}
                      onChange={handleChange}
                      label="First name"
                      name="firstName"
                    />
                  </Box>
                  <Box className="my-2 w-full">
                    <Input
                      value={patientDetails.lastName}
                      onChange={handleChange}
                      label="Last name"
                      name="lastName"
                    />
                  </Box>
                  <Box className="my-2 w-full">
                    <Input
                      value={patientDetails.age}
                      onChange={handleChange}
                      label="Age"
                      name="age"
                      type={"number"}
                    />
                  </Box>
                  <Box className="my-2 w-full">
                    <Input
                      value={patientDetails.phoneNumber}
                      onChange={handleChange}
                      disabled
                      type="number"
                      label="Phone number"
                      name="phoneNumber"
                    />
                  </Box>
                </>
              )}
              {patient && (
                <Text variant="caption">{`Hello, ${patient.firstName} please book your appointment`}</Text>
              )}
              <Box className="my-2 w-full">
                <DropDown
                  className="w-full"
                  selectedValue={diseaseSelect}
                  variant="outlined"
                  onChange={handleDiseaseSelect}
                  label="Treatment Type"
                  options={disease.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))}
                />
              </Box>
              <Box>
                <DateTimePicker
                  minDate={new Date()}
                  onChange={(date) =>
                    setPatientDetails({ ...patientDetails, dateAndTime: date })
                  }
                  value={patientDetails.dateAndTime}
                  className="w-full"
                />
              </Box>
              <Button
                loading={bookOnlineState.loading}
                onClick={handleBookClick}
                style={{ marginTop: "4px" }}
                label="Book"
              />
            </Box>
          )}
          <Modal open={showOtpModal} onClose={() => setOtpShowModal(false)}>
            <Box className="flex items-center justify-center w-[300px] h-[300px] bg-white flex-col gap-5">
              <Input
                type={"number"}
                value={otp}
                onChange={({ target: { value } }) => {
                  setOtp(value);
                }}
                placeholder="Enter Otp"
                label={"Otp"}
              />
              <Button label="verify" onClick={handleVerifyOtpClick} />
            </Box>
          </Modal>
        </Box>
      ) : (
        <Box>
          <Text>
            Your appointment has been sent, once our admin member accept your
            request we will inform you through SMS
          </Text>
        </Box>
      )}
    </>
  );
};
