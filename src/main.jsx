import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://43.201.210.211:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:5173';
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
