import { useContext, useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { getWords } from "../shared/util/lorem-generator";
import { getRandomColor } from "../shared/util/colors";
import { AppContext } from "../store/app.context";
import SplitPaner from "./SplitPaner";

const firstTab = {
  title: (new Date().getTime() + Math.round(Math.random() * 10))
    .toString()
    .slice(-5),
  content: getWords(20),
};

export default function SplitPaneContainer({ paneContainerId }) {
  const ctx = useContext(AppContext);

  const [panes, setPanes] = useState([
    {
      id:
        (new Date().getTime() + Math.round(Math.random() * 100)).toString() + 1,
      background: getRandomColor(),
    },
    {
      id:
        (new Date().getTime() + Math.round(Math.random() * 100)).toString() + 2,
      background: getRandomColor(),
    },
    {
      id:
        (new Date().getTime() + Math.round(Math.random() * 100)).toString() + 3,
      background: getRandomColor(),
    },
  ]);

  const [sizes, setSizes] = useState(["50%", 100, "auto"]);

  function handleAddPane() {
    setPanes((prevState) => [
      ...prevState,
      {
        id: (new Date().getTime() + Math.round(Math.random() * 100)).toString(),
        paneWidth: 100,
        background: getRandomColor(),
      },
    ]);
  }

  function handleRemovePane(paneId) {
    console.log("handleRemovePane", {
      paneId,
      totalPanes: panes.length,
    });

    if (panes.length === 1) {
      ctx.removePaneContainer(paneContainerId);
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

  const lastIndex = panes.length - 1;

  return (
    <SplitPane
      split="vertical"
      sizes={sizes}
      onChange={setSizes}
      style={{ border: "1px solid blue", overflowX: "scroll" }}
    >
      {panes.map((pane, index) => (
        <Pane
          key={`${paneContainerId}-pane-${pane.id}`}
          minSize={90}
          maxSize="50%"
        >
          <SplitPaner
            id={pane.id}
            paneContainerId={paneContainerId}
            bgColor={pane.background}
            initTab={[ctx.selectedTabGlobal ?? firstTab]}
            onAddPane={handleAddPane}
            onRemovePane={handleRemovePane}
            isLastPane={lastIndex === index}
          />
        </Pane>
      ))}
    </SplitPane>
  );
}
