import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { Switch } from "./ui/switch";
import DatePicker from "./datePicker";
import { useEffect } from "react";
import type { Frequency } from "@/types/frequency";

interface FrequencySelectionProps {
  onRepeatToggle: (value: boolean) => void;
  onSelectFrequency: (value: Frequency | undefined) => void;
  onSelectFinalDate: (value: Date | undefined) => void;
  onHandleAccess: (value: boolean) => void;
  frequency: Frequency | undefined
  repeat: boolean
  finalDate: Date | undefined
  access: boolean
  errors?: {
    frequency?: string;
    finalDate?: string;
  };
}

function FrequencySelection({frequency, repeat, finalDate, access, onHandleAccess, onRepeatToggle, onSelectFinalDate, onSelectFrequency, errors}: FrequencySelectionProps) {

  useEffect(() => {
    if (!repeat) {
      onHandleAccess(false)
      onSelectFinalDate(undefined)
    } 
  }, [repeat])


  function handleSelect(option: "daily" | "weekly" | "monthly") {
    // if (option === "minutes") {

    //   return
    // }
    let frequency:Frequency = {type: option}
    // if (option === "minutes") {
    //   frequency = {type: option, interval: interval}
    // }
    onSelectFrequency(frequency)
    onHandleAccess(true)
  }
  function handleRepeat() {
    const toggleRepeat = !repeat
    onSelectFrequency(undefined)
    onSelectFinalDate(undefined)
    onRepeatToggle(toggleRepeat)
    if (!repeat) {
      onHandleAccess(false)
    }
    console.log(frequency, finalDate);
  }

  function handleMinutesSelect(interval: number) {
    onSelectFrequency({
    type: "minutes",
    interval,
    })
    onHandleAccess(true)
  }

  const [interval, setInterval] = useState<number | "">("");


  return (
    <div className="flex flex-col sm:flex-row  w-full justify-between gap-5">
      <div>
        <div className="flex items-center gap-3">
          <label className="font-medium">Repeat</label>
          <Switch
            checked={repeat}
            onCheckedChange={handleRepeat}
            className="
                            data-[state=checked]:bg-green-500
                            "
          ></Switch>
        </div>
        <div className="text-left space-y-2 sm:block grid grid-cols-2 gap-2">
          <div className={`space-x-2 ${repeat ? "" : "text-gray-300"}`}>
            <Checkbox
              disabled={!repeat}
              checked={frequency?.type === "daily"}
              onCheckedChange={() => handleSelect("daily")}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
            ></Checkbox>
            Daily
          </div>
          <div className={`space-x-2 ${repeat ? "" : "text-gray-300"}`}>
            <Checkbox
              disabled={!repeat}
              checked={frequency?.type === "weekly"}
              onCheckedChange={() => handleSelect("weekly")}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
            ></Checkbox>
            Weekly
          </div>
          <div className={`space-x-2 ${repeat ? "" : "text-gray-300"}`}>
            <Checkbox
              disabled={!repeat}
              checked={frequency?.type === "monthly"}
              onCheckedChange={() => handleSelect("monthly")}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
            ></Checkbox>
            Monthly
          </div>
          <div
            className={`space-x-2 flex items-center ${
              repeat ? "" : "text-gray-300"
            }`}
          >
            <Checkbox
              disabled={!repeat}
              checked={frequency?.type === "minutes"}
              // onCheckedChange={() => handleSelect()}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
            ></Checkbox>
            <span className="flex items-center gap-2">
              Every
              <input 
              min={1}
              value={interval}
              onChange={(e) => {
                const value = Number(e.target.value)
                setInterval(value)
                if (value > 0) {
                  handleMinutesSelect(value)
                }
              }}
              disabled={frequency?.type !== "minutes"} 
              type="number" 
              className="p-1 border rounded-md w-20" 
              />
              minutes
            </span>
          </div>
          <div>
            {errors?.frequency && (
              <p className="text-sm text-red-500 mt-1">{errors.frequency}</p>
            )}
          </div>
        </div>
      </div>
      <div className="border border-l-gray-200"></div>
      <div>
                        <label className="font-medium">Select Final Day <span className="font-light text-gray-300">(Optional)</span></label>
                        <div className={`border rounded-md p-2 ${access ? "border-gray-400" : "cursor-not-allowed "}`}>
                            <DatePicker
                            dateValue={finalDate}
                            disabled={!access}
                            onDateChange={onSelectFinalDate}
                            className=""
                            ></DatePicker>
                        </div>
                        {errors?.finalDate && (
      <p className="text-sm text-red-500 mt-1">{errors.finalDate}</p>
    )}
                    </div>
    </div>
  );
}

export default FrequencySelection;
