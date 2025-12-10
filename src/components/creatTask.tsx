import { useState } from "react";
import DatePicker from "./datePicker";
import TimePicker from "./timePicker";

function CreateTask() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

    return ( 
        <div className="py-6 px-4">
            <header>Schedule a Message</header>
            <hr className="border-gray-400"/>
            <form action="">
            <div className="w-full flex gap-2">
                <div className="w-full flex flex-col items-start">
                    <label className="font-medium">Scheduled Date</label>
                    <div className="p-2 border border-gray-400 rounded-md w-full">
                    <DatePicker 
                    onDateChange={setSelectedDate}
                    className={"w-full"}>
                    </DatePicker>
                    </div>
                </div>
                <div className="w-[40%] flex flex-col items-start">
                    <label className="font-medium">Scheduled Time</label>
                    <div className=" border border-gray-400 rounded-md w-full p-2">
                    <TimePicker selectedDate={selectedDate}></TimePicker>
                    </div>
                </div>
            </div>

            </form>
        </div>
     );
}

export default CreateTask;