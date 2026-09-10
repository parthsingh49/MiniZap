import { ArrowRight, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#0b1120] via-[#111827] to-black"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div
          className="
            absolute
            top-16
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[700px]
            rounded-full
            bg-blue-600/20
            blur-[180px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            w-[500px]
            h-[500px]
            rounded-full
            bg-cyan-500/15
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            top-0
            left-0
            w-[450px]
            h-[450px]
            rounded-full
            bg-indigo-500/10
            blur-[140px]
          "
        />

      </div>

      <div className="max-w-7xl mx-auto px-8 pt-28 pb-24">

        <div className="text-center">

          {/* Badge */}

         
          {/* Heading */}

          <h1 className="mt-8 text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-white">

            Write Code

            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">

              That Matters

            </span>

            Automate The Rest

          </h1>

          {/* Description */}

          <p className="mt-8 max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">

            MiniZap is a modern workflow automation platform inspired by
            Zapier and Make. Connect triggers, actions, and integrations
            using an intuitive visual builder powered by event-driven
            architecture.

          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <button
              onClick={() => navigate("/builder")}
              className="
                flex
                items-center
                gap-2
                bg-blue-600
                hover:bg-blue-700
                px-7
                py-3.5
                rounded-xl
                font-semibold
                transition
                shadow-lg
                shadow-blue-600/30
              "
            >
              <PlayCircle size={20} />
              View Demo
            </button>

            <a
              href="#about"
              className="
                flex
                items-center
                gap-2
                border
                border-gray-700
                hover:border-blue-500
                hover:bg-gray-900/50
                px-7
                py-3.5
                rounded-xl
                transition
              "
            >
              Learn More
              <ArrowRight size={18} />
            </a>

          </div>

          {/* Stats */}

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10">

            <div>

              <h2 className="text-5xl font-bold text-blue-400">
                10+
              </h2>

              <p className="mt-3 text-gray-400">
                Workflow Templates
              </p>

            </div>

            <div>

              <h2 className="text-5xl font-bold text-blue-400">
                5+
              </h2>

              <p className="mt-3 text-gray-400">
                Supported Integrations
              </p>

            </div>

            <div>

              <h2 className="text-5xl font-bold text-blue-400">
                24/7
              </h2>

              <p className="mt-3 text-gray-400">
                Event Processing
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;