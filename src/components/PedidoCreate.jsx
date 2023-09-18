import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const PedidoCreate = () => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedido, setPedido] = useState({
    clienteId: '',
    detalles: [],
  });
  const [errorCliente, setErrorCliente] = useState('');
  const [errorProductos, setErrorProductos] = useState('');

  useEffect(() => {
    // Cargar la lista de clientes al montar el componente
    Axios.get('http://localhost:8080/api/clientes')
      .then((res) => {
        setClientes(res.data);
      });

    // Cargar la lista de productos al montar el componente
    Axios.get('http://localhost:8080/api/productos')
      .then((res) => {
        setProductos(res.data);
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPedido((prevPedido) => ({
      ...prevPedido,
      [id]: value,
    }));
    setErrorCliente(''); // Limpiar el mensaje de error
  };

  const handleDetalleChange = (productoId, cantidad) => {
    const detalles = [...pedido.detalles];
    const detalleIndex = detalles.findIndex((d) => d.productoId === productoId);

    if (cantidad === '0') {
      // Si la cantidad es cero, eliminar el detalle
      detalles.splice(detalleIndex, 1);
    } else {
      if (detalleIndex !== -1) {
        detalles[detalleIndex].cantidad = cantidad;
      } else {
        detalles.push({ productoId, cantidad });
      }
    }

    setPedido((prevPedido) => ({
      ...prevPedido,
      detalles,
    }));
    setErrorProductos(''); // Limpiar el mensaje de error
  };

  const handleSubmit = () => {
    if (!pedido.clienteId) {
      setErrorCliente('Debe seleccionar un cliente.');
      return;
    }

    if (pedido.detalles.length === 0) {
      setErrorProductos('Debe seleccionar al menos un producto.');
      return;
    }

    // Realizar la solicitud para crear un pedido
    console.log(pedido);
    Axios.post('http://localhost:8080/api/pedidos', pedido)
      .then((res) => {
        // Manejar la respuesta del servidor después de crear el pedido
        console.log('Pedido creado:', res.data);
        alert('Pedido registrado'); // Mostrar alerta
      })
      .catch((error) => {
        // Manejar errores en caso de que la solicitud falle
        console.error('Error al crear el pedido:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h4>Registro de Pedido</h4>
      <form>
        <div className="form-group">
          <label htmlFor="clienteId">Seleccionar Cliente<span className="text-danger">*</span></label>
          <select
            className="form-control"
            id="clienteId"
            name="clienteId"
            value={pedido.clienteId}
            onChange={handleChange}
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
        <div className="form-group">
          <h5>Seleccionar Productos<span className="text-danger">*</span></h5>
          <div className="row">
            {productos.map((producto) => (
              <div key={producto.id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">${producto.precio}</p>
                    {producto.stock === 0 ? (
                      <div className="text-danger">Producto Agotado</div>
                    ) : (
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`producto-${producto.id}`}
                          value={producto.id}
                          onChange={(e) => {
                            handleDetalleChange(producto.id, e.target.checked ? '1' : '0');
                          }}
                        />
                        <label className="form-check-label" htmlFor={`producto-${producto.id}`}>
                          Seleccionar
                        </label>
                        <div className="form-group mt-2">
                          <input
                            type="number"
                            className="form-control"
                            min="1"
                            max={producto.stock}
                            placeholder={`Stock: ${producto.stock}`}
                            onChange={(e) => {
                              handleDetalleChange(producto.id, e.target.value);
                            }}
                          />
                          {errorProductos && <p className="text-danger">{errorProductos}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link to="/pedido" className="btn btn-primary mt-3">
          Regresar a la lista de pedidos
        </Link>
        <button
          type="button"
          className="btn btn-success ml-2"
          onClick={handleSubmit}
        >
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default PedidoCreate;
