import React, { memo, useCallback } from "react";
import { Handle } from "reactflow";
import { useStore } from "../store";
import styles from "../styles/Node.module.css";

const BaseNode = ({ id, data, selected, type: nodeTypeFromFlow }) => {
  const {
    title,
    handlesConfig = [],
    dynamicHandlesConfig = [],
    contentRenderer,
    nodeType = nodeTypeFromFlow,
    width: nodeWidth,
    height: nodeHeight,
    minHeight: nodeMinHeight,
    style: customNodeWrapperStyle,
    headerStyle: customHeaderStyle,
    contentStyle: customContentStyle,
  } = data;

  const updateNodeField = useStore((state) => state.updateNodeField);

  const onDataChange = useCallback(
    (fieldName, fieldValue) => {
      if (updateNodeField) {
        updateNodeField(id, fieldName, fieldValue);
      } else {
        console.warn(
          `updateNodeField action not available in store. Node ID: ${id}, Field: ${fieldName}`
        );
      }
    },
    [id, updateNodeField]
  );

  const allHandles = [...handlesConfig, ...dynamicHandlesConfig];

  const nodeDynamicStyle = {
    width: nodeWidth || 200,
    height: nodeHeight || "auto",
    minHeight: nodeMinHeight || 80,
    ...(customNodeWrapperStyle || {}),
  };

  return (
    <div
      className={`${styles.customNode} ${selected ? styles.selected : ""}`}
      style={nodeDynamicStyle}
    >
      {title && (
        <div
          className={styles.customNodeHeader}
          style={customHeaderStyle || {}}
        >
          {title}
        </div>
      )}
      <div
        className={styles.customNodeContent}
        style={customContentStyle || {}}
      >
        {contentRenderer ? (
          contentRenderer({ id, data, onDataChange, nodeType })
        ) : (
          <div>Node content renderer not provided</div>
        )}
      </div>
      {allHandles.map((handleConf, index) => (
        <Handle
          key={
            handleConf.idSuffix
              ? `${id}-${handleConf.idSuffix}`
              : `${id}-${handleConf.type}-${nodeType}-${index}`
          }
          type={handleConf.type}
          position={handleConf.position}
          id={
            handleConf.idSuffix
              ? `${id}-${handleConf.idSuffix}`
              : `${id}-${handleConf.type}-${nodeType}-${index}`
          }
          className={styles.handle}
          style={{
            background: "#777",
            width: "10px",
            height: "10px",
            ...(handleConf.style || {}),
          }}
          isConnectable={
            handleConf.isConnectable === undefined
              ? true
              : handleConf.isConnectable
          }
        />
      ))}
    </div>
  );
};

export default memo(BaseNode);
