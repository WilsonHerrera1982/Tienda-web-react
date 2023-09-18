import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="mt-4">
      <h2 className="display-4">Bienvenido a la Tienda-App</h2>
      <p className="lead">
        Esta es la página de inicio de la Tienda-App.
        Seleccione una opción del menú de navegación para continuar.
      </p>
    </div>
  );
}

function ClienteList() {
  return (
    <div className="container mt-4">
      <h2>Listado de Clientes</h2>
      {/* Contenido de la lista de clientes */}
    </div>
  );
}

function TiendaList() {
  return (
    <div className="container mt-4">
      <h2>Listado de Tiendas</h2>
      {/* Contenido de la lista de tiendas */}
    </div>
  );
}

function ProductoList() {
  return (
    <div className="container mt-4">
      <h2>Listado de Productos</h2>
      {/* Contenido de la lista de productos */}
    </div>
  );
}

function PedidoList() {
  return (
    <div className="container mt-4">
      <h2>Listado de Pedidos</h2>
      {/* Contenido de la lista de pedidos */}
    </div>
  );
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">Inicio</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/cliente" className="nav-link">Cliente</Link>
              </li>
              <li className="nav-item">
                <Link to="/tienda" className="nav-link">Tienda</Link>
              </li>
              <li className="nav-item">
                <Link to="/producto" className="nav-link">Producto</Link>
              </li>
              <li className="nav-item">
                <Link to="/pedido" className="nav-link">Pedido</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cliente" element={<ClienteList />} />
        <Route path="/tienda" element={<TiendaList />} />
        <Route path="/producto" element={<ProductoList />} />
        <Route path="/pedido" element={<PedidoList />} />
      </Routes>
    </div>
  );
}

export default App;
