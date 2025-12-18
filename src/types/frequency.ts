export type Frequency =
  | { type: "daily" }
  | { type: "weekly" }
  | { type: "monthly" }
  | { type: "minutes"; interval: number | string };