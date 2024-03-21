import PaneContainer from "./components/PaneContainer";
import "./styles.css";
import { useContext } from "react";
import { AppContext } from "./store/app.context";

export default function App() {
  const ctx = useContext(AppContext);

  return (
    // <div className="App">
    //   <h1>Hello CodeSandbox</h1>
    //   <h2>Start editing to see some magic happen!</h2>
    // </div>

    <main
      style={{
        height: "100vh",
        overflowX: "scroll",
        paddingBottom: "1rem",
        maxHeight: "100vh",
      }}
    >
      {/* {ctx.paneContainers.length === 0 && ( */}
      <button
        onClick={() => {
          ctx.addPaneContainer();
        }}
      >
        {ctx.paneContainers.length === 0
          ? "Add Container (downwards)"
          : "Split editor down"}
      </button>
      {/* )} */}

      {ctx.paneContainers.length > 0 && (
        <div
          style={{
            display: "flex",
            // justifyContent:
            flexDirection: "column",
            height: "100%",
            padding: "5px",
            overflowX: "scroll",
          }}
        >
          {ctx.paneContainers.map((pc, index) => (
            <PaneContainer key={pc.id} id={pc.id} showSplitter={index > 0} />
          ))}
        </div>
      )}

      {/* And Pane Container below shall be shown after click add below */}
      {/* <PaneContainer /> */}

      {/* <div
        class="pane-container"
        style={{
          display: "flex",
          position: "relative",
          // justifyContent:
          // flexWrap: "wrap",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "block",
            overflowX: "scroll",
            width: "100%",
            height: "100%",
            border: "1px solid blue",
          }}
        >
          <div>
            <button>Tab 1</button>
            <button>Tab 2</button>
            <button>Tab 3</button>
          </div>
          <div>tab content 1</div>
        </div>

        <div
          style={{
            display: "block",
            overflowX: "scroll",
            width: "100%",
            height: "100%",
            border: "1px solid blue",
          }}
        >
          <div>
            <button>Tab 1</button>
            <button>Tab 2</button>
            <button>Tab 3</button>
          </div>
          <div>tab content 2</div>
        </div>

        <div
          style={{
            display: "block",
            overflowX: "scroll",
            width: "100%",
            height: "100%",
            border: "1px solid blue",
          }}
        >
          <div>
            <button>Tab 1</button>
            <button>Tab 2</button>
            <button>Tab 3</button>
          </div>
          <div>tab content 3</div>
        </div>

        <div
          style={{
            display: "block",
            overflowX: "scroll",
            width: "100%",
            height: "100%",
            border: "1px solid blue",
          }}
        >
          <div>
            <button>Tab 1</button>
            <button>Tab 2</button>
            <button>Tab 3</button>
          </div>
          <div>tab content 4</div>
        </div>
      </div> */}

      {/* <div
        class="pane-container"
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "block",
            overflowX: "scroll",
            width: "100%",
            height: "100%",
            border: "1px solid blue",
          }}
        >
          <div>
            <button>Tab 1</button>
            <button>Tab 2</button>
            <button>Tab 3</button>
          </div>
          <div>tab content 2</div>
        </div> */}

      {/* <div
          style={{
            display: "block",
            overflowX: "scroll",
            width: "100%",
            height: "100%",
            border: "1px solid blue",
          }}
        >
          <div>
            <button>Tab 1</button>
            <button>Tab 2</button>
            <button>Tab 3</button>
          </div>
          <div>tab content 1</div>
        </div>
        <div
          style={{
            display: "block",
            overflowX: "scroll",
            width: "100%",
            height: "100%",
            border: "1px solid blue",
          }}
        >
          <div>
            <button>Tab 1</button>
            <button>Tab 2</button>
            <button>Tab 3</button>
          </div>
          <div>tab content 2</div>
        </div>
        <div
          style={{
            display: "block",
            overflowX: "scroll",
            width: "100%",
            height: "100%",
            border: "1px solid blue",
          }}
        >
          <div style={{ display: "flex", overflowX: "scroll" }}>
            <button style={{ cursor: "pointer" }}>Tab 1</button>
            <button>Tab 2</button>
            <button>Tab 3</button>
            <button>Tab 4</button>
          </div>
          <div>tab content 3</div>
        </div>
        <div
          style={{
            display: "block",
            overflowX: "scroll",
            width: "100%",
            height: "100%",
            border: "1px solid blue",
          }}
        >
          <div>
            <button>Tab 1</button>
            <button>Tab 2</button>
            <button>Tab 3</button>
          </div>
          <div>tab content 4</div>
        </div>
        <div
          style={{
            display: "block",
            overflowX: "scroll",
            width: "100%",
            height: "100%",
            border: "1px solid blue",
          }}
        >
          <div>
            <button>Tab 1</button>
            <button>Tab 2</button>
            <button>Tab 3</button>
          </div>
          <div>tab content 5</div>
        </div> */}
      {/* </div> */}
    </main>
  );
}
