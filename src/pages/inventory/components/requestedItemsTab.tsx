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
  Tooltip,
} from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useApi } from "src/hooks";
import { ApiMethods } from "src/model";

interface IProps {}
const RequestedItems: React.FC<IProps> = () => {
  const [fetchPendingApprovals, fetchPendingApprovalsState] =
    useApi<Array<any>>();

  useEffect(() => {
    fetchPendingApprovals("/rfp", ApiMethods.GET);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getStatusColor = (status: "Pending" | "Approved" | "Rejected") => {
    switch (status) {
      case "Pending":
        return "text-yellow-300";
      case "Approved":
        return "text-green-600";
      case "Rejected":
        return "text-orange-600";
      default:
        return "text-danger-600";
    }
  };
  return (
    <Box className="flex justify-center">
      {fetchPendingApprovalsState.loading ? (
        <CircularProgress className="text-center" />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Requested quantity</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchPendingApprovalsState.data?.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">
                    <Tooltip title={row.status}>
                      <FiberManualRecord
                        className={getStatusColor(row.status)}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default RequestedItems;
