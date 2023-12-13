import { ReactNode, useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { OnInputResponse } from "../utils.ts/types";

interface Props {
  onInput: (command: string, args: string[]) => OnInputResponse;
}
export const TerminalUI = ({ onInput }: Props) => {
  const [terminalLineData, setTerminalLineData] = useState<ReactNode[]>([]);
  const setOutput = (messages: string[], success: boolean, input: string) => {
    setTerminalLineData((prev: ReactNode[]) => {
      return [
        ...prev,
        <TerminalOutput>{`> ${input}`}</TerminalOutput>,
        messages.map((message: string) => (
          <TerminalOutput>
            <span className={success ? "info" : "error"}>{message}</span>
          </TerminalOutput>
        )),
      ];
    });
  };
  const onInputHandler = (terminalInput: string) => {
    const [command, ...args] = terminalInput
      .split(" ")
      .map((word: string) => word.trim())
      .filter((word: string) => !!word);
    if (!command) {
      setOutput(["A command is required"], false, terminalInput);
      return;
    }
    const output = onInput(command, args);
    if (output.success) {
      setOutput(output.info, output.success, terminalInput);
      if (output.callback) {
        output.callback();
      }
    } else {
      setOutput(output.error, output.success, terminalInput);
    }
  };
  return (
    <div className="p-50 mt-5 ">
      <Terminal
        name="Counter terminal"
        colorMode={ColorMode.Dark}
        height={"200px"}
        onInput={onInputHandler}
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
};
