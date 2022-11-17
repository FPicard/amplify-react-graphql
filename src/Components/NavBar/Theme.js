import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const white = "#ffffff";

export const theme = createTheme({
     
    palette: {
        common: {
            white: `${white}`
        }
      },
});