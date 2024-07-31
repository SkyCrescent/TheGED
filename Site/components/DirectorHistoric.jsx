 "use client"
   import axios from "axios";
   import React, {useEffect, useState} from "react";
   import Image from "next/image";
   import doc from "@/public/icons/group_message.png";
   import close from '@/public/icons/multiply.png'
 import files from "@/public/icons/send.png";
 import word from "@/public/icons/word.png";
 import excel from "@/public/icons/excel2.png";
 import pdf from "@/public/icons/pdf_127px.png";
 import pptx from "@/public/icons/pptx.png";
 import process from "process";
   export default function DirectorHistoric({idAgent,setShowHistoric}){
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const [loading , SetLoading ] = useState(false)
      const [ statut , SetStatut ] = useState(0)
      const [  recu , setRecu ] = useState(false)
      const [filteredData, setFilteredData] = useState([]); // Initialize with all data

    let formattedDate =""

      setTimeout(()=>{
         SetLoading (true)
      },80)

      const getData = async () => {
         try {
            // Recuperes les types de structure
            const response = await axios.get(`${baseUrl}/Historic/get_byId.php?id_agent=${idAgent}`);
            if (response.data && response.data.recu && response.data.recu.length > 0) {
               // Vérifiez que la réponse contient les données attendues
               console.log(response.data.recu)
               setFilteredData(response.data.recu)
               setRecu(true)
            } else {
               setRecu(false)
               console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            }
         } catch (error) {
            setRecu(false)
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }
      };

      useEffect(()=>{
         getData()
         //console.log("la valeur envoye est ",valueAtransmettre)
      },[])






      function formatDate(apiDate) {
         // Séparer la date en jour, mois et année
         const [day, month, year] = apiDate.split('/').map(Number);

         // Utiliser new Date(year, monthIndex, day) pour construire une date
         const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

         return formattedDate;
      }

      return(


         <>
            <div
               className={`fixed top-0 left-0 z-30 bg-black/70 w-screen h-screen overflow-y-auto transition duration-300 ease-in-out`}
            >
               <div className="w-full h-[90%] flex justify-center my-52 md:my-96 lg:my-8">
                  <div
                     className={` relative  flex flex-col items-center justify-center h-[96%] w-[40%] bg-white border border-gray-700 shadow rounded-lg p-2 ${loading ? 'scale-x-100 scale-y-100 opacity-100' : 'scale-x-0 scale-y-0 opacity-0'}  transition duration-500    `}>


                     <div
                        className=" absolute -right-1 -top-0.5 size-9  items-center justify-center ">
                        <img
                           src={close.src}
                           alt="Image sélectionnée"
                           className="relative h-[100%] cursor-pointer mx-auto w-[100%] z-40"
                           onClick={() => {
                              setShowHistoric(false)
                           }}
                        />
                     </div>


                     {/* <div
               className="relative w-[99%] mx-auto h-[90%] top-1 content-normal  scrollbar-hidden overflow-y-auto"
               style={{maxHeight: '533px'}}>
*/}
                     <div className="relative w-[100%] h-[96%] rounded-md content-normal  scrollbar-hidden overflow-y-auto  "

                     >



                        {

                           recu ? (


                              filteredData.map ((item, index) => (

                                 <div key={item.id}
                                      className=" h-20 p-2 relative w-[100%]  ">
                                    <div
                                       className="relative flex justify-between items-center p-1 space-x-2 w-full h-full bg-blue-100 rounded-md   "
                                    >
                                       {/*transfert*/}
                                       {
                                          item.action === "ajout Word" ? (
                                             <img
                                                src={word.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[90%]  w-[10%]  z-40 "
                                             />
                                          ) : item.action === "ajout Excel" ? (
                                             <img
                                                src={excel.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[90%]  w-[16%]  z-40  "
                                             />
                                          ) : item.action === "ajout PDF" ? (
                                             <img
                                                src={pdf.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[90%]   w-[9%]  z-40 "
                                             />
                                          ): item.action === "ajout PowerPoint" ? (
                                             <img
                                                src={pptx.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[90%]  w-[16%]  z-40 "
                                             />
                                          ):  (
                                             <img
                                                src={files.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[90%]  w-[8%]  z-40 "
                                             />
                                          )

                                       }

                                       <span className=" relative h-[70%] w-[80%] text-[14px] mt-4 font-[Poppins] italic ">
                                   Cette agent a   {
                                          item.contenu
                                       }    le { formatDate(item.date) }
                                 </span>

                                    </div>
                                 </div>

                              )  )



                           ) : (
                              <div className="mx-auto top-56 italic text-gray-600 relative w-[80%]  text-center">

                                 Aucune historique pour cette agent

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