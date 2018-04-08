import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const group = window.location.search.split("=").slice(-1)[0];

ReactDOM.render(<App group={group} />, document.getElementById("root"));
registerServiceWorker();
