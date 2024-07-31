"use client"
import { useState, useEffect } from "react";
import React from "react";
import work from "../public/icons/administrative_tools_127px2.png"
import archive from "../public/icons/archive_127px.png";
import ged from "../public/icons/user_folder_127px.png"
import space from  "../public/icons/workspace_127px.png"
import Workspace from "@/components/Workspace";
import Message from "@/components/Message";
export default function MenuPrincipal({clicked}){

   const [word , Setwork] = useState(false)
   const [Archives , SetArchives] = useState(false)
   const [GED , SetGED] = useState(false)
   const [Histo , SetHisto] = useState(false)
   const [Admin , SetAdmin] = useState(false)


   return(



      <>


         <div className={ word || Archives || GED || Histo || Admin ? 'hidden' : 'relative w-[100%] h-[92%]' }>
            <div className="relative w-full h-[80%] gap-4 p-4 grid grid-cols-3  ">
               <div
                  className="relative bg-white p-2 border border-gray-400 rounded-xl  cursor-pointer  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 "
                    onClick={()=>{Setwork(!word)}} >
                  <div className="relative h-[60%] w-[100%] flex items-center justify-center ">
                     <img src={space.src} alt=""
                          className="absolute w-11 h-11  cursor-pointer"
                     />
                  </div>
                  <div className="relative h-[40%] w-[100%] ">
                     <div className="relative h-[50%] w-[100%] flex items-center ">
                        <span className="text-4xl mx-auto font-black font-[Gotham] text-blue-900">WorkSpace</span>
                     </div>
                     <div className="absolute h-auto w-[95%] text-center ">
                              <span
                                 className="text-sm  m-3 text-justify w-full">Accedez a vos fichiers personnels</span>
                     </div>
                  </div>

               </div>
               <div
                  className="relative border border-gray-400 rounded-xl cursor-pointer  bg-gray-100/40 hover:bg-gray-100/85 transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 "
                       onClick={()=>{SetArchives(!Archives)}} >
                  <div className="relative h-[60%] w-[100%] flex items-center justify-center ">
                     <img src={archive.src} alt=""
                          className="absolute w-11 h-11  cursor-pointer"
                     />
                  </div>
                  <div className="relative h-[40%] w-[100%] ">
                     <div className="relative h-[50%] w-[100%] flex items-center ">
                        <span className="text-4xl mx-auto font-black font-[Gotham] text-blue-900">Archives</span>
                     </div>
                     <div className="absolute h-auto w-[95%] mx-6 text-center ">
                     <span
                        className="text-sm  m-3 text-justify w-full">Visualiser les archives liées a votre direction</span>
                     </div>
                  </div>
               </div>
               <div
                  className="relative p-4  border border-gray-400 rounded-xl cursor-pointer transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 ">
                  <div className="relative h-[60%] w-[100%] flex items-center justify-center ">
                     <img src={ged.src} alt=""
                          className="absolute w-11 h-11  cursor-pointer"
                     />
                  </div>
                  <div className="relative h-[40%] w-[100%] ">
                     <div className="relative h-[50%] w-[100%] flex items-center ">
                        <span className="text-4xl mx-auto font-black font-[Gotham] text-blue-900">GED</span>
                     </div>
                     <div className="absolute h-auto w-[95%] mx-6 text-center ">
                        <span className="text-sm  m-3 text-justify w-full">Acceder aux documents de votre service via les registres Journaliers</span>
                     </div>
                  </div>
               </div>
               <div
                  className="relative p-4 border border-gray-400 rounded-xl cursor-pointer bg-gray-100/40 hover:bg-gray-100/85 transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 ">
                  <div className="relative h-[60%] w-[100%] flex items-center justify-center ">
                     <img src={work.src} alt=""
                          className="absolute w-11 h-11  cursor-pointer"
                     />
                  </div>
                  <div className="relative h-[40%] w-[100%] ">
                     <div className="relative h-[50%] w-[100%] flex items-center ">
                        <span className="text-4xl  mx-auto font-black font-[Gotham] text-blue-900">Vos Historique</span>
                     </div>
                     <div className="absolute h-auto w-[95%] mx-6 text-center ">
                        <span className="text-sm  m-3 text-justify w-full">Voir les déplacements concernant un fichier ou un dossier  </span>
                     </div>
                  </div>
               </div>
               <div
                  className="relative p-4 border border-gray-400 rounded-xl cursor-pointer transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 ">
                  <div className="relative h-[60%] w-[100%] flex items-center justify-center ">
                     <img src={work.src} alt=""
                          className="absolute w-11 h-11  cursor-pointer"
                     />
                  </div>
                  <div className="relative h-[40%] w-[100%] ">
                     <div className="relative h-[50%] w-[100%] flex items-center ">
                              <span
                                 className="text-4xl mx-auto font-black font-[Gotham] text-blue-900">Administration</span>
                     </div>
                     <div className="absolute h-auto w-[95%] mx-6 text-center ">
                        <span className="text-sm  m-3 text-justify w-full">Pour la Gestion de votre compte,voir vos informations personnels...</span>
                     </div>
                  </div>
               </div>

            </div>
         </div>

         {/*</div>*/}
         {
            word ? <Workspace/> : null
         }


         {
            Archives ? <Message/> : null
         }

      </>

   )
}