import { createTheme } from "@mui/material";

export const theme: ITheme = {
  pallete: {
    primary: {
      main: "rgba(0,100,200,0.9)",
      dark: "rgba(0,50,150,0.9)",
      light: "rgba(30,150,230,0.9)",
      textConstrast: "#ffffff",
    },
    secondary: {
      dark: "rgba(200,50,100)",
      light: "rgba(200,20,150)",
      main: "rgba(240,20,150)",
      textConstrast: "#ffffff",
    },

  },
  text: {
    link: {
      size: "18 px",
    },
    paragraph: {
      size: "18px",
    },
    title: {
      size: "22px",
    },
  },
};
export const themeUI = createTheme({
  palette: {
    mode: 'dark',
    ...theme.pallete,
    background: {
      default: '#1e1e1e',
      paper: "#111111"
    }
  },
});
type IColorsTypes = "primary" | "secondary";
type TypesPropertiesColors = {
  main: string;
  light: string;
  dark: string;
  textConstrast: string;
};
type ITextTypes = "title" | "paragraph" | "link";
type TypesPropertiesText = {
  size: string;
};
export interface ITheme {
  pallete: Record<IColorsTypes, TypesPropertiesColors>;
  text: Record<ITextTypes, TypesPropertiesText>;
}
