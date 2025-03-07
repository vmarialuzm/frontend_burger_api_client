const Card = ({ title, description }) => {
    return (
        <div className="p-4 bg-pink-500 rounded-xl">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default Card;