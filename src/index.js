import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppContextProvider from "./store/app.context";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </StrictMode>
);
