import React, { useState, useEffect } from "react";
import styles from "../../styles/Node.module.css";

export const OutputNodeContent = ({ id, data, onDataChange }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");
  const nameInputId = `${id}-name-input`;
  const typeSelectId = `${id}-type-select`;

  useEffect(() => {
    if (data?.outputName !== undefined && data.outputName !== currName) {
      setCurrName(data.outputName);
    }
  }, [data?.outputName, currName]);

  useEffect(() => {
    if (data?.outputType !== undefined && data.outputType !== outputType) {
      setOutputType(data.outputType);
    }
  }, [data?.outputType, outputType]);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    onDataChange("outputName", newName);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setOutputType(newType);
    onDataChange("outputType", newType);
  };

  return (
    <>
      <div className={styles.nodeInputGroup}>
        <label htmlFor={nameInputId} className={styles.nodeLabel}>
          Name:
        </label>
        <input
          id={nameInputId}
          type="text"
          value={currName}
          onChange={handleNameChange}
          className={`${styles.nodeInput} nodrag`}
          placeholder="Output Name"
        />
      </div>
      <div className={styles.nodeInputGroup}>
        <label htmlFor={typeSelectId} className={styles.nodeLabel}>
          Type:
        </label>
        <select
          id={typeSelectId}
          value={outputType}
          onChange={handleTypeChange}
          className={`${styles.nodeSelect} nodrag`}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </>
  );
};
