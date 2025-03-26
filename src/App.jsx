import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Opciones from "./pages/Opciones";
import Pedidos from "./pages/Pedidos";

function App() {

  // Estado para verificar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') ? true : false
  );

  return (

    <div>
      <Router>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ?
                <Navigate to="/opciones" /> :
                <Login setIsAuthenticated={setIsAuthenticated} />
            }
          />

          <Route 
            path="/home" 
            element={
              isAuthenticated ?
                <Home/>:
                <Navigate to="/login" />
            }
          />

          <Route 
            path="/opciones" 
            element={
              isAuthenticated ?
                <Opciones/>:
                <Navigate to="/login" />
            }
          />

          <Route
            path="/pedidos"
            element={
              isAuthenticated ?
                <Pedidos/>:
                <Navigate to="/login" />
            }
          />
          
          <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App
