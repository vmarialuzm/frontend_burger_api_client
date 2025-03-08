import ProductList from "./components/ProductList"
import Navbar from "./components/Navbar"
import Filtros from "./components/Filtros"

function App() {

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
          <Filtros/>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ProductList />

          <div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
