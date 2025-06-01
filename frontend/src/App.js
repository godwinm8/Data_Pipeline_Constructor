import React from "react";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import styles from "./styles/App.module.css";

function App() {
  return (
    <div className={styles.appContainer}>
      <PipelineToolbar />
      <div className={styles.mainContentArea}>
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
