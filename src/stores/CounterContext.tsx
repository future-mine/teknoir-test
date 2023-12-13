import { ReactNode, createContext, useContext, useReducer } from 'react';
import { Action, ActionType, Counter } from './types';

type CounterState = {
  counters: Counter[];
  addCounter: (name: string) => void;
  deleteCounter: (name: string) => void;
  increment: (name: string) => void;
  decrement: (name: string) => void;
  toggleLock: (name: string) => void;
}
const CounterContext = createContext<CounterState>({
  counters: [],
  addCounter: (name: string) => {},
  deleteCounter: (name: string) => {},
  increment: (name: string) => {},
  decrement: (name: string) => {},
  toggleLock: (name: string) => {},
});

const counterReducer = (state: Counter[], action: Action) => {
  switch (action.type) {
    case ActionType.Add:
      return [...state, { name: action.name, value: 0, locked: false }];

    case ActionType.Delete:
      return state.filter((counter) => counter.name !== action.name);

    case ActionType.Increment:
      return state.map((counter) =>
        counter.name === action.name && !counter.locked
          ? { ...counter, value: counter.value + 1 }
          : counter
      );

    case ActionType.Decrement:
      return state.map((counter) =>
        counter.name === action.name && !counter.locked && counter.value > 0
          ? { ...counter, value: counter.value - 1 }
          : counter
      );

    case ActionType.ToggleLock:
      return state.map((counter) =>
        counter.name === action.name ? { ...counter, locked: !counter.locked } : counter
      );

    default:
      return state;
  }
};

export const CounterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [counters, dispatch] = useReducer(counterReducer, []);

  const addCounter = (name: string) => dispatch({ type: ActionType.Add, name });
  const deleteCounter = (name: string) => dispatch({ type: ActionType.Delete, name });
  const increment = (name: string) => dispatch({ type: ActionType.Increment, name });
  const decrement = (name: string) => dispatch({ type: ActionType.Decrement, name });
  const toggleLock = (name: string) => dispatch({ type: ActionType.ToggleLock, name });

  return (
    <CounterContext.Provider
      value={{ counters, addCounter, deleteCounter, increment, decrement, toggleLock }}
    >
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};
