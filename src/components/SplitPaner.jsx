import { useContext, useState } from "react";
import { AppContext } from "../store/app.context";
import { getWords } from "../shared/util/lorem-generator";

export default function SplitPaner({
  initTab,
  paneContainerId,
  id,
  onAddPane,
  onRemovePane,
  bgColor,
  isLastPane,
}) {
  const ctx = useContext(AppContext);

  const [paneState, setPaneState] = useState({
    tabs: initTab,
    selectedTab: initTab[0],
    selectedTabIdx: 0,
  });

  function handleAddTab() {
    const newTab = {
      title: new Date().getTime().toString().slice(-5),
      content: getWords(20),
    };

    ctx.setSelectedTab(newTab);

    setPaneState((prevState) => {
      return {
        tabs: [...prevState.tabs, newTab],
        selectedTab: newTab,
        selectedTabIdx: prevState.tabs.length,
      };
    });
  }

  function handleRemoveTab(idx) {
    console.log("handleRemoveTab idx", idx);

    if (paneState.tabs.length === 1) {
      onRemovePane(id);
    } else {
      let selectedTab = paneState.selectedTab;
      let selectedTabIdx = paneState.selectedTabIdx;

      if (idx === 0) {
        selectedTab = paneState.tabs[1];
        selectedTabIdx = 0;
      } else if (idx > 0) {
        selectedTab = paneState.tabs[idx - 1];
        selectedTabIdx = idx - 1;
      }

      setPaneState((prevState) => {
        const updateTabs = [...prevState.tabs];

        updateTabs.splice(idx, 1);

        return {
          tabs: updateTabs,
          selectedTab,
          selectedTabIdx,
        };
      });

      if (selectedTab) {
        ctx.setSelectedTab(selectedTab);
      }
    }
  }

  return (
    <div
      style={{
        display: "block",
        overflowX: "scroll",
        height: "100%",
        border: "1px solid blue",
        minWidth: "81px",
        padding: "2px",
        position: "relative",
        background: bgColor,
      }}
    >
      <ul
        style={{
          display: "flex",
          overflowX: "scroll",
          listStyle: "none",
          padding: 0,
          margin: 0,
          marginBottom: "2px",
        }}
      >
        {paneState.tabs.map((tab, index) => (
          <li key={`${paneContainerId}-tab-${index}-${tab.title}`}>
            <button
              style={{
                cursor: "pointer",
                backgroundColor:
                  paneState.selectedTabIdx === index ? "yellow" : "white",
                position: "relative",
                padding: "10px",
              }}
              onClick={() => {
                setPaneState((prevState) => ({
                  ...prevState,
                  selectedTab: tab,
                  selectedTabIdx: index,
                }));
              }}
            >
              <span>{tab.title}</span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTab(index);
                }}
                style={{ position: "absolute", top: 0 }}
              >
                x
              </span>
            </button>
          </li>
        ))}
        <li>
          <button
            style={{
              cursor: "pointer",
              backgroundColor: "greenyellow",
            }}
            onClick={handleAddTab}
          >
            +
          </button>
        </li>
        {isLastPane && (
          <li>
            <button
              style={{
                cursor: "pointer",
              }}
              onClick={onAddPane}
            >
              Split right
            </button>
          </li>
        )}
      </ul>
      {paneState.selectedTab && (
        <div>
          tab {paneState.selectedTabIdx + 1} {paneState.selectedTab.content}
        </div>
      )}
    </div>
  );
}
