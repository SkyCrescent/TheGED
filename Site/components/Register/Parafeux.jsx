'use client'
import React, {useEffect, useState} from "react";

import search from "@/public/icons/search_126px.png";
import deleted from "@/public/icons/delete_127px.png";
import back from "@/public/icons/back_127px.png";
import dowload from "@/public/icons/download.png";
import mail from "@/public/icons/mail.png";
import word from "@/public/icons/word.png";
import pdf from "@/public/icons/pdf.png";
import excel from "@/public/icons/excel2.png";
import pptx from "@/public/icons/pptx.png";
import axios from "axios";
import dowload2 from "@/public/icons/download_127px.png";
import process from "process";
import io from "socket.io-client";
import refresh from "@/public/icons/refresh_127px.png";

export default function Parafeux({Myid,handleClickButton12,handleClickButton1,UpdateValueParafeure,TheUpdateValueParafeure,updateValueInArrive}) {
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [options , SetOptions] = useState(null)
   const [loading , SetLoading ] = useState(false)
   const [loading2 , SetLoading2 ] = useState(false)
   const [myId , SetMyId] = useState(0)
   const [focus , SetFocus] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [ seePrhase ,SetSeePhrase] = useState(false)
   const [values, setValues] = useState({
      nom: "",
   });


   const handleValueChange = (id) => {
     // console.log('lancien id' ,id)
      // Modifiez la valeur dans R_Depart
      const newValue = id /* Nouvelle valeur */;
      // Appelez la fonction de mise à jour de la valeur dans R_Arrive
      updateValueInArrive(newValue);
     console.log('lancien id2' ,updateValueInArrive)
      handleClickButton12()
   };

   const getData = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/Courrier/get_allCourierParafeux.php?recepteur=${Myid}&Type_transmission=depart-arrive&parafeux=oui`);
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

   {
      UpdateValueParafeure ? (() => {

         getData()
         console.log("c fairtererer")
         TheUpdateValueParafeure(false)
      })() : null;
   }
   useEffect(()=>{
      getData()
      console.log(Myid)
   },[])

   function formatDate(apiDate) {
      // Séparer la date en jour, mois et année
      const [day, month, year] = apiDate.split('/').map(Number);

      // Utiliser new Date(year, monthIndex, day) pour construire une date
      const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

      return formattedDate;
   }

   const handleRowClick = (id) =>{
      SetOptions(id)
      setFilteredData2([])
      GoToSee(id)
   }

   const UpdateCourier = async (id) =>{

      setFilteredData2([])
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/Courrier/updateCourrier.php?id=${id}&parafeux=oui`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici",response.data.recu)
            // setFilteredData2(response.data.recu)
            // SetLoading2(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);

            setFilteredData2([])
            getData()
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }


   const GoToSee = async (id) => {
      // SetLoading2(true)
      SetMyId(id)
      console.log(id)
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/doc_users/get_byId.ForSee.php?id_courier=${id}`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici",response.data.recu)
            setFilteredData2(response.data.recu)
            SetLoading2(true)
            SetSeePhrase(true)
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }

   }


   const handleChange2 = async (e) => {


      const { name, value } = e.target;
      setFilteredData([]);
      if (name === 'nom' || name === 'service') {
         let cleanedValue = value;
         if (name === 'nom' && value) {
            // Appliquer les expressions régulières à value
            cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
            //cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());
         }

         const newData = { ...values, [name]: cleanedValue };
         setValues(newData);
         console.log(values);

         let apiUrl = `${baseUrl}/filter/Parafeux.php?recepteur=${Myid}&Type_transmission=depart-arrive&parafeux=oui`;
         if (name === 'nom' && cleanedValue) {
            apiUrl += `&objet=${cleanedValue}`;
         } else if (name === 'service' && cleanedValue) {
            apiUrl += `&expediteur=${cleanedValue}`;
         } else if (name === 'nom' && name === 'service' && cleanedValue) {
            apiUrl += `&objet=${cleanedValue}&expediteur=${cleanedValue}`;
         } else {
            getData();
         }

         try {
            const response = await axios.get(apiUrl);
            if (response.data && response.data.recu && response.data.recu.length > 0) {
               setFilteredData(response.data.recu);
            } else {
               console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            }
         } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }
      }
   };


   return(


      <>


         <div className="relative w-[100%]  h-[100%] ">
            <div className="relative w-[100%]  h-[10%] pt-1 flex  items-center justify-center ">
               <div className="relative h-[70%]  w-[40%]  ">

                  <div
                     className="relative flex justify-between items-center justify-center w-[80%]  mx-2 border rounded-lg border-gray-300 ">
                     <input
                        onFocus={() => SetFocus(true)}
                        onBlur={() => SetFocus(false)}
                        type='text'
                        name="nom"
                        className="text-large relative w-[83%] mx-auto  border-black/ text-gray-700 border bg-transparent  py-2 px-4 h-10 focus:outline-none focus:border-blue-500"
                        onChange={(e) => handleChange2(e)}
                        value={values.nom}

                     />
                     <img
                        className=" mx-3 h-5 w-5  absolute"
                        src={search.src}
                        height={20}
                        width={20}
                        alt="Nfc"
                     />
                     <span
                        className={(focus || values.nom) ? "absolute left-3 p-1 w-auto top-6 px-10   text-xs font-black text-sky-700  -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-2 px-12 text-sky-700"}>
                                  Rechercher un courier
                                </span>
                  </div>

               </div>
               <div className="relative h-[70%]  w-[40%]  ">
                  <div className="relative w-[100%] ">
                     <select
                        onFocus={() => SetFocus6(true)}
                        onBlur={() => SetFocus6(false)}
                        name="service"
                        className={"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"}
                        onChange={(e) => handleChange2(e)}
                        value={values.service}
                     >
                        <option value=''></option>
                        <option value='1'>Direction Général</option>
                        <option value='2'>Direction Technique</option>
                        <option value='3'>Direction Administrative et du Personnel</option>
                        <option value='4'>Direction Financière et Comptable</option>
                        <option value='5'>Direction Commerciale</option>
                     </select>
                     <span
                        className={(focus6 || values.service) ? "absolute left-3 p-1 w-auto top-8 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                  Correspondance possible
                                </span>
                  </div>
               </div>

               <div className="relative h-[70%]  w-[20%]  flex items-center justify-center ">

                  <button
                     className="w-[35%] bg-black/90 flex items-center  justify-evenly gap-3 mx-auto hover:bg-black/100 text-white transition duration-300 transform hover:scale-105  rounded-md text-xs font-semibold p-1.5"
                     onClick={() => {
                        SetSeePhrase(false);
                        setFilteredData2([]);
                        handleClickButton1()
                     }}

                  >
                     <img
                        className=" h-auto  "
                        src={back.src}
                        height={25}
                        width={25}
                        alt="Nfc"

                     />
                  </button>

                  <button
                     className="w-[35%] bg-white border border-blue-500 flex items-center  justify-evenly gap-3 mx-auto text-white transition duration-300 transform hover:scale-105  rounded-md text-xs font-semibold p-1.5"
                     onClick={() => {
                        // SetSeePhrase(false);
                        // setFilteredData2([]);
                        // handleClickButton1()

                        setFilteredData([])
                        getData()

                     }}

                  >
                     <img
                        className=" h-auto  "
                        src={refresh.src}
                        height={25}
                        width={25}
                        alt="Nfc"

                     />
                  </button>

               </div>


            </div>


            <div className="relative w-[99%]  mx-auto h-[80%]    ">


               <div className="relative w-[100%] h-[92%] mx-auto  ">

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

                                             //onClick={() => SetOptions(subIndex)}
                                             //onMouseLeave={() => SetOptions(null)}
                                          >
                                             <img
                                                src={mail.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[70%]  w-[3%]   z-40"
                                                onClick={() => handleRowClick(`${subItem.id}`)}
                                             />
                                             <h1 className="relative w-[93%] mx-2 h-16 md:h-auto  "> Courrier recu
                                                le <span className="text-sky-800">{formatDate(subItem.date)} </span>
                                                dont l'objet est <span
                                                   className="text-sky-800"> {subItem.objet}</span> provenant de <span
                                                   className="text-sky-800"> {subItem.expediteur === "1" ? "La Direction Générale"
                                                   : subItem.expediteur === "2" ? "La Direction Technique"
                                                      : subItem.expediteur === "3" ? "La Direction Administrative et du Personnel"
                                                         : subItem.expediteur === "4" ? "La Direction Financière et Comptable"
                                                            : "La Direction Commerciale"}</span> avec
                                                un niveau
                                                d'urgence <span
                                                   className="text-sky-800"> {subItem.Niveau}</span>


                                             </h1>
                                             <button
                                                className=" block relative  bg-sky-500 w-[8%] text-white h-9 rounded-md transition duration-300 transform hover:scale-105"
                                                onClick={() => {
                                                   handleValueChange(subItem.id)
                                                }}
                                             >
                                                Viser
                                             </button>
                                          </div>

                                          {
                                             options === subItem.id.toString() ? (

                                                   <div className="flex flex-wrap mx-auto   ">
                                                      {
                                                         filteredData2.map((item, index) => (

                                                            <div key={item.id}
                                                                 className="relative h-48 mb-2 mr-3   w-[12%]  ">
                                                               <div
                                                                  className="relative w-full h-full  cursor-pointer border border-gray-500 rounded-md hover:bg-gray-50  "
                                                                  onClick={() => {
                                                                     // handleDownload(item.url_fichier, item.nom);
                                                                     console.log(`/${item.url_fichier}`);
                                                                  }}
                                                               >
                                                                  <div
                                                                     className="relative w-full h-[60%] flex items-center justify-center">
                                                                     {item.extension === 'Word' ? (
                                                                        <img
                                                                           src={word.src}
                                                                           alt="Image sélectionnée"
                                                                           className="relative h-[85%]  w-[65%] mx-auto  z-40"
                                                                        />
                                                                     ) : item.extension === 'PDF' ? (
                                                                        <img
                                                                           src={pdf.src}
                                                                           alt="Image sélectionnée"
                                                                           className="relative h-[75%]  w-[95%]  z-40"
                                                                        />
                                                                     ) : item.extension === 'Excel' ? (
                                                                        <img
                                                                           src={excel.src}
                                                                           alt="Image sélectionnée"
                                                                           className="relative h-[70%]  w-[90%] mx-auto z-40"
                                                                        />
                                                                     ) : (
                                                                        <img
                                                                           src={pptx.src}
                                                                           alt="Image sélectionnée"
                                                                           className="relative h-[70%]  w-[93%] mx-auto z-40"
                                                                        />
                                                                     )}
                                                                  </div>

                                                                  <div
                                                                     className="relative w-full h-[20%] font-semibold text-[10px] flex items-center justify-center "

                                                                  >
                                                                        <span
                                                                           className="relative w-full text-center"
                                                                           style={{wordWrap: 'break-word'}}
                                                                        >
                                                                           {item.nom.includes('.') ? item.nom.substring(0, item.nom.lastIndexOf('.')) : item.nom}

                                                                        </span>
                                                                  </div>


                                                                  <div
                                                                     className="relative w-full   h-[20%] flex items-center justify-center ">
                                                                     <button
                                                                        className="relative h-[80%] bg-gray-300 w-[58%] flex items-center  justify-center transition duration-300 transform hover:scale-110  rounded-md  p-1"
                                                                     >
                                                                        <a href={`${baseUrl}/${item.url_fichier}`}
                                                                           className="relative w-full text-center  flex items-center  justify-center"
                                                                           style={{wordWrap: 'break-word'}}>


                                                                           <img
                                                                              className=" h-auto  "
                                                                              src={dowload2.src}
                                                                              height={18}
                                                                              width={18}
                                                                              alt="Nfc"

                                                                           />
                                                                        </a>
                                                                     </button>
                                                                  </div>

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
                                 :  null

                                 // (
                                 //    <div className="flex items-center justify-center p-12 bg-transparent text-xl">
                                 //       <div
                                 //          className="w-12 h-12 border-t-2 border-red-500 border-solid rounded-full animate-spin mx-auto"></div>
                                 //    </div>
                                 // )
                           }
                        </div>

                     </div>
                  </div>

               </div>


            </div>

         </div>


      </>
   )
}