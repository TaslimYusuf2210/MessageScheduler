import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PickerProps {
  className: string;
  disabled: boolean;
  onDateChange: (value: Date | undefined) => void;
  dateValue?: Date | undefined
}

function DatePicker({ className = "", onDateChange, disabled = false, dateValue }: PickerProps) {
  const today = new Date();

  function formatDate(date: Date | undefined) {
    if (!date) return "";

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    return isToday ? "Today" : format(date, "PPP");
  }

  function handleSelect(selectedDate: Date | undefined) {
    
    onDateChange(selectedDate)   // 🔴 Send date to parent
  }

  return (
    <div className={`${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <button 
          className={`flex cursor-pointer w-full justify-between ${disabled ? "text-gray-300 cursor-not-allowed" : ""}`}
          disabled={disabled}
          >
            {formatDate(dateValue)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="m960 95.888l-256.224.001V32.113c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76h-256v-63.76c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76H64c-35.344 0-64 28.656-64 64v800c0 35.343 28.656 64 64 64h896c35.344 0 64-28.657 64-64v-800c0-35.329-28.656-63.985-64-63.985m0 863.985H64v-800h255.776v32.24c0 17.679 14.32 32 32 32s32-14.321 32-32v-32.224h256v32.24c0 17.68 14.32 32 32 32s32-14.32 32-32v-32.24H960zM736 511.888h64c17.664 0 32-14.336 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32m0 255.984h64c17.664 0 32-14.32 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.696 14.336 32 32 32m-192-128h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32m0-255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32m-256 0h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32m0 255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32"
              />
            </svg>
          </button>
        </PopoverTrigger>
        {!disabled &&
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateValue}
              onSelect={handleSelect}
              required={false}
              // 🔴 Disables all dates before today
              disabled={(day) => day < today}
              autoFocus={true}
            />
          </PopoverContent>
        }
      </Popover>
    </div>
  );
}

export default DatePicker;
