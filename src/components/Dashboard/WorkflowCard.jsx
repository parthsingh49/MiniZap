import {
  Play,
  Pencil,
  Trash2,
  Clock3,
  CheckCircle2,
} from "lucide-react";

function WorkflowCard({
  name,
  updated,
  status = "Active",
}) {
  return (
    <div
      className="
        bg-gray-900
        border
        border-gray-800
        rounded-2xl
        p-6
        hover:border-blue-500
        hover:-translate-y-1
        transition-all
        duration-300
        shadow-lg
      "
    >
      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-semibold text-white">
            {name}
          </h2>

          <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">

            <Clock3 size={16} />

            {updated}

          </div>

        </div>

        <span
          className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-medium
            ${
              status === "Active"
                ? "bg-green-500/20 text-green-400"
                : "bg-yellow-500/20 text-yellow-400"
            }
          `}
        >
          {status}
        </span>

      </div>

      {/* Divider */}

      <div className="border-t border-gray-800 my-5"></div>

      {/* Footer */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2 text-green-400 text-sm">

          <CheckCircle2 size={16} />

          Ready to Run

        </div>

        <div className="flex gap-3">

          <button
            className="
              p-2
              rounded-lg
              bg-blue-600
              hover:bg-blue-700
              transition
            "
          >
            <Play size={18} className="text-white" />
          </button>

          <button
            className="
              p-2
              rounded-lg
              bg-gray-800
              hover:bg-gray-700
              transition
            "
          >
            <Pencil size={18} className="text-white" />
          </button>

          <button
            className="
              p-2
              rounded-lg
              bg-red-600
              hover:bg-red-700
              transition
            "
          >
            <Trash2 size={18} className="text-white" />
          </button>

        </div>

      </div>

    </div>
  );
}

export default WorkflowCard;