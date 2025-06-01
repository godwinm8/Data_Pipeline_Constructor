import React from "react";

export const MergeNodeContent = ({ id, data, onDataChange, nodeType }) => {
  return (
    <div>
      <p style={{ fontSize: "13px", color: "#FFFFFF", margin: 0 }}>
        This node merges two inputs into a single output.
      </p>
    </div>
  );
};
