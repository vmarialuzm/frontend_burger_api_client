const Order = ({ orden, finalizarOrden, incrementarProducto, decrementarProducto }) => {

  const total = orden.products.reduce((acum, item) => acum + (item.qty * item.product.price), 0);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Order del Cliente: {orden.client}
      </h1>
      <ul className="divide-y divide-gray-200 mb-4">

        {orden.products.map((item, index) => (
          <li key={index} className="flex items-center justify-between py-2">
            
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-600">
                Subtotal: {item.qty * item.product.price}
              </p>
            </div>

            <div className="flex items-center">
              <button 
                onClick={() => decrementarProducto(item.product.id)} 
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded-l"
              >
                -
              </button>

              <span className="mx-2">{item.qty}</span>

              <button 
                onClick={() => incrementarProducto(item.product.id)} 
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded-r"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-xl font-semibold text-right mb-4">
        Total: {total}
      </p>
      <button 
        onClick={finalizarOrden}
        className="w-full py-3 bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold rounded-xl"
      >
        Enviar a cocina
      </button>
    </div>
  );
};

export default Order;