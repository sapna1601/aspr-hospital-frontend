import { Button, CircularProgress } from "@material-ui/core";
import * as React from "react";

type IProps = React.ComponentProps<typeof Button> & {
  label: string;
  loading?: boolean;
};

const BasicButtons: React.FC<IProps> = ({
  label = "",
  loading = false,
  ...props
}) => {
  return (
    <Button
      color="primary"
      {...(loading
        ? {
            startIcon: (
              <CircularProgress style={{ color: "white" }} size={15} />
            ),
          }
        : {})}
      variant="contained"
      {...props}
    >
      {label}
    </Button>
  );
};

export default BasicButtons;
