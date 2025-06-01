# Node-Based Visual Pipeline Editor - Frontend

This project implements the frontend for a dynamic, node-based visual pipeline editor. Users can construct, configure, and visualize complex data or operational workflows. It features a modern interface built with React, utilizing React Flow for its powerful diagramming capabilities and Zustand for efficient state management.

## ✨ Live Demo

🚀 **[Explore the live application deployed on Vercel!](YOUR_VERCEL_LIVE_LINK_HERE)** 🚀

**Note on Backend Interaction:** The "Submit Pipeline" feature in this live demo attempts to connect to a backend service expected to be running on `http://localhost:8000`. To test this specific functionality, please clone the full project repository and run the backend server locally as per the instructions in the `backend/README.md` file.

##  Features

*   **Intuitive Drag-and-Drop Interface:** Easily add and arrange various node types on an infinite canvas.
*   **Custom Node Abstraction:** A flexible `BaseNode` component allows for rapid development and consistent styling of diverse node types.
    *   Includes core nodes: Input, Output, LLM, Text.
    *   Extended with utility nodes: Number, Math Operation, Condition, Merge, and Logger.
*   **Dynamic Text Node:**
    *   **Auto-Resizing:** Automatically adjusts its height to fit the text content as users type.
    *   **Variable-Based Input Handles:** Dynamically creates input handles on the left side corresponding to `{{variableName}}` syntax within its text, allowing for templating and data injection.
*   **Node Connectivity:** Visually connect nodes via input/output handles to define pipeline flow, with animated edges.
*   **Modern & Unified Design:** A [**responsive dark theme with indigo accents**] ensures a visually appealing and consistent user experience, implemented with CSS Modules.
*   **Pipeline Analysis Submission:** Allows users to submit the constructed pipeline (nodes and edges) to a backend for structural analysis (e.g., DAG validation).
*   **Integrated React Flow Utilities:** Includes built-in controls for zoom/pan and a minimap for easy navigation.

## 📸 Screenshots


**Main Editor View:**

![Image](https://github.com/user-attachments/assets/61112baa-6c91-4e97-81df-a7f2d23e7ddf)
*(Caption: The primary interface showing the node toolbar, canvas with a sample pipeline, controls, and minimap.)*

**Text Node - Dynamic Features:**

![Image](https://github.com/user-attachments/assets/fbfbaaa3-6870-4283-94da-73a52d2e8000)
![Image](https://github.com/user-attachments/assets/9ffae4fd-106f-482f-b148-d1e976818db7)
*(Caption: Demonstrating the Text Node's auto-resizing and dynamic input handles generated from `{{variable}}` syntax.)*

**Pipeline Submission Feedback:**
![Image](https://github.com/user-attachments/assets/20ba4595-6646-4536-a4e7-9191184b57fe)
![Image](https://github.com/user-attachments/assets/0d06a846-e9c1-406b-805c-58650d68518a)
*(Caption: Example of the alert displayed after submitting a pipeline, showing node/edge counts and DAG status from the backend.)*


## 🛠️ Tech Stack

*   **React (v18+):** Core UI library.
*   **React Flow (v11+):** For building node-based editors and graphs.
*   **Zustand:** For lightweight global state management.
*   **CSS Modules:** For scoped and maintainable styling.
*   **JavaScript (ES6+):** Primary programming language.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v16.x or v18.x recommended)
*   npm (v8.x or v9.x recommended) or yarn

### Installation

1.  Clone the repository (if you haven't already).
2.  Navigate to the `frontend` directory:
    ```bash
    cd path/to/your/project/frontend
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
    (or `yarn install` if you use Yarn)

### Running in Development Mode

1.  **Important:** For full functionality (especially the "Submit Pipeline" feature), ensure the backend server is running (see `backend/README.md`). It is expected to be available at `http://localhost:8000`.
2.  From the `frontend` directory, run:
    ```bash
    npm start
    ```
3.  This will open the application in your default web browser, usually at [http://localhost:3000](http://localhost:3000). The page will automatically reload if you make edits.

## 📂 Project Structure Highlights

*   `public/`: Static assets and the main `index.html` file.
*   `src/`: Contains all the React application source code.
    *   `App.js`: Root application component, sets up main layout.
    *   `ui.js`: Core React Flow canvas setup, node type definitions, and drop handling.
    *   `store.js`: Zustand global state management for nodes, edges, etc.
    *   `nodes/`:
        *   `BaseNode.js`: The reusable base component for all node types.
        *   `node_contents/`: Directory with individual React components rendering the unique UI for each specific node type (e.g., `TextNodeContent.js`).
    *   `styles/`: CSS Modules and global stylesheets.
    *   `toolbar.js`: Component for the "Add Nodes" sidebar/toolbar.
    *   `draggableNode.js`: Component for the draggable items in the toolbar.
    *   `submit.js`: Handles the "Submit Pipeline" button logic and API call.