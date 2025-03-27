import { useState, useEffect } from 'react';
import { DndContext, pointerWithin, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import PedidoCard from './PedidoCard';
import Column from './Column';

const PedidosList = () => {

    const [columns, setColumns] = useState({
        'pending': [],
        'in_preparation': [],
        'ready': [],
        'cancelled': []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activePedido, setActivePedido] = useState(null);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/orders/orders`)
                if (!response.ok) {
                    throw new Error('Error al obtener los pedidos')
                }
                const data = await response.json()
                // Group orders by status
                const grouped = {
                    'pending': [],
                    'in_preparation': [],
                    'ready': [],
                    'cancelled': []
                };
                data.forEach((pedido) => {
                    const status = pedido.status;
                    if (grouped[status]){
                        grouped[status].push(pedido);
                    }
                });
                setColumns(grouped);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPedidos();
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/orders/orders/${orderId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el estado del pedido');
            }
        } catch (error) {
            console.error('Error al actualizar el estado del pedido', error);
        }
    };

    const handleDragStart = (event) => {
        const { active } = event;
        // Buscar en qué columna se encuentra el pedido arrastrado
        let pedidoFound = null;
        for (const status in columns) {
            const found = columns[status].find((pedido) => pedido.id === active.id);
            if (found) {
                pedidoFound = found;
                break;
            }
        }
        setActivePedido(pedidoFound);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) {
            setActivePedido(null);
            return;
        }

        // Identificar columna de origen
        let sourceStatus = null;
        for (const status in columns) {
            if (columns[status].some((pedido) => pedido.id === active.id)) {
                sourceStatus = status;
                break;
            }
        }

        // Identificar columna de destino
        let destinationStatus = null;

        // 1) Si el over.id coincide directamente con una de tus columnas,
        //    es que se soltó en el contenedor vacío de esa columna.
        if (Object.keys(columns).includes(over.id)) {
            destinationStatus = over.id;
        } else {
            // 2) De lo contrario, buscar en qué columna está el ítem "over.id"
            //    (por si lo soltó sobre otro pedido).
            for (const status in columns) {
                if (columns[status].some((pedido) => pedido.id === over.id)) {
                    destinationStatus = status;
                    break;
                }
            }
        }

        // Si no se identifica destinationStatus, se asume que sigue en la misma columna
        if (!destinationStatus) {
            destinationStatus = sourceStatus;
        }

        if (sourceStatus && destinationStatus) {
            if (sourceStatus === destinationStatus) {
                // Reordenar en la misma columna
                const items = columns[sourceStatus];
                const oldIndex = items.findIndex(pedido => pedido.id === active.id);
                const newIndex = items.findIndex(pedido => pedido.id === over.id);
                if (oldIndex !== newIndex) {
                    const newItems = arrayMove(items, oldIndex, newIndex);
                    setColumns({ ...columns, [sourceStatus]: newItems });
                }
            } else {
                // Mover pedido de una columna a otra
                const sourceItems = [...columns[sourceStatus]];
                const destItems = [...columns[destinationStatus]];
                const movingIndex = sourceItems.findIndex(pedido => pedido.id === active.id);
                if (movingIndex === -1) {
                    setActivePedido(null);
                    return;
                }
                const [movingPedido] = sourceItems.splice(movingIndex, 1);
                // Acttualizar el estado del pedido
                movingPedido.status = destinationStatus;
                // Se agrega al inicio de la lista de la nueva columna 
                destItems.unshift(movingPedido);
                setColumns({ 
                    ...columns, 
                    [sourceStatus]: sourceItems, 
                    [destinationStatus]: destItems 
                });
                // Actualizar el backend con el nuevo estado
                updateOrderStatus(movingPedido.id, destinationStatus);
            }
        }
        setActivePedido(null);
    };

    if (isLoading) return <p>Cargando...</p>
    if (error) return <p>Error: {error}</p>
    

    return (
        <DndContext 
            collisionDetection={pointerWithin} 
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex justify-between p-4 space-x-4">
                {Object.keys(columns).map(status => (
                    <Column key={status} id={status}>
                        <SortableContext 
                            items={columns[status]}
                            strategy={verticalListSortingStrategy}
                        >
                            {columns[status].map(pedido => (
                                <PedidoCard key={pedido.id} pedido={pedido} />
                            ))}
                        </SortableContext>
                    </Column>
                ))}
            </div>
            <DragOverlay>
                {activePedido ? <PedidoCard pedido={activePedido} /> : null}
            </DragOverlay>
        </DndContext>
    );
};

export default PedidosList;
