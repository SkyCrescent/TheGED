 "use client"
   import axios from "axios";
   import React, {useEffect, useState} from "react";
   import Image from "next/image";
   import doc from "@/public/icons/group_message.png";
   import close from '@/public/icons/multiply.png'
 import files from "@/public/icons/send.png";
 import process from "process";
   export default function BackEndNotifications({poste,updateValueAtransmettre,valueAtransmettre,updateshowHeader,SetBackEndNotification,structure}){
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      const [loading , SetLoading ] = useState(false)
      const [ statut , SetStatut ] = useState(0)
      const [  recu , setRecu ] = useState(false)
      const [filteredData, setFilteredData] = useState([]); // Initialize with all data
      const value = valueAtransmettre
    let formattedDate =""

      setTimeout(()=>{
         SetLoading (true)
      },80)


      useEffect(()=>{
         getData3()
         console.log("la valeur envoye est ",valueAtransmettre)
      },[])


      const getData3 = async () => {
         try {
            const response = await axios.get(`${baseUrl}/notification/get_allNotifications2.php?destinataire=${structure}&poste=${poste}`);

            if (response.data && response.data.recu && response.data.recu.length > 0) {
               console.log( response.data.recu )
               setRecu(true)
               setFilteredData(response.data.recu)
              // SetChangePhoto(true)
            } else {
               console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
            }
         } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }
      }




      const  upDateData = async (id)=>{
    //console.log(id)
      try {
         const response = await axios.get(`${baseUrl}/notification/updatePoste.php?id=${id}`);

         if (response.data && response.data.recu && response.data.recu.length > 0) {
            console.log( response.data.recu )
          //  setFilteredData(response.data.recu)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);

            setFilteredData([])
            getData3(structure)
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }


   }

      useEffect(()=>{
         getData3(structure)
      },[])

      // function formatDate(apiDate) {
      //    // Séparer la date en jour, mois et année
      //    const [day, month, year] = apiDate.split('/').map(Number);
      //
      //    // Utiliser new Date(year, monthIndex, day) pour construire une date
      //    const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      //
      //    return formattedDate;
      // }

      function formatDate(apiDate) {
         // Extraire la date du texte (en supposant que la date est toujours au début du texte)
         const dateMatch = apiDate.match(/(\d{2}\/\d{2}\/\d{4})/);

         if (dateMatch) {
            const dateStr = dateMatch[0];
            const [day, month, year] = dateStr.split('/').map(Number);

            // Construire la date formatée
            const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

            // Remplacer la date dans le texte par la date formatée
            return apiDate.replace(dateStr, formattedDate);
         } else {
            // Si aucune date n'est trouvée, retourner le texte original
            return apiDate;
         }
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
                              SetBackEndNotification(false);
                              updateshowHeader(true)

                              updateValueAtransmettre(value)
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
                                         className=" h-20 p-2  relative w-[100%]  ">
                                       <div
                                          className="relative flex justify-between items-center p-1 space-x-2 w-full h-full bg-blue-100 rounded-md   "
                                       >
                                          {
                                             item.Type_transmission === "Courrier-arrive" ? (
                                                <img
                                                   src={doc.src}
                                                   alt="Image sélectionnée"
                                                   className="relative h-[65%]  w-[8%]  z-40 "
                                                />
                                             ) : (
                                                <img
                                                   src={files.src}
                                                   alt="Image sélectionnée"
                                                   className="relative h-[65%]  w-[8%]  z-40 "
                                                />
                                             )

                                          }

                                          <span className=" relative h-[70%] w-[102%] text-[12px] font-[Poppins] italic ">
                                    {
                                       item.contenu
                                    }   {item.expediteur === '1' ? "Direction Général"
                                             : item.expediteur === '2' ? "Direction Technique"
                                                : item.expediteur === '3' ? "Direction Administrative et du Personnel"
                                                   : item.expediteur === '4' ? "Direction Financière et Comptable"
                                                      : item.expediteur === '5' ? "Direction Commerciale"
                                                         : ""
                                    } le { formatDate(item.date) }
                                 </span>


                                          {

                                             item.lue === 'non' ? (
                                                <button
                                                   className="absolute w-full right-1 bottom-1 lg:w-[20%] mx-4 h-6 text-[8px] bg-indigo-600 hover:bg-indigo-950 text-white transition duration-300 transform hover:scale-105 px-2 py-1 rounded-md font-semibold"
                                                   onClick={() => {
                                                      upDateData(`${item.id}`)
                                                   }}> Marquer Comme lu
                                                </button>
                                             ) :(
                                                <span className="absolute w-full right-1 bottom-1 lg:w-[20%] mx-4 h-12  text-center top-6 text-[12px] font-[Poppins] flex justify-center items-center">Deja vu</span>
                                             )

                                          }


                                       </div>
                                    </div>

                                 )  )



                           ) : (
                              <div className="mx-auto top-56 italic text-gray-600 relative w-[50%]  text-center">

                                 Aucune notification recu

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