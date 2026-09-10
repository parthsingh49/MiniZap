import {
  Database,
  Workflow,
  Cpu,
  ShieldCheck,
} from "lucide-react";

function About() {
  return (
    <section
      id="about"
      className="py-28 px-8 bg-gradient-to-b from-transparent to-gray-950"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center">

          <h2 className="text-5xl font-bold">
            About <span className="text-blue-500">MiniZap</span>
          </h2>

          <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">

            MiniZap is an event-driven workflow automation platform inspired by
            tools like Zapier and Make. It allows users to visually create
            workflows that automatically perform actions whenever specific
            events occur.

          </p>

        </div>

        {/* Main Content */}

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-20">

          {/* Left Side */}

          <div>

            <h3 className="text-3xl font-bold">

              Why MiniZap?

            </h3>

            <p className="mt-6 text-gray-400 leading-8">

              Modern applications constantly exchange information through APIs,
              webhooks, and cloud services. Managing these integrations
              manually can be repetitive and time-consuming.

            </p>

            <p className="mt-5 text-gray-400 leading-8">

              MiniZap simplifies this process by providing a visual drag-and-drop
              workflow builder where users can connect triggers and actions
              without writing backend logic every time.

            </p>

            <p className="mt-5 text-gray-400 leading-8">

              Under the hood, workflows are stored in MongoDB, incoming events
              are processed through Redis queues using BullMQ, and actions such
              as sending emails or logging data are executed asynchronously for
              better performance and reliability.

            </p>

          </div>

          {/* Right Side */}

          <div className="grid gap-6">

            <InfoCard
              icon={<Workflow size={30} />}
              title="Visual Automation"
              description="Create workflows using an intuitive drag-and-drop interface."
            />

            <InfoCard
              icon={<Database size={30} />}
              title="Event Storage"
              description="Store workflow definitions and execution history securely in MongoDB."
            />

            <InfoCard
              icon={<Cpu size={30} />}
              title="Background Processing"
              description="Redis and BullMQ process events efficiently without blocking the server."
            />

            <InfoCard
              icon={<ShieldCheck size={30} />}
              title="Scalable Architecture"
              description="Designed using asynchronous processing so multiple workflows can run simultaneously."
            />

          </div>

        </div>

        {/* Technology Stack */}

        <div className="mt-24">

          <h3 className="text-3xl font-bold text-center">
            Technology Stack
          </h3>

          <div className="flex flex-wrap justify-center gap-5 mt-10">

            {[
              "React",
              "Node.js",
              "Express",
              "MongoDB",
              "Redis",
              "BullMQ",
              "React Flow",
              "Tailwind CSS",
              "GitHub Webhooks",
            ].map((tech) => (

              <span
                key={tech}
                className="px-6 py-3 rounded-full bg-gray-900 border border-gray-800 hover:border-blue-500 transition"
              >
                {tech}
              </span>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

function InfoCard({ icon, title, description }) {
  return (
    <div className="flex gap-5 p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500 transition">

      <div className="text-blue-500">

        {icon}

      </div>

      <div>

        <h3 className="text-xl font-semibold">

          {title}

        </h3>

        <p className="mt-2 text-gray-400">

          {description}

        </p>

      </div>

    </div>
  );
}

export default About;