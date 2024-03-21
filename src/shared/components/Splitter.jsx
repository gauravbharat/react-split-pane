import { useState } from "react";

const getChangeInPx = (newPos, oldPos) => {
  const moveDirection = newPos - oldPos;
  const changePx =
    moveDirection < 0 ? moveDirection - moveDirection * 2 : -moveDirection;

  return changePx;
};

export default function Splitter({ horizontal = false, onSplit }) {
  const [resizeState, setResizeState] = useState({
    resizing: false,
    posClientX: undefined,
    posClientY: undefined,
    moveDirection: 0,
  });

  function handleMouseDown(e) {
    setResizeState({
      resizing: true,
      posClientX: e.clientX,
      posClientY: e.clientY,
      moveDirection: 0,
    });
  }

  function handleMouseUp(e) {
    setResizeState({
      resizing: false,
      posClientX: undefined,
      posClientY: undefined,
      moveDirection: 0,
    });
  }

  function handleMouseMouve(e) {
    // console.log("handleDrag", e);

    if (!resizeState.resizing) {
      return;
    }

    const changePixelX = getChangeInPx(e.clientX, resizeState.posClientX);
    const changePixelY = getChangeInPx(e.clientY, resizeState.posClientY);

    console.log("handleMouseMouve", {
      clientX: e.clientX,
      clientY: e.clientY,
      // pageX: e.pageX,
      // pageY: e.pageY,
      // screenX: e.screenX,
      // screenY: e.screenY,
      changePixelX,
    });

    onSplit(horizontal ? changePixelY : changePixelX);

    // console.log("handleDragEnd", {
    //   clientX: e.clientX,
    //   clientY: e.clientY,
    //   posClientX: resizeState.posClientX,
    //   posClientY: resizeState.posClientY,
    // });
    // setResizeState({
    // const moveDirection = e.clientX - resizeState.posClientX;
    // const changePx =
    //   moveDirection < 0 ? moveDirection - moveDirection * 2 : -moveDirection;

    // console.log("handleMouseMouve", {
    //   changePixelX,
    //   changePixelY,
    // });

    // console.log("handleDragEnd", {
    //   moveDirection,
    //   clientX: e.clientX,
    //   posClientX: resizeState.posClientX,
    //   changePx,
    // });

    // console.log(
    //   "handleDragEnd : divRef.current.offsetWidth",
    //   divRef.current.offsetWidth
    // );
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
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMouve}
    ></div>
  );
}
