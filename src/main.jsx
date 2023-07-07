import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout  from './components/Layout.jsx'
import ReactDOM from 'react-dom/client'
import './index.css'
import MapBox from "./components/Map.jsx";
import ConfirmTravel from "./components/ConfirmTravel.jsx";
ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/confirm/:origin/:destiny" element={<ConfirmTravel />} />
            <Route path="/travel/:idService" element={<MapBox />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
)
