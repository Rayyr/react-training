import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Card from './Profile Card/Card.jsx';
import reportWebVitals from './reportWebVitals';
import me from './me.png';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

        <App >
           <Card
            name="Raya Khasati"
            description=" Computer Engineering student with passion in software development both frontend and backend"
            profileImg={me}
          />
        </App >

   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
