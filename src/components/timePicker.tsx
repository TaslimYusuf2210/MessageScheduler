import { useState } from "react";

function TimePicker({ selectedDate }: { selectedDate: Date | undefined }) {
    const [time, setTime] = useState("")
    
    // helper: check if selected date is today
    const isToday = () => {
        const today = new Date()
        return (
        selectedDate?.getDate() === today.getDate() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear()
        )
    }

    // get current time in "HH:MM" for min attribute
    const getCurrentTime = () => {
        const now = new Date()
        const hours = String(now.getHours()).padStart(2, "0")
        const minutes = String(now.getMinutes()).padStart(2, "0")
        return `${hours}:${minutes}`
    }
    return ( 
        <div>
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-full w-full outline-none border-none"
                min={isToday() ? getCurrentTime() : undefined}
            />
        </div>
     );
}

export default TimePicker;