import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css'
import './etazure.css'

import Dashboard from './Dashboard.tsx'
import Events from './Events.tsx'

/*ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Dashboard />
    <hr />
    <Events />
    <hr />
    <Devices />
  </React.StrictMode>,
)*/

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  </div>
)