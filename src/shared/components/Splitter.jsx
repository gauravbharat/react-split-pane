import { useContext } from "react";
import { AppContext } from "../../store/app.context";
import { getChangedPixels } from "../util/drag-computations";

export default function Splitter({ parentId, horizontal = false, onSplit }) {
  const ctx = useContext(AppContext);

  function handleDragStart(e) {
    // console.log("Splitter :handleDragStart : horizontal", horizontal);
    ctx.setResizing(true, e.clientX, e.clientY);
  }

  function handleDragEnd() {
    // console.log("Splitter :handleDragEnd : horizontal", horizontal);
    ctx.setResizing(false, 0, 0);
  }

  function handleDrag(e) {
    // console.log("Splitter : handleDrag : ctx.isResizing", ctx.isResizing);

    if (!ctx.isResizing) {
      return;
    }

    const axisXChange = e.clientX;
    const axisYChange = e.clientY;

    // console.log("Splitter : handleDrag : axisXChange", axisXChange);
    // console.log("Splitter : handleDrag : axisYChange", axisYChange);

    if (horizontal && axisYChange <= 0) {
      return;
    }

    if (!horizontal && axisXChange <= 0) {
      return;
    }

    const changedPixels = horizontal
      ? getChangedPixels(axisYChange, ctx.axisYStart)
      : getChangedPixels(axisXChange, ctx.axisXStart);

    if (changedPixels == ctx.changedPixels) {
      return;
    }

    const incrementCurrentPaneContainer = changedPixels > 0;

    onSplit(incrementCurrentPaneContainer);
  }

  return (
    <div
      style={{
        position: "absolute",
        cursor: horizontal ? "row-resize" : "col-resize",
        top: 0,
        left: 0,
        zIndex: 5,
        height: horizontal ? "1px" : "100%",
        width: horizontal ? "100%" : "1px",
        backgroundColor: ctx.isResizing ? "transparent" : "blue",
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      id={`splitter-${parentId}`}
    ></div>
  );
}
