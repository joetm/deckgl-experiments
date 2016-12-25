
// bug fix
// see http://stackoverflow.com/a/36628148/426266
require('babel-polyfill');

import React from "react";
import { render } from "react-dom";

import Flights from "./Flights.jsx";

render(
	<Flights />,
	document.getElementById("app")
);
