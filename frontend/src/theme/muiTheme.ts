import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

const borderRadius = "8px";

let muiTheme: Theme = createTheme({
  typography: {
    fontFamily: "Noto Sans SC, sans-serif",
  },
  palette: {
    tonalOffset: { light: 0.4, dark: 0.2 },
    primary: {
      main: "#B5502E",
      contrastText: "#F4EAD8",
    },
    secondary: {
      main: "#C4A98C",
      contrastText: "#3A1B14",
    },
  },
});

muiTheme = createTheme(muiTheme, {
  palette: {
    primaryAlt: muiTheme.palette.augmentColor({
      color: {
        main: "#E4C687",
        dark: "#EFD9A3",
      },
    }),
    primaryContrast: muiTheme.palette.augmentColor({
      color: {
        main: "#F4EAD8",
        contrastText: "#3A1B14",
      },
    }),
    secondaryAlt: muiTheme.palette.augmentColor({
      color: {
        main: "#3A1B14",
        contrastText: "#F1EBE0",
      },
    }),
    label: muiTheme.palette.augmentColor({
      color: {
        main: "#F1EBE0",
        contrastText: "#5C4A3A",
      },
    }),
    tagYellow: muiTheme.palette.augmentColor({
      color: {
        main: "#d68902",
        contrastText: "#f1ede6",
      },
    }),
    tagYellowAlt: muiTheme.palette.augmentColor({
      color: {
        main: "#f6d78d",
        contrastText: "#674203",
      },
    }),
    tagBlue: muiTheme.palette.augmentColor({
      color: {
        main: "#0185b9",
        contrastText: "#e4f0f5",
      },
    }),
    tagBlueAlt: muiTheme.palette.augmentColor({
      color: {
        main: "#c1dce5",
        contrastText: "#0d4e69",
      },
    }),
    tagGreen: muiTheme.palette.augmentColor({
      color: {
        main: "#337b00",
        contrastText: "#DCE8C8",
      },
    }),
    tagGreenAlt: muiTheme.palette.augmentColor({
      color: {
        main: "#c9e6ad",
        contrastText: "#244806",
      },
    }),
    tagRed: muiTheme.palette.augmentColor({
      color: {
        main: "#b91209",
        contrastText: "#F0D5CC",
      },
    }),
    tagRedAlt: muiTheme.palette.augmentColor({
      color: {
        main: "#F0D5CC",
        contrastText: "#8e120b",
      },
    }),
    textColor: {
      title: "#3A1B14",
      subtitle: "#B5502E",
      body1: "#5C4A3A",
      body2: "#8A7561",
    },
    surface: {
      lighter: "#F1EBE0",
      light: "#F4EAD8",
      main: "#E8DCC9",
      darkTranslucent: "rgba(34, 34, 34, 0.1)",
    },
    border: {
      light: "#f9df9e99",
      main: "#C4A98C",
      dark: "#f9df9e40",
    },
    scrollbar: {
      main: "#000000 #00000000",
    },
  },
});

muiTheme = createTheme(muiTheme, {
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius,
          backgroundColor: "#E8DCC9",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          letterSpacing: ".02rem",
          textIndent: ".02rem",
        },
        startIcon: {
          marginRight: "0.4rem",
        },
        endIcon: {
          marginLeft: "0.4rem",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: 0,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius,
        },
      },
    },
  },
});

export default muiTheme;
