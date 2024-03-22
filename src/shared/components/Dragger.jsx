import { useState } from "react";
import { getChangedPixels } from "../util/drag-computations";

const log = (title, horizontal, e) => {
  console.log(title, {
    ...(horizontal
      ? {
          clientY: e.clientY,
          pageY: e.pageY,
          screenY: e.screenY,
        }
      : {
          clientX: e.clientX,
          pageX: e.pageX,
          screenX: e.screenX,
        }),
  });
};

export default function Dragger({ horizontal = false, onDragComplete }) {
  const [resizeState, setResizeState] = useState({
    resizing: false,
    dragPosClientX: undefined,
    dragPosClientY: undefined,
    dragDirection: 0,
  });

  function handleDragStart(e) {
    console.groupCollapsed("Dragger");
    log("handleDragStart", horizontal, e);

    setResizeState({
      resizing: true,
      dragPosClientX: e.clientX,
      dragPosClientY: e.clientY,
      dragDirection: 0,
    });
  }

  function handleDragEnd(e) {
    // log("handleDragEnd", horizontal, e);

    const axisXChange = e.clientX;
    const axisYChange = e.clientY;

    console.log("handleDragEnd : axisXChange", axisXChange);
    console.log("handleDragEnd : axisYChange", axisYChange);

    const changedPixel = horizontal
      ? getChangedPixels(axisYChange, resizeState.dragPosClientY)
      : getChangedPixels(axisXChange, resizeState.dragPosClientX);

    console.log("handleDragEnd : changedPixel", changedPixel);
    console.groupEnd();

    onDragComplete(changedPixel);

    setResizeState({
      resizing: false,
      dragPosClientX: undefined,
      dragPosClientY: undefined,
      dragDirection: 0,
    });
  }

  // function handleDrag(e) {
  //   // console.log("handleDrag", {
  //   //   clientX: e.clientX,
  //   //   pageX: e.pageX,
  //   //   screenX: e.screenX,
  //   // });
  // }

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
        backgroundColor: "blue",
        opacity: resizeState.resizing ? "60%" : "100%",
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // onDrag={handleDrag}
    ></div>
  );
}
