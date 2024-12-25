import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Make sure BrowserRouter is imported
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import './index.css';

// Wrap your entire app with BrowserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
