import { useEffect ,useState, type FormEvent } from "react";
import DatePicker from "./datePicker";
import TimePicker from "./timePicker";
import SelectPlatform from "./selectPlatform";
import FrequencySelection from "./frequencySelection";
import type { Platform } from "./selectPlatform";
import type { Frequency } from "@/types/frequency";
import { storeMessage } from "@/utils/storage";
import type { TaskFormData } from "@/types/frequency";

interface CreateTaskProps {
  taskToEdit?: TaskFormData;
  isOpen: boolean;
  closeModal: () => void;
}

function CreateTask({ taskToEdit, isOpen, closeModal}: CreateTaskProps) {

  type customErrors = {
    selectedDateError?: string;
    selectedTime?: string;
    selectedPlatform?: string;
    selectedRecipient?: string;
    typedMessage?: string;
    typedMessageTitle?: string;
    frequency?: string;
    finalDate?: string;
  };

  type Recipient = {
  platform: Platform;
  contact: string;
    };

  const platformColors: Record<string, string> = {
  gmail: "bg-gray-800",
  whatsapp: "bg-green-400",
  telegram: "bg-blue-500",
  slack: "bg-red-500",
    };

  useEffect(() => {
  if (!taskToEdit) return
  if (taskToEdit.frequency?.type === "minutes") {
    setMinuteInterval(taskToEdit.frequency?.interval)
  }

  if (taskToEdit.repeat) {
    setRepeat(true)
    setAccess(true)
  }

  setTime(taskToEdit.time ?? "")
}, [taskToEdit])

useEffect(() => {
  if (!isOpen) {
    resetForm()
  }
}, [isOpen])


  function handleAddRecipient() {
    if (!platform || !contact.trim()) return
    setRecipient((prev) => [
        ...prev,
        {platform, contact},
    ])
    console.log(recipients);
    setContact("")
  }

  function deleteRecepient(index:number) {
     setRecipient((prev) => prev.filter((_, i) => i !== index));
  }

  function resetForm() {
    setSelectedDate(undefined); // or new Date() if you want default today
    setTime("");
    setPlatform("");
    setRecipient([]);
    setMessage("");
    setMessageTitle("");
    setContact("");
    setFrequency(undefined)
    setRepeat(false)
    setFinalDate(undefined)
    }

  function onCancel () {
    resetForm()
    closeModal()
  }


  const [customErrors, setCustomErrors] = useState<customErrors>({});

  async function onCreate(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newErrors: customErrors = {};
    if (!selectedDate) newErrors.selectedDateError = "Date is required";
    if (!time) newErrors.selectedTime = "Time is required";
    // if (!platform) newErrors.selectedPlatform = "Platform is required"
    if (recipients.length < 1) newErrors.selectedRecipient = "Recipients(s) email or platform contact is required";
    if (!message?.trim()) newErrors.typedMessage = "Message is required";
    if (!messageTitle) newErrors.typedMessageTitle = "Message Title is required";
    /* 🔴 FREQUENCY LOGIC */
    if (repeat) {
      if (!frequency) {
        newErrors.frequency = "Frequency is required";
      }

      if (!finalDate) {
        newErrors.finalDate = "Select an end date";
      }
    }
    
    setCustomErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const formData: TaskFormData = {
        id: taskToEdit?.id ?? crypto.randomUUID(),
        selectedDate: selectedDate?.toISOString(),
        time,
        recipients,
        message,
        messageTitle,

        ...(repeat && {
    repeat,
    frequency,
    endDate: finalDate?.toISOString(),
  }),
    }

    storeMessage(formData, "scheduledMessage")
    console.log(formData)
    resetForm()
  }

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    taskToEdit?.selectedDate ? new Date(taskToEdit.selectedDate) : new Date()
  );
  const [time, setTime] = useState(taskToEdit?.time ?? "");
  const [platform, setPlatform] = useState<Platform>("")
  const [recipients, setRecipient] = useState<Recipient[]>(taskToEdit?.recipients ?? []);
  const [message, setMessage] = useState(taskToEdit?.message ?? "")
  const [messageTitle, setMessageTitle] = useState(taskToEdit?.messageTitle ?? "")
  const [contact, setContact] = useState("");
  const [frequency, setFrequency] = useState<Frequency | undefined>(taskToEdit?.frequency ?? undefined);
  const [repeat, setRepeat] = useState(taskToEdit?.repeat ?? false);
  const [finalDate, setFinalDate] = useState<Date | undefined>(new Date(taskToEdit?.endDate ? new Date(taskToEdit.endDate) : new Date()))
  const [access, setAccess] = useState(false)
  const [minuteInterval, setMinuteInterval] = useState<string | number>("")
  
  const isEmailPlatform = platform === "gmail"
  const isEditing = Boolean(taskToEdit);

  return (
    <div className="py-6 px-4">
      <header className="text-left text-xl mb-1 font-bold">
        Schedule a Message
      </header>
      <hr className="border-gray-200" />
      <form
        action=""
        className="space-y-3 px-2 py-4"
        onSubmit={onCreate}
      >
        <div className="w-full flex flex-col sm:flex-row gap-2">
          <div className="w-full flex flex-col items-start">
            <label className="font-medium">Scheduled Date</label>
            <div className="p-2 border border-gray-200 rounded-md w-full">
              <DatePicker
                dateValue={selectedDate}
                disabled={false}
                onDateChange={setSelectedDate}
                className={"w-full"}
              ></DatePicker>
            </div>
            {customErrors.selectedDateError && (
                <p className="text-red-500 text-sm mt-1">
                    {customErrors.selectedDateError}
                </p>
            )
            }
          </div>
          <div className="sm:w-[40%] flex flex-col items-start">
            <label className="font-medium">Scheduled Time</label>
            <div className=" border border-gray-200 rounded-md w-full p-2">
              <TimePicker
                time={time}
                onTimeChange={setTime}
                selectedDate={selectedDate}
              ></TimePicker>
            </div>
            {customErrors.selectedTime && (
                <p className="text-red-500 text-sm mt-1">
                    {customErrors.selectedTime}
                </p>
            )
            }
          </div>
        </div>
        <div className="flex flex-col items-start w-full">
          <label className="font-medium">Message Title</label>
          <input
            value={messageTitle}
            onChange={(e) => setMessageTitle(e.target.value)}
            type="text"
            className="p-2 w-full rounded-md border border-gray-200"
          />
          {customErrors.typedMessageTitle && (
            <p className="text-sm text-red-500 font-light">
              {customErrors.typedMessageTitle}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start w-full">
          <label className="font-medium">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="p-2 w-full rounded-md border border-gray-200"
          />
          {customErrors.typedMessage && (
            <p className="text-sm text-red-500 font-light">
              {customErrors.typedMessage}
            </p>
          )}
        </div>
        <div className="flex flex-col text-left w-full">
          <label className="font-medium">Platform</label>
          <SelectPlatform
          value={platform}
          onPlatformChange={setPlatform}
          ></SelectPlatform>
          {customErrors.selectedPlatform && (
                <p className="text-red-500 text-sm mt-1">
                    {customErrors.selectedPlatform}
                </p>
            )
            }
        </div>
        <div className="flex flex-col items-start w-full">
          <label className="font-medium">Recipient(s)</label>
          <div className="flex w-full gap-6 border-gray-300 border rounded-md p-2">
            <input
              disabled={!platform}
              type={isEmailPlatform ? "email" : "tel"}
              placeholder={
                isEmailPlatform
                    ? "Enter email address"
                    : "Enter phone number"
                }
              value={contact}
              onChange={(e) => {
                 const value = e.target.value;

                if (!isEmailPlatform) {
                  // Allow only numbers and max 11 digits
                  if (!/^\d*$/.test(value)) return;
                  if (value.length > 11) return;
                }
                setContact(value)
              }}
              className="p-2 w-full rounded-md border border-gray-200"
            />
            <button type="button" onClick={handleAddRecipient} className="bg-green-400 rounded-md text-white py-2 px-4 font-medium">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
                {recipients.map((item, index) => (
                  <div className="">
                    <span
                    key={index}
                    className={`text-white font-medium flex gap-2 items-center text-sm px-3 py-1 rounded-full ${platformColors[item.platform]}`}
                    >
                        {item.contact}
                        <span onClick={() => deleteRecepient(index)}>
                      <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 36 36">
                        <path 
                        fill="currentColor" 
                        d="m19.41 18l8.29-8.29a1 1 0 0 0-1.41-1.41L18 16.59l-8.29-8.3a1 1 0 0 0-1.42 1.42l8.3 8.29l-8.3 8.29A1 1 0 1 0 9.7 27.7l8.3-8.29l8.29 8.29a1 1 0 0 0 1.41-1.41Z"/>
                        <path fill="none" d="M0 0h36v36H0z"/>
                      </svg>
                    </span>
                    </span>
                    
                  </div>
                ))
                }
          </div>
          {customErrors.selectedRecipient && (
                <p className="text-red-500 text-sm mt-1">
                    {customErrors.selectedRecipient}
                </p>
            )
            }
        </div>
        <hr />
        <p>(Optional)</p>
        <div className="space-y-2 flex gap-5">
          <FrequencySelection
          repeat={repeat}
          frequency={frequency}
          finalDate={finalDate}
          access={access}
          onRepeatToggle={setRepeat}
          onSelectFinalDate={setFinalDate}
          onSelectFrequency={setFrequency}
          minuteInterval={minuteInterval}
          onChangeMinuteInterval={setMinuteInterval}
          onHandleAccess={setAccess}
          errors={{
            frequency: customErrors.frequency,
            finalDate: customErrors.finalDate,
          }}
          >
          </FrequencySelection>
        </div>
        <div className="border border-white pt-4 border-t-gray-200 flex justify-between">
          <button onClick={onCancel} type="button" className="border border-red-600 py-1 px-4 rounded-2xl bg-white text-red-500 hover:text-white hover:bg-red-600 cursor-pointer">
            Cancel
          </button>
          <button type="submit" className="border py-1 px-4 rounded-2xl bg-green-500 text-white cursor-pointer hover:bg-green-600">
            {isEditing ? "Update Schedule" : "Add Schedule"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
