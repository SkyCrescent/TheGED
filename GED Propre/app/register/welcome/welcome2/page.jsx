'use client'
 //import { useRouter } from 'next/router';
 import {useRouter} from "next/navigation";
 import React from 'react';
//import  f from '../../../'
 export default function Page() {
    const router = useRouter();



    return (
       <>
          <div className=" flex justify-between w-full h-screen ">


             <div className="relative w-[60%] h-screen">
                <div className="relative bg-indigo-400/75 opacity-95 w-[100%] h-[71%] "></div>
                <div className="relative bg-indigo-500/90 opacity-95 w-[100%] h-[29%] "></div>
             </div>


             <div className="relative w-[40%] h-screen">
                <div
                   className="relative  bg-gradient-to-b from-indigo-400 to-blue-800 opacity-95 w-[100%] h-[100%] "></div>
             </div>
             <div
                className="absolute flex justify-between gap-3 p-1  h-[80%] top-0  w-full">
                <div className="h-[100%] w-[55%] flex  items-center mt-8 rounded ">

                   <div className="relative h-[60%] mx-3 items-center  w-[100%]  ">
                      <h1 className="text-6xl text-blue-900 font-black w-1/127    py-2">Bienvenu sur <span
                         className="font-normal text-blue-600 underline underline-offset-1 shadow-blue-300"> MyGED</span>.
                      </h1>
                      <h1 className="text-3xl mx-1 font-semibold">Votre Compte Utilisateur a ete cree avec succes </h1>
                      <h1 className="text-sm py-2 mx-2 ">Vous pouvez desormais acceder a votre Workspace
                         sur <span
                            className="font-normal text-blue-600 underline underline-offset-1 shadow-blue-300"> MyGED</span>.
                      </h1>
                      <div className=" -mx-1  ">
                         <button
                            className="w-full lg:w-[30%] mx-4 h-12 bg-indigo-600 hover:bg-indigo-950 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold"
                         onClick={()=>{  router.push(`../../../`)} }
                         >Me Connecter
                         </button>
                      </div>



                   </div>

                </div>

                {/*Le formulaire commence ici*/}


             </div>

             {/* Affichez les autres contenus en fonction des données récupérées */}
          </div>
       </>
    );
 }
