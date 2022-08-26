import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    color : 'white',
    fontFamily: ["Montserrat", "Roboto", "Arial", "sans-serif"].join(",")
  },
  palette: {
    primary: { main: "#FF6600" },
    secondary: { main: "#FF6600" }
  },
  overrides: {
    MTableToolbar: {
      root: {
        background: "white"
      }
    },
    MuiButton: {
      root: {
        borderRadius: 0
      }
    },
    MuiTableCell: {
      root: {
        background: "white",
        fontFamily:
          ["Montserrat", "Roboto", "Arial", "sans-serif"].join(",") +
          " !important"
      }
    }
  }
});