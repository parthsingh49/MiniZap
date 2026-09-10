
import { useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";

import CanvasSidebar from "./CanvasSidebar";
import { initialNodes, initialEdges } from "../data/workflowData";

function WorkflowCanvas({ setShowCanvas }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

const reactFlowWrapper = useRef(null);

const onDragOver = useCallback((event)=>{

  event.preventDefault();

  event.dataTransfer.dropEffect="move";

},[]);



const onDrop = useCallback((event)=>{


  event.preventDefault();


  const reactFlowBounds =
    reactFlowWrapper.current.getBoundingClientRect();



  const data =
    event.dataTransfer.getData(
      "application/reactflow"
    );


  if(!data){
    return;
  }


  const nodeData = JSON.parse(data);



  const position = {
    x:
    event.clientX -
    reactFlowBounds.left,

    y:
    event.clientY -
    reactFlowBounds.top
  };



  const newNode = {

    id:
    `${Date.now()}`,

    position,

    data:{
      label: nodeData.name
    }

  };


  setNodes((nds)=>[
    ...nds,
    newNode
  ]);


},[]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: {
              stroke: "#3b82f6",
              strokeWidth: 2,
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col">

      {/* Header */}

      <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8">

        <div>
          <h1 className="text-2xl font-bold text-blue-500">
            MiniZap Builder
          </h1>

          <p className="text-sm text-gray-400">
            Build event-driven workflows visually
          </p>
        </div>

        <div className="flex items-center gap-4">

          <div className="text-sm text-green-400">
            ● Workflow Active
          </div>

          <button
            onClick={() => setShowCanvas(false)}
            className="px-5 py-2 rounded-lg border border-gray-700 hover:bg-gray-900 transition"
          >
            Home
          </button>

          <button
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
          >
            Save Workflow
          </button>

        </div>

      </header>

      {/* Main */}

      <div className="flex flex-1 overflow-hidden">

        <CanvasSidebar />

       <div
  className="flex-1"
  ref={reactFlowWrapper}
>


  <ReactFlow

    nodes={nodes}

    edges={edges}

    onNodesChange={onNodesChange}

    onEdgesChange={onEdgesChange}

    onConnect={onConnect}

    onDragOver={onDragOver}

    onDrop={onDrop}

    fitView

  >


    <Controls />


    <Background
      variant="dots"
      gap={16}
      size={1}
    />


  </ReactFlow>


</div>

      </div>

      {/* Footer */}

      <div className="h-16 border-t border-gray-800 flex items-center justify-end gap-4 px-8">

        <button
          className="px-6 py-2 border border-gray-700 rounded-lg hover:bg-gray-900 transition"
        >
          Test Workflow
        </button>

        <button
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition"
        >
          Deploy
        </button>

      </div>

    </div>
  );
}

export default WorkflowCanvas;