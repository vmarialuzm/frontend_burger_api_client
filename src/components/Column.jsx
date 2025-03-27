import { useDroppable } from "@dnd-kit/core";

const Column = ({ id, children }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div ref={setNodeRef} id={id} className="w-1/4 bg-gray-100 p-4 rounded min-h-[200px]">
            <h2 className="font-bold text-lg mb-2">{id}</h2>
            {children}
        </div>
    );
};

export default Column;