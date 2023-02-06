import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router";


const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
