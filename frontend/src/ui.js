import React, { useState, useRef, useCallback } from "react";

import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  Position as ReactFlowPosition,
} from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

import BaseNode from "./nodes/BaseNode";

import { InputNodeContent } from "./nodes/node_contents/InputNodeContent";
import { LLMNodeContent } from "./nodes/node_contents/LLMNodeContent";
import { OutputNodeContent } from "./nodes/node_contents/OutputNodeContent";
import { TextNodeContent } from "./nodes/node_contents/TextNodeContent";
import { NumberInputNodeContent } from "./nodes/node_contents/NumberInputNodeContent";
import { LoggerNodeContent } from "./nodes/node_contents/LoggerNodeContent";
import { MathOperationNodeContent } from "./nodes/node_contents/MathOperationNodeContent";
import { ConditionNodeContent } from "./nodes/node_contents/ConditionNodeContent";
import { MergeNodeContent } from "./nodes/node_contents/MergeNodeContent";

import "reactflow/dist/style.css";
import "./styles/ReactFlowCustom.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

export const nodeConfigs = {
  customInput: {
    title: "Input",
    handlesConfig: [
      { type: "source", position: ReactFlowPosition.Right, idSuffix: "value" },
    ],
    contentRenderer: InputNodeContent,
    initialData: (id) => ({
      inputName: id.replace("customInput-", "input_"),
      inputType: "Text",
    }),
  },
  llm: {
    title: "LLM",
    handlesConfig: [
      {
        type: "target",
        position: ReactFlowPosition.Left,
        idSuffix: "system",
        style: { top: "25%" },
      },
      {
        type: "target",
        position: ReactFlowPosition.Left,
        idSuffix: "prompt",
        style: { top: "75%" },
      },
      {
        type: "source",
        position: ReactFlowPosition.Right,
        idSuffix: "response",
      },
    ],
    contentRenderer: LLMNodeContent,
    initialData: () => ({}),
  },
  customOutput: {
    title: "Output",
    handlesConfig: [
      { type: "target", position: ReactFlowPosition.Left, idSuffix: "value" },
    ],
    contentRenderer: OutputNodeContent,
    initialData: (id) => ({
      outputName: id.replace("customOutput-", "output_"),
      outputType: "Text",
    }),
  },
  text: {
    title: "Text",
    handlesConfig: [
      { type: "source", position: ReactFlowPosition.Right, idSuffix: "output" },
    ],
    contentRenderer: TextNodeContent,
    initialData: () => ({
      text: "{{input}} and {{anotherVar}}",
      rows: 3,
      dynamicHandlesConfig: [],
      minHeight: 100,
      minWidth: 180,
    }),
  },
  numberInput: {
    title: "Number",
    handlesConfig: [
      {
        type: "source",
        position: ReactFlowPosition.Right,
        idSuffix: "number-out",
      },
    ],
    contentRenderer: NumberInputNodeContent,
    initialData: () => ({ value: 0 }),
  },
  logger: {
    title: "Logger",
    handlesConfig: [
      { type: "target", position: ReactFlowPosition.Left, idSuffix: "log-in" },
    ],
    contentRenderer: LoggerNodeContent,
    initialData: () => ({ inputValue: null }),
    width: 180,
  },
  mathOperation: {
    title: "Math Op",
    handlesConfig: [
      {
        type: "target",
        position: ReactFlowPosition.Left,
        idSuffix: "a",
        style: { top: "25%" },
      },
      {
        type: "target",
        position: ReactFlowPosition.Left,
        idSuffix: "b",
        style: { top: "75%" },
      },
      { type: "source", position: ReactFlowPosition.Right, idSuffix: "result" },
    ],
    contentRenderer: MathOperationNodeContent,
    initialData: () => ({ operation: "add" }),
  },
  condition: {
    title: "Condition",
    handlesConfig: [
      { type: "target", position: ReactFlowPosition.Left, idSuffix: "input" },
      {
        type: "source",
        position: ReactFlowPosition.Right,
        idSuffix: "true",
        style: { top: "25%" },
      },
      {
        type: "source",
        position: ReactFlowPosition.Right,
        idSuffix: "false",
        style: { top: "75%" },
      },
    ],
    contentRenderer: ConditionNodeContent,
    initialData: () => ({ condition: ">", compareValue: 5 }),
    width: 220,
  },
  merge: {
    title: "Merge",
    handlesConfig: [
      {
        type: "target",
        position: ReactFlowPosition.Left,
        idSuffix: "in1",
        style: { top: "25%" },
      },
      {
        type: "target",
        position: ReactFlowPosition.Left,
        idSuffix: "in2",
        style: { top: "75%" },
      },
      { type: "source", position: ReactFlowPosition.Right, idSuffix: "out" },
    ],
    contentRenderer: MergeNodeContent,
    initialData: () => ({}),
  },
};

