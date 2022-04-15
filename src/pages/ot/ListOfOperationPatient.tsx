import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TableChart, Warning } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Button, Modal, Text } from "src/common/components";
import { useApi } from "src/hooks";
import { ApiMethods } from "src/model";

const ListOfPatient = ({ OperationPatientList = [] }) => {
  const [openModalState, setOpenModalState] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateStateApi] = useApi();
  const handleSelectItem = useCallback((item: any) => {
    setSelectedItem(item);
    setOpenModalState(true);
  }, []);
  const updateState = useCallback(
    (state) => {
      toast
        .promise(
          updateStateApi(
            `/ot/status/${selectedItem?.id}/${state}`,
            ApiMethods.PUT
          ),
          {
            loading: "Updating...",
            success: "Done!",
            error: "Error",
          }
        )
        .then(() => {
          setOpenModalState(false);
        });
    },
    [selectedItem]
  );
  return (
    <Box className="min-h-screen">
      {OperationPatientList?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="right">#</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Treatment</TableCell>
                <TableCell align="right">Operation Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {OperationPatientList?.map((item: any, index) => (
                <TableRow key={item.id}>
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="right">{`${item.firstName} ${item.lastName}`}</TableCell>
                  <TableCell align="right">{item.treatmentType}</TableCell>
                  {item.operation ? (
                    <TableCell align="right">{item.operation}</TableCell>
                  ) : (
                    <TableCell align="right">
                      <IconButton onClick={() => handleSelectItem(item)}>
                        <Warning htmlColor="red" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box className="w-full flex justify-center items-center gap-4">
          <Text variant="h4">No Patient</Text>
          <TableChart fontSize="large" />
        </Box>
      )}
      <Modal open={openModalState} onClose={() => setOpenModalState(false)}>
        <Box className="bg-white w-[400px] h-[300px] flex justify-center items-center flex-col">
          <Text className="p-5" variant="h4">
            Update State
          </Text>
          <Box className="flex gap-4">
            <Button
              onClick={() => updateState("Birth")}
              style={{ background: "green" }}
              label="Birth"
            />
            <Button
              onClick={() => updateState("Death")}
              style={{ background: "tomato" }}
              label="Death"
            />
            <Button onClick={() => updateState("Succeed")} label="Succeed" />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ListOfPatient;
