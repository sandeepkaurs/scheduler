import { useState } from "react";

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial])

  function transition(nextMode, replace = false) {
    if (replace) {
      return setHistory(prev => {
        const copy = [...prev];
        copy.pop();
        copy.push(nextMode);
        return copy;
      });
    }
    setHistory(prev => [...prev, nextMode])

  }
  function back() {
    if (history.length > 1) {
      setHistory(prev => {
        const copy = [...prev];
        copy.pop();
        return copy;
      });
    }
  }
  return { mode: history[history.length - 1], transition, back };
}