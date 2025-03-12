import { Link, useNavigate } from "react-router-dom";

const links = [
    {
        name: "Login",
        href: "./login"
    },
    {
        name: "Home",
        href: "./home"
    },
]

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    //Función para manejar el cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('login');
    }

    return (
        <header className="bg-blue-500 text-white dark:bg-blue-900 dark:text-gray-200">
            <nav className="container mx-auto flex justify-between items-center py-4">
                {/* Logo o Título */}
                <a href="#" className="font-bold text-xl">Burger Queen</a>

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
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
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