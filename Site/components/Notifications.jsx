'use client'
import {useEffect, useState} from "react";
import word from "../public/icons/word.png"
import excel from "../public/icons/excel2.png"
import pdf from "../public/icons/pdf.png"
import pptx from "../public/icons/pptx.png"
import send from "../public/icons/send.png"
import archives from '../public/icons/archive_127px.png'
import deleteFiles from '../public/icons/trash_127px.png'
import msg from '@/public/icons/group_message.png'
import ok from '@/public/icons/ok_127px.png'
import locked from '@/public/icons/locked_with_key_127px.png'
export default function Notifications({SetNotifications,valueNotification}){
   const [loading , SetLoading ] = useState(false)


   setTimeout(()=>{
      // SetAlldisplay(false)
      SetLoading (true)
      // console.log(structure)
   },80)

   useEffect(()=>{

      console.log(valueNotification)
   },[])


   return(

      <>
         <div
            className={` absolute bottom-2 right-4 z-50  w-80 h-20  transition duration-300 ease-in-out`}
         >
            <div
               className={` relative  flex items-center justify-center h-[100%] w-[100%] bg-white border border-gray-700 shadow p-1 ${loading ? 'scale-x-100 scale-y-100 opacity-100' : 'scale-x-0 scale-y-0 opacity-0'}  transition duration-500    `}>

               <div
                  className="flex flex-col items-center justify-center  relative h-[100%] w-[100%]">
                  <div
                     className="flex items-center justify-center   relative h-[8%] w-[100%]">
                     {/*<span*/}
                     {/*   className="text-xl text-center font-black font-[Gotham] text-blue-900">Renseigner les Informations du document ff </span>*/}


                     <button
                        className="absolute  right-3 -bottom-16 w-[16%] cursor-pointer z-50 hover:underline  rounded-md text-xs p-2 font-black text-indigo-900"
                        onClick={() => {
                           SetLoading(false);
                           SetNotifications(false);
                        }}
                     >OK
                     </button>

                  </div>


                  <div className="relative flex justify-between  h-[92%] w-[100%] ">

                     <div className="relative h-[100%] w-[20%] flex items-center justify-center  ">

                        {
                           valueNotification === "Word" ? (
                              <img src={word.src}
                                   alt="Image sélectionnée"
                                   className="relative h-[80%]  w-[95%] mx-auto  z-40"
                              />
                           ) : valueNotification === "Excel" ? (
                              <img src={excel.src}
                                   alt="Image sélectionnée"
                                   className="relative h-[50%] w-[100%] mx-auto   z-40"
                              />
                           ) : valueNotification === "PDF" ? (
                              <img src={pdf.src}
                                   alt="Image sélectionnée"
                                   className="relative h-[55%]  w-full mx-auto  z-40"
                              />
                           ) :  valueNotification === "tranfert"  || valueNotification === "SendFiles"  ? (
                              <img src={send.src}
                                   alt="Image sélectionnée"
                                   className="relative h-[55%]  w-[65%] mx-auto  z-40"
                              />
                           ) : valueNotification === "compresse" ? (
                                 <img src={archives.src}
                                      alt="Image sélectionnée"
                                      className="relative h-[55%]  w-[65%] mx-auto  z-40"
                                 />
                              ) : valueNotification === "debloque" || valueNotification === "bloque"  ? (
                                       <img src={locked.src}
                                    alt="Image sélectionnée"
                                    className="relative h-[55%]  w-[65%] mx-auto  z-40"
                                 />
                              )

                     : valueNotification === "ajout1" || valueNotification === "ajout2" ? (
                                 <img src={ok.src}
                                      alt="Image sélectionnée"
                                      className="relative h-[55%]  w-[65%] mx-auto  z-40"
                                 />
                              )


                              : valueNotification === "decompresse" ? (
                                    <img src={archives.src}
                                         alt="Image sélectionnée"
                                         className="relative h-[55%]  w-[65%] mx-auto  z-40"
                                    />
                                 )
                            : valueNotification === "delete" || valueNotification === "delete2" ? (
                                 <img src={deleteFiles.src}
                              alt="Image sélectionnée"
                              className="relative h-[55%]  w-[65%] mx-auto  z-40"
                                 />)

                                    : valueNotification === "SendCourrier"  || valueNotification=== "Parafeux" || valueNotification === "Renvoi" || valueNotification === "RenvoiCourrier" ? (
                                          <img src={msg.src}
                                               alt="Image sélectionnée"
                                               className="relative h-[55%]  w-[65%] mx-auto  z-40"
                                          />)
                             : (
                              <img src={pptx.src}
                                   alt="Image sélectionnée"
                                   className="relative h-[70%]  w-[100%] mx-auto  z-40"
                              />
                           )

                        }

                     {/*   compresse*/}

                     </div>


                     <div className="relative h-[100%] w-[90%] flex items-center justify-center  ">

                       <span className="relative text-[13px] font-semibold font-[Poppins] ">

                          {
                          valueNotification === 'tranfert' ?
                          'Votre document a été correctement envoye' :
                             valueNotification === 'delete'
                                 ? 'Le document sélectionné a été supprimé avec succès'
                                    :valueNotification === 'compresse' ?
                                       'Le document a été archiver avec succès'
                                   :valueNotification === 'decompresse' ?
                                      'Le document selectionné a été désarchiver'
                                       : valueNotification === 'SendCourrier' ?
                                          'Votre courrier a bien été envoyé et reçu '
                                             :valueNotification === 'Parafeux' ?
                                                   'Le courrier a été transmis vers le Directeur'
                                                :valueNotification === "Renvoi" || valueNotification === "RenvoiCourrier" ?
                                                      'Le courrier a été renvoyés vers le secrétariat'
                                                      :valueNotification === 'SendFiles' ?
                                                         'Le courrier a été correctement transmis'
                                                           :valueNotification === 'ajout1' ?
                                                              'Le Service a été crée avec succès'
                                                                 :valueNotification === 'ajout2' ?
                                                                    'Le Nouvel agent à été ajoutée avec succès'
                                                                       :valueNotification === 'bloque' ?
                                                                          'Le Compte selectioné a été bloquer'
                                                                             :valueNotification === 'debloque' ?
                                                                                'Le Compte selectioné a été débloquer'
                                                                                      :valueNotification === 'delete2' ?
                                                                                         'Le Compte selectioné a été supprimer'

                                                        : `Un document ${valueNotification === "Word" ? "Word" : valueNotification === "Excel" ? "Excel" : valueNotification === "PDF" ? "PDF" : "PowerPoint"} a été ajouté avec succès`

                          }


                          </span>

                     </div>


                  </div>


               </div>
            </div>

         </div>
      </>
   )
}