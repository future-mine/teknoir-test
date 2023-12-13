import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCounter } from "../stores/CounterContext";
import { validateCounter, validateCounterName } from "../utils.ts/validates";
import { TerminalUI } from "../components/Terminal";
import { Commands, OnInputResponse } from "../utils.ts/types";

const CounterListPage: React.FC = () => {
  const [name, setName] = useState("");
  const [valid, setValid] = useState(false);
  const { counters, increment, decrement, addCounter } = useCounter();
  const addNewCounter = () => {
    if (!validateCounterName(name).valid) {
      return;
    }
    const exiting = counters.find((v) => v.name === name);
    if (exiting) {
      return;
    }
    addCounter(name);
    setName("");
  };
  const onTerminalInput = (
    command: string,
    args: string[]
  ): OnInputResponse => {
    const commands: Commands = {
      add: (args: string[]) => {
        const name = args[0];
        const validState = validateCounter(name, counters, false);
        if (!validState.success) {
          return validState;
        }
        addCounter(name);
        return { success: true, info: [`Counter ${name} added`], error: [] };
      },
      increment: (args: string[]) => {
        const name = args[0];
        const validState = validateCounter(name, counters, true);
        if (!validState.success) {
          return validState;
        }
        const counter = counters.find((c) => c.name === name);
        if (counter?.locked) {
          return {
            success: false,
            info: [],
            error: [`Counter ${name} locked`],
          };
        }
        increment(name);
        return {
          success: true,
          info: [`Counter ${name} incremented`],
          error: [],
        };
      },
      decrement: (args: string[]) => {
        const name = args[0];
        const validState = validateCounter(name, counters, true);
        if (!validState.success) {
          return validState;
        }
        const counter = counters.find((c) => c.name === name);
        if (counter?.locked) {
          return {
            success: false,
            info: [],
            error: [`Counter ${name} locked`],
          };
        }
        decrement(name);
        return {
          success: true,
          info: [`Counter ${name} decremented`],
          error: [],
        };
      },
    };
    const action = commands[command];
    if (!action) {
      return {
        success: false,
        info: [],
        error: [
          `Wrong command, choose one: ${Object.keys(commands).join(", ")}`,
        ],
      };
    }
    return action(args);
  };
  return (
    <div className="h-full w-full p-50">
      <h1>Counters List Page</h1>
      <div className="max-400 overflow-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Counter name</th>
              <th>Value</th>
              <th>Locked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {counters.map((counter) => (
              <tr key={counter.name}>
                <td>
                  <Link to={`/counter/${counter.name}`}>{counter.name}</Link>:{" "}
                </td>
                <td>{counter.value}</td>
                <td>{counter.locked ? "(Locked)" : ""}</td>
                <td>
                  <button
                    className="button"
                    disabled={counter.locked}
                    onClick={() => increment(counter.name)}
                  >
                    +
                  </button>
                  <button
                    className="button"
                    disabled={counter.locked}
                    onClick={() => decrement(counter.name)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 d-flex justify-center">
        <div className="d-flex w-full justify-around">
          <label>Counter name:</label>
          <input
            value={name}
            className={valid ? "" : "invalid"}
            onChange={(e) => {
              setName(e.target.value);
              const validState = validateCounterName(e.target.value);
              setValid(validState.valid);
            }}
          />
          <button className="button" onClick={addNewCounter}>
            New
          </button>
        </div>
      </div>
      <div>
        <TerminalUI onInput={onTerminalInput} />
      </div>
    </div>
  );
};

export default CounterListPage;
