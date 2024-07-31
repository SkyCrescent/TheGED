'use client'
import search from "@/public/icons/search_126px.png";
import deleted from "@/public/icons/delete_127px.png";
import back from "@/public/icons/back_127px.png";
import dowload from "@/public/icons/download.png";
import mail from "@/public/icons/send.png";
import word from "@/public/icons/word.png";
import pdf from "@/public/icons/pdf.png";
import excel from "@/public/icons/excel2.png";
import pptx from "@/public/icons/pptx.png";
import share from '@/public/icons/share_128px.png'
import {useEffect, useState} from "react";
import axios from "axios";
import dowload2 from "@/public/icons/download_127px.png";
import process from "process";
import note from "@/public/icons/goodnotes_127px.png";
import deletef from "@/public/icons/trash_127px.png";
import zip from "@/public/icons/archive_folder_127px.png";

export  default function HISTORIC({poste,id,structure,handleClickButton7}){
   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
   const baseUrl2 = process.env.NEXT_PUBLIC_API_URL
   const [focus , SetFocus] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [filteredData3, setFilteredData3] = useState([]); // Initialize with all data
   const [options , SetOptions] = useState(null)
   const [loading , SetLoading ] = useState(false)
   const [loading2 , SetLoading2 ] = useState(false)
   const [Affiche1 , SetAffiche1] = useState(true)
   const [values, setValues] = useState({
      search: "",
      service:1

   });
   const [selectedNote, setSelectedNote] = useState(null);


   function formatDate(apiDate) {
      // Séparer la date en jour, mois et année
      const [day, month, year] = apiDate.split('/').map(Number);

      // Utiliser new Date(year, monthIndex, day) pour construire une date
      const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      return formattedDate;
   }

//Fichier recus
   const getData = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl2}/transfert/get_byId.php?structure=${structure}&expediteur=${poste}`);
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

      //Fichier envoyes
   const getData4 = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl2}/transfert/get_byId2.php?structure=${structure}&recepteur=${poste}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData3(response.data.recu)
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


   useEffect(()=>{
      getData4()
      getData()

      console.log(structure)

   },[])

   const handleChange = (e) => {
      SetAffiche1(!Affiche1)
      const { name, value } = e.target ;
      setValues({...values, [name] : value})
      console.log(values)
      // pour les select
   };

   const handleRowClick = async (id) => {
      SetOptions(id)
      setFilteredData2([])
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl2}/data_transfert/get_byId.ForSee.php?id_transfert=${id}`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici", response.data.recu)
            setFilteredData2(response.data.recu)
            SetLoading2(true)
            //SetSeePhrase(true)
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }


   useEffect(() => {
      console.log("recteur",values);
      // console.log(study1);
   }, [()=>{handleChange(e)}]);

   const handleNoteClick = (subItemId) => {
      // Mettre à jour l'état pour indiquer la note sélectionnée
      setSelectedNote(subItemId === selectedNote ? null : subItemId);

   };
   return(

      <>
         <div className="relative w-[100%]  h-[100%] ">
            <div className="relative w-[100%]  h-[12%]  pt-1 flex  items-center justify-center ">
               <div className="relative h-[70%]  w-[35%] ">
               </div>
               <div className="relative h-[70%]  w-[40%]  ">
                  <div className="relative w-[100%] ">
                     <select
                        onFocus={() => SetFocus6(true)}
                        onBlur={() => SetFocus6(false)}
                        name="service"
                        className={"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"}
                        onChange={(e) => handleChange(e)}
                        value={values.service}
                     >
                        <option value='0'></option>
                        <option value='1'>Fichiers Envoyés</option>
                        <option value='2'>Fichiers Reçu</option>

                     </select>
                     <span
                        className={(focus6 || values.service) ? "absolute left-3 p-1 w-auto top-6 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                 Fichiers Envoyés
                                </span>
                  </div>
               </div>
            </div>


            <div className="relative w-[99%]  mx-auto h-[88%]    ">
               <div className="relative w-[100%] h-[100%] mx-auto  ">

                  <div className="overflow-y-auto scrollbar-hidden relative h-[100%]  w-[100%] mx-auto  ">
                     <div className="relative top-1 h-auto content-container overflow-hidden  ">

                        <div className={Affiche1 ? 'relative w-full shadow-lg  ' : 'hidden'}>
                           {filteredData.map((subItem, subIndex) => (
                              <div
                                 className={
                                    subIndex % 2 === 0
                                       ? 'bg-transparent border-b border-blue-400 cursor-pointer font-medium text-black hover:bg-gray-100'
                                       : 'bg-transparent text-black border-b border-blue-400 font-medium cursor-pointer hover:bg-gray-100'
                                 }
                              >
                                 <div
                                    key={subIndex}
                                    className={`border-b border-blue-400 h-12 flex items-center justify-center px-2 md:px-2 ${
                                       subIndex % 2 === 0 ? 'bg-indigo-600/15' : 'bg-transparent'
                                    } text-black md:font-[Poppins] text-[14px] cursor-pointer items-center hover:bg-gray-200`}

                                 >
                                    <img
                                       src={mail.src}
                                       alt="Image sélectionnée"
                                       className="relative h-[70%] w-[3%] z-40"
                                       onClick={() => handleRowClick(`${subItem.id}`)}
                                    />
                                    <h1 className="relative w-[96%] mx-2 text-center h-16 md:h-auto">
                                       {selectedNote === subItem.id ? (
                                          <div className="p-2 text-black">{subItem.note}</div>
                                       ) : (
                                          <span>
                                   Vous avez transféré un fichier vers Le (La){" "}
                                             <span className="text-sky-800">{subItem.recepteur}</span> accompagné
                                      d'une note le <span className="text-sky-800">{formatDate(subItem.date)}</span>
                                    </span>
                                       )}
                                    </h1>
                                    <div className="relative w-[17%] flex items-center justify-evenly">
                                     <span
                                        className="relative w-[20%] mx-2 h-[72%] md:h-[80%] rounded-full hover:bg-gray-600"
                                        onClick={() => handleNoteClick(subItem.id)}
                                     >
                                       <img
                                          src={note.src}
                                          alt="Image sélectionnée"
                                          className="relative h-[100%] w-[100%] mx-auto z-40"
                                       />
                                     </span>
                                    </div>
                                 </div>
                                 <h1 className="relative w-[80%] mx-1 h-16 md:h-auto">
                                    {options === subItem.id.toString() ? (
                                       <div className="flex flex-wrap mx-auto">
                                          {filteredData2.map((item, index) => (
                                             <div key={item.id} className='relative  w-[13%] h-44   mb-2 mr-3'>
                                                <div
                                                   className="relative w-full h-full p-1  cursor-pointer border border-gray-500 rounded-md hover:bg-gray-50  "
                                                   // onClick={() => {
                                                   //    console.log(`/${item.url_fichier}`);
                                                   // }}
                                                >
                                                   <div
                                                      className="relative w-full h-[60%] flex items-center justify-center ">
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
                                                            className="relative h-[75%]  w-[100%]  z-40"
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
                                                      className="relative w-full h-[20%] font-semibold text-[12px] flex items-center justify-center ">

                                             <span className="relative w-full text-center"
                                                   style={{wordWrap: 'break-word'}}>
                                                 {item.nom.includes('.') ? item.nom.substring(0, item.nom.lastIndexOf('.')) : item.nom}
                                             </span>

                                                   </div>
                                                   <div
                                                      className= {Affiche1 ? 'hidden' : 'relative w-full h-[22%] font-semibold text-[12px] flex items-center justify-center  ' }  >

                                                      <button
                                                         className="relative h-[80%] bg-gray-200 w-[80%] flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  "
                                                      >
                                                         <a href={`${baseUrl}/${item.url_fichier}`}
                                                            className="relative w-full text-center  flex items-center  justify-center"
                                                            style={{wordWrap: 'break-word'}}>


                                                            <img
                                                               className=" h-auto  "
                                                               title="Telecharger le fichier"
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
                                          ))}
                                       </div>
                                    ) : null}
                                 </h1>
                              </div>
                           ))}
                        </div>

                        <div className={Affiche1 ? 'hidden' : 'relative w-full shadow-lg'}>
                           {filteredData3.map((subItem, subIndex) => (
                              <div
                                 className={
                                    subIndex % 2 === 0
                                       ? 'bg-transparent border-b border-blue-400 cursor-pointer font-medium text-black hover:bg-gray-100'
                                       : 'bg-transparent text-black border-b border-blue-400 font-medium cursor-pointer hover:bg-gray-100'
                                 }
                              >
                                 <div
                                    key={subIndex}
                                    className={`border-b border-blue-400 h-12 flex items-center justify-center px-2 md:px-2 ${
                                       subIndex % 2 === 0 ? 'bg-indigo-600/15' : 'bg-transparent'
                                    } text-black md:font-[Poppins] text-[14px] cursor-pointer items-center hover:bg-gray-200`}

                                 >
                                 <img
                                       src={mail.src}
                                       alt="Image sélectionnée"
                                       className="relative h-[70%] w-[3%] z-40"
                                       onClick={() => handleRowClick(`${subItem.id}`)}
                                    />
                                    <h1 className="relative w-[96%] mx-2 text-center h-16 md:h-auto">
                                       {selectedNote === subItem.id ? (
                                          <div className="p-2 text-black">{subItem.note}</div>
                                       ) : (
                                          <span>
              Vous avez reçu un fichier provenant de  Le (La){" "}
                                             <span className="text-sky-800">{subItem.expediteur}</span> accompagné
              d'une note le <span className="text-sky-800">{formatDate(subItem.date)}</span>
            </span>
                                       )}
                                    </h1>
                                    <div className="relative w-[17%] flex items-center justify-evenly">
          <span
             className="relative w-[20%] mx-2 h-[72%] md:h-[80%] rounded-full hover:bg-gray-600"
             onClick={() => handleNoteClick(subItem.id)}
          >
            <img
               src={note.src}
               alt="Image sélectionnée"
               className="relative h-[100%] w-[100%] mx-auto z-40"
            />
          </span>
                                    </div>
                                 </div>
                                 <h1 className="relative w-[80%] mx-1 h-16 md:h-auto">
                                    {options === subItem.id.toString() ? (
                                       <div className="flex flex-wrap mx-auto">
                                          {filteredData2.map((item, index) => (
                                             <div key={item.id} className='relative  w-[13%] h-44   mb-2 mr-3'>
                                                <div
                                                   className="relative w-full h-full p-1  cursor-pointer border border-gray-500 rounded-md hover:bg-gray-50  "
                                                   // onClick={() => {
                                                   //    console.log(`/${item.url_fichier}`);
                                                   // }}
                                                >
                                                   <div
                                                      className="relative w-full h-[60%] flex items-center justify-center ">
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
                                                            className="relative h-[75%]  w-[100%]  z-40"
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
                                                      className="relative w-full h-[20%] font-semibold text-[12px] flex items-center justify-center ">

                                             <span className="relative w-full text-center"
                                                   style={{wordWrap: 'break-word'}}>
                                                 {item.nom.includes('.') ? item.nom.substring(0, item.nom.lastIndexOf('.')) : item.nom}
                                             </span>

                                                   </div>

                                                   <div
                                                      className={Affiche1 ? 'hidden' : 'relative w-full h-[22%] font-semibold text-[12px] flex items-center justify-center  '}>

                                                      <button
                                                         className="relative h-[80%] bg-gray-200 w-[80%] flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  "
                                                      >
                                                         <a href={`${baseUrl}/${item.url_fichier}`}
                                                            className="relative w-full text-center  flex items-center  justify-center"
                                                            style={{wordWrap: 'break-word'}}>


                                                            <img
                                                               className=" h-auto  "
                                                               title="Telecharger le fichier"
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
                                          ))}
                                       </div>
                                    ) : null}
                                 </h1>
                              </div>
                           ))}
                        </div>


                     </div>
                  </div>

               </div>


            </div>

         </div>


      </>
   )
}