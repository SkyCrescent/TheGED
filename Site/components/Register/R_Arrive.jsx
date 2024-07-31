'use client'
import React, {useEffect, useState} from "react";

import search from "@/public/icons/search_126px.png";
import deleted from "@/public/icons/delete_127px.png";
import dowload from "@/public/icons/download.png";
import back from "@/public/icons/back_127px.png";
import mail from "@/public/icons/mail.png"
import axios from "axios";
import word from "@/public/icons/word.png";
import pdf from "@/public/icons/pdf.png";
import excel from "@/public/icons/excel2.png";
import pptx from "@/public/icons/pptx.png";
import note from "@/public/icons/goodnotes_127px.png";
import dowload2 from "@/public/icons/download_127px.png";
import refresh from "@/public/icons/refresh_127px.png"
import note2 from "@/public/icons/note_127px.png";
import process from "process";
import io from "socket.io-client";

export default function R_Arrive({ updateactuNotif,structure,RefreshTransmissionInterne,updateRefreshTransmissionInterne,valueInTransmission, updateValueNotification ,valueCourrier,updateCourrier,updateValueNotifications,updateValueInTransmission,Myid,handleClickButton1,handleClickButton8,handleClickButton6}){
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [filteredData3, setFilteredData3] = useState([]); // Initialize with all data

   const [options , SetOptions] = useState(null)
   const [loading , SetLoading ] = useState(false)
   const [loading2 , SetLoading2 ] = useState(false)
   const [myId , SetMyId] = useState(0)
   const [focus , SetFocus] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [SeeData , SetSeeData] = useState(true)   //affiche les notez venant avec le courrier
   const [  choice , setChoice  ] = useState(0)  // ligne choisis
   const [ seePrhase ,SetSeePhrase] = useState(false)
   const [ recu ,Setrecu] = useState(false)



   const [values, setValues] = useState({
      nom: "",
   });
   let formattedDate =""
   const [values2, setValues2] = useState({
      contenu:`Un courrier vous a été transférer provenant du secrétariat de la`,
      expediteur: structure,
      destinataire:structure,
      dat:"",
      Type_transmission:"courrier",
      poste:"Directeur Général",
      lue : 'non'

   });
   const [values3, setValues3] = useState({
      contenu:`Le courrier que vous avez envoye vers `,
      expediteur: '',
      destinataire:'',
      dat:"",
      Type_transmission:"courrier",
      poste:"Secrétaire",
      lue : 'non'

   });
   const getData = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/Courrier/get_allCourierArrive.php?recepteur=${Myid}&Type_transmission=depart-arrive`);
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

   const getDate = () =>{
      const currentDate = new Date();
      formattedDate = currentDate.toLocaleDateString(); //obtiens la date systeme
      console.log(formattedDate)
      setValues2(prevValues => ({
         ...prevValues,
         dat: formattedDate,
      }));
      setValues3(prevValues => ({
         ...prevValues,
         dat: formattedDate,
      }));
      console.log(values2)
   }

   const [selectedNote, setSelectedNote] = useState(null);

   const handleNoteClick = (subItemId) => {
      // Mettre à jour l'état pour indiquer la note sélectionnée
      setSelectedNote(subItemId === selectedNote ? null : subItemId);
   };
   useEffect(()=>{

      getData()
      console.log(Myid)
      console.log(valueCourrier)
      console.log('cete valeur',RefreshTransmissionInterne)
   },[])

   function formatDate(apiDate) {
      // Séparer la date en jour, mois et année
      const [day, month, year] = apiDate.split('/').map(Number);

      // Utiliser new Date(year, monthIndex, day) pour construire une date
      const formattedDate = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

      return formattedDate;
   }

   const UpdateCourier = async (id) =>{

      setFilteredData2([])
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/Courrier/updateCourrier.php?id=${id}&parafeux=oui`)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici",response.data.recu)
            // setFilteredData2(response.data.recu)
            // SetLoading2(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);

            setFilteredData2([])
            getData()

            // Enregistrement de la notifications
            const formData3 = new FormData();
            formData3.append('contenu', values2.contenu);
            formData3.append('expediteur', values2.expediteur);
            formData3.append('destinataire', values2.destinataire);
            formData3.append('dat', values2.dat);
            formData3.append('Type_transmission', values2.Type_transmission);
            formData3.append('poste', values2.poste);

            formData3.append('lue', values2.lue);
            // Effectuez la requête HTTP en utilisant Axios
            const response3 = await axios.post(`${baseUrl}/notification/add_notification.php`, formData3, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            updateactuNotif(structure)
            const newValue2 = 'Parafeux'
            updateValueNotification(newValue2);
            handleClickButton8();
            const newValue3 = true;
            updateValueNotifications(newValue3);



         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }

   const handleRowClick = (id) =>{
      SetOptions(id)
      setFilteredData2([])
      GoToSee(id)
   }

   const accuse = async (id,date,objet,accuse,expediteur) => {

     if (accuse === 'non'){
        try {
           // Remplacez l'URL par la bonne URL de votre API

           const response = await axios.get(`${baseUrl}/Courrier/updateAccuse.php?id=${id}`)
           // console.log(response.data && response.data.recu && response.data.recu.length > 0)
           if (response.data && response.data.recu && response.data.recu.length > 0) {
              // Vérifiez que la réponse contient les données attendues
              console.log("ici", response.data.recu)

              // setFilteredData2(response.data.recu)
              // SetLoading2(true)

           } else {
              console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
              //setFilteredData([])
              //getData()
              Setrecu(true)
              const formData3 = new FormData();
              formData3.append('contenu', values3.contenu);
              formData3.append('expediteur', Myid);
              formData3.append('destinataire', expediteur);
              formData3.append('dat', `${date} a bien ete consulter`);
              formData3.append('Type_transmission', values3.Type_transmission);
              formData3.append('poste', values3.poste);
              formData3.append('lue', values3.lue);
              // Effectuez la requête HTTP en utilisant Axios
              const response3 = await axios.post(`${baseUrl}/notification/add_notification.php`, formData3, {
                 headers: {
                    'Content-Type': 'multipart/form-data',
                 },
              });
              getData()
              updateactuNotif(structure)
              console.log('le update est fait')
           }
        } catch (error) {
           console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
        }
     }else {
       // return null
        console.log('c deja fait')
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

   const handleValueChange = (id) => {
      console.log('lancien id' ,id)
      // Modifiez la valeur dans R_Depart
      const newValue = id /* Nouvelle valeur */;
      // Appelez la fonction de mise à jour de la valeur dans R_Arrive
      updateValueInTransmission(newValue);
      //console.log('lancien id2' ,updateValueInArrive)
      handleClickButton6()
   };


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

         let apiUrl = `${baseUrl}/filter/CourrierArrive.php?recepteur=${Myid}&Type_transmission=depart-arrive`;
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

      RefreshTransmissionInterne  ? (()=>{
         const socket = io("http://localhost:3000");
         socket.emit('SendCourier22'); // Envoyer l'ID de la structure avec l'événement
            console.log('c ca')

         })() : (
            console.log("ya rien")
      )}






   useEffect(()=>{
      getDate()
   },[])

   useEffect(() => {
      const socket = io("http://localhost:3000");

      socket.on('connect', () => {
         console.log('Connected to server');
      });
      socket.on('CourierEnvoye2', () => {

         getData()
         updateRefreshTransmissionInterne(false)

      });

      socket.on('disconnect', () => {
         console.log('Disconnected from server');
      });

      return () => {
         socket.disconnect();
      };
   }, []);

   const handleChange4 = async (id,nom) => {
      console.log(nom)
      setFilteredData3([]);
      let apiUrl = `${baseUrl}/Note/get_allNote.php?idCourrier=${id}`;
      if (nom === "Directeur Général") {

         SetSeeData(false) // desactiver la vue des fichiers recus
         setChoice(1)
         apiUrl += `&poste=${nom}`;
      } else if (nom === 'Secrétaire') {
         SetSeeData(false) // desactiver la vue des fichiers recus
         setChoice(2)
         apiUrl += `&poste=${nom}`;
      } else {
         //getData();
            console.log('rien recudd')

      }
      try {
         const response = await axios.get(apiUrl);
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            setFilteredData3(response.data.recu);
            SetLoading(true)
            console.log(response.data.recu)
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };



   return (
         <div className="relative w-[100%]  h-[100%] ">
            <div className="relative w-[100%]  h-[12%]  flex  items-center justify-center ">
               <div className="relative h-[70%]  w-[40%] ">

                  <div className="relative flex justify-between items-center justify-center w-[80%]  mx-2 border rounded-lg border-gray-300 ">
                     <input
                        onFocus={() => SetFocus(true)}
                        onBlur={() => SetFocus(false)}
                        type='text'
                        name="nom"
                        className="text-large relative w-[83%] mx-auto text-gray-700  bg-white/90  py-2 px-4 h-12 focus:outline-none focus:border-blue-500"

                        onChange={(e) => handleChange2(e)}
                        value={values.nom}
                        // inuput nom
                     />
                     <img
                        className=" mx-3 h-5 w-5  absolute"
                        src={search.src}
                        height={20}
                        width={20}
                        alt="Nfc"
                     />
                     {/*<img*/}
                     {/*   className=" mx-3 h-5 w-5 right-0 absolute"*/}
                     {/*   src={deleted.src}*/}
                     {/*   height={10}*/}
                     {/*   width={10}*/}
                     {/*   alt="Nfc"*/}
                     {/*/>*/}

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

               <div className="relative h-[70%]  w-[20%]  flex items-center justify-center ">

                  <button
                     className="w-[30%] bg-black/90 flex items-center  justify-evenly gap-3 mx-auto hover:bg-black/100 text-white transition duration-300 transform hover:scale-105  rounded-md text-xs font-semibold p-1.5"

                     // onClick={setFilteredData2([]),handleClickButton1}


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


            <div className="relative w-[99%]  mx-auto h-[88%] ">


               <div className="relative w-[100%] h-[100%] mx-auto  ">

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
                                                onClick={() =>{
                                                   SetSeeData(true)
                                                   handleRowClick(`${subItem.id}`)
                                                 console.log(`${subItem.accuse}`)
                                                     accuse(`${subItem.id}`,`${subItem.date}`,`${subItem.objet}`,`${subItem.accuse}`,`${subItem.expediteur}`)
                                                }}
                                             />
                                             <h1 className="relative w-[80%] mx-1 h-16 md:h-auto  ">
                                                {selectedNote === subItem.id ? (
                                                      <div className="p-2 text-black">
                                                         {subItem.note}
                                                      </div>
                                                   ) :
                                                   (
                                                      <span>
                                                        Courrier recu
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
                                                   </span>
                                                   )

                                                }

                                             </h1>

                                             <div className="relative w-[17%] flex items-center justify-evenly ">
                                                           <span
                                                              className="relative   w-[12%] mx-2 h-[72%] md:h-[80%] rounded-full hover:bg-gray-600  "
                                                              onClick={() => handleNoteClick(subItem.id)}
                                                           >
                                                                  <img
                                                                     src={note.src}
                                                                     alt="Image sélectionnée"
                                                                     className="relative h-[100%]  w-[95%] mx-auto  z-40"
                                                                  />
                                                         </span>

                                                {
                                                   subItem.transmission_interne === 'non' ?

                                                      <button
                                                         className={(subItem.transmission_interne === 'non' &&   subItem.parafeux === 'non')   || subItem.parafeux === 'deja' ? " block text-[9px]  bg-indigo-900 relative w-[40%] text-white h-9 rounded-md transition duration-300 transform hover:scale-105" : 'hidden'}
                                                         onClick={() => {
                                                            handleValueChange(subItem.id)
                                                         }}
                                                      >
                                                         Transmission Interne
                                                      </button> :
                                                      subItem.transmission_interne === 'oui' ?
                                                         <span
                                                            className="relative w-[50%] text-[10px] text-black text-center items-center justify-center mt-5 h-9">
                                                      A ete transmis
                                                   </span>
                                                         :
                                                         subItem.transmission_interne === 'deja' ?
                                                            <span
                                                               className="relative   w-[12%] mx-2 h-[72%] md:h-[80%] rounded-full   "
                                                               onClick={() =>{
                                                                  handleChange4(subItem.id,"Secrétaire")
                                                               }}
                                                            >
                                                                  <img
                                                                     src={note2.src}
                                                                     alt="Image sélectionnée"
                                                                     className="relative h-[100%]  w-[95%] mx-auto  z-40"
                                                                  />
                                                         </span> : null

                                                }

                                                {
                                                   subItem.parafeux === 'non' ?

                                                      <button
                                                         className={subItem.parafeux === 'non' && subItem.transmission_interne === 'non' ? " block text-[9px] relative  bg-sky-500 w-[30%] text-white h-9 rounded-md transition duration-300 transform hover:scale-105" : 'hidden'}
                                                         onClick={() => {
                                                            UpdateCourier(subItem.id)
                                                         }}
                                                      >
                                                      Parafeux
                                                      </button> :
                                                      subItem.parafeux === 'deja' ?
                                                         <button
                                                            className= "relative z-40 block text-[8px]  bg-sky-500 w-[30%] text-white h-9 rounded-md transition duration-300 transform hover:scale-105"
                                                            onClick={() =>{
                                                               handleChange4(subItem.id,"Directeur Général")
                                                            }}
                                                         >
                                                            Instructions
                                                         </button>


                                                   : null

                                                }
                                             </div>


                                          </div>

                                          {
                                             options === subItem.id.toString() ? (


                                                (subItem.parafeux === 'non' || subItem.parafeux === 'deja') && (subItem.transmission_interne === 'non' || subItem.transmission_interne === 'deja' ) && SeeData ?
                                                   (
                                                      <div className="flex flex-wrap mx-auto   ">
                                                         {
                                                            filteredData2.map((item, index) => (

                                                               <div key={item.id}
                                                                    className="relative h-44 mb-2 mr-3   w-[13%]  ">
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


                                                                     <div  className="relative w-full   h-[20%] flex items-center justify-center ">
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
                                                   )

                                                   : choice === 1 && !SeeData ?
                                                      (
                                                         <div className="flex flex-wrap mx-auto   ">
                                                            {
                                                               filteredData3.map((item, index) => (

                                                                  <div key={item.id}
                                                                       className="relative w-full h-44  cursor-pointer  hover:bg-gray-50  "
                                                                  >
                                                                     <div
                                                                        className="relative w-full h-[20%] font-medium  font-[Poppins] flex items-center justify-center "

                                                                     >
                                                                        <span
                                                                           className="relative w-full text-center"
                                                                           style={{wordWrap: 'break-word'}}
                                                                        >
                                                                           {item.contenu}

                                                                        </span>
                                                                     </div>


                                                                  </div>


                                                               // <div
                                                               // className="relative  mb-2 mr-3   w-[13%]  ">
                                                               //
                                                               // </div>

                                                               ))
                                                            }

                                                         </div>
                                                      )

                                                      : choice === 2 && !SeeData ?
                                                         (
                                                            <div className="flex flex-wrap mx-auto   ">
                                                               {
                                                                  filteredData3.map((item, index) => (

                                                                     <div key={item.id}
                                                                          className="relative w-full h-44  cursor-pointer hover:bg-gray-50  "
                                                                     >
                                                                        <div
                                                                           className="relative w-full h-[20%] font-medium  font-[Poppins] flex items-center justify-center "

                                                                        >
                                                                        <span
                                                                           className="relative w-full text-center"
                                                                           style={{wordWrap: 'break-word'}}
                                                                        >
                                                                           {item.contenu}

                                                                        </span>
                                                                        </div>


                                                                     </div>


                                                                     // <div
                                                                     // className="relative  mb-2 mr-3   w-[13%]  ">
                                                                     //
                                                                     // </div>

                                                                  ))
                                                               }

                                                            </div>
                                                         )

                                                      :
                                                      (<div
                                                         className={seePrhase ? "block flex flex-wrap mx-auto text-center h-12 items-center justify-center bg-blue-100 " : 'hidden'}
                                                      >
                                                         <span className="italic text-sm text-gray-500">Le courrier desire n'est plus en votre possession</span>
                                                      </div>)

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


   )
}