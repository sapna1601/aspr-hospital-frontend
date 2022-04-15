import { createTheme } from "@material-ui/core";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#67C5AD",
    },
    secondary: {
      main: "#112435",
    },
  },
});

export default theme;
