import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';  
import Portfolio from './Portfolio.jsx';  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);