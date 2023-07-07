import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './context/store/store.js'
import Layout  from './Layout/Layout.jsx'
import ReactDOM from 'react-dom/client'
import ConfirmTravel from "./components/ConfirmTravel.jsx";
import MapProveedor from "./components/MapProveedor.jsx";
import 'antd/dist/reset.css'
import './index.css'
import MapCliente from "./components/MapCliente.jsx";
import LabelMaps from './components/LabelMaps.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element={<LabelMaps/>}/>
            <Route path="/confirm/:origin/:destiny" element={<ConfirmTravel />} />
            <Route path="/travel/proveedor/:idService" element={<MapProveedor />} />
            <Route path = "/travel/cliente/:idService" element={<MapCliente />} />
          </Route>
        </Routes>
      </BrowserRouter>
</Provider>
)
