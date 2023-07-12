import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./context/store/store.js";
import Layout from "./Layout/Layout.jsx";
import ReactDOM from "react-dom/client";
import MapProveedor from "./pages/MapProveedor/MapProveedor.jsx";
import "antd/dist/reset.css";
import "./index.css";
import mapboxgl from "mapbox-gl";
import { ConfirmarViaje, Home, MapCabina } from "./pages/index.js";
import MapCliente from "./pages/MapCliente/MapCliente.jsx";

mapboxgl.accessToken =import.meta.env.VITE_ACCESS_TOKEN_MB

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/confirm/travel/:idService"
            element={<ConfirmarViaje />}
          />
          <Route
            path="/travel/proveedor/:idService"
            element={<MapProveedor />}
          />
          <Route path="/travel/cliente/:idService" element={<MapCliente />} />
          <Route path="/map/cabina" element={<MapCabina />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
  </React.StrictMode>
);
