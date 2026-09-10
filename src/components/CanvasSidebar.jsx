import {
  Zap,
  GitBranch,
  Clock,
  Database,
  Mail,
  Bot,
  MessageCircle,
  Webhook,
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


function CanvasSidebar() {


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



      {/* Triggers */}

      <h3 className="text-sm text-gray-400 mb-4 uppercase">

        Triggers

      </h3>


      <div className="space-y-4">

        {
          triggers.map((node)=>(

            <NodeCard
              key={node.type}
              item={node}
            />

          ))
        }

      </div>




      {/* Actions */}

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


        {
          actions.map((node)=>(

            <NodeCard
              key={node.type}
              item={node}
            />

          ))
        }


      </div>


    </aside>

  );

}


export default CanvasSidebar;