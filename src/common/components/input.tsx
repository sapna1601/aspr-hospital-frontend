import React from "react";
import { TextField } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const StyledInput = styled(TextField)(() => ({
  "& .MuiFormHelperText-root": {
    margin: 0,
  },
}));
type MyInput = React.ComponentProps<typeof StyledInput> & {};

const Input: React.FC<MyInput> = ({
  variant = "outlined",
  label = "",
  type = "text",
  value = "",
  onChange = () => {},
  onBlur = () => {},
  error = false,
  ...props
}) => {
  return (
    <StyledInput
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      variant={variant}
      {...props}
    />
  );
};

export default Input;
