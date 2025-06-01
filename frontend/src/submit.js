import React from "react";
import { useStore } from "./store";
import styles from "./styles/App.module.css";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    const pipelineData = {
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: { ...node.data },
        width: node.width,
        height: node.height,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
        type: edge.type,
        animated: edge.animated,
      })),
    };

    console.log("Submitting pipeline data:", pipelineData);

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pipelineData),
      });

      if (!response.ok) {
        let errorDetail = `HTTP error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorDetail = errorData.detail || errorDetail;
        } catch (jsonError) {
          console.error("Could not parse error JSON from backend:", jsonError);
        }
        throw new Error(errorDetail);
      }

      const result = await response.json();

      const alertMessage = `Pipeline Submission Results:
            ---------------------------------
            Number of Nodes: ${result.num_nodes}
            Number of Edges: ${result.num_edges}
            Is DAG: ${
              result.is_dag ? "Yes (Valid Pipeline)" : "No (Cycle Detected!)"
            }
            ---------------------------------`;

      alert(alertMessage);
    } catch (error) {
      console.error("Failed to submit pipeline:", error);
      alert(
        `Failed to submit pipeline: ${error.message}\n\nCheck the browser console and backend logs for more details.`
      );
    }
  };

  return (
    <div className={styles.submitButtonContainer}>
      <button
        type="button"
        onClick={handleSubmit}
        className={styles.submitButton}
      >
        Submit Pipeline
      </button>
    </div>
  );
};
