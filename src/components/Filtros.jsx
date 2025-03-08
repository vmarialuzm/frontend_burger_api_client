const Filtros = ({ setQuery }) => {
    return (
        <div className="grid grid-cols-3 gap-3">
            <button 
                className="p-4 bg-green-300 hover:bg-green-500 transition-colors rounded-xl"
                onClick={() => setQuery('desayuno')}
            >
                Desayuno
            </button>

            <button 
                className="p-4 bg-red-300 hover:bg-red-500 transition-colors rounded-xl"
                onClick={() => setQuery('almuerzo')}
            >
                Almuerzo
            </button>

            <button 
                className="p-4 bg-orange-300 hover:bg-orange-500 transition-colors rounded-xl"
                onClick={() => setQuery('cena')}
            >
                Cena
            </button>
        </div>
    );
};

export default Filtros;