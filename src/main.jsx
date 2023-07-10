import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './context/store/store.js'
import Layout  from './Layout/Layout.jsx'
import ReactDOM from 'react-dom/client'
import MapProveedor from "./pages/MapProveedor/MapProveedor.jsx";
import 'antd/dist/reset.css'
import './index.css'
// import MapCliente from "./components/MapCliente.jsx";
import { ConfirmarViaje, Home } from './pages/index.js'
import MapCliente from './pages/MapCliente/MapCliente.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element={<Home/>}/>
            <Route path="/confirm/:origin/:destiny" element={<ConfirmarViaje />} />
            <Route path="/travel/proveedor/:idService" element={<MapProveedor />} />
            <Route path = "/travel/cliente/:idService" element={<MapCliente />} />
          </Route>
        </Routes>
      </BrowserRouter>
</Provider>
)
