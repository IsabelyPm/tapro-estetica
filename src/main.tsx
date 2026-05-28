import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ padding: '50px', wordBreak: 'break-word', textAlign: 'center' }}>
      <h1 style={{ color: '#000', fontSize: '32px' }}>O React está funcionando!</h1>
      <p style={{ color: '#666' }}>Se você está lendo isso, o index.html e o Vite estão configurados certos.</p>
    </div>
  </React.StrictMode>,
)