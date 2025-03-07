import Card from "./components/Card"
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
          <div className="grid grid-cols-2 gap-2">
            <Card title="Card1" description="Esta es una descripción"/>
            <Card title="Card2" description="Esta es una descripción"/>
            <Card title="Card3" description="Esta es una descripción"/>
            <Card title="Card4" description="Esta es una descripción"/>
          </div>

          <div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
