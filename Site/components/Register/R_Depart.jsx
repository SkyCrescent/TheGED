'use client'
import search from "@/public/icons/search_126px.png";
import deleted from "@/public/icons/delete_127px.png";
import back from "@/public/icons/back_127px.png";
import dowload from "@/public/icons/add_127px2.png";
import mail from "@/public/icons/group_message.png";
import word from "@/public/icons/word.png";
import pdf from "@/public/icons/pdf.png";
import excel from "@/public/icons/excel2.png";
import pptx from "@/public/icons/pptx.png";
import note  from "@/public/icons/goodnotes_127px.png"
import {useEffect, useState} from "react";
import axios from "axios";
import io from "socket.io-client";
import refresh from "@/public/icons/refresh_127px.png";

export default function R_Depart({valueCourrier,Myid,updateCourrier,handleClickButton1,handleClickButton4}) {
   const [focus , SetFocus] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [options , SetOptions] = useState(null)
   const [options2 , SetOptions2] = useState(null)
   const [ showNote,setShowNote ] = useState(false)
   const [loading , SetLoading ] = useState(false)
   const [loading2 , SetLoading2 ] = useState(false)
   const [myId , SetMyId] = useState(0)
   const [values, setValues] = useState({
      nom: "",
   });

   const [selectedNote, setSelectedNote] = useState(null);

   const handleNoteClick = (subItemId) => {
      // Mettre à jour l'état pour indiquer la note sélectionnée
      setSelectedNote(subItemId === selectedNote ? null : subItemId);
   };
   const getData = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`http://localhost:8000/Courrier/get_allCourierDepart.php?expediteur=${Myid}&Type_transmission=depart-arrive`);
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

   useEffect(()=>{

      getData()
      console.log(Myid)
      console.log(valueCourrier)

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
      SetOptions2(id)
      setFilteredData2([])
      GoToSee(id)
   }

   const handleRowClick2 = (id) =>{
      SetOptions2(id)
      setShowNote(!showNote)
   }

   const GoToSee = async (id) => {
      // SetLoading2(true)
      SetMyId(id)
      console.log(id)
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`http://localhost:8000/doc_users/get_byId.ForSee.php?id_courier=${id}`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici",response.data.recu)
            setFilteredData2(response.data.recu)
            SetLoading2(true)
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

         let apiUrl = `http://localhost:8000/filter/CourrierDepart.php?expediteur=${Myid}&Type_transmission=depart-arrive`;
         if (name === 'nom' && cleanedValue) {
            apiUrl += `&objet=${cleanedValue}`;
         } else if (name === 'service' && cleanedValue) {
            apiUrl += `&recepteur=${cleanedValue}`;
         } else if (name === 'nom' && name === 'service' && cleanedValue) {
            apiUrl += `&objet=${cleanedValue}&recepteur=${cleanedValue}`;
         } else {
            getData();
         }

         try {
            const response = await axios.get(apiUrl);
            if (response.data && response.data.recu && response.data.recu.length > 0) {
               setFilteredData(response.data.recu);
               SetLoading(true)
               console.log(response.data.recu)
            } else {
               console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            }
         } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }
      }
   };




   {
      valueCourrier  === 1 ?(()=>{

         const socket = io("http://localhost:3000");
         socket.emit('SendCourier'); // Envoyer l'ID de la structure avec l'événement
         console.log("Truc envoyé");
      })():null
   }

   useEffect(() => {
      const socket = io("http://localhost:3000");

      socket.on('connect', () => {
         console.log('Connected to server');
      });
      socket.on('CourierEnvoye', () => {

         getData()
         const newValue = 0;
         updateCourrier(newValue)
      });

      socket.on('disconnect', () => {
         console.log('Disconnected from server');
      });

      return () => {
         socket.disconnect();
      };
   }, []);



   return(


      <>

         <div className="relative w-[100%]  h-[100%] ">
            <div className="relative w-[100%]  h-[12%] space-x-3 pt-1 flex  items-center justify-center ">
               <div className="relative h-[70%]   w-[26%] ">

                  <div
                     className="relative flex justify-between items-center justify-center w-[100%]   border rounded-lg border-gray-300 ">
                     <input
                        onFocus={() => SetFocus(true)}
                        onBlur={() => SetFocus(false)}
                        type='text'
                        name="nom"
                        className="text-large relative w-[80%] mx-auto text-gray-700  bg-white/90  py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
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
                        className={(focus || values.nom) ? "absolute left-3 p-1 w-auto top-6 px-10   text-xs font-black text-sky-700  -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-12 text-sky-700"}>
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
                        className={(focus6 || values.service) ? "absolute left-3 p-1 w-auto top-6 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                  Correspondance possible
                                </span>
                  </div>
               </div>

               <div className="relative h-[70%]  w-[30%]  flex items-center justify-center ">

                  <button
                     className="w-[30%] bg-black/90 flex items-center  justify-evenly gap-3 mx-auto hover:bg-black/100 text-white transition duration-300 transform hover:scale-105  rounded-md text-xs font-semibold p-1.5"
                     onClick={() => {
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
                     className="w-[30%] bg-blue-600 flex items-center  justify-center gap-3  hover:bg-blue-900 text-white transition duration-300 transform hover:scale-105  rounded-md text-xs font-semibold p-1.5"
                     onClick={handleClickButton4}
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
                     className="w-[30%] bg-white border border-blue-500 flex items-center  justify-evenly gap-3 mx-auto text-white transition duration-300 transform hover:scale-105  rounded-md text-xs font-semibold p-1.5"
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


            {/*<div className="relative w-[99%]  mx-auto h-[78%] border border-red-500 content-normal  relative  scrollbar-hidden     overflow-y-auto ">*/}

            <div
               className="relative w-[99%] mx-auto h-[90%] top-1 content-normal  scrollbar-hidden overflow-y-auto"
               style={{maxHeight: '533px'}}>

               {
                  loading
                     ? (
                        filteredData.map((subItem, subIndex) => (
                           <div
                              className={subIndex % 2 === 0 ? 'bg-transparent border-b border-blue-400  cursor-pointer font-medium text-black hover:bg-gray-100 ' : 'bg-transparent text-black border-b border-blue-400 font-medium cursor-pointer hover:bg-gray-100'}>
                              <div key={subIndex}
                                   className={`border-b border-blue-400 h-12 flex z-10  px-2 md:px-2  
                                  ${subIndex % 2 === 0 ? "bg-indigo-600/15" : "bg-transparent"} text-black  md:font-[Poppins] text-[14px] cursor-pointer items-center hover:bg-gray-200 `
                                   }

                                   onMouseEnter={() => {
                                      SetOptions2(subItem.id)
                                   }}
                                   onMouseLeave={() => {
                                      SetOptions2(null)
                                   }}
                              >
                                 <img
                                    src={mail.src}
                                    alt="Image sélectionnée"
                                    className="relative h-[70%]  w-[3%]   z-40"
                                    onClick={() => handleRowClick(`${subItem.id}`)}
                                 />
                                 <h1 className="relative w-[96%] mx-2 h-16 md:h-auto  ">
                                    {selectedNote === subItem.id ? (
                                          <div className="p-2 text-black">
                                             {subItem.note}
                                          </div>
                                       ) :
                                       (
                                          <span>
                                                      Courrier envoye
                                                      a <span
                                             className="text-sky-800"> {subItem.recepteur === "1" ? "La Direction Générale"
                                             : subItem.recepteur === "2" ? "La Direction Technique"
                                                : subItem.recepteur === "3" ? "La Direction Administrative et du Personnel"
                                                   : subItem.recepteur === "4" ? "La Direction Financière et Comptable"
                                                      : "La Direction Commcerciale"} </span>
                                                      le <span
                                             className="text-sky-800">{formatDate(subItem.date)} </span>
                                                      dont l'objet etait <span
                                             className="text-sky-800"> {subItem.objet}</span> avec
                                                      un niveau
                                                      d'urgence <span
                                             className="text-sky-800"> {subItem.Niveau}</span>
                                                   </span>
                                       )

                                    }


                                 </h1>
                                 <span
                                    className="relative Z-50  w-[2%] mx-2 h-16 md:h-auto rounded-full hover:bg-gray-600  "
                                    onClick={() => handleNoteClick(subItem.id)}
                                    // onClick={
                                    //    options2 === subItem.id ? () => {
                                    //       handleRowClick2(`${subItem.id}`)
                                    //    } : null}
                                    // onClick={() => ( console.log(options2)  )}
                                 >
                                                      <img
                                                         src={note.src}
                                                         alt="Image sélectionnée"
                                                         className="relative h-[100%]  w-[95%] mx-auto  z-40"
                                                      />
                                             </span>
                              </div>

                              {
                                 options === subItem.id.toString() ? (

                                    <div className="flex flex-wrap mx-auto  ">
                                       {
                                          filteredData2.map((item, index) => (

                                             <div key={item.id}
                                                  className="flex items-center justify-center h-36 m-2  relative w-[10%]  ">
                                                <div
                                                   className="relative w-full h-full  cursor-pointer border border-gray-500 rounded-md hover:bg-gray-50  "
                                                   onClick={() => {
                                                      // handleDownload(item.url_fichier, item.nom);
                                                      console.log(`/${item.url_fichier}`);
                                                   }}
                                                >
                                                   <div
                                                      className="relative w-full h-[70%] flex items-center justify-center">
                                                      {item.extension === 'Word' ? (
                                                         <img
                                                            src={word.src}
                                                            alt="Image sélectionnée"
                                                            className="relative h-[80%]  w-[80%] mx-auto  z-40"
                                                         />
                                                      ) : item.extension === 'PDF' ? (
                                                         <img
                                                            src={pdf.src}
                                                            alt="Image sélectionnée"
                                                            className="relative h-[85%]  w-[95%]  z-40"
                                                         />
                                                      ) : item.extension === 'Excel' ? (
                                                         <img
                                                            src={excel.src}
                                                            alt="Image sélectionnée"
                                                            className="relative h-[85%]  w-[95%] mx-auto z-40"
                                                         />
                                                      ) : (
                                                         <img
                                                            src={pptx.src}
                                                            alt="Image sélectionnée"
                                                            className="relative h-[85%]  w-[95%] mx-auto z-40"
                                                         />
                                                      )}
                                                   </div>

                                                   <div
                                                      className="relative w-full h-[30%] font-semibold text-[10px] flex items-center justify-center">
                                                                  <span
                                                                     className="relative w-full text-center"
                                                                     style={{wordWrap: 'break-word'}}>
                                                                     {item.nom.includes('.') ? item.nom.substring(0, item.nom.lastIndexOf('.')) : item.nom}
                                                                  </span>
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
                     : null
                     // (
                     //    <div className="flex items-center justify-center p-12 bg-transparent text-xl">
                     //       <div
                     //          className="w-12 h-12 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                     //    </div>
                     // )
               }


               {/*</div>*/}
               {/*</div>*/}


            </div>

         </div>


      </>
   )
}