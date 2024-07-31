'use client'
import React, {useEffect, useState} from "react";
import axios from "axios";
import word from "../public/icons/word.png"
import excel from "../public/icons/excel2.png"
import pdf from "../public/icons/pdf_127px.png"
import pptx from "../public/icons/pptx.png"
import send from "../public/icons/send.png"
import archives from '../public/icons/archive_127px.png'
import deleteFiles from '../public/icons/trash_127px.png'
import msg from '@/public/icons/group_message.png'
import {usePathname} from "next/navigation";
import dowload2 from "@/public/icons/locked_with_key_127px.png";
import doc from "@/public/icons/group_message.png";
import files from "@/public/icons/send.png";
import process from "process";
export default function FilterArchive({handleClickButton13,updateidAgent,reduce,TheId,structure}) {
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const pathname = usePathname();
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data

   const [TheId2, Setid] = useState(0)
   const [nom, SetNom] = useState("")
   const [prenom, SetPreNom] = useState("")
//   const [ adresse , SetAdresse] = useState("" )
   const [photo, SetPhoto] = useState("")
   const [phone, SetPhone] = useState("")
   const [poste, SetPoste] = useState("")
   const [username, SetUsername] = useState("")


   const getData = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/Historic/get_byId.php?id_agent=${TheId}`);
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData2(response.data.recu)
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   const getData2 = async () => {
      try {
         const response = await axios.get(`${baseUrl}/admin/get_byId.php?id_structure=${structure}`);

         if (response.data && response.data.recu && response.data.recu.length > 0) {

            console.log(response.data.recu)
            setFilteredData(response.data.recu)
            Setid(response.data.recu[0].id)
            SetNom(response.data.recu[0].nom)
            SetPreNom(response.data.recu[0].prenom)
            SetPhoto(response.data.recu[0].photo)
            SetPhone(response.data.recu[0].phone)
            SetPoste(response.data.recu[0].poste_agent)
            SetUsername(response.data.recu[0].username)
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }
   useEffect(() => {
      getData()
      getData2()
   }, [])
   function formatDate(apiDate) {
      // Séparer la date en jour, mois et année
      const [day, month, year] = apiDate.split('/').map(Number);

      // Utiliser new Date(year, monthIndex, day) pour construire une date
      const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

      return formattedDate;
   }
   function chunkArray(array, size) {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += size) {
         chunkedArray.push(array.slice(i, i + size));
      }
      return chunkedArray;
   }



   return (

      <div className="relative  h-[100%] flex items-center justify-center ">

                  {/*<div className="relative w-[50%] h-[96%] rounded-md content-normal  scrollbar-hidden overflow-y-auto " >*/}

                     {
                        pathname.includes('director')
                           ? (
                              <>
                                 <div className="relative h-[100%] w-[99%]  mx-auto   flex justify-between ">
                                    <div
                                       className="relative h-[100%] w-[98%] mx-auto  p-1  content-normal    scrollbar-hidden     overflow-auto  flex  justify-between ">

                                       {chunkArray(filteredData, reduce ? 9 : 9).map((group, index) => (
                                          <div key={index} className="flex flex-wrap mx-auto p-2 ">
                                             {group.map((item, itemIndex) => (
                                                <div key={item.id} className="relative w-80 h-[50%] mb-3 mr-3"
                                                onClick={()=>{
                                                   handleClickButton13()
                                                   updateidAgent(`${item.id}`)
                                                }}
                                                >
                                                   <div
                                                      className="relative w-full h-full  p-2 border border-gray-300  rounded-xl  cursor-pointer shadow-xl  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300  ">
                                                      <div
                                                         className="relative w-full h-[45%]  flex items-center justify-center">
                                                         <img
                                                            src={`/${item.photo}`}
                                                            alt="Image sélectionnée"
                                                            className="relative h-[110%]  w-[50%] z-40 rounded-full "
                                                         />
                                                      </div>
                                                      <div
                                                         className="relative w-full h-[50%]  font-semibold text-[12px]">
                                                         <div className="relative h-[80%] w-full  space-y-2 top-2 ">
                                                            <p>
                                                               Nom de l'agent : <span
                                                               className="font-[Poppins] text-sky-400 text-[14px]">{item.nom}</span>
                                                            </p>
                                                            <p>
                                                               Prénom de l'agent : <span
                                                               className="font-[Poppins] text-sky-400 text-[14px]">{item.prenom}</span>
                                                            </p>
                                                            <p>
                                                               Numéro de Téléphone : <span
                                                               className="font-[Poppins] text-sky-400 text-[14px]">{item.num_phone}</span>
                                                            </p>
                                                            <p>
                                                               Poste de l'agent : <span
                                                               className="font-[Poppins] text-sky-400 text-[14px]">{item.poste_agent}</span>
                                                            </p>
                                                            <p>
                                                               Nom du Compte : <span
                                                               className="font-[Poppins] text-sky-400 text-[14px]">{item.username}</span>
                                                            </p>
                                                         </div>



                                                      </div>
                                                   </div>
                                                </div>

                                             ))}
                                          </div>
                                       ))}

                                    </div>

                                 </div>

                              </>
                           )

                           : (
                              <>
                              <div className="relative w-[50%] h-[96%] rounded-md content-normal  scrollbar-hidden overflow-y-auto " >

                                    {
                                       filteredData2.map ((item, index) => (

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
                                    Vous avez  {
                                                   item.contenu
                                                }    le { formatDate(item.date) }
                                 </span>

                                             </div>
                                          </div>

                                       )  )

                                    }

                                 </div>
                              </>
                           )

                     }
      </div>
   )
}