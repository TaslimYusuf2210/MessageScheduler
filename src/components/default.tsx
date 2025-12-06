function DefaultPage() {
    return ( 
        <div className="text-center px-4 py-6 space-y-8">
            <header className="text-3xl font-bold">Message Scheduler</header>
            <div className="flex justify-between items-end">
                <p className="text-green-400 hover:text-green-600 text-lg">View tasks list</p>
                <button className="bg-green-400 rounded-4xl py-1 px-2 hover:bg-green-600 font-semibold text-white text-lg">Add Task</button>
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
                <button className="bg-green-400 rounded-4xl py-1 px-2 hover:bg-green-600 font-semibold text-white text-lg">Add Task</button>
            </div>
        </div>
     );
}

export default DefaultPage;