import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const PedidoList = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [errorCliente, setErrorCliente] = useState('');

  useEffect(() => {
    // Cargar la lista de clientes al montar el componente
    Axios.get('http://localhost:8080/api/clientes')
      .then((res) => {
        setClientes(res.data);
      });
  }, []);

  const handleBuscar = () => {
    if (!clienteId || !fechaInicio || !fechaFin) {
      setErrorCliente('Debe seleccionar un cliente y especificar fechas.');
      return;
    }

    // Formatear las fechas al formato deseado "YYYY/MM/DD"
    const formattedFechaInicio = formatDate(fechaInicio);
    const formattedFechaFin = formatDate(fechaFin);

    // Realizar la solicitud para obtener los pedidos
    Axios.get(`http://localhost:8080/api/pedidos/por-cliente?clienteId=${clienteId}&fechaInicio=${formattedFechaInicio}&fechaFin=${formattedFechaFin}`)
      .then((res) => {
        setPedidos(res.data);
      })
      .catch((error) => {
        console.error('Error al obtener pedidos:', error);
      });
  };

  // Función para formatear la fecha
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // Función para calcular el valor total de un pedido
  const calcularValorTotal = (pedido) => {
    let total = 0;
    pedido.detalles.forEach((detalle) => {
      total += detalle.cantidad * detalle.producto.precio;
    });
    return total;
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
      <Link to="/pedido/crear/" className="btn btn-primary">
               Nuevo Registro
            </Link>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="clienteId">Seleccionar Cliente<span className="text-danger">*</span></label>
            <select
              className="form-control"
              id="clienteId"
              name="clienteId"
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
            >
              <option value="">Seleccionar Cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
            {errorCliente && <p className="text-danger">{errorCliente}</p>}
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="fechaInicio">Fecha de Inicio<span className="text-danger">*</span></label>
            <input
              type="date"
              className="form-control"
              id="fechaInicio"
              name="fechaInicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="fechaFin">Fecha de Fin<span className="text-danger">*</span></label>
            <input
              type="date"
              className="form-control"
              id="fechaFin"
              name="fechaFin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleBuscar}
        >
          Buscar
        </button>
      </div>
      {pedidos.length > 0 && (
        <div className="row">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="col-md-4">
              <div className={`card mb-4 ${pedido.estado === 'PAGADO' ? 'bg-green' : ''}`}>
                <div className="card-body">
                  <h5 className="card-title">Pedido #{pedido.id}</h5>
                  <p><strong>Cliente:</strong> {pedido.cliente.nombre}</p>
                  <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleDateString()}</p>
                  <p><strong>Estado:</strong> {pedido.estado}</p>
                  <h6>Detalles del Pedido:</h6>
                  <ul className="list-group">
                    {pedido.detalles.map((detalle) => (
                      <li key={detalle.id} className="list-group-item">
                        <p><strong>Producto:</strong> {detalle.producto.nombre}</p>
                        <p><strong>Cantidad:</strong> {detalle.cantidad}</p>
                        <p><strong>Valor Unitario:</strong> ${detalle.producto.precio}</p>
                      </li>
                    ))}
                  </ul>
                  <p><strong>Valor Total:</strong> ${calcularValorTotal(pedido)}</p>
                  {pedido.estado !== 'PAGADO' && (
                    <Link to={`/pedido/delete/${pedido.id}`} className="btn btn-danger mt-3">
                      Eliminar
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PedidoList;
