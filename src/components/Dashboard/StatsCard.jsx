import { TrendingUp } from "lucide-react";

function StatsCard({
  icon,
  title,
  value,
  change,
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
      {/* Top */}

      <div className="flex items-center justify-between">

        <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400">
          {icon}
        </div>

        <div className="flex items-center gap-1 text-green-400 text-sm">
          <TrendingUp size={16} />
          {change}
        </div>

      </div>

      {/* Content */}

      <div className="mt-6">

        <p className="text-gray-400 text-sm">
          {title}
        </p>

        <h2 className="mt-2 text-4xl font-bold text-white">
          {value}
        </h2>

      </div>
    </div>
  );
}

export default StatsCard;