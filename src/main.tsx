import React from 'react'
import ReactDOM from 'react-dom/client'
import { Index } from './routes/index' // Importa o componente direto
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Renderiza o seu site maravilhoso na tela */}
    <Index />
  </React.StrictMode>,
)