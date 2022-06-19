import React from 'react';
import ReactDOM from 'react-dom';
import reducer,{initialState} from "./Reducer";
import {StateProvider} from "./StateProvider";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';


ReactDOM.render(
  
  <BrowserRouter>
    <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    </StateProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


