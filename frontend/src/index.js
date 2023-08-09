import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom' 
import './index.css';
import reportWebVitals from './reportWebVitals';
import Admin from './screens/admins';
import './App.css';
import Student from './screens/students';
import Teacher from './screens/teachers';

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/",
    element: <Student />
  },
  {
    path: "/student",
    element: <Student />
  },
  {
    path: "/teacher",
    element: <Teacher />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
