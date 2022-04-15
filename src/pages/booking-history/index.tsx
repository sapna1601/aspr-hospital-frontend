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
import moment from "moment";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Footer, HeaderAndDrawer, Text } from "src/common/components";
import { disease } from "src/common/const";
import { useApi } from "src/hooks";
import { ApiMethods, Booking } from "src/model";

const BookingHistory = () => {
  const searchParams = useLocation().search;
  const patientId = searchParams.split("=")[1];
  const [fetchBookings, fetchBookingState] = useApi<Array<Booking>>();
  useEffect(() => {
    fetchBookings(`/ipd-opd/patient/bookings/${patientId}`, ApiMethods.GET);
  }, []);
  return (
    <>
      <HeaderAndDrawer showHamburgerIcon={false} />
      <Text variant="h4" align="left">
        Your Booking History
      </Text>
      <Box className="flex bg-none justify-start items-center flex-col min-h-screen">
        {fetchBookingState.loading ? (
          <CircularProgress className="text-center" />
        ) : fetchBookingState.error || !fetchBookingState.data ? (
          <Text>Data not available</Text>
        ) : (
          <TableContainer className="bg-none" component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">#</TableCell>
                  <TableCell align="right">Doctor</TableCell>
                  <TableCell align="right">Treatment</TableCell>
                  <TableCell align="right">Appointment Time</TableCell>
                  <TableCell align="right">Booking Date</TableCell>
                  <TableCell align="right">Ward</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchBookingState.data.map((data, index) => (
                  <TableRow>
                    <TableCell align="right">{index + 1}</TableCell>
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
                        ? `${moment(+data.updatedAt).format(
                            "DD MMM YYYY HH:mm"
                          )} (${moment(+data.updatedAt).fromNow()})`
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default BookingHistory;
