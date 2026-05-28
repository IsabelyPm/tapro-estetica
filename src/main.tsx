import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router' // Importa a função do router.tsx
import './styles.css'

// Executa a função para gerar a instância do roteador no navegador
const router = getRouter()

// Renderiza o aplicativo na tela
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)