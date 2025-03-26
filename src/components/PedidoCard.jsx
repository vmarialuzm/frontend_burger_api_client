import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const PedidoCard = ({ pedido }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = 
        useSortable({ id: pedido.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div 
            style={style}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="p-4 my-4 bg-blue-500 rounded-xl shadow-xl text-white hover:bg-blue-600 transition-colors"
        >
            <h2 className="font-bold text-xl">{pedido.client}</h2>
            <p className="mt-1">{pedido.status}</p>
            <p className="mt-1">{pedido.total}</p>
        </div>
    )
};

export default PedidoCard;