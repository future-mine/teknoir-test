export type OnInputResponse = {
  success: boolean,
  error: string[],
  info: string[],
  callback?: () => void,
}

export interface Commands {
  [key: string]: (args: string[]) => OnInputResponse
}
