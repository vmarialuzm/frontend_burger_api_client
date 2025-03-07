const Filtros = () => {
    return (
        <div className="grid grid-cols-3 gap-3">
            <button className="p-4 bg-green-300 rounded-xl">Desayuno</button>
            <button className="p-4 bg-red-300 rounded-xl">Almuerzo</button>
            <button className="p-4 bg-orange-300 rounded-xl">Cena</button>
        </div>
    );
};

export default Filtros;