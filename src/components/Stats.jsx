import {
  Zap,
  GitBranch,
  Database,
  Bot,
} from "lucide-react";

function Stats() {
  const stats = [
    {
      icon: <Zap size={34} />,
      value: "10+",
      title: "Workflow Templates",
      description: "Pre-built automation flows for rapid deployment.",
    },
    {
      icon: <GitBranch size={34} />,
      value: "5+",
      title: "Supported Integrations",
      description: "Connect GitHub, Email, Webhooks and more.",
    },
    {
      icon: <Database size={34} />,
      value: "100%",
      title: "Reliable Storage",
      description: "Workflow configurations securely stored in MongoDB.",
    },
    {
      icon: <Bot size={34} />,
      value: "24/7",
      title: "Background Execution",
      description: "Redis + BullMQ execute workflows asynchronously.",
    },
  ];

  return (
    <section className="py-24 px-8">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold">

            Why Choose
            <span className="text-blue-500"> MiniZap?</span>

          </h2>

          <p className="mt-5 text-lg text-gray-400 max-w-3xl mx-auto">

            MiniZap combines modern web technologies with event-driven
            automation to simplify repetitive tasks and improve workflow
            efficiency.

          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
            >

              <div className="w-16 h-16 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">

                {item.icon}

              </div>

              <h3 className="mt-6 text-5xl font-bold text-white">

                {item.value}

              </h3>

              <h4 className="mt-3 text-xl font-semibold">

                {item.title}

              </h4>

              <p className="mt-3 text-gray-400 leading-relaxed">

                {item.description}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;