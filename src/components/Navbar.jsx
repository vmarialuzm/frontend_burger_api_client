const Navbar = () => {
    return (
        <header className="bg-blue-500 text-white dark:bg-blue-900 dark:text-gray-200">
            <nav className="container mx-auto flex justify-between items-center py-4">
                {/* Logo o Título */}
                <a href="#" className="font-bold text-xl">Burger Queen</a>

                {/* Links de Navegación */}
                <ul className="flex space-x-4">
                    <li className="hover:text-gray-200">
                        <a href="#">Inicio</a>
                    </li>
                    <li className="hover:text-gray-200">
                        <a href="#">Acerca</a>
                    </li>
                    <li className="hover:text-gray-200">
                        <a href="#">Servicios</a>
                    </li>

                </ul>
            </nav>
        </header>
    );
};

export default Navbar;