import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { Switch } from "./ui/switch";
import DatePicker from "./datePicker";
import { useEffect } from "react";

interface FrequencySelectionProps {
  onRepeatToggle: (value: boolean) => void;
  onSelectFrequency: (value: string | null) => void;
  onSelectFinalDate: (value: Date | undefined) => void;
  onHandleAccess: (value: boolean) => void;
  frequency: string | null
  repeat: boolean
  finalDate: Date | undefined
  access: boolean
}

function FrequencySelection({frequency, repeat, finalDate, access, onHandleAccess, onRepeatToggle, onSelectFinalDate, onSelectFrequency}: FrequencySelectionProps) {

  useEffect(() => {
    if (!repeat) {
      onHandleAccess(false)
      onSelectFinalDate(undefined)
    } 
  }, [repeat])


  function handleSelect(option: string) {
    onSelectFrequency(option)
    onHandleAccess(true)
  }
  function handleRepeat() {
    const toggleRepeat = !repeat
    onSelectFrequency(null)
    onSelectFinalDate(undefined)
    onRepeatToggle(toggleRepeat)
    if (!repeat) {
      onHandleAccess(false)
    }
    console.log(frequency, finalDate);
    
  }

  return (
    <div className="flex gap-5">
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
        <div className="text-left space-y-2">
          <div className={`space-x-2 ${repeat ? "" : "text-gray-300"}`}>
            <Checkbox
              disabled={!repeat}
              checked={frequency === "Daily"}
              onCheckedChange={() => handleSelect("Daily")}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
            ></Checkbox>
            Daily
          </div>
          <div className={`space-x-2 ${repeat ? "" : "text-gray-300"}`}>
            <Checkbox
              disabled={!repeat}
              checked={frequency === "Weekly"}
              onCheckedChange={() => handleSelect("Weekly")}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
            ></Checkbox>
            Weekly
          </div>
          <div className={`space-x-2 ${repeat ? "" : "text-gray-300"}`}>
            <Checkbox
              disabled={!repeat}
              checked={frequency === "Monthly"}
              onCheckedChange={() => handleSelect("Monthly")}
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
              checked={frequency === "Minutes"}
              onCheckedChange={() => handleSelect("Minutes")}
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
                        <div className={`border rounded-md p-2 ${access ? "" : "cursor-not-allowed "}`}>
                            <DatePicker
                            dateValue={finalDate}
                            disabled={!access}
                            onDateChange={onSelectFinalDate}
                            className=""
                            ></DatePicker>
                        </div>
                    </div>
    </div>
  );
}

export default FrequencySelection;
