const ProductCard = ({product}) => {
    return (
        <div className="p-4 bg-pink-500 rounded-xl text-white hover:bg-pink-600 transition-colors">
            <h2 className="font-bold text-xl">{product.name}</h2>
            <p className="mt-1">{product.price}</p>
            <img className="mt-1" src={product.image} alt={product.name} />
        </div>
    );
};

export default ProductCard;