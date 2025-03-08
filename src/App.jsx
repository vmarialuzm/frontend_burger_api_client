import { useState } from "react"
import ProductList from "./components/ProductList"
import Navbar from "./components/Navbar"
import Filtros from "./components/Filtros"

function App() {
  const [query, setQuery] = useState('desayuno')

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
          <Filtros setQuery={setQuery} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ProductList query={query} />

          <div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
