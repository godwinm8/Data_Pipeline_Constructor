
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field



class NodeData(BaseModel):
    """
    Represents the 'data' field within a node.
    It's kept flexible to accommodate different node types.
    """
    nodeType: str 
    text: Optional[str] = None
    dynamicHandlesConfig: Optional[List[Dict[str, Any]]] = None 
    
   
    inputName: Optional[str] = None
    inputType: Optional[str] = None
    
   
    outputName: Optional[str] = None
    outputType: Optional[str] = None

   
    value: Optional[float] = None 

  
    operation: Optional[str] = None

   
    condition: Optional[str] = None
    compareValue: Optional[float] = None 

    
    class Config:
        extra = "allow"

class NodeModel(BaseModel):
    """
    Represents a single node in the pipeline from the frontend.
    """
    id: str
    type: str  
    position: Dict[str, float] = Field(..., example={"x": 100.0, "y": 200.0})
    data: NodeData
    
   
    width: Optional[float] = None
    height: Optional[float] = None
    selected: Optional[bool] = None
    dragging: Optional[bool] = None
    positionAbsolute: Optional[Dict[str, float]] = Field(default=None, example={"x": 100.0, "y": 200.0})


class EdgeModel(BaseModel):
    """
    Represents a single edge (connection) in the pipeline.
    """
    id: str
    source: str = Field(..., description="ID of the source node")
    target: str = Field(..., description="ID of the target node")
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None
    
    
    type: Optional[str] = Field(default=None, example="smoothstep") 
    animated: Optional[bool] = None
    markerEnd: Optional[Dict[str, Any]] = None 


class PipelinePayload(BaseModel):
    """
    The overall payload expected from the frontend when submitting the pipeline.
    """
    nodes: List[NodeModel]
    edges: List[EdgeModel]


class PipelineResponse(BaseModel):
    """
    The structure of the JSON response sent back by the /pipelines/parse endpoint.
    """
    num_nodes: int
    num_edges: int
    is_dag: bool