import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#8967B3',
      dark: '#624E88',
      contrastText: '#EEEEEE'
    },
    secondary: {
      main: '#E6D9A2',
      dark: '#CB80AB'
    },
    background: {
      default: '#F5F5F5'
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: '34px',
          backgroundColor: 'white'
        }
      }
    }
  }
});

export default theme;