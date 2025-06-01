import React, { useState, useEffect } from "react";
import styles from "../../styles/Node.module.css";

export const MathOperationNodeContent = ({ id, data, onDataChange }) => {
  const [operation, setOperation] = useState(data?.operation || "add");
  const opSelectId = `${id}-op-select`;

  useEffect(() => {
    if (data?.operation !== undefined && data.operation !== operation) {
      setOperation(data.operation);
    }
  }, [data?.operation, operation]);

  const handleOperationChange = (e) => {
    const newOperation = e.target.value;
    setOperation(newOperation);
    onDataChange("operation", newOperation);
  };

  return (
    <div className={styles.nodeInputGroup}>
      <label htmlFor={opSelectId} className={styles.nodeLabel}>
        Operation:
      </label>
      <select
        id={opSelectId}
        value={operation}
        onChange={handleOperationChange}
        className={`${styles.nodeSelect} nodrag`}
        style={{ width: "100%" }}
      >
        <option value="add">Add (+)</option>
        <option value="subtract">Subtract (-)</option>
        <option value="multiply">Multiply (*)</option>
        <option value="divide">Divide (/)</option>
      </select>
    </div>
  );
};
