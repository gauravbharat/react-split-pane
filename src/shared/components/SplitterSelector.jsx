import { useContext } from "react";
import { AppContext } from "../../store/app.context";

export default function SplitterSelector() {
  const ctx = useContext(AppContext);

  return (
    <div>
      <input
        style={{
          cursor:
            ctx.useSplitter === "split-react-pane" ? "not-allowed" : "pointer",
        }}
        type="radio"
        id="dragger"
        name="splitter"
        value="DRAGGER"
        checked={ctx.useSplitter === "DRAGGER"}
        onChange={() => {
          ctx.setSplitter("DRAGGER");
        }}
        disabled={ctx.useSplitter === "split-react-pane"}
      />
      <label htmlFor="dragger">Drag</label>
      <input
        style={{
          cursor:
            ctx.useSplitter === "split-react-pane" ? "not-allowed" : "pointer",
        }}
        type="radio"
        id="mm"
        name="splitter"
        value="MOUSEMOVE"
        checked={ctx.useSplitter === "MOUSEMOVE"}
        onChange={() => {
          ctx.setSplitter("MOUSEMOVE");
        }}
        disabled={ctx.useSplitter === "split-react-pane"}
      />
      <label htmlFor="mm">Move</label>

      <input
        style={{ cursor: "pointer" }}
        type="radio"
        id="srp"
        name="splitter"
        value="split-react-pane"
        checked={ctx.useSplitter === "split-react-pane"}
        onChange={() => {
          ctx.setSplitter("split-react-pane");
        }}
      />
      <label htmlFor="srp">3rd part lib (resets state)</label>
    </div>
  );
}
