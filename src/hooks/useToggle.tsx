import { useState, useCallback } from "react";

interface ToggleReturn {
  toggle: boolean;
  handleToggle: (value?: boolean) => void;
}

export const useToggle = (initialState: boolean = false): ToggleReturn => {
  const [toggle, setToggle] = useState<boolean>(initialState);

  const handleToggle = useCallback((value?: boolean) => {
    setToggle((prev) => value ?? !prev);
  }, []);

  return { toggle, handleToggle };
};
