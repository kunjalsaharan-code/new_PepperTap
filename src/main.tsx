import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App"; // make sure App.tsx exists here
import "./styles/index.css"; // remove this line if you don't have index.css

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
