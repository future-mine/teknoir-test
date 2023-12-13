import { Counter } from "../stores/types";
import { OnInputResponse } from "./types";

export const validateCounterName = (name: string): { valid: boolean, message: string } => {
  if (!name) {
    return { valid: false, message: 'Counter name is required'}
  }
  if (!name || !/^[a-zA-Z0-9]+$/.test(name)) {
    return { valid: false, message: "Counter name must be alphanumeric." };
  }
  return { valid: true, message: "" };
};

export const validateCounter = (name: string, counters: Counter[], shouldExist = true): OnInputResponse => {
  const validState = validateCounterName(name)
  if(!validState.valid) {
    return { success: false, error: [validState.message], info: []}
  }
  const exiting = counters.find(v => v.name === name);
  if (!exiting && shouldExist) {
    return { success: false, error: ['Counter name not exist'], info: []}
  }
  if (exiting && !shouldExist) {
    return { success: false, error: ['Counter name is duplicate'], info: []}
  }
  return { success: true, error: [], info: []}
}