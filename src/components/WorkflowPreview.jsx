import {
  GitBranch,
  Bot,
  Database,
  Mail,
  Bell,
  ArrowRight,
  GitBranchPlusIcon,
} from "lucide-react";

function WorkflowPreview() {
  return (
    <section className="py-28 px-8">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center">

          <h2 className="text-5xl font-bold">

            Visual Workflow Builder

          </h2>

          <p className="mt-5 text-gray-400 text-lg max-w-3xl mx-auto">

            Build automations by simply connecting triggers and actions.
            No coding required.

          </p>

        </div>

        {/* Workflow */}

        <div className="mt-20 overflow-x-auto">

          <div className="flex items-center justify-center gap-6 min-w-max">

            {/* GitHub */}

            <Node
              icon={<GitBranch size={34} />}
              title="GitHub"
              subtitle="Issue Created"
              color="text-white"
            />

            <Arrow />

            {/* AI */}

            <Node
              icon={<Bot size={34} />}
              title="AI Analysis"
              subtitle="Summarize & Classify"
              color="text-purple-400"
            />

            <Arrow />

            {/* Mongo */}

            <Node
              icon={<Database size={34} />}
              title="MongoDB"
              subtitle="Store Workflow Log"
              color="text-green-400"
            />

            <Arrow />

            {/* Email */}

            <Node
              icon={<Mail size={34} />}
              title="Email"
              subtitle="Notify Team"
              color="text-blue-400"
            />

            <Arrow />

            {/* Discord */}

            <Node
              icon={<Bell size={34} />}
              title="Discord"
              subtitle="Post Alert"
              color="text-yellow-400"
            />

          </div>

        </div>

        {/* Description */}

        <div className="mt-16 grid md:grid-cols-3 gap-8">

          <InfoCard
            title="1. Trigger"
            text="MiniZap listens for incoming events like GitHub issues, webhooks, scheduled timers, or API requests."
          />

          <InfoCard
            title="2. Processing"
            text="Each event is processed asynchronously using Redis and BullMQ, ensuring reliable execution."
          />

          <InfoCard
            title="3. Actions"
            text="After processing, MiniZap performs multiple actions such as sending emails, storing data, or notifying services."
          />

        </div>

      </div>

    </section>
  );
}

function Node({ icon, title, subtitle, color }) {
  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-blue-500 transition rounded-2xl p-6 w-52">

      <div className={`${color} mb-5`}>
        {icon}
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-gray-400">
        {subtitle}
      </p>

    </div>
  );
}

function Arrow() {
  return (
    <ArrowRight
      size={38}
      className="text-blue-500 flex-shrink-0"
    />
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

      <h3 className="text-xl font-semibold text-blue-500">
        {title}
      </h3>

      <p className="mt-4 text-gray-400 leading-relaxed">
        {text}
      </p>

    </div>
  );
}

export default WorkflowPreview;