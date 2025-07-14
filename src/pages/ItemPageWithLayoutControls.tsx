import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemPage from "./ItemPage";
import { useLayoutControls } from "../contexts/useLayoutControls";

export default function ItemPageWithLayoutControls() {
  const navigate = useNavigate();
  const { setControls } = useLayoutControls();

  useEffect(() => {
    setControls({
      showNavigationButtons: true,
      onBack: () => navigate(-1),
    });

    return () => {
      setControls({
        showNavigationButtons: false,
        onBack: undefined,
      });
    };
  }, [navigate, setControls]);

  return <ItemPage />;
}
