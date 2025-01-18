import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ScheduleForm from './SheduleForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScheduleForm />
  </StrictMode>,
)
