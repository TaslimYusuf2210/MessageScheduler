import { useEffect, useState } from "react";
import ViewTaskCard from "./viewTaskCard";
import { getDatabase } from "@/utils/storage";
import type { TaskFormData } from "@/types/frequency";
import { deleteMessage } from "@/utils/storage";
import { clearDatabase } from "@/utils/storage";

interface ViewTaskProps {
    onHandleEdit: (task: TaskFormData) => void;
}

function ViewTask({onHandleEdit}: ViewTaskProps) {

    function handleDelete(id:string) {
        console.log("Delete:", id)
            deleteMessage("scheduledMessage", id)
        const updatedDatabase = Database?.filter(item => item.id !== id)
        setDataBase(updatedDatabase)
        }

    function handleClearHistory() {
        clearDatabase("scheduledMessage", [])
        setDataBase([])
    }
    const [Database, setDataBase] = useState<TaskFormData[]>()
    useEffect(() => {
        const data = getDatabase("scheduledMessage")
        console.log(data)
        setDataBase(data)
        console.log(Database)
    }, [])
    return ( 
        <div className="py-10 px-4 text-left space-y-2">
            <div className="flex justify-between items-center">
            <header className="text-xl font-bold">Active Task</header>
            <span onClick={handleClearHistory} className="py-1 px-2 bg-black font-medium text-white rounded-md cursor-pointer">Clear history</span>
            </div>
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
                    <div className="grid place-items-center font-medium">
                        No message has been scheduled
                    </div>

                    }
                </div>
            </div>
        </div>
     );
}

export default ViewTask;