import { useContext } from "react";
import { AppContext } from "../../store/app.context";

export default function SplitterSelector() {
  const ctx = useContext(AppContext);

  return (
    <div>
      <input
        style={{ cursor: "pointer" }}
        type="radio"
        id="dragger"
        name="splitter"
        value="DRAGGER"
        checked={ctx.useSplitter === "DRAGGER"}
        onChange={() => {
          ctx.setSplitter("DRAGGER");
        }}
      />
      <label htmlFor="dragger">Dragger</label>
      <input
        style={{ cursor: "pointer" }}
        type="radio"
        id="mm"
        name="splitter"
        value="MOUSEMOVE"
        checked={ctx.useSplitter === "MOUSEMOVE"}
        onChange={() => {
          ctx.setSplitter("MOUSEMOVE");
        }}
      />
      <label htmlFor="mm">Mouse Move</label>
    </div>
  );
}
