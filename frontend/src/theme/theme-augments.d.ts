import { PaletteColor, PaletteColorOptions } from "@mui/material/styles";
import { ButtonPropsColorOverrides } from "@mui/material/Button";
import { ChipPropsColorOverrides } from "@mui/material/Chip";
import { CheckboxPropsColorOverrides } from "@mui/material/Checkbox";

declare module "@mui/material/styles" {
  interface Palette {
    primaryAlt: Palette["primary"];
    primaryContrast: Palette["primary"];
    secondaryAlt: Palette["primary"];
    border: Palette["primary"];
    scrollbar: Palette["primary"];
    label: Palette["primary"];

    tagYellow: Palette["primary"];
    tagYellowAlt: Palette["primary"];
    tagBlue: Palette["primary"];
    tagBlueAlt: Palette["primary"];
    tagGreen: Palette["primary"];
    tagGreenAlt: Palette["primary"];
    tagRed: Palette["primary"];
    tagRedAlt: Palette["primary"];

    textColor: {
      title: string;
      subtitle: string;
      body1: string;
      body2: string;
    };

    surface: {
      lighter: string;
      light: string;
      main: string;
      darkTranslucent: string;
    };
  }

  interface PaletteOptions {
    primaryAlt?: Palette["primary"];
    primaryContrast?: Palette["primary"];
    secondaryAlt?: Palette["primary"];
    border?: Palette["primary"];
    scrollbar?: Palette["primary"];
    label?: Palette["primary"];

    tagYellow?: Palette["primary"];
    tagYellowAlt?: Palette["primary"];
    tagBlue?: Palette["primary"];
    tagBlueAlt?: Palette["primary"];
    tagGreen?: Palette["primary"];
    tagGreenAlt?: Palette["primary"];
    tagRed?: Palette["primary"];
    tagRedAlt?: Palette["primary"];

    textColor?: {
      title?: string;
      subtitle?: string;
      body1?: string;
      body2?: string;
    };

    surface?: {
      lighter?: string;
      light?: string;
      main?: string;
      darkTranslucent?: string;
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primaryAlt: true;
    secondaryAlt: true;
    label: true;
    tagYellow: true;
    tagYellowAlt: true;
    tagBlue: true;
    tagBlueAlt: true;
    tagGreen: true;
    tagGreenAlt: true;
    tagRed: true;
    tagRedAlt: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    primaryAlt: true;
    secondaryAlt: true;
    label: true;
    tagYellow: true;
    tagYellowAlt: true;
    tagBlue: true;
    tagBlueAlt: true;
    tagGreen: true;
    tagGreenAlt: true;
    tagRed: true;
    tagRedAlt: true;
  }
}

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsColorOverrides {
    primaryAlt: true;
    secondaryAlt: true;
    label: true;
    tagYellow: true;
    tagYellowAlt: true;
    tagBlue: true;
    tagBlueAlt: true;
    tagGreen: true;
    tagGreenAlt: true;
    tagRed: true;
    tagRedAlt: true;
  }
}
