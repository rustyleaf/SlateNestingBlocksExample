import React from "react";
import ReactDOM from "react-dom";
import DivExample from "./DivExample";

import "./";
import "./styles.css";

function App() {
  return <DivExample />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
