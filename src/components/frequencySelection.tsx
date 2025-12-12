import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { Switch } from "./ui/switch";
import DatePicker from "./datePicker";



function FrequencySelection() {
  const [repeat, setRepeat] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [finalDate, setFinalDate] = useState<Date | undefined>(new Date())
  const [access, setAccess] = useState(false)


  function handleSelect(option: string) {
    setSelectedOption(option)
    setAccess(true)
  }
  function handleRepeat() {
    setRepeat((prev) => !prev)
    if (!repeat) {
      setSelectedOption(null)
      setFinalDate(undefined)
    }
    console.log(selectedOption, finalDate);
    
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
              checked={selectedOption === "Daily"}
              onCheckedChange={() => handleSelect("Daily")}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
            ></Checkbox>
            Daily
          </div>
          <div className={`space-x-2 ${repeat ? "" : "text-gray-300"}`}>
            <Checkbox
              disabled={!repeat}
              checked={selectedOption === "Weekly"}
              onCheckedChange={() => handleSelect("Weekly")}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
            ></Checkbox>
            Weekly
          </div>
          <div className={`space-x-2 ${repeat ? "" : "text-gray-300"}`}>
            <Checkbox
              disabled={!repeat}
              checked={selectedOption === "Monthly"}
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
              checked={selectedOption === "Minutes"}
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
                            disabled={!access}
                            onDateChange={setFinalDate}
                            className=""
                            ></DatePicker>
                        </div>
                    </div>
    </div>
  );
}

export default FrequencySelection;
