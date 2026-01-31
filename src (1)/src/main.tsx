import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App"; // assumes you have App.tsx inside src/app

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
