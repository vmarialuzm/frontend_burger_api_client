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
            className="p-4 my-4 rounded-xl shadow-xl border-2 border-[#30a65e] bg-white hover:bg-[#30a65e] transition-colors hover:text-white "
        >
            <h2 className="font-bold text-xl">{pedido.client}</h2>
            <p className="mt-1">{pedido.status}</p>
            <p className="mt-1">{pedido.total}</p>
        </div>
    )
};

export default PedidoCard;