import {
  GitBranch,
  GitBranchMinus,
  Users,
  Users2,
  Workflow
} from "lucide-react";


function Footer() {

  return (

    <footer
      className="
      bg-gray-950
      border-t
      border-gray-800
      px-8
      py-16
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        grid
        md:grid-cols-4
        gap-10
        "
      >


        {/* Brand */}

        <div>

          <div className="
          flex
          items-center
          gap-3
          "
          >

            <div className="
            text-blue-500
            "
            >

              <Workflow size={32}/>

            </div>


            <h2 className="
            text-2xl
            font-bold
            "
            >

              Mini<span className="text-blue-500">
                Zap
              </span>

            </h2>


          </div>



          <p className="
          mt-5
          text-gray-400
          leading-relaxed
          "
          >

            An event-driven workflow automation platform
            that helps users connect services and automate
            repetitive tasks visually.

          </p>


        </div>




        {/* Quick Links */}

        <div>

          <h3 className="
          text-lg
          font-semibold
          mb-5
          "
          >

            Quick Links

          </h3>


          <ul className="
          space-y-3
          text-gray-400
          "
          >

            <li>
              <a href="#about" className="hover:text-blue-500">
                About
              </a>
            </li>


            <li>
              <a href="#features" className="hover:text-blue-500">
                Features
              </a>
            </li>


            <li>
              <a href="#roadmap" className="hover:text-blue-500">
                Roadmap
              </a>
            </li>


            <li>
              <a href="#builder" className="hover:text-blue-500">
                Builder
              </a>
            </li>


          </ul>


        </div>




        {/* Team */}

        <div>


          <h3 className="
          text-lg
          font-semibold
          mb-5
          "
          >

            Team

          </h3>


          <ul className="
          space-y-3
          text-gray-400
          "
          >

            <li>
              Parth Singh
            </li>

            <li>
              Rudra Saxena
            </li>

            <li>
              Sheersh Shankdhaar
            </li>


          </ul>


        </div>





        {/* Tech Stack */}

        <div>


          <h3 className="
          text-lg
          font-semibold
          mb-5
          "
          >

            Built With

          </h3>



          <div className="
          flex
          flex-wrap
          gap-2
          "
          >

            {
              [
                "React",
                "Node.js",
                "MongoDB",
                "Redis",
                "BullMQ",
                "Tailwind"
              ].map((tech)=>(


                <span
                  key={tech}
                  className="
                  px-3
                  py-2
                  rounded-lg
                  bg-gray-900
                  border
                  border-gray-800
                  text-sm
                  text-gray-300
                  "
                >

                  {tech}

                </span>


              ))
            }


          </div>


        </div>



      </div>





      {/* Bottom Footer */}


      <div
        className="
        max-w-7xl
        mx-auto
        mt-14
        pt-8
        border-t
        border-gray-800
        flex
        flex-col
        md:flex-row
        justify-between
        items-center
        gap-5
        "
      >


        <p className="
        text-gray-500
        text-sm
        "
        >

          © 2026 MiniZap. All rights reserved.

        </p>



        <div className="
        flex
        gap-4
        "
        >

          <a
            className="
            p-2
            rounded-lg
            bg-gray-900
            hover:text-blue-500
            transition
            "
          >

            <GitBranch size={20}/>

          </a>



          <a
            className="
            p-2
            rounded-lg
            bg-gray-900
            hover:text-blue-500
            transition
            "
          >

            <Users size={20}/>

          </a>


        </div>


      </div>


    </footer>

  );

}


export default Footer;