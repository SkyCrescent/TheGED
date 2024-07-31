'use client'

import f from "../app/page"
import search from "@/public/icons/search_126px.png";
import deleted from "@/public/icons/delete_127px.png";
import back from "@/public/icons/back_127px.png";
import dowload from "@/public/icons/download.png";
import mail from "@/public/icons/group_message.png";
import word from "@/public/icons/word.png";
import pdf from "@/public/icons/pdf.png";
import excel from "@/public/icons/excel2.png";
import pptx from "@/public/icons/pptx.png";
import {useEffect, useState} from "react";
import axios from "axios";
import process from "process";
//import f from "../../Site/public/La Liste des Enfants.pdf"
export  default function Message({structure}){
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [focus , SetFocus] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [options , SetOptions] = useState(null)
   const [loading , SetLoading ] = useState(false)
   const [loading2 , SetLoading2 ] = useState(false)
   const [myId , SetMyId] = useState(0)
   const [values, setValues] = useState({
      search: "",
   });






   const getData = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/Courrier/get_byId.php?recepteur=${structure}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData(response.data.recu)
            // setNom(response.data.recu[0].Description)
            //
            SetLoading(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   //

   useEffect(()=>{

      getData()
      console.log(structure)

   },[])

   function formatDate(apiDate) {
      // Séparer la date en jour, mois et année
      const [day, month, year] = apiDate.split('/').map(Number);

      // Utiliser new Date(year, monthIndex, day) pour construire une date
      const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

      return formattedDate;
   }

   const handleRowClick = async (id) => {
      SetOptions(id)
      setFilteredData2([])
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/Note/get_ContneubyId.php?idCourrier=${id}`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici", response.data.recu)
            setFilteredData2(response.data.recu)
            SetLoading2(true)
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }


   return(

      <>


         <div className="relative w-[100%]  h-[100%] ">


            <div className="relative w-[99%] pt-6 mx-auto h-[78%]  ">


               <div className="relative w-[100%] h-[92%] mx-auto ">

                  <div className="overflow-y-auto scrollbar-hidden relative h-[100%]  w-[100%] mx-auto  ">
                     <div className="relative top-1 h-auto content-container overflow-hidden ">
                        <div className="relative w-full shadow-lg ">
                           {
                              loading
                                 ? (
                                    filteredData.map((subItem, subIndex) => (
                                       <div
                                          className={subIndex % 2 === 0 ? 'bg-transparent border-b border-blue-400  cursor-pointer font-medium text-black hover:bg-gray-100 ' : 'bg-transparent text-black border-b border-blue-400 font-medium cursor-pointer hover:bg-gray-100'}>
                                          <div key={subIndex}
                                               className={`border-b border-blue-400 h-12 flex   px-2 md:px-2  
                                  ${subIndex % 2 === 0 ? "bg-indigo-600/15" : "bg-transparent"} text-black  md:font-[Poppins] text-[14px] cursor-pointer items-center hover:bg-gray-200 `
                                               }
                                               onClick={() => handleRowClick(`${subItem.id}`)}
                                             //onClick={() => SetOptions(subIndex)}
                                             //onMouseLeave={() => SetOptions(null)}
                                          >
                                             <img
                                                src={mail.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[70%]  w-[3%]   z-40"
                                             />
                                             <h1 className="relative w-[96%] mx-2 h-16 md:h-auto  "> Note concernant le courrier recu de
                                                a <span
                                                   className="text-sky-800"> {subItem.expediteur === "1" ? "La Direction Générale"
                                                   : subItem.expediteur === "2" ? "La Direction Technique"
                                                      : subItem.expediteur === "3" ? "La Direction Administrative et du Personnel"
                                                         : subItem.expediteur === "4" ? "La Direction Financière et Comptable"
                                                            : "La Direction Commerciale"} </span>
                                                le <span className="text-sky-800">{formatDate(subItem.date)} </span>
                                                portant sur <span
                                                   className="text-sky-800"> {subItem.objet}</span>

                                             </h1>
                                          </div>

                                          {
                                             options === subItem.id.toString() ? (

                                                <div className="flex flex-wrap mx-auto w-full  ">
                                                   {
                                                      filteredData2.map((item, index) => (

                                                         <div key={item.id}
                                                              className="w-full h-auto  relative   ">

                                                            <div
                                                               className={" flex flex-wrap mx-auto text-center h-12 items-center justify-center bg-blue-100 "}
                                                            >
                                                                 <span className=" text-sm text-black"
                                                                        style={{wordWrap: 'break-word'}}
                                                                  ><span className="font-semibold underline outline-offset-6 ">Provenant du {item.poste} :</span>  {item.contenu}</span>
                                                            </div>

                                                         </div>

                                                      ))
                                                   }

                                                </div>

                                             ) : null
                                          }


                                          {/* Ajoutez d'autres informations ici si nécessaire */}
                                       </div>
                                    ))
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


            </div>

         </div>


         {/*<div>*/}
         {/*   /!*Parie Message*!/*/}

         {/*<embed src="http://localhost:3000/La%20Liste%20des%20Enfants.pdf"  type="application/pdf" width="100%" height="500px"/>*/}

         {/*<iframe src="http://localhost:3000/La%20Liste%20des%20Enfants.pdf" className="border border-sky-700"*/}
         {/*        width="100%" height="100%"></iframe>*/}

         {/*</div>*/}
         {/*<div>*/}
         {/*   /!* Partie Message *!/*/}
         {/*   /!*<embed src="La Liste des Enfants.pdf" width="100%" height="500px"/>*!/*/}


         {/*   <object data="public/La Liste des Enfants.pdf" type="application/pdf" width="100%" height="500px">*/}
         {/*      <p>Le navigateur ne peut pas afficher le PDF. <a href="http://localhost:3000/La Liste des Enfants.pdf">Cliquez ici pour*/}
         {/*         le télécharger.</a></p>*/}
         {/*   </object>*/}
         {/*</div>*/}
      </>
   )
}