import {useState} from "react";
import ProductList from "../components/ProductList"
import Filtros from "../components/Filtros"
import Order from "../components/Order"


const Home = () => {

    const [query, setQuery] = useState('desayuno')
    // usestate para la orden actual
    const [orden, setOrden] = useState([])

    // funcion agregar producto a la orden
    function agregarProducto(producto) {
    // agregar producto a la orden
    setOrden([...orden, producto])
    console.log(producto)
  }
    
  return (
    <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
            <Filtros setQuery={setQuery} />
        </div>

        <div className="grid grid-cols-2 gap-2">
            <ProductList query={query} agregarProducto={agregarProducto} />

            {/* Aquí va el componente de orden */}
            {/* componente orden tiene la tarea de listar los productos de la orden y calcular el total */}
            <Order orden={orden} />
        </div>
    </div>
  )
}

export default Home
