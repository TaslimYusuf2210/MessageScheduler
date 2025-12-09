import { Button } from "./ui/button";
import Modal from "./Modal";
import { useState } from "react";
import CreateTask from "./creatTask";

function DefaultPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function closeModal() {
        setIsModalOpen((prev) => !prev)
    }

    return ( 
        <div className="text-center px-4 py-6 space-y-8">
            <header className="text-3xl font-bold">Message Scheduler</header>
            <div className="flex justify-between items-end">
                <p className="text-green-400 hover:text-green-600 text-lg">View tasks list</p>
                <Button 
                className="bg-green-400 flex rounded-4xl py-1 px-2 hover:bg-green-600 font-semibold text-white text-lg">
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="34" 
                height="34" 
                viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8m4-9h-3V8a1 1 0 0 0-2 0v3H8a1 1 0 0 0 0 2h3v3a1 1 0 0 0 2 0v-3h3a1 1 0 0 0 0-2"/>
                </svg>
                Add Task
                </Button>
            </div>
            <div className="text-lg flex justify-evenly items-center border rounded-full border-gray-300 py-1">
                <p className="font-medium">Time</p>
                <hr className="border w-6 rotate-90 "/>
                <p className="font-medium">Date</p>
                <hr className="border w-6 rotate-90 "/>
                <p className="font-medium">Task Title</p>
                <hr className="border w-6 rotate-90 "/>
                <p className="font-medium">Repeat</p>
            </div>
            <div className="grid place-items-center font-medium text-lg space-y-5">
                <p>
                    You don't have any pending task, <br />
                    click "Add Task" to get started.
                </p>
                <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-green-400 rounded-4xl py-1 px-2 hover:bg-green-600 font-semibold text-white text-lg"
                >
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="34" 
                height="34" 
                viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8m4-9h-3V8a1 1 0 0 0-2 0v3H8a1 1 0 0 0 0 2h3v3a1 1 0 0 0 2 0v-3h3a1 1 0 0 0 0-2"/>
                </svg>
                Add Task
                </Button>
            </div>
            <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            width="w-[40%]"
            >
                <CreateTask></CreateTask>
            </Modal>
        </div>
     );
}

export default DefaultPage;