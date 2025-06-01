import React, { useState, useEffect } from "react";
import styles from "../../styles/Node.module.css";

export const NumberInputNodeContent = ({ id, data, onDataChange }) => {
  const [currentValue, setCurrentValue] = useState(
    data?.value === undefined || data.value === null
      ? ""
      : data.value.toString()
  );
  const numberInputId = `${id}-number-input`;

  useEffect(() => {
    if (data?.value !== undefined) {
      if (data.value === null && currentValue !== "") {
        setCurrentValue("");
      } else if (
        data.value !== null &&
        data.value !== parseFloat(currentValue)
      ) {
        setCurrentValue(data.value.toString());
      }
    }
  }, [data?.value, currentValue]);

  const handleChange = (e) => {
    const rawValue = e.target.value;
    setCurrentValue(rawValue);

    if (rawValue === "") {
      onDataChange("value", null);
    } else {
      const numValue = parseFloat(rawValue);

      if (!isNaN(numValue)) {
        onDataChange("value", numValue);
      }
    }
  };

  return (
    <div className={styles.nodeInputGroup}>
      <label htmlFor={numberInputId} className={styles.nodeLabel}>
        Value:
      </label>
      <input
        id={numberInputId}
        type="number"
        value={currentValue}
        onChange={handleChange}
        className={`${styles.nodeInput} nodrag`}
        placeholder="Enter a number"
      />
    </div>
  );
};
