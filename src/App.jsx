import { Routes, Route } from 'react-router-dom';

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Cliente from "./pages/Cliente";
import Tienda from "./pages/Tienda";
import Producto from "./pages/Producto";
import Pedido from "./pages/Pedido";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cliente/*" element={<Cliente />} />
        <Route path="tienda/*" element={<Tienda />} />
        <Route path="producto/*" element={<Producto />} />
        <Route path="pedido/*" element={<Pedido />} />
      </Route>
      <Route path="*" element={<NotFound />} />

      {/* <Route path="/account" element={<AccountLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="edit" element={<ProfileEdit />} />
      </Route> */}
    </Routes>
  )
}

export default App