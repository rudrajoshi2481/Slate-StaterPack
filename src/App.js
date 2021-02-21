import React from "react";
import EditorMain from "./Components/EditorMain";
import EditorMain02 from "./Components/EditorMAin02";
import EditorMain03 from "./Components/EditorMain03";
import EditorMain04 from "./Components/EditorMain04";

function App() {

  const [inputTitle,setInpuTitle] = React.useState("")

  return (
    <div >
      <h1>Editor</h1>
      <div style={{ margin: "0 10vw" }}>
        {/* <input
          style={{ fontSize: "32px", border: "none" }}
          placeholder={"What is Bacteria ?"}
          value={inputTitle}
          onChange={e => setInpuTitle(e.target.value)}
        ></input> */}
        {/* <EditorMain /> */}
        {/* <EditorMain02 /> */}
        {/* <EditorMain03 /> */}
        <EditorMain04 />
      </div>
    </div>
  );
}

export default App;
