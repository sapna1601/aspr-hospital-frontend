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
import { AssignmentTurnedIn } from "@material-ui/icons";
import React from "react";
import { Button, FooterV2, HeaderAndDrawer, Text } from "src/common/components";
import useFinanceContainer from "src/pages/finance/container";

const FinanceScreen: React.FC<{}> = () => {
  const { fetchPendingApprovalsState, handleAction, updateRfpState } =
    useFinanceContainer();
  return (
    <>
      <HeaderAndDrawer showHamburgerIcon={false} />
      <Box>
        <Text className="float-left p-4" variant="h4">
          RFP Approval
        </Text>
        <TableContainer component={Paper}>
          {fetchPendingApprovalsState.loading ? (
            <CircularProgress className="text-center" />
          ) : fetchPendingApprovalsState.data &&
            fetchPendingApprovalsState.data.length ? (
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Requested quantity</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchPendingApprovalsState.data?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">
                      <Box className="flex justify-between items-center w-[200px]">
                        <Button
                          disabled={updateRfpState.loading}
                          onClick={() => handleAction(row.id, "Approved")}
                          label="Accept"
                        />
                        <Button
                          disabled={updateRfpState.loading}
                          onClick={() => handleAction(row.id, "Rejected")}
                          label="Reject"
                          style={{ background: "tomato" }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Box className="w-full flex justify-center items-center gap-4">
              <Text variant="h4">No RFP</Text>
              <AssignmentTurnedIn fontSize="large" />
            </Box>
          )}
        </TableContainer>
      </Box>
      <FooterV2 />
    </>
  );
};

export default FinanceScreen;
