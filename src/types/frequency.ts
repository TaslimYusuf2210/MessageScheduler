export type Frequency =
  | { type: "daily" }
  | { type: "weekly" }
  | { type: "monthly" }
  | { type: "minutes"; interval: number | string };

  export type Recipient = {
    platform: Platform;
    contact: string;
      };

export type Platform = "" | "gmail" | "whatsapp" | "telegram" | "slack";

export interface TaskFormData {
  id: string;
  selectedDate: string | undefined;
  time: string;
  recipients: Recipient[];
  messageTitle: string;
  message: string;
  repeat?: boolean;
  frequency?: Frequency;
  endDate?: string | undefined;
}

export type PlatformConfig = {
  color: string
  name: string
}
