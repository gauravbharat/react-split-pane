import Pane from "./Pane";
import Dragger from "../shared/components/Dragger";
import Splitter from "../shared/components/Splitter";

import { useContext, useRef, useState } from "react";
import { AppContext } from "../store/app.context";
import { getWords } from "../shared/util/lorem-generator";
import { getNewHeight } from "../shared/util/drag-computations";
import { getRandomColor } from "../shared/util/colors";

const firstTab = {
  title: new Date().getTime().toString().slice(-5),
  content: getWords(20),
};

export default function PaneContainer({ id, showSplitter }) {
  const ctx = useContext(AppContext);
  const divRef = useRef();

  // console.log("PaneContainer : RENDERED : props", {
  //   id,
  //   containerHeight,
  // });

  const [panes, setPanes] = useState([
    {
      id: new Date().getTime().toString(),
      paneWidth: 100, //in percentage
      bgColor: getRandomColor(),
    },
  ]);

  function handleAddPane() {
    setPanes((prevState) => [
      ...prevState,
      {
        id: new Date().getTime().toString(),
        paneWidth: 100,
        bgColor: getRandomColor(),
      },
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
    const parentDiv = document.getElementById("pane-containers-div");

    const { percentage, siblingPercentage } = getNewHeight(
      changePx,
      divRef.current.offsetHeight,
      parentDiv.offsetHeight,
      ctx.totalPaneContainers
    );

    // console.log("Pane Container : handleDragComplete", {
    //   percentage,
    //   siblingPercentage,
    //   div_offsetParent_offsetHeight: div.offsetHeight,
    // });

    if (percentage <= 10 || siblingPercentage <= 10) {
      return;
    }

    ctx.setContainerHeight(id, percentage, siblingPercentage);
  }

  function recaliberPaneWidths(paneId, newWidth, newSiblingWidth) {
    const foundIdx = panes.findIndex((v) => v.id === paneId);

    if (foundIdx > -1) {
      const updatedPanes = [...panes];

      const foundPane = updatedPanes[foundIdx];
      const siblingPane = updatedPanes[foundIdx - 1];

      foundPane.paneWidth = newWidth;
      siblingPane.paneWidth = newSiblingWidth;

      console.log("recaliberPaneWidths : updatedPanes", updatedPanes);

      setPanes(updatedPanes);
    }
  }

  const lastIndex = panes.length - 1;
  const totalPanes = panes.length;

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        height: "100%",
        width: "100%",
        overflowX: "scroll",
        overflowY: "hidden",
      }}
      ref={divRef}
      id={`pane-container-${id}`}
    >
      {showSplitter && ctx.useSplitter === "DRAGGER" && (
        <Dragger horizontal={true} onDragComplete={handleDragComplete} />
      )}

      {panes.map((pane, index) => (
        <Pane
          key={pane.id}
          initTab={[ctx.selectedTabGlobal ?? firstTab]}
          paneContainerId={id}
          id={pane.id}
          paneWidth={pane.paneWidth}
          onAddPane={handleAddPane}
          onRemovePane={handleRemovePane}
          onResizePane={recaliberPaneWidths}
          isLastPane={lastIndex === index}
          showSplitter={index > 0}
          totalPanes={totalPanes}
          bgColor={pane.bgColor}
        />
      ))}
    </div>
  );
}
