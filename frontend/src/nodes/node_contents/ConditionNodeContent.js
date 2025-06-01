import React, { useState, useEffect } from "react";
import styles from "../../styles/Node.module.css";

export const ConditionNodeContent = ({ id, data, onDataChange }) => {
  const [condition, setCondition] = useState(data?.condition || ">");
  const [compareValue, setCompareValue] = useState(
    data?.compareValue === undefined || data.compareValue === null
      ? ""
      : data.compareValue
  );
  const conditionSelectId = `${id}-condition-label`;
  const compareValueInputId = `${id}-compare-value-input`;
  useEffect(() => {
    if (data?.condition !== undefined && data.condition !== condition) {
      setCondition(data.condition);
    }
  }, [data?.condition, condition]);

  useEffect(() => {
    if (
      data?.compareValue !== undefined &&
      data.compareValue !== compareValue
    ) {
      setCompareValue(
        data.compareValue === null || data.compareValue === undefined
          ? ""
          : data.compareValue
      );
    } else if (data?.compareValue === undefined && compareValue !== "") {
      setCompareValue("");
    }
  }, [data?.compareValue, compareValue]);

  const handleConditionChange = (e) => {
    const newCondition = e.target.value;
    setCondition(newCondition);
    onDataChange("condition", newCondition);
  };

  const handleValueChange = (e) => {
    const rawValue = e.target.value;
    setCompareValue(rawValue);
    if (rawValue === "") {
      onDataChange("compareValue", null);
    } else {
      const numValue = parseFloat(rawValue);

      if (!isNaN(numValue)) {
        onDataChange("compareValue", numValue);
      }
    }
  };

  return (
    <div className={styles.nodeInputGroup}>
      <label htmlFor={conditionSelectId} className={styles.nodeLabel}>
        If input value is:
      </label>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <select
          id={conditionSelectId}
          value={condition}
          onChange={handleConditionChange}
          className={`${styles.nodeSelect} nodrag`}
          style={{ flex: 1 }}
        >
          <option value=">">{"> (Greater than)"}</option>
          <option value="<">{"< (Less than)"}</option>
          <option value="===">=== (Equal to)</option>
          <option value="!==">!== (Not equal to)</option>
          <option value=">=">{">= (Greater or equal)"}</option>
          <option value="<=">{"<= (Less or equal)"}</option>
        </select>
        <input
          id={compareValueInputId}
          type="number"
          value={compareValue}
          onChange={handleValueChange}
          className={`${styles.nodeInput} nodrag`}
          style={{ flex: 1 }}
          placeholder="value"
        />
      </div>
    </div>
  );
};
