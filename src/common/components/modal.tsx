import { Modal as MModal } from "@material-ui/core";
import React from "react";

type IProps = React.ComponentProps<typeof MModal> & {
  children?: React.ReactNode;
  className?: string;
  outSideClickCloseModal?: boolean;
};

const Modal: React.FC<IProps> = ({
  open = false,
  className = "",
  children,
  outSideClickCloseModal = true,
  ...props
}) => {
  return (
    <MModal
      className={`flex justify-center items-center ${className}`}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...props}
    >
      {children}
    </MModal>
  );
};

export default Modal;
