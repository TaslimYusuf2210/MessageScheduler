import { useEffect, useState } from "react";
import ViewTaskCard from "./viewTaskCard";
import { getDatabase } from "@/utils/storage";
import type { TaskFormData } from "@/types/frequency";

function ViewTask() {
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
                <div>
                    {Database && Database.length > 0 ? (
                        Database.map((item, index) => (
                        <ViewTaskCard
                        key={index}
                        title={item.messageTitle}
                        message={item.message}
                        startDate={item.selectedDate}
                        recipients={item.recipients}
                        time={item.time}
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