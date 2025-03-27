const Filtros = ({ setQuery }) => {
    return (
        <div className="grid grid-cols-3 gap-3 font-bold">
            <button 
                className="p-4 border-2 border-[#30a65e] hover:bg-[#30a65e] transition-colors rounded-xl"
                onClick={() => setQuery('desayuno')}
            >
                Desayuno
            </button>

            <button 
                className="p-4 border-2 border-[#30a65e] hover:bg-[#30a65e] transition-colors rounded-xl"
                onClick={() => setQuery('almuerzo')}
            >
                Almuerzo
            </button>

            <button 
                className="p-4 border-2 border-[#30a65e] hover:bg-[#30a65e] transition-colors rounded-xl"
                onClick={() => setQuery('cena')}
            >
                Cena
            </button>
        </div>
    );
};

export default Filtros;