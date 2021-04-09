export type InvokeCallbackType = (
  event: string | { type: string; data?: any; error?: Error }
) => void