import { useState, useEffect } from "react";

// REUSABLE CUSTOM HOOOK

// key = name of the value to store
//initialState = the very first value, like [] or avatar[0]
export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState; // now its parsed and stored in {value}
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue]; // just like useState
}
