import { createContext, useState } from "react";

const initialState = {
  paneContainers: [
    {
      id: new Date().getTime().toString(),
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
    selectedTabGlobal: appState.selectedTab,
    addPaneContainer: () => {
      setAppState((prevState) => {
        const newPaneContainer = {
          id: new Date().getTime().toString(),
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
    setSelectedTab: (tab) => {
      setAppState((prevState) => ({ ...prevState, selectedTab: tab }));
    },
  };

  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
}
