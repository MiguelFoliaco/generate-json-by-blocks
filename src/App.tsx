import { ThemeProvider } from "@emotion/react";
import "./App.less";
import { Routes } from "./Routes";
import { AppProvider } from "./app/context";
import { themeUI } from "./app/theme";
import { CssBaseline } from "@mui/material";

function App() {

  return (
    <ThemeProvider theme={themeUI}>
      <CssBaseline />
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
