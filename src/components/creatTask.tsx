import { useState } from "react";
import DatePicker from "./datePicker";
import TimePicker from "./timePicker";
import SelectPlatform from "./selectPlatform";
import FrequencySelection from "./frequencySelection";

function CreateTask() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [finalDate, setFinalDate] = useState<Date | undefined>(new Date())
    const [repeat, setRepeat] = useState(false)

    return ( 
        <div className="py-6 px-4">
            <header className="text-left text-xl mb-1 font-semibold">Schedule a Message</header>
            <hr className="border-gray-200"/>
            <form action="" className="space-y-3 px-2 py-4">
                <div className="w-full flex gap-2">
                    <div className="w-full flex flex-col items-start">
                        <label className="font-medium">Scheduled Date</label>
                        <div className="p-2 border border-gray-200 rounded-md w-full">
                        <DatePicker 
                        disabled={false}
                        onDateChange={setSelectedDate}
                        className={"w-full"}>
                        </DatePicker>
                        </div>
                    </div>
                    <div className="w-[40%] flex flex-col items-start">
                        <label className="font-medium">Scheduled Time</label>
                        <div className=" border border-gray-200 rounded-md w-full p-2">
                        <TimePicker selectedDate={selectedDate}></TimePicker>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start w-full">
                    <label className="font-medium">Message Title</label>
                    <input type="text" className="p-2 w-full rounded-md border border-gray-200"/>
                </div>
                <div className="flex flex-col items-start w-full">
                    <label className="font-medium">Message</label>
                    <textarea rows={4} className="p-2 w-full rounded-md border border-gray-200"/>
                </div>
                <div className="flex flex-col text-left w-full">
                    <label className="font-medium">Platform</label>
                    <SelectPlatform></SelectPlatform>
                </div>
                <div className="flex flex-col items-start w-full">
                    <label className="font-medium">Recepient(s)</label>
                    <div className="flex w-full gap-6 border-gray-300 border rounded-md p-2">
                        <input type="text" className="p-2 w-full rounded-md border border-gray-200"/>
                        <button className="bg-green-400 rounded-md text-white py-2 px-4 font-medium">Add</button>
                    </div>
                </div>
                <hr />
                <p>(Optional)</p>
                <div className="space-y-2 flex gap-5">
                    <FrequencySelection></FrequencySelection>
                </div>
                <div className="border border-white pt-4 border-t-gray-200 flex justify-between">
                    <button className="border border-red-600 py-1 px-4 rounded-2xl bg-white text-red-500 hover:text-white hover:bg-red-600 cursor-pointer">Cancel</button>
                    <button className="border py-1 px-4 rounded-2xl bg-green-500 text-white cursor-pointer hover:bg-green-600">Add Schedule</button>
                </div>
            </form>
        </div>
     );
}

export default CreateTask;