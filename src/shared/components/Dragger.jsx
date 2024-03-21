import { useState } from "react";

const getChangeInPx = (newPos, oldPos) => {
  const dragDirection = newPos - oldPos;
  const changePx =
    dragDirection < 0 ? dragDirection - dragDirection * 2 : -dragDirection;

  return changePx;
};

export default function Dragger({ horizontal = false, onDragComplete }) {
  const [resizeState, setResizeState] = useState({
    resizing: false,
    dragPosClientX: undefined,
    dragPosClientY: undefined,
    dragDirection: 0,
  });

  function handleDragStart(e) {
    // console.log("handleDragStart", {
    //   clientX: e.clientX,
    //   pageX: e.pageX,
    //   screenX: e.screenX,
    // });

    setResizeState({
      resizing: true,
      dragPosClientX: e.clientX,
      dragPosClientY: e.clientY,
      dragDirection: 0,
    });
  }

  function handleDragEnd(e) {
    // console.log("handleDragEnd", {
    //   clientX: e.clientX,
    //   clientY: e.clientY,
    //   dragPosClientX: resizeState.dragPosClientX,
    //   dragPosClientY: resizeState.dragPosClientY,
    // });
    // setResizeState({
    // const dragDirection = e.clientX - resizeState.dragPosClientX;
    // const changePx =
    //   dragDirection < 0 ? dragDirection - dragDirection * 2 : -dragDirection;

    const changePixelX = getChangeInPx(e.clientX, resizeState.dragPosClientX);
    const changePixelY = getChangeInPx(e.clientY, resizeState.dragPosClientY);

    console.log("handleDragEnd", {
      changePixelX,
      changePixelY,
    });

    // console.log("handleDragEnd", {
    //   dragDirection,
    //   clientX: e.clientX,
    //   dragPosClientX: resizeState.dragPosClientX,
    //   changePx,
    // });

    // console.log(
    //   "handleDragEnd : divRef.current.offsetWidth",
    //   divRef.current.offsetWidth
    // );

    onDragComplete(horizontal ? changePixelY : changePixelX);

    setResizeState({
      resizing: false,
      dragPosClientX: undefined,
      dragPosClientY: undefined,
      dragDirection: 0,
    });
  }

  function handleDrag(e) {
    // console.log("handleDrag", e);
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
        backgroundColor: "blue",
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
    ></div>
  );
}
