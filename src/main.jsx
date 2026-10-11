import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CreateTask from './components/createTask.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CreateTask />
  </StrictMode>,
)
