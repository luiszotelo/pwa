import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout  from './Layout/Layout.jsx'
import ReactDOM from 'react-dom/client'
import ConfirmTravel from "./components/ConfirmTravel.jsx";
import MapProveedor from "./components/MapProveedor.jsx";
import 'antd/dist/reset.css'
import MapCliente from "./components/MapCliente.jsx";
ReactDOM.createRoot(document.getElementById('root')).render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/confirm/:origin/:destiny" element={<ConfirmTravel />} />
            <Route path="/travel/proveedor/:idService" element={<MapProveedor />} />
            <Route path = "/travel/cliente/:idService" element={<MapCliente />} />
          </Route>
        </Routes>
      </BrowserRouter>
)
