

from fastapi import FastAPI, HTTPException 
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any 
from collections import deque 


from schemas.pipeline import PipelinePayload, PipelineResponse, NodeModel, EdgeModel

app = FastAPI(
    title="VectorShift Pipeline Parser API",
    description="API for parsing and validating pipeline structures.",
    version="0.1.0",
)


origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_pipeline_dag(nodes: List[NodeModel], edges: List[EdgeModel]) -> bool:
    if not nodes:
        return True

    adj = {node.id: [] for node in nodes}
    in_degree = {node.id: 0 for node in nodes}
    node_ids = {node.id for node in nodes}

    for edge in edges:
        if edge.source not in node_ids or edge.target not in node_ids:
            continue
        adj[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    count = 0

    while queue:
        u = queue.popleft()
        count += 1
        for v_id in adj.get(u, []):
            if v_id in in_degree:
                in_degree[v_id] -= 1
                if in_degree[v_id] == 0:
                    queue.append(v_id)
    
    return count == len(nodes)


@app.get("/", tags=["Health Check"])
async def read_root():
    return {"Ping": "Pong", "message": "Welcome to the Pipeline Parser API!"}

@app.post("/pipelines/parse", response_model=PipelineResponse, tags=["Pipeline"])
async def parse_pipeline_endpoint(payload: PipelinePayload):
    try:
        nodes_list: List[NodeModel] = payload.nodes 
        edges_list: List[EdgeModel] = payload.edges

        num_nodes = len(nodes_list)
        num_edges = len(edges_list)

        dag_check_result = is_pipeline_dag(nodes_list, edges_list) 

        return PipelineResponse(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=dag_check_result
        )
    except Exception as e:
        print(f"Error processing pipeline: {e}") 
        raise HTTPException(status_code=500, detail=f"An error occurred while processing the pipeline: {str(e)}")