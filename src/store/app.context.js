import { createContext, useState } from "react";

const initialState = {
  paneContainers: [
    {
      id: new Date().getTime().toString(),
      containerHeight: "100%",
    },
  ],
  selectedTab: undefined,
};

export const AppContext = createContext({
  ...initialState,
  addPaneContainer: () => {},
  removePaneContainer: () => {},
  setSelectedTab: () => {},
});

export default function AppContextProvider({ children }) {
  const [appState, setAppState] = useState(initialState);

  const ctxValue = {
    paneContainers: appState.paneContainers,
    totalPaneContainers: appState.paneContainers.length,
    selectedTabGlobal: appState.selectedTab,
    addPaneContainer: () => {
      setAppState((prevState) => {
        const newPaneContainer = {
          id: new Date().getTime().toString(),
          containerHeight: "100%",
        };

        return {
          ...prevState,
          paneContainers: [...prevState.paneContainers, newPaneContainer],
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

        console.log(
          "setContainerHeight : updatePaneContainers",
          updatePaneContainers
        );

        setAppState((prevState) => ({
          ...prevState,
          paneContainers: updatePaneContainers,
        }));
      }
    },
    setSelectedTab: (tab) => {
      setAppState((prevState) => ({ ...prevState, selectedTab: tab }));
    },
  };

  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
}
