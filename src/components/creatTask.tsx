import { useState, type FormEvent } from "react";
import DatePicker from "./datePicker";
import TimePicker from "./timePicker";
import SelectPlatform from "./selectPlatform";
import FrequencySelection from "./frequencySelection";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Platform } from "./selectPlatform";

const schema = yup.object().shape({
  message: yup.string().required("Message is required"),
  messageTitle: yup.string().required("Password is required"),
});

function CreateTask() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  type customErrors = {
    selectedDateError?: string;
    selectedTime?: string;
    selectedPlatform?: string;
    selectedRecepient?: string;
    typedMessage?: string;
    typedMessageTitle?: string;
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

  function handleAddRecipient() {
    if (!platform) return
    setRecepient((prev) => [
        ...prev,
        {platform, contact},
    ])
    console.log(recepient);
    setContact("")
  }


  const [customErrors, setCustomErrors] = useState<customErrors>({});

  async function onCreate(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newErrors: customErrors = {};
    if (!selectedDate) newErrors.selectedDateError = "Date is required";
    if (!time) newErrors.selectedTime = "Time is required";
    if (!platform) newErrors.selectedPlatform = "Platform is required"
    if (!recepient) newErrors.selectedRecepient = "Recepients(s) email or platform contact is required";
    if (!message?.trim()) newErrors.typedMessage = "Message is required";
    if (!messageTitle) newErrors.typedMessageTitle = "Message Title is required";
    
    setCustomErrors(newErrors)
    console.log(formData)
    if (Object.keys(newErrors).length > 0) return
  }

  const [formData, setFormData] = useState({
  date: null as Date | null,
  time: "",
  platform: "",
  recepient: "",
  message: "",
  messageTitle: ""
})
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [time, setTime] = useState("");
  const [platform, setPlatform] = useState<Platform>("")
  const [recepient, setRecepient] = useState<Recipient[]>([]);
  const [message, setMessage] = useState("")
  const [messageTitle, setMessageTitle] = useState("")
  const [contact, setContact] = useState("");

  const isEmailPlatform = platform === "gmail"

  return (
    <div className="py-6 px-4">
      <header className="text-left text-xl mb-1 font-semibold">
        Schedule a Message
      </header>
      <hr className="border-gray-200" />
      <form
        action=""
        className="space-y-3 px-2 py-4"
        onSubmit={onCreate}
      >
        <div className="w-full flex gap-2">
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
          <div className="w-[40%] flex flex-col items-start">
            <label className="font-medium">Scheduled Time</label>
            <div className=" border border-gray-200 rounded-md w-full p-2">
              <TimePicker
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
          <label className="font-medium">Recepient(s)</label>
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
              onChange={(e) => setContact(e.target.value)}
              className="p-2 w-full rounded-md border border-gray-200"
            />
            <button onClick={handleAddRecipient}  className="bg-green-400 rounded-md text-white py-2 px-4 font-medium">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
                {recepient.map((item, index) => (
                    <span
                    key={index}
                    className={`text-white font-medium text-sm px-3 py-1 rounded-full ${platformColors[item.platform]}`}
                    >
                        {item.contact}
                    </span>
                ))
                }
          </div>
          {customErrors.selectedRecepient && (
                <p className="text-red-500 text-sm mt-1">
                    {customErrors.selectedRecepient}
                </p>
            )
            }
        </div>
        <hr />
        <p>(Optional)</p>
        <div className="space-y-2 flex gap-5">
          <FrequencySelection></FrequencySelection>
        </div>
        <div className="border border-white pt-4 border-t-gray-200 flex justify-between">
          <button type="button" className="border border-red-600 py-1 px-4 rounded-2xl bg-white text-red-500 hover:text-white hover:bg-red-600 cursor-pointer">
            Cancel
          </button>
          <button type="submit" className="border py-1 px-4 rounded-2xl bg-green-500 text-white cursor-pointer hover:bg-green-600">
            Add Schedule
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
