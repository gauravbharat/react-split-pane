import Pane from "./Pane";
import Dragger from "../shared/components/Dragger";

import { useContext, useRef, useState } from "react";
import { AppContext } from "../store/app.context";
import { getWords } from "../shared/util/lorem-generator";

const firstTab = {
  title: new Date().getTime().toString().slice(-5),
  content: getWords(20),
};

export default function PaneContainer({ id, showSplitter }) {
  const ctx = useContext(AppContext);
  const divRef = useRef();

  const [panes, setPanes] = useState([
    {
      id: new Date().getTime().toString(),
    },
  ]);

  const [containerHeight, setcontainerHeight] = useState("100%");

  // console.log("ctx.selectedTabGlobal", ctx.selectedTabGlobal);

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
    const percentage =
      Math.round((100 * (offsetHeight + changePx)) / offsetParentHeight) + 50;

    // console.log("PaneContainer: handleDragComplete", {
    //   changePx,
    //   offsetHeight,
    //   offsetParentHeight,
    //   percentage,
    // });

    divRef.current.style.height = `${percentage}%`;

    setcontainerHeight((prevState) => ({
      ...prevState,
      resizedHeight: divRef.current.style.height,
    }));
  }

  const lastIndex = panes.length - 1;

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        // justifyContent:
        // flexWrap: "wrap",
        height: containerHeight,
        width: "100%",
        overflowX: "scroll",
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
