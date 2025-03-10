import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ query, agregarProducto }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/products/products?tipo=${query}`)
                if (!response.ok) {
                    throw new Error('Error al obtener los productos')
                }
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    },[query]);

    if (isLoading) {
        return <p>Cargando...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div className="grid grid-cols-2 gap-2 rounded-xl ">
            {products.map(product => (
                <ProductCard key={product.id} product={product} agregarProducto={agregarProducto} />
            ))}
        </div>
    );
};

export default ProductList;