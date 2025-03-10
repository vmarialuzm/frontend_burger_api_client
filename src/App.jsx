import { useState } from "react"
import ProductList from "./components/ProductList"
import Navbar from "./components/Navbar"
import Filtros from "./components/Filtros"

function App() {
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
    <>
      <Navbar />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
          <Filtros setQuery={setQuery} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ProductList query={query} agregarProducto={agregarProducto} />

          <div>

          </div>
        </div>
      </div>
      // Aquí va el componente de orden
      // componente orden tiene la tarea de listar los productos de la orden y calcular el total
    </>
  )
}

export default App
