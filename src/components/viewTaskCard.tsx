import type { Recipient } from "@/types/frequency"
import type { Frequency } from "@/types/frequency"

interface viewTaskCardProps {
    title: string
    message: string
    recipients: Recipient[]
    startDate: string | undefined
    time: string
    frequency?: Frequency
    endDate?: string
}

function ViewTaskCard({title, message, recipients, startDate, time, frequency, endDate}: viewTaskCardProps) {
    const platformColors: Record<string, string> = {
  gmail: "bg-gray-800",
  whatsapp: "bg-green-400",
  telegram: "bg-blue-500",
  slack: "bg-red-500",
    };
    
    return ( 
        <div className="bg-white rounded-xl p-2 w-full space-y-2">
            <div className="flex justify-between w-full">
                <h5>{title}</h5>
                <div className="flex flex-col items-end">
                    <span className="bg-gray-100 font-medium px-2">{time}</span>
                    <span>{startDate}</span>
                </div>
            </div>
            <div>
                <span className="py-1 px-2 gap-2 w-fit rounded-sm bg-gray-100 flex items-center">
                    <svg 
                    className="text-green-400"
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24">
                    <path 
                    fill="currentColor" 
                    d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v6h-2v-2H5v10h7v2zm14 2q-1.825 0-3.187-1.137T14.1 20h1.55q.325 1.1 1.238 1.8t2.112.7q1.45 0 2.475-1.025T22.5 19t-1.025-2.475T19 15.5q-.725 0-1.35.262t-1.1.738H18V18h-4v-4h1.5v1.425q.675-.65 1.575-1.037T19 14q2.075 0 3.538 1.463T24 19t-1.463 3.538T19 24"/>
                    </svg>
                    <span>Monthly on the ....</span>
                </span>
            </div>
            <div className="w-full">
                {message}
            </div>
            <div className="flex flex-wrap gap-2">
                {recipients.map((item, index) => (
                    <span
                    key={index}
                    className={`text-white font-medium text-sm px-3 py-1 rounded-full ${platformColors[item.platform]}`}
                    >
                        {item.contact}
                    </span>
                ))
                }
            </div>
            <div className="flex justify-between items-center">
                <span className="text-red-400">
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="30" 
                    height="30" 
                    viewBox="0 0 24 24"
                    >
                    <path 
                    fill="currentColor" 
                    d="M7.616 20q-.672 0-1.144-.472T6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.23 0 .423-.192t.192-.424zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z"/>
                    </svg>
                </span>
                <span className="flex items-center p-2 rounded-xl space-x-1 bg-green-400 text-white">
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24">
                    <path 
                    fill="currentColor" 
                    d="m14.06 9.02l.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"/>
                    </svg>
                    <span className="text-lg font-medium">
                        Edit
                    </span>
                </span>
            </div>
        </div>
     );
}

export default ViewTaskCard;