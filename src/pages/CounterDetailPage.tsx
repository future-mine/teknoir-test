import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCounter } from "../stores/CounterContext";
import { validateCounter } from "../utils.ts/validates";
import { Commands, OnInputResponse } from "../utils.ts/types";
import { TerminalUI } from "../components/Terminal";

const CounterDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { counters, increment, decrement, toggleLock, deleteCounter } =
    useCounter();

  const counter = counters.find((c) => c.name === name);

  if (!counter) {
    return <div>Counter not found</div>;
  }

  const handleDelete = () => {
    if (!name) {
      return;
    }
    deleteCounter(name);
    navigate("/");
  };
  const onTerminalInput = (
    command: string,
    args: string[]
  ): OnInputResponse => {
    if (!name) {
      return { success: false, info: [], error: ["Counter name is empty"] };
    }
    const commands: Commands = {
      increment: () => {
        const validState = validateCounter(name, counters, true);
        if (!validState.success) {
          return validState;
        }
        if (counter.locked) {
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
      decrement: () => {
        const validState = validateCounter(name, counters, true);
        if (!validState.success) {
          return validState;
        }
        if (counter.locked) {
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
      delete: () => {
        deleteCounter(name);
        return {
          success: true,
          info: [`Counter ${name} deleted`],
          error: [],
          callback: () => {
            navigate("/");
          },
        };
      },
      lock: () => {
        if (counter.locked) {
          return {
            success: false,
            info: [],
            error: [`Counter ${name} already locked`],
          };
        }
        toggleLock(name);
        return { success: true, info: [`Counter ${name} locked`], error: [] };
      },
      unlock: () => {
        if (!counter.locked) {
          return {
            success: false,
            info: [],
            error: [`Counter ${name} already unlocked`],
          };
        }
        toggleLock(name);
        return {
          success: true,
          info: [`Counter ${name} unlocked`],
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
    <div className="w-full p-50">
      <div className="w-full text-center">
        <h1>Counter Detail Page</h1>
        <div>
          <p>Name: {counter.name}</p>
          <p>Value: {counter.value}</p>
        </div>
        <div>
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
          <button className="button" onClick={() => toggleLock(counter.name)}>
            {counter.locked ? "Unlock" : "Lock"}
          </button>
          <button className="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <div>
        <TerminalUI onInput={onTerminalInput} />
      </div>
    </div>
  );
};

export default CounterDetailPage;
