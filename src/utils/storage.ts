import type { TaskFormData } from "@/types/frequency"

export function storeMessage(data:TaskFormData, key:string) {
    const existingData = getDatabase(key)
    const taskIndex = existingData.findIndex((task) => task.id === data.id);
    let updatedData:TaskFormData[]
    if (taskIndex > -1) {
      // Edit: Replace data
      updatedData = [...existingData]
      updatedData[taskIndex] = data
    } else {
      updatedData = [...existingData, data]
    }

    localStorage.setItem(key, JSON.stringify(updatedData))
  }

  export function getDatabase(key:string): TaskFormData[] {
    const rawData = localStorage.getItem(key)
    if (!rawData) {
        return []
    }
    const data = JSON.parse(rawData) as TaskFormData[]
    return data
  }

  export function setDatabase(data: TaskFormData[], key: string) {
  localStorage.setItem(key, JSON.stringify(data));
  }

  export function deleteMessage(key: string, id: string) {
  const existing: TaskFormData[] = getDatabase(key);

  const updated = existing.filter((item: TaskFormData) => item.id !== id);

  setDatabase(updated, key);
  }
