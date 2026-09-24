import {
  GitBranch,
  Clock,
  Database,
  Mail,
  Bot,
  MessageCircle,
  Webhook,
  Workflow,
} from "lucide-react";


const triggers = [
  {
    name: "Webhook",
    icon: <Webhook size={20} />,
    type: "webhook",
  },

  {
    name: "GitHub",
    icon: <GitBranch size={20} />,
    type: "github",
  },

  {
    name: "Timer",
    icon: <Clock size={20} />,
    type: "timer",
  },

  {
    name: "Database",
    icon: <Database size={20} />,
    type: "database",
  },
];


const actions = [
  {
    name: "Email",
    icon: <Mail size={20} />,
    type: "email",
  },

  {
    name: "AI Processing",
    icon: <Bot size={20} />,
    type: "ai",
  },

  {
    name: "MongoDB",
    icon: <Database size={20} />,
    type: "mongodb",
  },

  {
    name: "Discord",
    icon: <MessageCircle size={20} />,
    type: "discord",
  },
];


function NodeCard({ item }) {

  const onDragStart = (event) => {

    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(item)
    );

    event.dataTransfer.effectAllowed = "move";

  };


  return (

    <div
      draggable
      onDragStart={onDragStart}
      className="
        flex
        items-center
        gap-3
        p-4
        bg-gray-900
        border
        border-gray-800
        rounded-lg
        hover:border-blue-500
        cursor-grab
        transition
      "
    >

      <div className="text-blue-500">
        {item.icon}
      </div>

      <span>
        {item.name}
      </span>

    </div>

  );

}


function CanvasSidebar({
  savedWorkflows = [],
}) {

  return (

    <aside
      className="
        w-72
        bg-gray-950
        border-r
        border-gray-800
        p-6
        overflow-y-auto
      "
    >

      <h2 className="text-xl font-bold mb-8">
        Components
      </h2>


      {/* SAVED WORKFLOWS */}

      <h3 className="text-sm text-gray-400 mb-4 uppercase">
        Saved Workflows
      </h3>


      <div className="space-y-3">

        {savedWorkflows.length === 0 ? (

          <div className="text-sm text-gray-500 border border-gray-800 rounded-lg p-4">
            No saved workflows
          </div>

        ) : (

          savedWorkflows.map((workflow) => (

            <div
              key={workflow._id}
              className="
                flex
                items-center
                gap-3
                p-3
                bg-gray-900
                border
                border-gray-800
                rounded-lg
                hover:border-blue-500
                transition
              "
            >

              <div className="text-green-400">
                <Workflow size={18} />
              </div>

              <div className="min-w-0">

                <p className="text-sm font-medium truncate">
                  {workflow.name}
                </p>

                <p className="text-xs text-gray-500">
                  {workflow.nodes?.length || 0} nodes
                </p>

              </div>

            </div>

          ))

        )}

      </div>


      {/* TRIGGERS */}

      <h3 className="
        text-sm
        text-gray-400
        mt-10
        mb-4
        uppercase
      ">
        Triggers
      </h3>


      <div className="space-y-4">

        {triggers.map((node) => (

          <NodeCard
            key={node.type}
            item={node}
          />

        ))}

      </div>


      {/* ACTIONS */}

      <h3 className="
        text-sm
        text-gray-400
        mt-10
        mb-4
        uppercase
      ">
        Actions
      </h3>


      <div className="space-y-4">

        {actions.map((node) => (

          <NodeCard
            key={node.type}
            item={node}
          />

        ))}

      </div>

    </aside>

  );

}


export default CanvasSidebar;