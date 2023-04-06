import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import axios from "axios";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

axios.defaults.baseURL = "http://localhost:8080"
axios.defaults.withCredentials = true;

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!); // createRoot(container!) if you use TypeScript

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
);