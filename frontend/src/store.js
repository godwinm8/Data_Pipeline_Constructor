import { createWithEqualityFn } from "zustand/traditional";

import {
  addEdge as rfAddEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = createWithEqualityFn(
  (set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},

    getNodeID: (type) => {
      const currentIDs = { ...get().nodeIDs };
      if (currentIDs[type] === undefined) {
        currentIDs[type] = 0;
      }
      currentIDs[type] += 1;
      set({ nodeIDs: currentIDs });
      return `${type}-${currentIDs[type]}`;
    },

    addNode: (newNode) => {
      set((state) => ({
        nodes: [...state.nodes, newNode],
      }));
    },

    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },

    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },

    onConnect: (connection) => {
      set({
        edges: rfAddEdge(
          {
            ...connection,
            type: "smoothstep",
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: "#B69DDD",
            },
          },
          get().edges
        ),
      });
    },

    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            const newData = { ...node.data, [fieldName]: fieldValue };
            return { ...node, data: newData };
          }
          return node;
        }),
      });
    },

    updateNodeData: (nodeId, newDataPortion) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            const updatedData = { ...node.data, ...newDataPortion };
            return { ...node, data: updatedData };
          }
          return node;
        }),
      });
    },
  }),
  Object.is
);
