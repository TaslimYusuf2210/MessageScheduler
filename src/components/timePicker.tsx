import { useState } from "react";

interface TimePickerProps  {
    selectedDate: Date | undefined
    onTimeChange: (time: string) => void
    time: string
}

function TimePicker({ selectedDate, onTimeChange, time }: TimePickerProps) {
    const [timeState, setTimeState] = useState("")
    
    // helper: check if selected date is today
    const isToday = () => {
        const today = new Date()
        return (
        selectedDate?.getDate() === today.getDate() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear()
        )
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        
        setTimeState(value)
        onTimeChange(value)
    }

    // get current time in "HH:MM" for min attribute
    const getCurrentTime = () => {
        const now = new Date()
        const hours = String(now.getHours()).padStart(2, "0")
        const minutes = String(now.getMinutes()).padStart(2, "0")
        return `${hours}:${minutes}`
    }
    return ( 
        <div className="w-full">
            <input
                type="time"
                value={time}
                onChange={handleChange}
                className="h-full w-full outline-none border-none"
                min={isToday() ? getCurrentTime() : undefined}
            />
        </div>
     );
}

export default TimePicker;