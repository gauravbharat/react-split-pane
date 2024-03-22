import { createContext, useState } from "react";

const initialState = {
  paneContainers: [
    {
      id: new Date().getTime().toString(),
      containerHeight: 100, //in percent
    },
  ],
  selectedTab: undefined,
  useSplitter: "DRAGGER",
  isResizing: false,
  axisXStart: 0,
  axisYStart: 0,
};

export const AppContext = createContext({
  ...initialState,
  addPaneContainer: () => {},
  removePaneContainer: () => {},
  setSelectedTab: () => {},
  setContainerHeight: () => {},
  setSplitter: () => {},
  setResizing: () => {},
});

export default function AppContextProvider({ children }) {
  const [appState, setAppState] = useState(initialState);

  const ctxValue = {
    paneContainers: appState.paneContainers,
    totalPaneContainers: appState.paneContainers.length,
    selectedTabGlobal: appState.selectedTab,
    useSplitter: appState.useSplitter,
    isResizing: appState.isResizing,
    axisXStart: appState.axisXStart,
    axisYStart: appState.axisYStart,
    addPaneContainer: () => {
      setAppState((prevState) => {
        const newPaneContainer = {
          id: new Date().getTime().toString(),
          containerHeight: 100, //in percent
        };

        return {
          ...prevState,
          paneContainers: [...prevState.paneContainers, newPaneContainer],
          isResizing: false,
          axisXStart: 0,
          axisYStart: 0,
        };
      });
    },
    removePaneContainer: (id) => {
      const foundIdx = appState.paneContainers.findIndex((v) => v.id === id);

      if (foundIdx > -1) {
        const updatePaneContainers = [...appState.paneContainers];
        updatePaneContainers.splice(foundIdx, 1);

        setAppState((prevState) => ({
          ...prevState,
          paneContainers: updatePaneContainers,
          isResizing: false,
          axisXStart: 0,
          axisYStart: 0,
        }));
      }
    },
    setContainerHeight: (id, newHeight, newHeightPreviousSibling) => {
      const foundIdx = appState.paneContainers.findIndex((v) => v.id === id);

      if (foundIdx > -1) {
        const updatePaneContainers = [...appState.paneContainers];

        const foundContainer = updatePaneContainers[foundIdx];
        const siblingContainer = updatePaneContainers[foundIdx - 1];

        foundContainer.containerHeight = newHeight;
        siblingContainer.containerHeight = newHeightPreviousSibling;

        // console.log(
        //   "setContainerHeight : updatePaneContainers",
        //   updatePaneContainers
        // );

        setAppState((prevState) => ({
          ...prevState,
          paneContainers: updatePaneContainers,
        }));
      }
    },
    setSelectedTab: (tab) => {
      setAppState((prevState) => ({
        ...prevState,
        selectedTab: tab,
        isResizing: false,
        axisXStart: 0,
        axisYStart: 0,
      }));
    },
    setSplitter: (value) => {
      setAppState((prevState) => ({
        ...prevState,
        useSplitter: value,
        isResizing: false,
        axisXStart: 0,
        axisYStart: 0,
      }));
    },
    setResizing: (value, changedXAxis, changedYAxis) => {
      setAppState((prevState) => ({
        ...prevState,
        isResizing: value,
        axisXStart: changedXAxis,
        axisYStart: changedYAxis,
      }));
    },
  };

  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
}
