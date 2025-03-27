import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Opciones = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [nombreCliente, setNombreCliente] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para procesar el nombre del cliente
        localStorage.setItem('client', nombreCliente);
        console.log('Nombre del cliente:', nombreCliente);

        setShowModal(false);
        setNombreCliente('');

        navigate("/home");
    };
    

    return (
        <div className="flex justify-center items-center h-screen bg-[url('/images/fondo_opciones.jpg')]">
            <div className="flex flex-col flex-grow justify-center items-center gap-6 w-full">
                <button 
                    className="w-full max-w-lg p-4 bg-gray-600 text-white rounded-xl text-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
                    onClick={() => setShowModal(true)}
                >
                    Ingresar pedido
                </button>
                <button 
                    className="w-full max-w-lg p-4 bg-pink-600 text-white rounded-xl text-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
                    onClick={() => navigate("/pedidos")}
                >
                    Ver los pedidos
                </button>
            </div>

            {/* Modal para ingresar nombre del cliente */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Ingresar Pedido</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="nombreCliente" className="block text-gray-700 mb-2">
                                    Nombre del Cliente:
                                </label>
                                <input 
                                    type="text" 
                                    id="nombreCliente"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={nombreCliente}
                                    onChange={(e) => setNombreCliente(e.target.value)}
                                    placeholder="Ingrese el nombre del cliente"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Continuar
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Opciones;