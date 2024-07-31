
'use client'
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

import search from "@/public/icons/search_126px.png";
import back from "@/public/icons/back_127px.png";
import dowload from "@/public/icons/download.png";
import refresh from "@/public/icons/refresh_127px.png";
import share from "@/public/icons/share_127px.png";
import deletef from "@/public/icons/trash_127px.png";
import zip from "@/public/icons/add_127pxblack.png";
import process from "process";
import word from "@/public/icons/word.png";
import pdf from "@/public/icons/pdf.png";
import excel from "@/public/icons/excel2.png";
import pptx from "@/public/icons/pptx.png";
import dowload2 from "@/public/icons/download_127px.png";

export default function AdminsList({handleClickButton2,updateValueInTransmission}){
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [loading , SetLoading ] = useState(false)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data

   const [options , SetOptions] = useState(null)
   const [options2 , SetOptions2] = useState(null)



   const getData = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/type_structure/get_allDescription2.php`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("la jointure",response.data.recu)
            setFilteredData(response.data.recu)
            //console.log(response.data.recu[0].id)
            SetLoading(true)
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   useEffect(() => {
      getData()
      // console.log(`${baseUrl}/admin/get_allUsers.php`)

   }, []);



   const GoToSee = async (id) => {
      // SetLoading2(true)
     // SetMyId(id)
    //  console.log(id)
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/type_structure/get_SousStructurebyId.php?id_structure=${id}`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici",response.data.recu)
            setFilteredData2(response.data.recu)
           // SetLoading2(true)
          //  SetSeePhrase(true)
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }

   }


   const handleRowClick = (id) =>{
      SetOptions2(id)
      setFilteredData2([])
      GoToSee(id)
   }

   return(


      <>


         <div className="relative h-full  ">

            <div className="relative w-[100%] h-[100%]  ">
               <div
                  className="relative w-[98%] mx-auto  h-[12%] space-x-2 pt-1 flex flex-col items-center justify-center ">
                  <span
                     className="text-xl text-sky-800 font-bold ">Vous avez listée ici les {filteredData.length} Structures de l'ACSI</span>
                  <span
                     className="text-xl text-sky-800 font-bold ">,Cliquez sur les Structures afin de voir les sous-structures lui apartenant </span>

               </div>


               {/*<div className="relative w-[100%]  h-[90%] top-6  ">*/}
               <div className="relative w-full  h-[86%]  flex p-2 gap-1 ">
                  <div
                     className="relative w-full mx-auto h-full col-span-2 p-2 gap-1 "

                  >
                     {
                        loading
                           ? (
                              <div className="relative flex flex-col h-[100%] w-[100%]"
                                  >
                                 <div className="flex flex-wrap -mx-4 overflow-y-auto h-full"
                                      style={{scrollbarWidth: 'none'}}
                                 >
                                    {filteredData.map((subItem, subIndex) => (
                                       <div
                                          key={subIndex}
                                          className="relative h-[50%] bg-white w-[48%] flex items-center justify-center p-6 border border-gray-400 rounded-xl cursor-pointer transform hover:scale-105 decoration-sky-500 hover:shadow-2xl transition duration-300 m-2"
                                          onMouseEnter={() => SetOptions(subIndex)}
                                          onMouseLeave={() => SetOptions(null)}
                                          onClick={() => handleRowClick(`${subItem.id}`)}
                                       >
                                          <div className="flex flex-col items-center justify-center w-full h-20">

                                             <a
                                                className="relative text-center mx-auto w-[90%] md:h-[95%] text-2xl text-sky-800 font-bold"

                                             >
                                                {subItem.Description}
                                             </a>
                                             <div className="flex items-center justify-center w-full h-40 mt-2">
                                                <button
                                                   className="relative h-[100%] bg-gray-100 border border-blue-500 w-[50%] flex items-center justify-center transition duration-300 transform hover:scale-105 rounded-md p-1"
                                                   onClick={() => {
                                                      handleClickButton2();
                                                      updateValueInTransmission(`${subItem.id}`);
                                                   }}
                                                >
                                                   <img
                                                      className="h-auto"
                                                      title="Archiver le fichier"
                                                      src={zip.src}
                                                      height={18}
                                                      width={18}
                                                      alt="Nfc"
                                                   />
                                                </button>
                                             </div>

                                          </div>


                                          {options2 === subItem.id.toString() && (
                                             <div className="relative flex flex-wrap mx-auto border border-blue-500 rounded  w-96 overflow-y-auto h-[120%]">
                                                <div className="flex flex-wrap -mx-4  h-full"

                                                >

                                                {filteredData2.map((item, index) => (
                                                   <div
                                                      key={item.id}
                                                      className="relative h-auto text-center mx-auto mt-1 w-[95%] border border-r-0 border-l-0 border-t-black text-md text-black font-semibold"
                                                   >
                                                      <span>{item.nom}</span>
                                                   </div>
                                                ))}
                                                </div>
                                             </div>
                                          )}

                                       </div>
                                    ))}
                                 </div>
                              </div>

                           )
                           : (
                              <div className="flex items-center justify-center p-12 bg-transparent text-xl">
                                 <div
                                    className="w-12 h-12 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                              </div>
                           )
                     }
                  </div>
               </div>


            </div>

         </div>


      </>
   )
}