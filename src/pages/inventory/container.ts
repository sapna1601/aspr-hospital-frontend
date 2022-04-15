import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useApi } from "src/hooks";
import { ApiMethods } from "src/model";
import * as yup from "yup";

interface RfpFormState {
  productName: string;
  quantity: number;
  unitPrice: number;
}

const useInventoryContainer = () => {
  const [rfpFormState, setRfpFormState] = useState<RfpFormState>({
    productName: "",
    quantity: 10,
  });
  const [createRfp, createRfpState] = useApi();

  const handleOnChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ): void => {
    const { name, value } = e.target;
    if (name) {
      setRfpFormState({
        ...rfpFormState,
        [name]: value,
      });
    }
  };

  const handleCreateRfp = useCallback(() => {
    const schema = yup.object().shape({
      productName: yup.string().required("Product name is required"),
      quantity: yup
        .number()
        .typeError("Invalid quantity")
        .required("Quantity is required"),
    });
    schema
      .validate(rfpFormState)
      .then(() => {
        createRfp("/rfp", ApiMethods.POST, rfpFormState)
          .then(() => {
            toast.success("RFP Created Successfully");
            setRfpFormState({
              productName: "",
              quantity: 0,
            });
          })
          .catch(() => {
            toast.error("Error creating RFP");
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rfpFormState]);

  return {
    rfpFormState,
    handleOnChange,
    handleCreateRfp,
    createRfpState,
  };
};

export default useInventoryContainer;
