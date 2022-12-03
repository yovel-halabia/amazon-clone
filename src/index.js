import React from 'react';
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom";

import reducer, {initialState} from "./Context/Reducer";
import {StateProvider} from "./Context/StateProvider";

import App from './App';


ReactDOM.render(
  
  <BrowserRouter>
    <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    </StateProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


