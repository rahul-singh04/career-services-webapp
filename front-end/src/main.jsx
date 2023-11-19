import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";

const lightTheme = {
  palette: {
    mode: "light",
  },
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider value={lightTheme}>
      <HashRouter>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
