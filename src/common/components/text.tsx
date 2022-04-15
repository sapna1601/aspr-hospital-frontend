import React from "react";
import { Typography } from "@material-ui/core";

type IProps = React.ComponentProps<typeof Typography> & {};

const Text: React.FC<IProps> = ({
  variant = "body1",
  align = "center",
  children,
  ...props
}) => {
  return (
    <Typography align={align} variant={variant} {...props}>
      {children}
    </Typography>
  );
};

export default Text;
