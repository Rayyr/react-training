import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import List1 from './List1';
import List2 from './List2';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <List2 />       {/*support local storage*/}
  {/*  <List1 />*/} {/*no local storage*/}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
