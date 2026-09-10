import {
  CheckCircle,
  Clock,
  Rocket,
  Server,
} from "lucide-react";


const phases = [

  {
    icon: <CheckCircle size={30}/>,
    title: "Phase 1 - Foundation & Interface",
    status: "Completed",

    items: [
      "Landing page and responsive UI",
      "About and Features sections",
      "React Flow workflow builder",
      "Workflow canvas with nodes and connections"
    ]
  },


  {
    icon: <Clock size={30}/>,
    title: "Phase 2 - Workflow Engine",
    status: "In Progress",

    items: [
      "Drag and drop workflow components",
      "Custom workflow nodes",
      "Save workflow configurations",
      "Workflow execution simulation"
    ]
  },


  {
    icon: <Server size={30}/>,
    title: "Phase 3 - Backend Integration",
    status: "Upcoming",

    items: [
      "Node.js and Express backend",
      "MongoDB workflow storage",
      "User authentication",
      "Redis and BullMQ task processing"
    ]
  },


  {
    icon: <Rocket size={30}/>,
    title: "Phase 4 - Advanced Automation",
    status: "Future",

    items: [
      "Webhook based triggers",
      "Third party API integrations",
      "AI powered workflow steps",
      "Execution analytics dashboard"
    ]
  }

];



function Roadmap() {


  return (

    <section
      id="roadmap"
      className="
      py-28
      px-8
      bg-gradient-to-b
      from-gray-950
      to-transparent
      "
    >


      <div className="
      max-w-6xl
      mx-auto
      ">


        <div className="text-center">


          <h2 className="
          text-5xl
          font-bold
          ">

            Development
            <span className="text-blue-500">
              {" "}Roadmap
            </span>

          </h2>


          <p className="
          mt-6
          text-gray-400
          text-lg
          ">

            Our planned journey towards building a
            complete workflow automation platform.

          </p>


        </div>




        <div className="
        mt-16
        space-y-8
        ">


          {
            phases.map((phase,index)=>(

              <div
                key={index}
                className="
                bg-gray-900
                border
                border-gray-800
                rounded-xl
                p-8
                hover:border-blue-500
                transition
                "
              >


                <div className="
                flex
                items-center
                gap-5
                ">


                  <div className="text-blue-500">

                    {phase.icon}

                  </div>



                  <div>

                    <h3 className="
                    text-2xl
                    font-bold
                    ">

                      {phase.title}

                    </h3>


                    <span className="
                    text-sm
                    text-green-400
                    ">

                      {phase.status}

                    </span>

                  </div>


                </div>



                <ul className="
                mt-6
                space-y-3
                text-gray-400
                "
                >

                  {
                    phase.items.map((item)=>(

                      <li
                        key={item}
                        className="
                        flex
                        gap-3
                        items-center
                        "
                      >

                        <span className="text-blue-500">
                          ✓
                        </span>

                        {item}

                      </li>

                    ))
                  }


                </ul>


              </div>


            ))
          }


        </div>


      </div>


    </section>

  );

}


export default Roadmap;