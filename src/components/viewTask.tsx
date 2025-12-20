import { useEffect, useState } from "react";
import ViewTaskCard from "./viewTaskCard";
import { getDatabase } from "@/utils/storage";
import type { TaskFormData } from "@/types/frequency";
import { deleteMessage } from "@/utils/storage";

interface ViewTaskProps {
    onHandleEdit: (task: TaskFormData) => void;
}

function ViewTask({onHandleEdit}: ViewTaskProps) {
    const [taskToEdit, setTaskToEdit] = useState<TaskFormData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleEdit(task: TaskFormData) {
        setTaskToEdit(task);
        setIsModalOpen(true);
    }
    function handleDelete(id:string) {
        console.log("Delete:", id)
            deleteMessage("scheduledMessage", id)
        const updatedDatabase = Database?.filter(item => item.id !== id)
        setDataBase(updatedDatabase)
        }
    const [Database, setDataBase] = useState<TaskFormData[]>()
    useEffect(() => {
        const data = getDatabase("scheduledMessage")
        console.log(data)
        setDataBase(data)
        console.log(Database)
    }, [])
    return ( 
        <div className="py-6 px-4 text-left space-y-2">
            <header className="text-xl font-bold">Active Task</header>
            <hr className="border-2"/>
            <div className="w-full">
                <div className="space-y-4">
                    {Database && Database.length > 0 ? (
                        Database.map((item, index) => (
                        <ViewTaskCard
                        key={index}
                        title={item.messageTitle}
                        message={item.message}
                        startDate={item.selectedDate}
                        recipients={item.recipients}
                        frequency={item.frequency}
                        time={item.time}
                        endDate={item.endDate}
                        onDelete={() => handleDelete(item.id)}
                        onEdit={() => onHandleEdit(item)}
                        id={item.id}
                        />

                        ))
                    ):
                    <div>

                    </div>

                    }
                </div>
            </div>
        </div>
     );
}

export default ViewTask;