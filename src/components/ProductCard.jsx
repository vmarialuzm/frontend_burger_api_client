const ProductCard = ({product, agregarProducto}) => {
    return (
        <div className="p-4 hover:bg-gray-300 transition-colors"
            onClick={() => agregarProducto(product)}>
            <img className="mt-1 rounded-2xl" src={product.image} alt={product.name} />
            <h2 className="font-bold text-xl">{product.name}</h2>
            <p className="mt-1">{product.price}</p>
        </div>
    );
};

export default ProductCard;