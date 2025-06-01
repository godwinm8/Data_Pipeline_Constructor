import React, { useState, useEffect } from "react";
import styles from "../../styles/Node.module.css";

export const InputNodeContent = ({ id, data, onDataChange }) => {
  const [currName, setCurrName] = useState(
    data?.inputName === undefined
      ? id.replace("customInput-", "input_")
      : data.inputName
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  const nameInputId = `${id}-name-input`;
  const typeSelectId = `${id}-type-select`;

  useEffect(() => {
    if (data?.inputName !== undefined && data.inputName !== currName) {
      setCurrName(data.inputName);
    }
  }, [data?.inputName, currName]);
  useEffect(() => {
    if (data?.inputType !== undefined && data.inputType !== inputType) {
      setInputType(data.inputType);
    }
  }, [data?.inputType, inputType]);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    onDataChange("inputName", newName);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setInputType(newType);
    onDataChange("inputType", newType);
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
          placeholder="Enter input name"
        />
      </div>
      <div className={styles.nodeInputGroup}>
        <label htmlFor={typeSelectId} className={styles.nodeLabel}>
          Type:
        </label>
        <select
          id={typeSelectId}
          value={inputType}
          onChange={handleTypeChange}
          className={`${styles.nodeSelect} nodrag`}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </>
  );
};
