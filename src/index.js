import React from "react";
import './styles/tailwind.css';
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App.js";

import reducer from "./store/reducer";

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}>
    <App />
	</Provider>,
	document.getElementById("root")
);

