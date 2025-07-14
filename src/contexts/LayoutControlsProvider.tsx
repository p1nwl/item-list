import { useState } from "react";
import { LayoutControlsContext } from "./LayoutControlsContext";
import type { LayoutControls } from "./LayoutControlsContext";

export const LayoutControlsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [controls, setControls] = useState<LayoutControls>({
    showNavigationButtons: false,
  });

  return (
    <LayoutControlsContext.Provider value={{ controls, setControls }}>
      {children}
    </LayoutControlsContext.Provider>
  );
};
