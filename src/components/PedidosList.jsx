import { useState, useEffect } from 'react';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import PedidoCard from './PedidoCard';

const PedidosList = () => {
    const [pedidos, setPedidos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/orders/orders`)
                if (!response.ok) {
                    throw new Error('Error al obtener los pedidos')
                }
                const data = await response.json()
                setPedidos(data)
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPedidos();
    }, []);

    if (isLoading) {
        return <p>Cargando...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;
        console.log("active", active.id);
        console.log("over", over.id);

        if (!active.id !== over.id) {
            setPedidos((pedidos) => {
                const oldIndex = pedidos.findIndex((pedido) => pedido.id === active.id);
                const newIndex = pedidos.findIndex((pedido) => pedido.id === over.id);
                return arrayMove(pedidos, oldIndex, newIndex);
            });
        }
        console.log("drag end");
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-4/6">
                <DndContext 
                    collisionDetection={closestCenter} 
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext 
                        items={pedidos}
                        strategy={verticalListSortingStrategy}
                    >
                        {pedidos.map(pedido => (
                            <PedidoCard key={pedido.id} pedido={pedido} />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};

export default PedidosList;
