import { Button } from "./ui/button";
import Modal from "./Modal";
import { useState } from "react";
import CreateTask from "./creatTask";
import ViewTask from "./viewTask";
import illustraion from "../assets/illustration.svg"
import type { TaskFormData } from "@/types/frequency";

function DefaultPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState<string | null>("")
    const [taskToEdit, setTaskToEdit] = useState<TaskFormData | undefined>();

    function handleEdit(task: TaskFormData) {
    setTaskToEdit(task);           // 1️⃣ store the task
    setModalContent("createTask"); // 2️⃣ switch modal content
    setIsModalOpen(true);          // 3️⃣ ensure modal is open
    }

    function closeModal() {
        setIsModalOpen((prev) => !prev)
        setTaskToEdit(undefined)
        setModalContent(null)
    }

    function handleOpenModal(modal: string) {
        console.log("working");
        
        setIsModalOpen(true)
        setModalContent(modal)
    }

    return ( 
        <div className="text-center px-4 py-6 space-y-8">
            <header className="text-3xl font-bold">Message Scheduler</header>
            <div className="flex justify-between items-end">
                <p 
                className="text-green-400 transition-all duration-300 hover:font-medium hover:cursor-pointer hover:text-green-600 text-lg"
                onClick={() => handleOpenModal("viewTask")}
                >View Tasks List</p>
                <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-green-400 flex rounded-4xl py-1 px-2 hover:bg-green-600 font-semibold text-white text-lg hover:cursor-pointer">
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="34px" 
                height="34px" 
                viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8m4-9h-3V8a1 1 0 0 0-2 0v3H8a1 1 0 0 0 0 2h3v3a1 1 0 0 0 2 0v-3h3a1 1 0 0 0 0-2"/>
                </svg>
                Add Task
                </Button>
            </div>
            <div className="text-lg flex justify-evenly items-center border rounded-lg border-gray-300 py-1">
                <p className="font-medium">Time</p>
                <hr className="border w-6 rotate-90 "/>
                <p className="font-medium">Date</p>
                <hr className="border w-6 rotate-90 "/>
                <p className="font-medium">Task Title</p>
                <hr className="border w-6 rotate-90 "/>
                <p className="font-medium">Repeat</p>
            </div>
            <div className="grid place-items-center font-medium text-lg space-y-5">
                <div className="animate-pulse">
                    <img src={illustraion} alt="illus" />
                </div>
                <p>
                    You don't have any pending task, <br />
                    click "Add Task" to get started.
                </p>
                <Button 
                onClick={() => handleOpenModal("createTask")}
                className="bg-green-400 rounded-4xl py-1 px-2 hover:bg-green-600 font-semibold text-white text-lg hover:cursor-pointer"
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
            width="w-[90%]"
            maxWidth="w-[600px]"
            bgColor="bg-gray-50"
            >
                {modalContent === "createTask" && 
                <CreateTask 
                isOpen={isModalOpen}
                taskToEdit={taskToEdit}
                // onSubmit={onsubmit}
                />}
                {modalContent === "viewTask" && 
                <ViewTask 
                onHandleEdit={handleEdit}
                />}
            </Modal>
        </div>
     );
}

export default DefaultPage;

// function handleSelect(option: "daily" | "weekly" | "monthly" | "minutes") {
//     // if (option === "minutes") {

//     //   return
//     // }
//     const frequency:Frequency = {type: option}
//     if (option === "minutes") {
//       onSelectFrequency(frequency;{interval: undefined})
//     }
//     onSelectFrequency(frequency)
//     onHandleAccess(true)
//   }

// Whenever i try to check by minute checkbox, it doesn't check like the rest of the frequency option. So i figured the problem was because i wasn't specify something for the onSelectFrequency callback send to the parent. However when i try making it send something back, typescript throws a error because whenever type === "minutes", a new property called interval is a also needed. Meanwhile at that point, interval hasn't been decided decided.

// checked={frequency?.type === "minutes"}
//               onCheckedChange={() => handleSelect("minutes")}

// This is how i'm asking it to be checked in the checkbox component