import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "https://www.multireligionvalsystem.eu.org/mres-website/index.css";
import App from "https://www.multireligionvalsystem.eu.org/mres-website/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
