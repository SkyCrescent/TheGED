"use client"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {usePathname} from "next/navigation";

export default function Delete({updateidDelete,handleClickButton8, updateValueNotifications,SetDelete,idDelete}) {
   const [loading , SetLoading ] = useState(false)
   const pathname = usePathname();

   useEffect(()=>{
      console.log('lid du courrrier',idDelete)

   },[])


   // Formulaire d'ajout des secetaires

   setTimeout(()=>{
      SetLoading (true)
   },80)


   const deleteData  = async () => {

      try {
         // Vérifiez que tous les champs requis sont remplis

         const response = await axios.post(`http://localhost:8000/admin/delete_agent.php?id=${idDelete}`,  {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });

         const newValue2 = "delete2" /* Nouvelle valeur */;
         // Appelez la fonction de mise à jour de la valeur dans R_Arrive
         updateValueNotifications(newValue2);
         handleClickButton8()
         updateidDelete(0)
         SetDelete(false)
         console.log("Truc ajouté avec succès ", response);

         // Reset form fields after successful submission

      } catch (error) {
         console.error(error);
      }
   };




   return (


      <>
         <div
            className={`fixed top-0 left-0 z-30 bg-black/70 w-screen h-screen overflow-y-auto transition duration-300 ease-in-out`}
         >
            <div className="w-full flex justify-center my-52 md:my-96 lg:my-60">
               <div
                  className={ ` relative  flex items-center justify-center h-28 w-[28%] bg-white shadow rounded-lg p-3 ${loading ? 'scale-x-100 scale-y-100 opacity-100'  :'scale-x-0 scale-y-0 opacity-0' }  transition duration-500    ` }>

                  <div
                     className="flex  justify-between items-center justify-center  relative h-[30%] w-[100%]">



                     <button
                        className="w-[70%] bg-red-600 flex items-center  justify-center gap-3 mx-6 mt-1 hover:bg-red-900 text-white transition duration-300 transform hover:scale-105  rounded-md text-xs font-semibold p-1.5"
                       // onClick={pathname.includes('director') ? handleClickButton1 : handleClickButton2}
                        onClick={ deleteData}

                     >
                        {/*<img*/}
                        {/*   className=" h-auto  "*/}
                        {/*   src={dowload.src}*/}
                        {/*   height={25}*/}
                        {/*   width={25}*/}
                        {/*   alt="Nfc"*/}

                        {/*/>*/}
                       Supprimer l'utilisateur
                     </button>
                     <button
                        className="w-[55%] bg-blue-600 flex items-center  justify-center gap-3 mx-6 mt-1 hover:bg-blue-900 text-white transition duration-300 transform hover:scale-105  rounded-md text-xs font-semibold p-1.5"
                      //  onClick={pathname.includes('director') ? handleClickButton1 : handleClickButton2}
                        onClick={()=>{
                           SetDelete(false)
                        }}
                     >
                        {/*<img*/}
                        {/*   className=" h-auto  "*/}
                        {/*   src={dowload.src}*/}
                        {/*   height={25}*/}
                        {/*   width={25}*/}
                        {/*   alt="Nfc"*/}

                        {/*/>*/}
                        Annuler
                     </button>

                  </div>
               </div>

            </div>
         </div>
      </>
   )
}