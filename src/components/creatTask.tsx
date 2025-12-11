import { useState } from "react";
import DatePicker from "./datePicker";
import TimePicker from "./timePicker";
import SelectPlatform from "./selectPlatform";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";

function CreateTask() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [finalDate, setFinalDate] = useState<Date | undefined>(new Date())
    const [repeat, setRepeat] = useState(false)
    const [daily, setDaily] = useState(false)
    const [weekly, setWeekly] = useState(false)
    const [monthly, setMonthly] = useState(false)
    const [minutes, setMinutes] = useState(false)

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
                <div className="space-y-2 flex gap-5">
                    <div >
                        <div className="flex items-center gap-3">
                            <label className="font-medium">Repeat</label>
                            <Switch
                            checked={repeat}
                            onCheckedChange={setRepeat}
                            className="
                            data-[state=checked]:bg-green-500
                            "
                            >
                            </Switch>
                        </div>
                        <div className="text-left space-y-2">
                            <div className="space-x-2">
                                <Checkbox
                                disabled={!repeat}
                                checked={daily}
                                onCheckedChange={() => setDaily(!daily)}
                                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
                                ></Checkbox>
                                Daily
                            </div>
                            <div className="space-x-2">
                                <Checkbox
                                disabled={!repeat}
                                checked={weekly}
                                onCheckedChange={() => setWeekly(!weekly)}
                                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
                                ></Checkbox>
                                Weekly
                            </div>
                            <div className="space-x-2">
                                <Checkbox
                                disabled={!repeat}
                                checked={monthly}
                                onCheckedChange={() => setMonthly(!monthly)}
                                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
                                ></Checkbox>
                                Monthly
                            </div>
                            <div className="space-x-2 flex items-center">
                                <Checkbox
                                disabled={!repeat}
                                checked={minutes}
                                onCheckedChange={() => setMinutes(!minutes)}
                                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
                                ></Checkbox>
                                <span className="flex items-center gap-2">
                                    Every
                                    <input type="number" className="p-1 border rounded-md w-20" />
                                    minutes
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="border border-l-2 border-l-gray-200 border-white p-2">
                        <label className="font-medium">Select Final Day <span className="font-light text-gray-300">(Optional)</span></label>
                        <div className="border rounded-md p-2">
                            <DatePicker
                            onDateChange={setFinalDate}
                            className=""
                            ></DatePicker>
                        </div>
                    </div>
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