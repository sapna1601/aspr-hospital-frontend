import React, { useState } from "react";
import { Box, CircularProgress, Divider } from "@material-ui/core";
import {
  Button,
  DropDown,
  FooterV2,
  HeaderAndDrawer,
  Input,
  Modal,
  Text,
} from "src/common/components";
import BasicTabs from "src/pages/inventory/components/tabWindow";
import { selectDropDownOptions } from "src/pages/inventory/dummy";
import useInventoryContainer from "./container";

interface IProps {}

const Inventory: React.FC<IProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { handleOnChange, rfpFormState, handleCreateRfp, createRfpState } =
    useInventoryContainer();
  return (
    <>
      <HeaderAndDrawer />
      <Box className="w-full flex justify-between items-center p-5">
        <Text variant="h4">Inventory</Text>
        <Button
          onClick={() => setOpen(true)}
          className="bg-primary"
          label="Create RFP"
        />
      </Box>
      <Divider />
      <Box>
        <BasicTabs></BasicTabs>
        <Modal onClose={() => setOpen(false)} open={open}>
          <Box className="flex flex-col p-5 md:w-[50%] w-[40%] sm:w-[90%] min-h-[40%] bg-white">
            <Text variant="h4">Raise RFP</Text>
            <Box className="my-5 w-full">
              <DropDown
                className={"w-full"}
                name="productName"
                placeholder="Product Name"
                variant="outlined"
                selectedValue={rfpFormState.productName}
                options={selectDropDownOptions}
                label="Select Goods"
                onChange={handleOnChange}
              />
            </Box>
            <Box className="my-5 w-full">
              <Input
                className={"w-full"}
                label="Quantity"
                name="quantity"
                type="number"
                value={rfpFormState.quantity}
                onChange={handleOnChange}
              />
            </Box>
            <Box className="mx-auto w-10/12">
              <Button
                disabled={createRfpState.loading}
                startIcon={
                  createRfpState.loading ? (
                    <CircularProgress size={"15px"} />
                  ) : null
                }
                onClick={handleCreateRfp}
                className="w-full"
                label="Create"
              />
            </Box>
          </Box>
        </Modal>
      </Box>
      <FooterV2 />
    </>
  );
};

export default Inventory;