const CustomInputNodeType = (flowProps) => {
  const config = nodeConfigs.customInput;
  const mergedData = { ...config, ...flowProps.data };
  return <BaseNode {...flowProps} data={mergedData} />;
};
const LLMNodeType = (flowProps) => {
  const config = nodeConfigs.llm;
  const mergedData = { ...config, ...flowProps.data };
  return <BaseNode {...flowProps} data={mergedData} />;
};
const CustomOutputNodeType = (flowProps) => {
  const config = nodeConfigs.customOutput;
  const mergedData = { ...config, ...flowProps.data };
  return <BaseNode {...flowProps} data={mergedData} />;
};
const TextNodeType = (flowProps) => {
  const config = nodeConfigs.text;
  const mergedData = { ...config, ...flowProps.data };
  return <BaseNode {...flowProps} data={mergedData} />;
};
const NumberInputNodeType = (flowProps) => {
  const config = nodeConfigs.numberInput;
  const mergedData = { ...config, ...flowProps.data };
  return <BaseNode {...flowProps} data={mergedData} />;
};
const LoggerNodeType = (flowProps) => {
  const config = nodeConfigs.logger;
  const mergedData = { ...config, ...flowProps.data };
  return <BaseNode {...flowProps} data={mergedData} />;
};
const MathOperationNodeType = (flowProps) => {
  const config = nodeConfigs.mathOperation;
  const mergedData = { ...config, ...flowProps.data };
  return <BaseNode {...flowProps} data={mergedData} />;
};
const ConditionNodeType = (flowProps) => {
  const config = nodeConfigs.condition;
  const mergedData = { ...config, ...flowProps.data };
  return <BaseNode {...flowProps} data={mergedData} />;
};
const MergeNodeType = (flowProps) => {
  const config = nodeConfigs.merge;
  const mergedData = { ...config, ...flowProps.data };
  return <BaseNode {...flowProps} data={mergedData} />;
};

// Now assign these stable function components to the nodeTypes object
const nodeTypes = {
  customInput: CustomInputNodeType,
  llm: LLMNodeType,
  customOutput: CustomOutputNodeType,
  text: TextNodeType,
  numberInput: NumberInputNodeType,
  logger: LoggerNodeType,
  mathOperation: MathOperationNodeType,
  condition: ConditionNodeType,
  merge: MergeNodeType,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    const config = nodeConfigs[type];
    const specificInitialData = config?.initialData
      ? config.initialData(nodeID)
      : {};
    return {
      nodeType: type,
      ...specificInitialData,
      width: config?.width,
      minHeight: config?.minHeight,
    };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        if (typeof type === "undefined" || !type || !nodeConfigs[type]) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div ref={reactFlowWrapper} className="reactflow-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapToGrid={true}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="D7C7FF" gap={gridSize} variant="dots" />

        <Controls position="top-right" />

        <MiniMap nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </div>
  );
};
