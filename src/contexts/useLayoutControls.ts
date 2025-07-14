import { useContext } from "react";
import { LayoutControlsContext } from "./LayoutControlsContext";

export const useLayoutControls = () => {
  const ctx = useContext(LayoutControlsContext);
  if (!ctx) {
    throw new Error(
      "useLayoutControls must be used within a LayoutControlsProvider"
    );
  }
  return ctx;
};
