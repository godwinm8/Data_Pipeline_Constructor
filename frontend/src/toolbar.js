import React from "react";
import { DraggableNode } from "./draggableNode";
import styles from "./styles/Toolbar.module.css";

export const PipelineToolbar = () => {
  return (
    <div className={styles.pipelineToolbar}>
      <span className={styles.toolbarTitle}>Add Nodes</span>

      <div className={styles.nodeCategory}>
        <h4 className={styles.categoryTitle}>Core</h4>
        <div className={styles.draggableNodesContainer}>
          <DraggableNode type="customInput" label="Input" />
          <DraggableNode type="text" label="Text" />
          <DraggableNode type="llm" label="LLM" />
          <DraggableNode type="customOutput" label="Output" />
        </div>
      </div>

      <div className={styles.nodeCategory}>
        <h4 className={styles.categoryTitle}>Utilities & Logic</h4>
        <div className={styles.draggableNodesContainer}>
          <DraggableNode type="numberInput" label="Number" />
          <DraggableNode type="mathOperation" label="Math Op" />
          <DraggableNode type="condition" label="Condition" />
          <DraggableNode type="merge" label="Merge" />
          <DraggableNode type="logger" label="Logger" />
        </div>
      </div>
    </div>
  );
};
