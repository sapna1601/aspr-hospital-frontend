import { Box } from "@material-ui/core";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { DropDown, Text, DateTimePicker, Button } from "src/common/components";
import { disease } from "src/common/const";
import { useApi } from "src/hooks";
import { ApiMethods, Booking, Patient } from "src/model";
import * as yup from "yup";

interface IProps {
  patientData: Patient | null;
  onBookingDone: () => void;
}
const BookAppointment: React.FC<IProps> = ({ patientData, onBookingDone }) => {
  const [dateAndTime, setDateAndTime] = useState<Date>(new Date());
  const [wordType, setWordType] = useState<string>("");
  const [diseaseSelect, setDiseaseSelect] = useState<string>("");
  const [appointmentBook, setAppointmentBook] = useState<Booking>({
    patientId: patientData?.id || "",
    doctorId: "",
    dateAndTime: "",
    paid: false,
    amount: 0,
    wardType: "",
    treatmentType: "",
    patientName: `${patientData?.firstName} ${patientData?.lastName}`,
  });
  const [bookAppointment] = useApi();

  const handleWardTypeSelect = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const value = event.target.value as "IPD" | "OPD";
    setWordType(value);
    setAppointmentBook({ ...appointmentBook, wardType: value });
  };

  const handleDiseaseSelect = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const value = event.target.value as string;
    const findDisease = disease.find((d: any) => d.name === value);
    setDiseaseSelect(value);
    setAppointmentBook({
      ...appointmentBook,
      treatmentType: value,
      doctorId: findDisease?.doctorAssociated.id || "",
    });
  };
  const handleAppointmentBook = () => {
    const schema = yup.object().shape({
      treatmentType: yup.string().required("Please select treatment type"),
      wardType: yup.string().required("Please select ward type"),
      dateAndTime: yup.string().required("Please select date and time"),
    });
    schema
      .validate(appointmentBook)
      .then(() => {
        toast
          .promise(
            bookAppointment(
              "/ipd-opd/patient/book-appointment",
              ApiMethods.POST,
              appointmentBook
            ),
            {
              loading: "Booking...",
              success: "Done",
              error: "Error",
            }
          )
          .then(() => {
            onBookingDone();
          })
          .catch((err) => {
            toast.error("Booking limit reached for today");
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <Box className="flex flex-col justify-center items-center w-ful">
      <Text className="my-5">Hello, {patientData?.firstName}</Text>
      <Box className="my-3">
        <DropDown
          className="w-[300px]"
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
      <Box className="my-3">
        <DropDown
          className="w-[300px]"
          selectedValue={wordType}
          variant="outlined"
          label="Ward type"
          onChange={handleWardTypeSelect}
          options={[
            { label: "IPD", value: "IPD" },
            { label: "OPD", value: "OPD" },
          ]}
        />
      </Box>
      <Box className="my-3">
        <DateTimePicker
          minDate={new Date()}
          onChange={(date) => {
            setDateAndTime(date);
            setAppointmentBook({
              ...appointmentBook,
              dateAndTime: date.getTime().toString(),
            });
          }}
          value={dateAndTime}
          className="w-[300px]"
        />
      </Box>
      <Button onClick={handleAppointmentBook} label={"Book"} />
    </Box>
  );
};

export default BookAppointment;
