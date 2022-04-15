import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TableChart } from "@material-ui/icons";
import React, { useState } from "react";
import {
  Button,
  DropDown,
  FooterV2,
  HeaderAndDrawer,
  Input,
  Modal,
  Text,
} from "src/common/components";
import { disease } from "src/common/const";
import useOnlineBookings from "src/pages/onlineAppointments/container";

const OnlineAppointments: React.FC<{}> = () => {
  const {
    bookingState,
    handleAction,
    openModal,
    selectRecord,
    handleModalClose,
    handleSelectRecord,
    setSelectRecord,
  } = useOnlineBookings();
  const [wordType, setWordType] = useState<string>("");
  const handleWardTypeSelect = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const value = event.target.value as "IPD" | "OPD";
    setWordType(value);
    setSelectRecord({ ...selectRecord, wardType: value });
  };
  return (
    <>
      <HeaderAndDrawer />
      <Box className="min-h-screen">
        <Text className="float-left p-4" variant="h4">
          Online Bookings
        </Text>
        <TableContainer component={Paper}>
          {bookingState.loading ? (
            <CircularProgress className="text-center" />
          ) : bookingState.data?.length > 0 ? (
            <>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">#</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">phone</TableCell>
                    <TableCell align="right">Doctor</TableCell>
                    <TableCell align="right">Treatment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookingState.data?.map((row: any, index: number) => (
                    <TableRow
                      key={row.id}
                      className="hover:bg-red-400 cursor-pointer hover:shadow-xl"
                      onClick={() => {
                        handleSelectRecord(row);
                      }}
                    >
                      <TableCell align="right">{index + 1}</TableCell>
                      <TableCell align="right">{`${row.firstName} ${row.lastName}`}</TableCell>
                      <TableCell align="right">{row.phoneNumber}</TableCell>
                      <TableCell align="right">
                        {
                          disease.find(
                            (item) => item.doctorAssociated.id === row.doctorId
                          )?.doctorAssociated.name
                        }
                      </TableCell>
                      <TableCell align="right">{row.treatmentType}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <Box className="w-full flex justify-center items-center gap-4">
              <Text variant="h4">No Patient</Text>
              <TableChart fontSize="large" />
            </Box>
          )}
        </TableContainer>
      </Box>
      <Modal
        open={openModal}
        onClose={() => {
          handleModalClose();
          setWordType("");
        }}
      >
        <Box className="w-[400px] min-h-[400px] bg-white flex flex-col justify-center items-center">
          {selectRecord && (
            <>
              <Box className="mt-2">
                <Input
                  disabled
                  label="Name"
                  value={`${selectRecord.firstName} ${selectRecord.lastName}`}
                />
              </Box>
              <Box className="mt-2">
                <Input
                  disabled
                  label="Treatment"
                  value={`${selectRecord.treatmentType}`}
                />
              </Box>
              <Box className="mt-2">
                <Input
                  disabled
                  label="DateAndTime"
                  value={`${selectRecord.dateAndTime}`}
                />
              </Box>
              <Box className="my-3 w-1/2">
                <DropDown
                  className="w-full"
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
              {wordType && (
                <Box>
                  <Button
                    onClick={() => handleAction("Accept")}
                    label="Accept"
                  />
                  <Button
                    onClick={() => handleAction("Reject")}
                    label="Reject"
                    style={{ backgroundColor: "tomato" }}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Modal>
      <FooterV2 />
    </>
  );
};

export default OnlineAppointments;
