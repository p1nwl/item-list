import { createContext } from "react";

export interface LayoutControls {
  showNavigationButtons: boolean;
  onBack?: () => void;
}

export interface LayoutControlsContextType {
  controls: LayoutControls;
  setControls: (c: LayoutControls) => void;
}

export const LayoutControlsContext = createContext<
  LayoutControlsContextType | undefined
>(undefined);
