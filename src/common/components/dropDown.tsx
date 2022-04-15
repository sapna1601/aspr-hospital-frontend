import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { DropDownOption } from "src/model";

type DropDownProps = React.ComponentProps<typeof Select> & {
  options: Array<DropDownOption>;
  selectedValue: string;
};

const DropDown: React.FC<DropDownProps> = ({
  options,
  selectedValue,
  label = "Select",
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        label={label}
        {...props}
      >
        {options.map((option: DropDownOption) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
