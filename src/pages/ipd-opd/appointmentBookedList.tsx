import {
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, DateTimePicker, Modal, Text } from "src/common/components";
import { disease } from "src/common/const";
import { useApi } from "src/hooks";
import { ApiMethods, Booking } from "src/model";

interface IProps {}
const AppointmentBookedList: React.FC<IProps> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Booking | null>();
  const [fetchAllAppointment, fetchAllAppointmentState] =
    useApi<Array<Booking>>();
  const [updateAppointment, updateAppointmentState] = useApi();
  useEffect(() => {
    fetchAllAppointment("/ipd-opd/patient/all/appointments", ApiMethods.GET);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSort = useCallback(
    (sortBy: string) => {
      if (fetchAllAppointmentState.data) {
        const sortedAppointments = [...fetchAllAppointmentState.data];
        sortedAppointments.sort((a: any, b: any) => {
          if (a[sortBy] < b[sortBy]) {
            return -1;
          }
          if (a[sortBy] > b[sortBy]) {
            return 1;
          }
          return 0;
        });
        return sortedAppointments;
      }
    },
    [fetchAllAppointmentState]
  );
  const handleAppointmentUpdate = useCallback(() => {
    toast
      .promise(
        updateAppointment("/ipd-opd/patient/book-appointment", ApiMethods.PUT, {
          ...selectedAppointment,
          isCancelled: cancelModal,
        }),
        { loading: "Updating appointment", success: "Done", error: "Error" }
      )
      .then(() => {
        window.location.reload();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAppointment, cancelModal]);
  return (
    <>
      <Box className="flex bg-none justify-center items-center flex-col">
        {fetchAllAppointmentState.loading ? (
          <CircularProgress className="text-center" />
        ) : (
          <TableContainer className="bg-none" component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">#</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Doctor</TableCell>
                  <TableCell align="right">Treatment</TableCell>
                  <TableCell align="right">Appointment Time</TableCell>
                  <TableCell align="right">Booking Date</TableCell>
                  <TableCell align="right">Ward</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSort("dateAndTime")?.map(
                  (data: Booking, index: number) => (
                    <TableRow key={data.id}>
                      <TableCell align="right">
                        {moment(+data.dateAndTime) <= moment() && (
                          <CheckCircle className="text-green-500" />
                        )}
                      </TableCell>
                      <TableCell align="right">{index + 1}</TableCell>
                      <TableCell align="right">{data.patientName}</TableCell>
                      <TableCell align="right">{data.phoneNumber}</TableCell>
                      <TableCell align="right">
                        {
                          disease.find(
                            (item) => item.doctorAssociated.id === data.doctorId
                          )?.doctorAssociated.name
                        }
                      </TableCell>
                      <TableCell align="right">{data.treatmentType}</TableCell>
                      <TableCell align="right">
                        {`${moment(+data.dateAndTime).format(
                          "DD MMM YYYY HH:mm"
                        )} (${moment(+data.dateAndTime).fromNow()})`}
                      </TableCell>
                      <TableCell align="right">
                        {data?.updatedAt
                          ? moment(+data?.updatedAt).fromNow()
                          : "-"}
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          className="w-16 text-white"
                          label={data.wardType}
                          color={
                            data.wardType === "IPD" ? "primary" : "secondary"
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Box className="flex w-full gap-3 justify-end">
                          <Button
                            disabled={moment(+data.dateAndTime) <= moment()}
                            onClick={() => {
                              setSelectedAppointment(data);
                              setOpenModal(true);
                            }}
                            label="Reschedule"
                          />
                          <Button
                            disabled={moment(+data.dateAndTime) <= moment()}
                            onClick={() => {
                              setSelectedAppointment(data);
                              setCancelModal(true);
                            }}
                            style={{ background: "tomato" }}
                            label="Cancel"
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="flex justify-center items-center bg-white p-5 w-[300px] h-[300px]">
          <Box className="text-left">
            <Text align="left">Select date & time</Text>
            <DateTimePicker
              minDate={new Date()}
              value={
                new Date(
                  parseInt(
                    selectedAppointment?.dateAndTime || Date.now().toString()
                  )
                )
              }
              onChange={(date) => {
                if (selectedAppointment)
                  setSelectedAppointment({
                    ...selectedAppointment,
                    dateAndTime: date.getTime().toString(),
                  });
              }}
            />
            <Box className="my-5 w-full text-center">
              <Button
                loading={updateAppointmentState.loading}
                onClick={handleAppointmentUpdate}
                label={"Reschedule"}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal open={cancelModal} onClose={() => setCancelModal(false)}>
        <Box className="bg-white w-[300px] h-[150px] p-5 flex flex-col justify-center items-center">
          <Text variant="h5">Sure you want to cancel?</Text>
          <Box className="w-full flex justify-between items-center my-5">
            <Button
              onClick={() => setCancelModal(false)}
              label={"No"}
              color="primary"
            />
            <Button
              onClick={handleAppointmentUpdate}
              label={"Cancel"}
              style={{ background: "#112435" }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AppointmentBookedList;
