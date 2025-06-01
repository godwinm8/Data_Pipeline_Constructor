# Pipeline Structure Analyzer API - Backend

This Python FastAPI application provides backend services for analyzing the structure of node-based pipelines. It can count nodes and edges, and perform a Directed Acyclic Graph (DAG) check.

## ✨ Features

*   **`/pipelines/parse` Endpoint (POST):**
    *   Accepts a JSON payload containing `nodes` and `edges` array.
    *   Validates the incoming data structure using Pydantic models.
    *   Calculates the total number of nodes (`num_nodes`).
    *   Calculates the total number of edges (`num_edges`).
    *   Performs a DAG check to identify cycles within the pipeline structure.
    *   Returns a JSON response: `{"num_nodes": int, "num_edges": int, "is_dag": bool}`.
*   **CORS Enabled:** Configured to allow requests from `http://localhost:3000` (typical frontend development server).
*   **Health Check Endpoint (`/` GET):** Returns a simple status message to verify the server is running.
*   **Automatic API Documentation:**
    *   Swagger UI: available at `/docs`
    *   ReDoc: available at `/redoc`

## 🛠️ Tech Stack

*   **Python (3.7+):** Core programming language.
*   **FastAPI:** Modern, fast web framework for building APIs.
*   **Pydantic:** For data validation and settings management.
*   **Uvicorn:** ASGI server for running the FastAPI application.

## 🚀 Getting Started

### Prerequisites

*   Python (3.7 or higher; developed with Python 3.13)
*   pip (Python package installer)

### Installation & Setup

1.  Clone the repository (if you haven't already).
2.  Navigate to the `backend` directory:
    ```bash
    cd path/to/your/project/backend
    ```
3.  **Create and activate a Python virtual environment:**
    ```bash
    python -m venv .venv
    ```
    Activation:
    *   Windows (PowerShell): `.\.venv\Scripts\Activate.ps1`
    *   Windows (CMD): `.\.venv\Scripts\activate.bat`
    *   macOS/Linux: `source .venv/bin/activate`
4.  **Install dependencies:**
    With the virtual environment activated, run:
    ```bash
    pip install -r requirements.txt
    ```

### Running the Server

1.  Ensure your virtual environment is activated.
2.  From the `backend` directory, start the Uvicorn server:
    ```bash
    uvicorn main:app --reload --port 8000
    ```
    *   This command assumes your FastAPI application instance is named `app` within a file named `main.py` located in the `backend` directory.
    *   `--reload` enables hot reloading for development.
    *   `--port 8000` specifies the port.

3.  The API server will be running on `http://localhost:8000`.

## 📂 Project Structure

*   `main.py`: The main FastAPI application file, containing all endpoint definitions, CORS configuration, and the DAG checking logic.
*   `schemas/`: Directory containing Pydantic models.
    *   `pipeline.py`: Defines data structures for pipeline payloads (`PipelinePayload`, `NodeModel`, `EdgeModel`, `NodeData`) and responses (`PipelineResponse`).
    *   `__init__.py`: Makes `schemas` a Python package.
*   `__init__.py` (at `backend/` root): Makes the `backend` directory itself a package, aiding import resolution.
*   `requirements.txt`: Lists Python package dependencies.


