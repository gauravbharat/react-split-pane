import { useContext } from "react";
import { AppContext } from "../../store/app.context";

export default function SplitDownButton() {
  const ctx = useContext(AppContext);

  return (
    <button
      onClick={() => {
        ctx.addPaneContainer();
      }}
    >
      {ctx.paneContainers.length === 0
        ? "Add Container (downwards)"
        : "Split editor down"}
    </button>
  );
}
