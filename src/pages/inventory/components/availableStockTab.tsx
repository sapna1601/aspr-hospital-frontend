import {
  Avatar,
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
import React, { useEffect } from "react";
// ---- images ----
import bedIcon from "src/assets/bed.png";
import injection from "src/assets/injection.png";
import oxygenCylinder from "src/assets/oxygen-cylinder.png";
import saline from "src/assets/saline.png";
import stretcher from "src/assets/stretcher.jpg";
import { useApi } from "src/hooks";
import { ApiMethods, Inventory } from "src/model";

const getAvatar = (name: string) => {
  switch (name) {
    case "Bed":
      return bedIcon;
    case "Injection":
      return injection;
    case "Oxygen Cylinder":
      return oxygenCylinder;
    case "Saline":
      return saline;
    case "Stretcher":
      return stretcher;
    default:
      return "";
  }
};

interface IProps {}

const AvailableStock: React.FC<IProps> = () => {
  const [fetchInventory, fetchInventoryStatus] = useApi<Array<Inventory>>();
  useEffect(() => {
    fetchInventory("/inventory/", ApiMethods.GET);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box className="w-full flex justify-center">
      {fetchInventoryStatus.loading ? (
        <CircularProgress className="text-center" />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchInventoryStatus.data?.map?.((row) => (
                <TableRow key={row.name}>
                  <TableCell align="right">
                    <Avatar
                      style={{ height: "50px", width: "50px" }}
                      alt="Remy Sharp"
                      src={getAvatar(row.name)}
                    />
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AvailableStock;
