import PaneContainer from "./components/PaneContainer";
import "./styles.css";
import { useContext } from "react";
import { AppContext } from "./store/app.context";

export default function App() {
  const ctx = useContext(AppContext);

  return (
    <main
      style={{
        height: "100vh",
        overflowX: "scroll",
        paddingBottom: "1rem",
        maxHeight: "100vh",
      }}
    >
      <button
        onClick={() => {
          ctx.addPaneContainer();
        }}
      >
        {ctx.paneContainers.length === 0
          ? "Add Container (downwards)"
          : "Split editor down"}
      </button>

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
        >
          {ctx.paneContainers.map((pc, index) => (
            <PaneContainer
              key={pc.id}
              id={pc.id}
              containerHeight={pc.containerHeight}
              showSplitter={index > 0}
            />
          ))}
        </div>
      )}
    </main>
  );
}
