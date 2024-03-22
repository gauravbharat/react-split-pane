import PaneContainer from "./components/PaneContainer";
import SplitDownButton from "./shared/components/SplitDownButton";
import SplitterSelector from "./shared/components/SplitterSelector";

import "./styles.css";
import { useContext } from "react";
import { AppContext } from "./store/app.context";
import Splitter from "./shared/components/Splitter";

export default function App() {
  const ctx = useContext(AppContext);

  // console.log("APP : RENDERED");

  function handleSplit(increment, paneContainerId, currentHeightPercent) {
    let currentSiblingHeightPercent = 0;

    if (currentHeightPercent > 100) {
      currentSiblingHeightPercent = 100 - (currentHeightPercent - 100);
    } else {
      currentSiblingHeightPercent = 100 + (100 - currentHeightPercent);
    }

    let percentage = currentHeightPercent;
    let siblingPercentage = currentSiblingHeightPercent;

    if (increment) {
      percentage += 0.5;
      siblingPercentage -= 0.5;
    } else {
      percentage -= 0.5;
      siblingPercentage += 0.5;
    }

    // console.log("App : handleSplit", {
    //   currentHeightPercent,
    //   currentSiblingHeightPercent,
    //   percentage,
    //   siblingPercentage,
    // });

    if (percentage <= 10 || siblingPercentage <= 10) {
      return;
    }

    ctx.setContainerHeight(paneContainerId, percentage, siblingPercentage);
  }

  return (
    <main
      style={{
        height: "100vh",
        overflowX: "scroll",
        paddingBottom: "1rem",
        maxHeight: "100vh",
      }}
    >
      <div style={{ display: "flex", gap: "5px" }}>
        <SplitDownButton />
        <SplitterSelector />
      </div>

      {ctx.paneContainers.length > 0 && (
        <div
          style={{
            display: "flex",
            // justifyContent:
            flexDirection: "column",
            height: "100%",
            padding: "5px",
            overflowX: "scroll",
            maxHeight: "calc(100vh - 40px)",
          }}
          id="pane-containers-div"
        >
          {ctx.paneContainers.map((pc, index) => (
            <section
              style={{ height: `${pc.containerHeight}%`, position: "relative" }}
              key={`section-${pc.id}`}
              id={`section-${pc.id}`}
            >
              {index > 0 && ctx.useSplitter === "MOUSEMOVE" && (
                <Splitter
                  key={`splitter-${pc.id}`}
                  parentId={pc.id}
                  horizontal={true}
                  onSplit={(increment) =>
                    handleSplit(increment, pc.id, pc.containerHeight)
                  }
                />
              )}
              <PaneContainer id={pc.id} showSplitter={index > 0} />
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
