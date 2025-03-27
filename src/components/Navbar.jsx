import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo_burger.png';


const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    //Función para manejar el cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('login');
    }

    return (
        <header className="bg-white font-bold drop-shadow-xl">
            <nav className="container mx-auto flex justify-between items-center py-4">
                {/* Logo o Título */}
                <Link to="/home">
                    <img src={logo} alt="Burger Queen logo" className="h-10 w-auto"/>
                </Link>

                {/* Links de Navegación */}
                <ul className="flex space-x-4">
                    {!isAuthenticated ? (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    ): (
                        <>
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            <li>
                                <Link to="/opciones">Opciones</Link>
                            </li>
                            <li>
                                <Link to="/pedidos">Pedidos</Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 font-bold rounded-xl cursor-pointer border-red-500 border-2 px-2 hover:bg-red-500 hover:text-white transition-colors"
                                >
                                    Cerrar Sesión
                                </button>
                            </li>
                        </>

                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;