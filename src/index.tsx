import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  // <React.StrictMode>
  <StyledEngineProvider injectFirst>
    <App />
    <Toaster position="top-center" />
  </StyledEngineProvider>
  // {/* </React.StrictMode> */}
);
