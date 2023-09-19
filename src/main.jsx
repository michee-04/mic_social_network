import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard'
import Inscription from "./pages/inscription/Inscription";
import Connexion from "./pages/connexion/Connexion";
import { Toaster } from "react-hot-toast";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'


/**
 * React-querry permet de gere les requêtes envoyés au serveur 
 * Initialisation de queryClient
 */
const queryClient = new QueryClient;


// Création de l'objet RouterProvider
const route = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/connexion",
    element: <Connexion />
  },
  {
    path: "/inscription",
    element: <Inscription />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <Toaster />
      <RouterProvider router={route}></RouterProvider>
      <ReactQueryDevtoolsPanel  />
    </QueryClientProvider>
  </React.StrictMode>,
)
