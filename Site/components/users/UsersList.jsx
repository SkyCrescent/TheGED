'use client'
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

import process from "process";
import search from "@/public/icons/search_126px.png";
import back from "@/public/icons/back_127px.png";
import dowload from "@/public/icons/add_127px2.png";
import refresh from "@/public/icons/refresh_127px.png";
import Style from "@/styles/Page.css"
import share from "@/public/icons/lock_127px.png";
import share2 from "@/public/icons/padlock_127px.png";
import deletef from "@/public/icons/trash_127px.png";
import zip from "@/public/icons/edit_127px.png";
export default function UsersList({handleClickButton3 , handleClickButton8,updateValueNotifications,updateidDelete,handleClickButton4,handleClickButton5,updateidUpdate}){
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [loading , SetLoading ] = useState(false)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [options , SetOptions] = useState(null)
   const [focus , SetFocus] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [focus7 , SetFocus7] = useState(false)
   const [values, setValues] = useState({
      nom: "",
      structure:"",
      service : ""
   });
   const getData = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/admin/get_allUsers.php`);
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


   const getData4 =  async (id) => {
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/admin/updateActif.php?id=${id}&actif=non`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici", response.data.recu)

            // setFilteredData2(response.data.recu)
            // SetLoading2(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            setFilteredData([])

            const newValue = 'bloque'
            updateValueNotifications(newValue)

            handleClickButton8();

            getData()
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }


   const getData5 =  async (Myid) => {
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/admin/updateActif.php?id=${Myid}&actif=oui`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici", response.data.recu)

            // setFilteredData2(response.data.recu)
            // SetLoading2(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            setFilteredData([])
            const newValue = 'debloque'
            updateValueNotifications(newValue)

            handleClickButton8();
            getData()
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }





   useEffect(() => {
      getData()
     // console.log(`${baseUrl}/admin/get_allUsers.php`)

   }, []);



   const handleChange = async (e) => {
      const {name, value} = e.target;
      setValues(prevValues => ({
         ...prevValues,
         [name]: value
      }));
      console.log(values.structure)


      // try {
      //    const response = await axios.get(`${baseUrl}/Structure/get_byId.php?id_structure=${e.target.value}`);
      //
      //    if (response.data && response.data.recu && response.data.recu.length > 0) {
      //       //setreponse('oui');
      //       console.log(response.data.recu)
      //       setFilteredData2(response.data.recu)
      //    } else {
      //       console.log("Il ya rien")
      //       setFilteredData2([])
      //    }
      // } catch (error) {
      //    console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      // }

   };
   const handleChange2 = (e) => {
      const { name, value } = e.target;
      setValues(prevValues => ({
         ...prevValues,
         [name]: value
      }));

      console.log("c fait")
   };




   return(


      <>
         <div>

            <div className="relative w-[100%] h-[100%] ">
               {/*<MyImage/>*/}
               <div className="relative w-[98%] mx-auto  h-[12%] space-x-2 pt-1 flex  items-center justify-center ">
                  <div className="relative h-[70%]   w-[26%] ">

                     <div
                        className="relative flex justify-between items-center justify-center w-[100%]   border rounded-lg border-gray-300 ">

                        <input
                           onFocus={() => SetFocus(true)}
                           onBlur={() => SetFocus(false)}
                           type='text'
                           name="nom"
                           className="text-large relative w-[80%] mx-auto text-gray-700  bg-white/90  py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                           onChange={(e) =>  setValues(prevValues => ({
                              ...prevValues,
                              nom:(e.target.value)
                           }))
                        }
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
                           className={(focus || values.nom) ? "absolute left-3 p-1 w-auto top-6 px-10   text-xs font-black text-sky-700  -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-12 text-sky-700"}>
                                  Rechercher
                                </span>
                     </div>

                  </div>

                  <div className="relative h-[70%]  w-[40%]  ">
                     <div className="relative w-[100%] ">
                        <select
                           onFocus={() => SetFocus6(true)}
                           onBlur={() => SetFocus6(false)}
                           name="structure"
                           className={"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"}

                           onChange={handleChange}



                           value={values.structure}
                        >
                           <option value=''></option>
                           <option value='1'>Direction Général</option>
                           <option value='2'>Direction Technique</option>
                           <option value='3'>Direction Administrative et du Personnel</option>
                           <option value='4'>Direction Financière et Comptable</option>
                           <option value='5'>Direction Commerciale</option>
                        </select>
                        <span
                           className={(focus6 || values.structure) ? "absolute left-3 p-1 w-auto top-6 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                 Structutre
                                </span>
                     </div>
                  </div>


                  {/*<div className="relative h-[70%]  w-[40%]  ">*/}
                  {/*   <div className="relative w-[100%] ">*/}
                  {/*      <select*/}
                  {/*         onFocus={() => SetFocus7(true)}*/}
                  {/*         onBlur={() => SetFocus7(false)}*/}
                  {/*         name="service"*/}
                  {/*         className={"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"}*/}
                  {/*         onChange={handleChange2}*/}
                  {/*         value={values.service}*/}
                  {/*      >*/}
                  {/*         <option value=''></option>*/}
                  {/*         {filteredData2.map((option) => (*/}
                  {/*            <option key={option.id} value={option.nom}>*/}
                  {/*               {option.nom}*/}
                  {/*            </option>*/}
                  {/*         ))}*/}
                  {/*      </select>*/}
                  {/*      <span*/}
                  {/*         className={(focus7 || values.service) ? "absolute left-3 p-1 w-auto top-6 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>*/}
                  {/*               Service correspondant*/}
                  {/*              </span>*/}
                  {/*   </div>*/}
                  {/*</div>*/}


                  <div className="relative h-[80%] p-1  w-[30%]  flex  justify-between ">


                     <button
                        className="w-[40%] bg-blue-600 flex items-center  justify-center gap-3  hover:bg-blue-900 text-white transition duration-300 transform hover:scale-105  rounded-md text-xs font-semibold p-1.5"
                        onClick={handleClickButton3}
                     >
                        <img
                           className=" h-auto  "
                           src={dowload.src}
                           height={25}
                           width={25}
                           alt="Nfc"

                        />
                        {/*Nouveau Courrier*/}
                     </button>


                     <button
                        className="w-[40%] bg-white border border-blue-500 flex items-center  justify-evenly gap-3 mx-auto text-white transition duration-300 transform hover:scale-105  rounded-md text-xs font-semibold p-1.5"
                        onClick={() => {
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


               {/*<div className="overflow-y-auto scrollbar-hidden relative h-[100%]  w-[100%]   ">*/}
               {/* */}


               <div className="relative w-[100%]  h-[10%] top-1 flex  items-center justify-center ">


                  <div
                     className="relative w-[98%] mx-auto h-[80%]  content-normal  scrollbar-hidden overflow-y-auto"
                     style={{maxHeight: '533px'}}>

                     {
                        loading
                           ? (
                              filteredData.filter(
                                 (subItem)=>{
                                    return values.nom.toLowerCase() !== "" ?
                                       subItem.nom.toLowerCase().includes(values.nom)
                                          :values.structure !=="" ?
                                          subItem.id_structure ===  parseInt(values.structure)
                                                :subItem
                                             // :values.service.trim().toLowerCase() !== "" ?
                                             //     subItem.service.trim().toLowerCase() === values.service.trim().toLowerCase()

                                 }

                              ).map((subItem, subIndex) => (
                                 <div
                                    className={subIndex % 2 === 0 ? 'bg-transparent border-b border-blue-400 scrollbar-hidden  cursor-pointer font-medium text-black hover:bg-gray-100 ' : 'bg-transparent text-black border-b border-blue-400 font-medium cursor-pointer hover:bg-gray-100'}>
                                    <div key={subIndex}
                                         className={`border-b border-blue-400 py-1 px-2  space-x-1    
                                  ${subIndex % 2 === 0 ? "bg-transparent" : "bg-transparent"} flex justify-between  text-black   text-[15px] font-bold cursor-pointer items-center hover:bg-gray-200 `
                                         }
                                         onMouseEnter={() => SetOptions(subIndex)}
                                         onMouseLeave={() => SetOptions(null)}
                                    >
                                       <a className=" relative  w-[15%]  md:h-14 "> <img src={`/${subItem.photo}`}
                                                                                         alt={`Media ${subItem.id}`}
                                                                                         className="relative h-[80%] top-2 w-[80%] md:w-[93%] flex items-center rounded-full   "/>
                                       </a>
                                       <a className="relative text-center w-[25%] md:h-14">{subItem.nom}</a>
                                       <a className="relative text-center  w-[50%] md:mx-4 h-14">{subItem.prenom}</a>
                                       <a className="relative text-center  w-[50%] mx-1 md:h-14 ">{subItem.adresse}</a>

                                       <a className="relative text-center  w-[50%] md:mx-4 h-14">{subItem.num_phone}</a>
                                       <a className="relative text-center  w-[50%] md:mx-4 h-14">{subItem.poste_agent}</a>
                                       <a className="relative text-center  w-[50%] md:mx-4 h-14">{subItem.username}</a>

                                       <a className="relative  text-center  w-[50%] md:mx-4 h-14">{
                                          subItem.id_structure === 1 ? "La DG"
                                             : subItem.id_structure === 2 ? "La DT"
                                                :subItem.id_structure === 3 ? "La DAP"
                                                   :subItem.id_structure === 4 ? "La DFC"
                                                      : subItem.id_structure === 5 ? "La DC"
                                          : 0



                                       }</a>
                                       <a className="relative text-center  w-[50%] md:mx-4 h-14">{subItem.service}</a>

                                       <a>


                                          <div
                                             className="    flex flex-col gap-2 md:flex-row md:gap-1   w-20 md:w-24  md:h-8 ">


                                             <button
                                                className="relative h-[100%] bg-gray-100  w-[50%] flex items-center  justify-center  transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                // onClick={() => {
                                                //    const newValue = item.id
                                                //    // Appelez la fonction de mise à jour de la valeur dans R_Arrive
                                                //    updateIdFiles(newValue);
                                                //    handleClickButton9()
                                                // }}
                                             >

                                                {
                                                   subItem.actif === "oui" ?
                                                      (
                                                         <img
                                                            className=" h-auto  "
                                                            title="Bloquer ce compte" // Ajout de l'info-bulle ici
                                                            src = {share2.src}
                                                            height={18}
                                                            width={18}
                                                            alt="Nfc"
                                                            onClick={()=>{
                                                               getData4(subItem.id)
                                                            }}

                                                         />
                                                      )
                                                   : (
                                                   <img
                                                   className=" h-auto  "
                                                   title="Débloquer ce compte" // Ajout de l'info-bulle ici
                                                   src={share.src}
                                                   height={18}
                                                   width={18}
                                                   alt="Nfc"
                                                   onClick={()=>{
                                                      getData5(subItem.id)
                                                   }}

                                             />
                                             )


                                             }


                                          </button>

                                          <button
                                             className="relative h-[100%] bg-gray-100 w-[50%] flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                onClick={() => {
                                                   const newValue = subItem.id
                                                      /* Nouvelle valeur */;
                                                   // Appelez la fonction de mise à jour de la valeur dans R_Arrive
                                                updateidDelete(newValue);
                                                   handleClickButton4()
                                                }}

                                             >
                                                <img
                                                   className=" h-auto  "
                                                   title="Supprimer le fichier"
                                                   src={deletef.src}
                                                   height={18}
                                                   width={18}
                                                   alt="Nfc"

                                                />
                                             </button>
                                             <button
                                                className="relative h-[100%] bg-gray-100 w-[50%] flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                onClick={() => {
                                                   updateidUpdate(`${subItem.id}`)
                                                   handleClickButton5()
                                                }}
                                             >
                                                <img
                                                   className=" h-auto  "
                                                   title="Archiver le fichier"
                                                   src={zip.src}
                                                   height={18}
                                                   width={18}
                                                   alt="Nfc"

                                                />
                                             </button>
                                          </div>


                                       </a>
                                    </div>

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

                     {/*</div>*/}
                     {/*</div>*/}


                  </div>


               </div>


            </div>

         </div>

      </>
   )
}