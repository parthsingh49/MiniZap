import {
  Workflow,
  Zap,
  Database,
  Bot,
  Activity,
  Globe,
} from "lucide-react";

import FeatureCard from "./FeatureCard";


function Features() {


  const features = [

    {
      icon: <Workflow size={32}/>,
      title: "Visual Workflow Builder",
      description:
        "Create automation workflows using a drag-and-drop interface powered by React Flow."
    },


    {
      icon: <Zap size={32}/>,
      title: "Event Driven Automation",
      description:
        "Automatically execute workflows when events occur through webhooks, timers, or external services."
    },


    {
      icon: <Database size={32}/>,
      title: "Reliable Data Management",
      description:
        "Store workflow configurations and execution history securely using MongoDB."
    },


    {
      icon: <Bot size={32}/>,
      title: "AI Powered Workflows",
      description:
        "Integrate AI based processing steps to analyze and transform workflow data."
    },


    {
      icon: <Activity size={32}/>,
      title: "Background Execution",
      description:
        "Process tasks asynchronously using Redis queues and BullMQ for better performance."
    },


    {
      icon: <Globe size={32}/>,
      title: "Third Party Integrations",
      description:
        "Connect services like GitHub, Email, Discord and other APIs to automate tasks."
    }

  ];



  return (

    <section
      id="features"
      className="
      py-28
      px-8
      bg-gray-950
      "
    >

      <div className="max-w-7xl mx-auto">


        <div className="text-center">


          <h2 className="text-5xl font-bold">

            Powerful
            <span className="text-blue-500">
              {" "}Automation Features
            </span>

          </h2>


          <p className="
          mt-6
          text-lg
          text-gray-400
          max-w-3xl
          mx-auto
          ">

            MiniZap provides a complete workflow automation
            environment where users can connect events,
            actions, and intelligent processing steps.

          </p>


        </div>



        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          mt-16
          "
        >

          {
            features.map((feature)=>(

              <FeatureCard
                key={feature.title}
                {...feature}
              />

            ))
          }


        </div>


      </div>


    </section>

  );

}


export default Features;