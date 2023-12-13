export type Counter = {
  name: string;
  value: number;
  locked: boolean;
}

export enum ActionType {
  Add = 'ADD_COUNTER',
  Delete = 'DELETE_COUNTER',
  Increment = 'INCREMENT',
  Decrement = 'DECREMENT',
  ToggleLock = 'TOGGLE_LOCK',
}

export type Action = {
  type: ActionType;
  name: string;
}