import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './context/CartProvider';
import { LoggedProvider } from './context/LoggedProvider';
import { PayPalScriptProvider} from '@paypal/react-paypal-js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <PayPalScriptProvider options={{"client-id":"AUbSon9E4qiofNdazFznUqhwZazpMoQK_9DqQTf2x9UBKTNkVfSMgVU1mubvJQxwdRXKWMKsNu8B0h-4"}}>
    <CartProvider>
      <LoggedProvider>
        <App />
      </LoggedProvider>
    </CartProvider>
  </PayPalScriptProvider>
  </BrowserRouter>
);


