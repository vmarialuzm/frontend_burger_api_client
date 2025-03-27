import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import ProductList from "../components/ProductList"
import Filtros from "../components/Filtros"
import Order from "../components/Order"


const Home = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('desayuno')

    // Estado para la orden completa
    const [orden, setOrden] = useState({
      client: '',
      products: []
    })

    const [qty, setQty] = useState(1)

    // Función para establecer el cliente
    const setClient = (nombre) => {
      setOrden({
        ...orden,
        client: nombre
      })
    }

    // Función para agregar producto a la orden
    function agregarProducto(producto) {
    // Verificar si el producto ya existe en la orden
    const productoExistente = orden.products.findIndex(
      item => item.product.id === producto.id
    )

    let nuevosProductos = [...orden.products]

    if (productoExistente >= 0) {
      nuevosProductos[productoExistente].qty += qty
    } else {
      nuevosProductos.push({
        qty: qty,
        product: producto
      })
    }

    // Actualizar la orden
    setOrden({
      ...orden,
      products: nuevosProductos
    })

    setQty(1)
  }

  // Función para cambiar la cantidad antes de agregar
  const cambiarCantidad = (cantidad) => {
    cantidad += 1
    setQty(cantidad)
  }

  const finalizarOrden = async () => {
    // Transformar el arrays de productos para enviar solo el id del producto
    const payload = {
      ...orden,
      products: orden.products.map(item => ({
        qty: item.qty,
        product: item.product.id
      }))
    };

    // Verificar que client no esté vacío
    if (!payload.client) {
      console.log("El cliente no ha sido establecido");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/orders/orders/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log(data.total)
      if (data.total === "0.00") {
        Swal.fire({
          title: "No se puede enviar una orden sin productos",
          icon: "error",
          draggable: true
        });
        return;
      }
      if (response.ok) {
        Swal.fire({
          title: "Orden creada con éxito!",
          icon: "success",
          draggable: true
        });
        navigate("/pedidos")
      
      } else {
        console.log("Error al enviar la orden");
      }
    } catch (error) {
      console.log("Error en la solicitud", error);
    }
  };

  useEffect(() => {
    const clienteGuardado = localStorage.getItem('client');
    if (clienteGuardado) {
      setOrden(prev => ({...prev, client: clienteGuardado}))
    }
  }, []);

  // funciones para dar interactividad a mis botones
  const incrementarProducto = (productoId) => {
    const nuevosProductos = orden.products.map(item => {
      if (item.product.id === productoId) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    setOrden({ ...orden, products: nuevosProductos });
  };

  const decrementarProducto = (productoId) => {
    const nuevosProductos = orden.products.map(item => {
      if (item.product.id === productoId && item.qty > 1) {
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    setOrden({ ...orden, products: nuevosProductos });
  };

  const eliminarProducto = (productoId) => {
    const nuevosProductos = orden.products.filter(item => 
      item.product.id !== productoId
    );
    setOrden({ ...orden, products: nuevosProductos });
  };

  
  return (
    <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
            <Filtros setQuery={setQuery} />
        </div>

        <div className="grid grid-cols-2 gap-2">
            <ProductList 
              query={query} 
              agregarProducto={agregarProducto} 
            />

            {/* Aquí va el componente de orden */}
            {/* componente orden tiene la tarea de listar los productos de la orden y calcular el total */}
            <Order 
              orden={orden} 
              finalizarOrden={finalizarOrden}
              cambiarCantidad={cambiarCantidad}
              incrementarProducto={incrementarProducto}
              decrementarProducto={decrementarProducto}
              eliminarProducto={eliminarProducto}
            />
        </div>
    </div>
  )
}

export default Home
