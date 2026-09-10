import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Workflow,
  Plus,
  Settings,
  LogOut,
  User
} from "lucide-react";


function Dashboard(){

  const navigate = useNavigate();


  const [user,setUser] = useState(null);



  useEffect(()=>{


    const token =
    localStorage.getItem("token");


    if(!token){

      navigate("/login");
      return;

    }



    const storedUser =
    localStorage.getItem("user");


    if(storedUser){

      setUser(
        JSON.parse(storedUser)
      );

    }


  },[]);





  const logout = ()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };




  return (

    <div className="min-h-screen bg-[#030712] text-white flex">


      {/* Sidebar */}

      <aside className="w-64 border-r border-gray-800 bg-gray-900/50 p-6">


        <div className="flex items-center gap-3 mb-10">


          <div className="bg-blue-600 p-2 rounded-xl">

            <Workflow size={22}/>

          </div>


          <h1 className="text-xl font-bold">
            MiniZap
          </h1>


        </div>





        <nav className="space-y-3">


          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600">

            <Workflow size={18}/>

            Dashboard

          </button>




          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800">


            <Settings size={18}/>

            Settings


          </button>



        </nav>





        <button

          onClick={logout}

          className="absolute bottom-6 flex items-center gap-3 text-gray-400 hover:text-white"

        >

          <LogOut size={18}/>

          Logout


        </button>



      </aside>







      {/* Main Content */}


      <main className="flex-1 p-10">


        {/* Header */}


        <div className="flex justify-between items-center">


          <div>


            <h1 className="text-4xl font-bold">

              Hello {user?.name || "there"} 👋

            </h1>


            <p className="text-gray-400 mt-2">

              Create powerful automations with MiniZap

            </p>


          </div>





          <button

            onClick={()=>navigate("/workflow/create")}

            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"

          >

            <Plus size={20}/>

            Create Workflow


          </button>



        </div>







        {/* Workflow Section */}


        <section className="mt-12">


          <h2 className="text-2xl font-semibold mb-6">

            Your Workflows

          </h2>






          <div className="border border-gray-800 rounded-2xl p-10 text-center bg-gray-900/40">


            <Workflow

              size={45}

              className="mx-auto text-gray-500 mb-4"

            />



            <h3 className="text-xl font-semibold">

              No workflows yet

            </h3>



            <p className="text-gray-400 mt-2">

              Start by creating your first automation

            </p>





            <button

              onClick={()=>navigate("/workflow/create")}

              className="mt-6 bg-blue-600 px-5 py-3 rounded-xl"

            >

              Create Workflow


            </button>



          </div>


        </section>



      </main>


    </div>

  );

}


export default Dashboard; 