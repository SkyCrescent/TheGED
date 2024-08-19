'use client'
import axios from "axios";
import React, {useEffect, useState} from "react";
import  search from "../public/icons/search_126px.png"
import  deleted from "../public/icons/delete_127px.png"

import word from "../public/icons/word.png"
import excel from "../public/icons/excel2.png"
import pdf from "../public/icons/pdf.png"
import pptx from "../public/icons/pptx.png"
import Style from '../styles/Page.css'
import dowload from '../public/icons/add_127px2.png'
import share from '../public/icons/share_127px.png'
import dowload2 from '../public/icons/download_127px.png'
import deletef from '../public/icons/trash_127px.png'
import zip from '../public/icons/archive_folder_127px.png'
import ok from '@/public/icons/ok_127px.png'
import AddDoc from "@/components/AddDoc";
import {usePathname} from "next/navigation";
import back from "@/public/icons/back_127px.png";
import Notifications from "@/components/Notifications/BackEndNotifications";


// Importez process.env pour accéder aux variables d'environnement
import process from 'process';
import io from "socket.io-client";
import refresh from "@/public/icons/refresh_127px.png";

// Utilisez la variable d'environnement pour construire l'URL de base
export default function Workspace({updateValueUpdateArchive,nomAgent,updateValueDelete,handleClickButton10,updateValueNotification,handleClickButton8, updateIdFiles,handleClickButton9,updateValueNotifications,valueNotifications,id_agent,id,handleClickButton1,handleClickButton2  , structure,reduce}) {
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const newValue2 = false /* Nouvelle valeur */;
   const [ Socket , SetSocket ] = useState(undefined)
   const [loading2 , SetLoading2] = useState(false )
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [filteredData3, setFilteredData3] = useState([]); // Initialize with all data
   const [filteredData4, setFilteredData4] = useState([]); // Initialize with all data

   const pathname = usePathname();
   const [nom, setNom] = useState(""); // Initialize with all data
   const [focus , SetFocus] = useState(false)
   const [focus4 , SetFocus4] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [focus7 , SetFocus7] = useState(false)
   const [red, setRed] = useState(false); // Initialize with all data
   const [ newCategorie ,setNewCategorie ] = useState(true)
   const [ Archiv,SetArchiv  ] = useState(false)
   const [values, setValues] = useState({
      nom: "",
      service :"",
      date : "",
      filtre :"",
      newCategorie :""
   });
   let formattedDate =""
   const getDate = () =>{
      const currentDate = new Date();
      formattedDate = currentDate.toLocaleDateString(); //obtiens la date systeme
      // console.log(formattedDate)
      setValues(prevValues => ({
         ...prevValues,
         date: formattedDate,
      }));

   }


   function formatDate(apiDate) {
      // Séparer la date en jour, mois et année
      const [day, month, year] = apiDate.split('/').map(Number);

      // Utiliser new Date(year, monthIndex, day) pour construire une date
      const formattedDate2 = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

      return formattedDate2;
   }



   // Fonction de document pour un service
   const getData3 = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/doc_structure/get_byIdStructure.php?id_structure=${structure}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData3(response.data.recu)
            //SetLoading(true
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };


   const getData6 = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/categorie/get_allCategorie.php?id_sousStructure=${structure}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData4(response.data.recu)
            //SetLoading(true
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };



   // Fonction de document pour un agent en particulier ou un directeur
   const getData2 = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/doc/get_byId.php?id_agent=${id}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData(response.data.recu)
            //SetLoading(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   const getData = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/type_structure/get_byId.php?id=${structure}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData2(response.data.recu)
            setNom(response.data.recu[0].Description)

            SetLoading2(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   useEffect(()=>{
      getDate()
    //  console.log(baseUrl)
      console.log(valueNotifications)
      getData2()
      getData()
      getData3()
      getData6()
      console.log(id)
      console.log(id_agent)
   },[])

   function chunkArray(array, size) {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += size) {
         chunkedArray.push(array.slice(i, i + size));
      }
      return chunkedArray;
   }

   const GotoArchive =  async (Myid,extension) => {
      //console.log(extension)
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/doc_structure/updateArchive.php?id=${Myid}&archive=oui`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)



         const contenu = extension === "Word" ? 'archiver un document Word'
            : extension ==='Excel' ? 'archiver un document Excel'
               : extension === 'PDF' ? 'archiver un document PDF'
                  : extension === 'PPTX' ? 'archiver un document PowerPoint'
                     : null;

         const action = extension === "Word" ? 'ajout Word'
            : extension ==='Excel' ? 'ajout Excel'
               : extension === 'PDF' ? 'ajout PDF'
                  : extension === 'PPTX' ? 'ajout PowerPoint'
                     : null;

         const formData6 = new FormData();
         formData6.append('date', values.date);
         formData6.append('id_agent', id);
         formData6.append('action', action);
         formData6.append('contenu', contenu);
         const response4 = await axios.post(`${baseUrl}/Historic/add_Historic.php`, formData6, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });

         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            setFilteredData3([])
            getData3()
            console.log("ici", response.data.recu)

         } else {
            setFilteredData3([])
            getData3()
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            const newValue =  'compresse'

            updateValueNotification(newValue);
            handleClickButton8()
            SetArchiv(true)
            const newValue2 = true /* Nouvelle valeur */;
            // Appelez la fonction de mise à jour de la valeur dans R_Arrive
            updateValueNotifications(newValue2);
            // setFilteredData2([])
            // getData4()
               const newValue4 = true
            updateValueUpdateArchive(newValue4)
         }
         console.log(response4)
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }



   const GotoArchive2 =  async (Myid,extension) => {
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/doc/updateArchive.php?id=${Myid}&archive=oui`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues


            const contenu = extension === "Word" ? 'archiver un document Word'
               : extension ==='Excel' ? 'archiver un document Excel'
                  : extension === 'PDF' ? 'archiver un document PDF'
                     : extension === 'PPTX' ? 'archiver un document PowerPoint'
                        : null;

            const action = extension === "Word" ? 'ajout Word'
               : extension ==='Excel' ? 'ajout Excel'
                  : extension === 'PDF' ? 'ajout PDF'
                     : extension === 'PPTX' ? 'ajout PowerPoint'
                        : null;

            const formData2 = new FormData();
            formData2.append('date', formattedDate);
            formData2.append('id_agent', id);
            formData2.append('action', action);
            formData2.append('contenu', contenu);
            const response2 = await axios.post(`${baseUrl}/Historic/add_Historic.php`, formData2, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });






            console.log("ici", response.data.recu)
            console.log("Truc ajouté avec succès ", response2);

            getData2()

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            const newValue =  'compresse'

            updateValueNotification(newValue);
            handleClickButton8()
            SetArchiv(true)
            const newValue2 = true /* Nouvelle valeur */;
            // Appelez la fonction de mise à jour de la valeur dans R_Arrive
            updateValueNotifications(newValue2);
            // setFilteredData2([])
            // getData4()








            const newValue4 = true
            updateValueUpdateArchive(newValue4)
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }




   const getData4 = async () => {
    //  setFilteredData3([])
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/doc_structure/get_byIdStructure.php?id_structure=${structure}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("C Parfait",response.data.recu)
            setFilteredData3(response.data.recu)
            //SetLoading(true)
            updateValueNotifications(newValue2)
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };




   // {
   //    valueNotifications ? (() => {
   //       const socket = io("http://localhost:3000");
   //       socket.emit('addFor4', structure); // Envoyer l'ID de la structure avec l'événement
   //       console.log("Truc envoyé");
   //    })() : null;
   //
   // }
   {
      valueNotifications ? (() => {
         const socket = io("http://localhost:3000");
         const eventName = window.location.pathname.includes('director') ? 'addDirector44' : 'addFor4';
         socket.emit(eventName, structure); // Envoyer l'ID de la structure avec l'événement
         console.log("Truc envoyé");
      })() : null;
   }




   const handleChange2 = async (e) => {
      const { name, value } = e.target;
      setFilteredData3([]);
      if (name === 'nom' || name === 'service') {
         let cleanedValue = value;
         if (name === 'nom' && value) {
            // Appliquer les expressions régulières à value
            cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
            cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());
         }

         const newData = { ...values, [name]: cleanedValue };
         setValues(newData);
         console.log(values);

         let apiUrl = `${baseUrl}/filter/Workspace.php?id_structure=${structure}`;
         if (name === 'nom' && cleanedValue) {
            apiUrl += `&nom=${cleanedValue}`;
         } else if (name === 'service' && cleanedValue) {
            apiUrl += `&extension=${cleanedValue}`;
         } else if (name === 'nom' && name === 'service' && cleanedValue) {
            apiUrl += `&extension=${cleanedValue}&nom=${cleanedValue}`;
         } else {
            getData3();
         }

         try {
            const response = await axios.get(apiUrl);
            if (response.data && response.data.recu && response.data.recu.length > 0) {
               setFilteredData3(response.data.recu);
            } else {
               console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            }
         } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }
      }
   };

   const handleChange3 = async (e) => {
      const { name, value } = e.target;
   console.log(value)
      if  (name === 'filtre' && value ==='new'  ) {
         getData3()
         setNewCategorie(false)
         console.log("dfdfd",newCategorie)
      }else if (name === 'filtre' && value ===''  ) {
         getData3()
      }else {
         let cleanedValue = value;
         if (name === 'filtre' && value) {
            // Appliquer les expressions régulières à value
            cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
            cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());
         }

         const newData = { ...values, [name]: cleanedValue };
         setValues(newData);
         console.log(value);

         let apiUrl = `${baseUrl}/filter/Workspace.php?id_structure=${structure}`;
         if (name === 'filtre' && cleanedValue) {
            apiUrl += `&categorie=${cleanedValue}`;
         }  else {
            getData3();
         }

         try {
            const response = await axios.get(apiUrl);
            setFilteredData3([]);
            if (response.data && response.data.recu && response.data.recu.length > 0) {
              // setFilteredData3(response.data.recu);
               console.log("ff",response.data.recu)

               setFilteredData3(response.data.recu)
               console.log(filteredData3)
            } else {
               console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            }
         } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }
      }
   };


   const handleChange4 = async (e) => {
      const { name, value } = e.target;
      setFilteredData([]);
      if (name === 'nom' || name === 'service') {
         let cleanedValue = value;
         if (name === 'nom' && value) {
            // Appliquer les expressions régulières à value
            cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
            cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());
         }

         const newData = { ...values, [name]: cleanedValue };
         setValues(newData);
         console.log(values);

         let apiUrl = `${baseUrl}/filter/WorkspaceDirector.php?id_agent=${id_agent}`;
         if (name === 'nom' && cleanedValue) {
            apiUrl += `&nom=${cleanedValue}`;
         } else if (name === 'service' && cleanedValue) {
            apiUrl += `&extension=${cleanedValue}`;
         } else if (name === 'nom' && name === 'service' && cleanedValue) {
            apiUrl += `&extension=${cleanedValue}&nom=${cleanedValue}`;
         } else {
            getData2();
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
   const handleChange5 = (e) => {
      //controle des champs de saisie
      const { name, value } = e.target;
      let cleanedValue = '';
      let inputVal = e.target.value;
      let formattedPhoneNumber = '';
      let cleanedAddress = '';
      if (name === 'newCategorie'){
         let formattedValue = '';

// Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
         cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
         cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());

         // Mettre à jour l'état avec le nom de l'école nettoyé
         setValues({...values, newCategorie: cleanedValue});
         console.log(values)
      }

   };

   const handleSummit = async () => {
      setRed(true);

         try {
            // Vérifiez que tous les champs requis sont remplis

            const formData = new FormData();
            formData.append('nom', values.newCategorie);
            formData.append('id_sousStructure', structure);

            // Effectuez la requête HTTP en utilisant Axios
            const response = await axios.post(`${baseUrl}/categorie/add_Categorie.php`, formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            console.log("Truc ajouté avec succès ", response);
            setValues({
               newCategorie: "",
            });
            getData6()
            setNewCategorie(true)
            setRed(false)
         } catch (error) {
            console.error(error);
         }
   }



   useEffect(() => {
      const socket = io("http://localhost:3000");

      socket.on('connect', () => {
         console.log('Connected to server');
      });
      socket.on('return4', () => {
         getData4()
      });


      socket.on('Director4', () => {
         getData2()
         updateValueNotifications(newValue2)
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

         <div className="relative w-[100%]  h-[100%]">

            <div className="relative w-[100%]  h-[12%]  pt-1    items-center flex justify-evenly ">

               <div className="relative h-[70%]  w-[60%] flex justify-between items-center  ">

                  <div
                     className="relative flex justify-between items-center justify-center w-[50%]  mx-2 border rounded-lg border-gray-300 ">
                     <input
                        onFocus={() => SetFocus(true)}
                        onBlur={() => SetFocus(false)}
                        type='text'
                        name="nom"
                        className="text-large relative w-[80%] mx-auto text-gray-700  bg-white/90  py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                        onChange={(e) => {
                           window.location.pathname.includes('director') ? handleChange4(e) : handleChange2(e);
                        }}
                        // onChange={(e) => handleChange2(e)}
                        // onClick={pathname.includes('director') ? handleClickButton1 : handleClickButton2}
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


                  <div
                     className="relative flex justify-between items-center justify-center w-[50%]  mx-2 border rounded-lg border-gray-50 ">

                     {
                        newCategorie ? (
                        <div className="relative w-[100%]">
                           <select
                              onFocus={() => SetFocus7(true)}
                              onBlur={() => SetFocus7(false)}
                              name="filtre"
                              className={
                              red ?"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-red-400 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                    : "text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                              }
                              onChange={(e) => {
                                 handleChange3(e);
                              }}
                              value={values.filtre}
                           >

                              <option className="text-blue-600" value="new" >Nouvelle Catégorie</option>
                              <br></br>
                              <option value=""></option>
                              {filteredData4.map((option) => (
                                 <option key={option.id} value={option.nom}>
                                    {option.nom}
                                 </option>
                              ))}
                           </select>
                           <span
                              className={
                        (focus7 || values.filtre)
                           ? "absolute left-3 p-1 w-auto top-6 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300"
                           : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"
                     }
                  >
                Filter par catégorie
            </span>
               </div>
               ) :
               <>

                  <div className="relative w-[100%]  h-[100%] flex justify-evenly ">


                     <div className="relative w-[80%] space-y-6 ">
                        <input
                           onFocus={() => SetFocus4(true)}
                           onBlur={() =>  SetFocus4(false) }
                           type='text'
                           name="newCategorie"
                           className={
                           red ? 'text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-red-500 py-2 px-4 h-12 focus:outline-none focus:border-blue-500'
                              : 'text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500'
                           }
                           onChange={handleChange5}
                           value={values.newCategorie}
                           //placeholder="Numéro de téléphone"
                        />

                        <span
                           className={(focus4 || values.newCategorie) ? "absolute left-3 p-1 w-auto -top-2 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 -top-3 px-5 text-sky-700"}>
                                 Nom de la catégorie
                                </span>
                     </div>


                     <button
                        className={` relative w-10 bg-gray-200 text-white rounded-3xl top-1  h-10 font-bold  mx-auto text-sm cursor-pointer transform hover:scale-x-110 hover:scale-y-110 hover:bg-gray-300 transition duration-300  `}
                    onClick={()=>{
                       ! values.newCategorie ?  setRed(true) :handleSummit()
                    }}
                     ><img
                        className=" h-auto mx-auto  "
                        title="Partager le fichier"
                        src={ok.src}
                        height={30}
                        width={30}
                        alt="Nfc"

                     />
                     </button>
                  </div>

               </>

                     }


                  </div>


               </div>
               <div className="relative h-[70%]  w-[25%]  ">
                  <div className="relative w-[100%] ">
                     <select
                        onFocus={() => SetFocus6(true)}
                        onBlur={() => SetFocus6(false)}
                        name="service"
                        className={"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"}

                        onChange={(e) => {
                           window.location.pathname.includes('director') ? handleChange4(e) : handleChange2(e);
                        }}
                        value={values.service}
                     >
                        <option value=''></option>
                        <option value='Word'>Word</option>
                        <option value='PDF'>PDF</option>
                        <option value='Excel'>Excel</option>
                        <option value='PPTX'>PowerPoint</option>
                     </select>
                     <span
                        className={(focus6 || values.service) ? "absolute left-3 p-1 w-auto top-6 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                 Filter votre recherche
                                </span>
                  </div>
               </div>

               <div className="relative h-[75%]  w-[15%]   flex items-center justify-center ">


                  <button
                     className="w-[50%] bg-white border border-blue-500 flex items-center  justify-evenly gap-3 mx-2 mt-1 text-white transition duration-300 transform hover:scale-105  rounded-md text-xs font-semibold p-1.5"
                     onClick={pathname.includes('director') ? getData2 : getData3}

                  >
                     <img
                        className=" h-auto  "
                        src={refresh.src}
                        height={25}
                        width={25}
                        alt="Nfc"

                     />
                  </button>


                  <button
                     className="w-[50%] bg-blue-600 flex items-center  justify-center gap-3 mx-2 mt-1 hover:bg-blue-900 text-white transition duration-300 transform hover:scale-105  rounded-md text-xs font-semibold p-1.5"
                     onClick={pathname.includes('director') ? handleClickButton1 : handleClickButton2}
                     title="Ajouter un Nouveau fichier" // Ajout de l'info-bulle ici
                  >
                     <img
                        className=" h-auto  "
                        src={dowload.src}
                        height={26}
                        width={26}
                        alt="Nfc"
                     />
                  </button>


               </div>


            </div>


            <div className="relative w-[98%] mx-auto  h-[88%]   ">

               <div id="d"
                    className="h-[98%] top-0  p-0.5  content-normal  relative  scrollbar-hidden     overflow-auto">

                  {
                     pathname.includes('director') ?
                        //  See === 1 ?

                        <>
                           {chunkArray(filteredData, reduce ? 14 : 14).map((group, index) => (
                              <div key={index} className="flex flex-wrap mx-auto ">
                                 {group.map((item, itemIndex) => (
                                    <div key={item.id} className="relative w-[13%] h-56   mb-2 mr-3">
                                       <div
                                          className="relative w-full h-full p-1  cursor-pointer  border border-gray-500 rounded-md hover:bg-gray-50  "
                                          onClick={() => {
                                             // handleDownload(item.url_fichier, item.nom);
                                             console.log(`/${item.url_fichier}`);
                                          }}
                                       >
                                          <div className="relative w-full h-[50%] flex items-center justify-center">
                                             {item.extension === 'Word' ? (
                                                <img
                                                   src={word.src}
                                                   alt="Image sélectionnée"
                                                   className="relative h-[85%] w-[65%] z-40"
                                                />
                                             ) : item.extension === 'PDF' ? (
                                                <img
                                                   src={pdf.src}
                                                   alt="Image sélectionnée"
                                                   className="relative h-[75%] w-[95%] z-40"
                                                />
                                             ) : item.extension === 'Excel' ? (
                                                <img
                                                   src={excel.src}
                                                   alt="Image sélectionnée"
                                                   className="relative h-[70%] w-[90%] z-40"
                                                />
                                             ) : (
                                                <img
                                                   src={pptx.src}
                                                   alt="Image sélectionnée"
                                                   className="relative  h-[70%] w-[90%] z-40"
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
                                             className="relative w-full h-[30%] font-semibold text-[12px] flex items-center justify-center">

                                             <div className=" relative w-full h-[100%]  ">
                                                <div
                                                   className=" relative text-center text-black text-[9px] w-full h-[40%] "
                                                   style={{wordWrap: 'break-word'}}
                                                >Introduit par vous, le {formatDate(item.date)}</div>
                                                <div
                                                   className="relative flex justify-between items-center   h-[60%] w-full ">


                                                   <button
                                                      className="relative h-[80%] bg-gray-100  w-[20%] flex items-center  justify-center  transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                      onClick={() => {
                                                         const newValue = item.id
                                                         // Appelez la fonction de mise à jour de la valeur dans R_Arrive
                                                         updateIdFiles(newValue);
                                                         handleClickButton9()
                                                      }}
                                                   >
                                                      <img
                                                         className=" h-auto  "
                                                         title="Partager le fichier" // Ajout de l'info-bulle ici
                                                         src={share.src}
                                                         height={18}
                                                         width={18}
                                                         alt="Nfc"

                                                      />
                                                   </button>
                                                   <button
                                                      className="relative h-[80%] bg-gray-100 w-[20%] flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                   >
                                                      <a href={`${baseUrl}/${item.url_fichier}`}
                                                      className="relative w-full text-center flex items-center
                                                      justify-center"
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
                                                   <button
                                                      className="relative h-[80%] bg-gray-100 w-[20%] flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                      onClick={() => {
                                                         const newValue = item.id
                                                            /* Nouvelle valeur */;
                                                         // Appelez la fonction de mise à jour de la valeur dans R_Arrive
                                                         updateValueDelete(newValue)
                                                         handleClickButton10()
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
                                                      className="relative h-[80%] bg-gray-100 w-[20%] flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                      onClick={() => {
                                                         GotoArchive2(` ${item.id} `,`,${item.extension}`)
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


                                             </div>





                                          </div>


                                       </div>
                                    </div>
                                 ))}
                              </div>
                           ))}

                        </>
                        :
                        <>
                           {chunkArray(filteredData3, reduce ? 14 : 14).map((group, index) => (
                              <div key={index} className="flex flex-wrap mx-auto ">
                                 {group.map((item, itemIndex) => (
                                    <div key={item.id} className='relative  w-[13%] h-56   mb-2 mr-3'>
                                       <div
                                          className="relative w-full h-full p-1  cursor-pointer border border-gray-500 rounded-md hover:bg-gray-50  "
                                          onClick={() => {
                                             console.log(`/${item.url_fichier}`);
                                          }}
                                       >
                                          <div className="relative w-full h-[50%] flex items-center justify-center ">
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
                                             className="relative w-full h-[20%] font-semibold text-[12px] flex items-center justify-center ">

                                             <span className="relative w-full text-center"
                                                   style={{wordWrap: 'break-word'}}>
                                                 {item.nom.includes('.') ? item.nom.substring(0, item.nom.lastIndexOf('.')) : item.nom}
                                             </span>

                                          </div>
                                          <div
                                             className="relative w-full h-[30%] font-semibold text-[12px] flex items-center justify-center">

                                             {
                                                item.id_agent === id_agent && item.nom_agent === nomAgent ? (

                                                   <div className=" relative w-full h-[100%]  ">
                                                      <div
                                                         className=" relative text-center text-black text-[9px] w-full h-[40%] "
                                                         style={{wordWrap: 'break-word'}}
                                                      >Introduit par vous, le {formatDate(item.date_ajout)}</div>
                                                      <div
                                                         className="relative flex justify-between items-center   h-[60%] w-full ">


                                                         <button
                                                            className="relative h-[80%] bg-gray-100  w-[20%] flex items-center  justify-center  transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                            onClick={() => {
                                                               const newValue = item.id
                                                               // Appelez la fonction de mise à jour de la valeur dans R_Arrive
                                                               updateIdFiles(newValue);
                                                               handleClickButton9()
                                                            }}
                                                         >
                                                            <img
                                                               className=" h-auto  "
                                                               title="Partager le fichier"
                                                               src={share.src}
                                                               height={18}
                                                               width={18}
                                                               alt="Nfc"

                                                            />
                                                         </button>
                                                         <button
                                                            className="relative h-[80%] bg-gray-100 w-[20%] flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                         >
                                                            <a href={`${baseUrl}/${item.url_fichier}`}
                                                               className="relative w-full text-center  flex items-center  justify-center"
                                                               style={{wordWrap: 'break-word'}}>


                                                               <img
                                                                  className=" h-auto  "
                                                                  src={dowload2.src}
                                                                  title="Telecharger le fichier"
                                                                  height={18}
                                                                  width={18}
                                                                  alt="Nfc"

                                                               />
                                                            </a>
                                                         </button>
                                                         <button
                                                            className="relative h-[80%] bg-gray-100 w-[20%] flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                            onClick={() => {
                                                               const newValue = item.id
                                                                  /* Nouvelle valeur */;
                                                               // Appelez la fonction de mise à jour de la valeur dans R_Arrive
                                                               updateValueDelete(newValue)
                                                               handleClickButton10()
                                                            }}

                                                         >
                                                            <img
                                                               className=" h-auto  "
                                                               src={deletef.src}
                                                               title="Supprimer le fichier"
                                                               height={18}
                                                               width={18}
                                                               alt="Nfc"

                                                            />
                                                         </button>
                                                         <button
                                                            className="relative h-[80%] bg-gray-100 w-[20%] flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                            onClick={() => {
                                                               GotoArchive(` ${item.id} `,`${item.extension}`)
                                                            }}

                                                         >
                                                            <img
                                                               className=" h-auto  "
                                                               src={zip.src}
                                                               title="Archiver le fichier"
                                                               height={18}
                                                               width={18}
                                                               alt="Nfc"

                                                            />
                                                         </button>
                                                      </div>


                                                   </div>


                                                ) : (
                                                   <div className=" relative w-full h-[100%]  ">
                                                      <div
                                                         className=" relative text-center text-black text-[9px] w-full h-[40%] "
                                                         style={{wordWrap: 'break-word'}}
                                                      >Introduit par {item.nom_agent}, le {formatDate(item.date_ajout)}</div>
                                                      <div
                                                         className="relative flex justify-center space-x-4 items-center   h-[60%] w-full ">


                                                         <button
                                                            className="relative h-[80%] bg-gray-100  w-[20%] flex items-center  justify-center  transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                            onClick={() => {
                                                               const newValue = item.id
                                                               // Appelez la fonction de mise à jour de la valeur dans R_Arrive
                                                               updateIdFiles(newValue);
                                                               handleClickButton9()
                                                            }}
                                                         >
                                                            <img
                                                               className=" h-auto  "
                                                               title="Partager le fichier"
                                                               src={share.src}
                                                               height={18}
                                                               width={18}
                                                               alt="Nfc"

                                                            />
                                                         </button>
                                                         <button
                                                            className="relative h-[80%] bg-gray-100 w-[20%] flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                         >
                                                            <a href={`${baseUrl}/${item.url_fichier}`}
                                                               className="relative w-full text-center"
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

                                                )
                                             }


                                          </div>


                                       </div>
                                    </div>
                                 ))}
                              </div>
                           ))}

                        </>
                  }
               </div>


            </div>

         </div>


      </>
   )
}