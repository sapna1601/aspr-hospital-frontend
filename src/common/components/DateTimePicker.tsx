import React from "react";
import DateTimePicker from "react-datetime-picker";
type IProps = React.ComponentProps<typeof DateTimePicker> & {
  className?: string;
  onChange: (date: Date) => void;
  value: Date;
};
const MyDateTimePicker: React.FC<IProps> = ({
  className = "",
  onChange,
  value = new Date(),
  ...props
}) => {
  return (
    <div>
      <DateTimePicker
        className={className}
        onChange={onChange}
        value={value}
        {...props}
      />
    </div>
  );
};

export default MyDateTimePicker;
