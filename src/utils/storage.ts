import type { TaskFormData } from "@/types/frequency"

export function storeMessage(data:TaskFormData, key:string) {
    const existingData = getDatabase(key)
    const updatedData = [
        ...existingData,
      data,
    ]

    localStorage.setItem(key, JSON.stringify(updatedData))
  }

  export function getDatabase(key:string) {
    const rawData = localStorage.getItem(key)
    if (!rawData) {
        console.log([])
        return []
    }
    const data = JSON.parse(rawData)
    return data
  }