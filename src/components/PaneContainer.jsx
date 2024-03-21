import Pane from "./Pane";
import Dragger from "../shared/components/Dragger";

import { useContext, useRef, useState } from "react";
import { AppContext } from "../store/app.context";
import { getWords } from "../shared/util/lorem-generator";

const firstTab = {
  title: new Date().getTime().toString().slice(-5),
  content: getWords(20),
};

export default function PaneContainer({ id, showSplitter, containerHeight }) {
  const ctx = useContext(AppContext);
  const divRef = useRef();

  // console.log("PaneContainer : RENDERED : props", {
  //   id,
  //   containerHeight,
  // });

  const [panes, setPanes] = useState([
    {
      id: new Date().getTime().toString(),
    },
  ]);

  function handleAddPane() {
    setPanes((prevState) => [
      ...prevState,
      { id: new Date().getTime().toString() },
    ]);
  }

  function handleRemovePane(paneId) {
    console.log("handleRemovePane", {
      paneId,
      totalPanes: panes.length,
    });

    if (panes.length === 1) {
      ctx.removePaneContainer(id);
    } else {
      const foundIdx = panes.findIndex((pane) => pane.id === paneId);

      if (foundIdx > -1) {
        setPanes((prevState) => {
          const updatedPanes = [...prevState];
          updatedPanes.splice(foundIdx, 1);
          return updatedPanes;
        });
      }
    }
  }

  function handleDragComplete(changePx) {
    const offsetHeight = divRef.current.offsetHeight;
    const offsetParentHeight = divRef.current.offsetParent.offsetHeight;
    const newHeight = offsetHeight + changePx;
    const divisibleHeight = offsetParentHeight / ctx.totalPaneContainers;
    const percentage = Math.round((100 * newHeight) / divisibleHeight);

    let siblingPercentage = 0;

    if (percentage > 100) {
      siblingPercentage = 100 - (percentage - 100);
    } else {
      siblingPercentage = 100 + (100 - percentage);
    }

    // console.log("PaneContainer: handleDragComplete", {
    //   changePx,
    //   offsetHeight,
    //   offsetParentHeight,
    //   newHeight,
    //   percentage,
    //   siblingPercentage,
    //   totalPaneContainers: ctx.totalPaneContainers,
    // });

    ctx.setContainerHeight(id, `${percentage}%`, `${siblingPercentage}%`);
  }

  const lastIndex = panes.length - 1;

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        height: containerHeight,
        width: "100%",
        overflowX: "scroll",
        overflowY: "hidden",
      }}
      ref={divRef}
    >
      {showSplitter && (
        <Dragger horizontal={true} onDragComplete={handleDragComplete} />
      )}
      {panes.map((pane, index) => (
        <Pane
          key={pane.id}
          initTab={[ctx.selectedTabGlobal ?? firstTab]}
          paneContainerId={id}
          id={pane.id}
          onAddPane={handleAddPane}
          onRemovePane={handleRemovePane}
          isLastPane={lastIndex === index}
          showSplitter={index > 0}
        />
      ))}
    </div>
  );
}
