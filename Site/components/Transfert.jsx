"use client"
import axios from "axios";
import React, {useEffect, useState} from "react";

import Image from "next/image";
import doc from "@/public/icons/document_127px.png";
import word from "@/public/icons/word.png";
import excel from "@/public/icons/excel2.png";
import pdf from "@/public/icons/pdf.png";
import pptx from "@/public/icons/pptx.png";
import close from '@/public/icons/multiply.png'
import process from "process";
export default function Transfert({id,structure,SetSendFiles}){
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [nouveau , Setnouveau] = useState("")
   const [loading , SetLoading ] = useState(false)
   const [focus3 , SetFocus3] = useState(false)
   const [focus4 , SetFocus4] = useState(false)
   const [focus5 , SetFocus5] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [poste , SetPoste] = useState("")

   const [FileChoice , SetFileChoice] = useState(false) //si un fichier a ete selectionne
   const [ statut , SetStatut ] = useState(0)

   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [ newItem , setNewItem]  =useState([])
   const [ search ,setSearch ] = useState("")
   let formattedDate =""
   const [values, setValues] = useState({

      recepteur:"",
      expediteur:"",
      structure:structure ,
      date:formattedDate
   });
   const getDate = () =>{
      const currentDate = new Date();
      formattedDate = currentDate.toLocaleDateString(); //obtiens la date systeme
      console.log(formattedDate)
      setValues(prevValues => ({
         ...prevValues,
         date: formattedDate,
      }));

   }



   const getData3 = async () => {
      try {
         const response = await axios.get(`${baseUrl}/transfert/get_PosteById.php?id=${id}`);

         if (response.data && response.data.recu && response.data.recu.length > 0) {

            console.log( response.data.recu )
            //SetPoste(response.data.recu[0].poste_agent)
            setValues((prevValues) => ({
               ...prevValues,
               expediteur: response.data.recu[0].poste_agent,
            }));

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }


   useEffect(()=>{

      getData3()
      console.log(values)
   },[])


   const getData2 = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/transfert/get_allTransfert.php`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("l'ancien id est ",response.data.recu[0].nombre)

            //nouveau = response.data.recu[0].nombre + 1
            Setnouveau(response.data.recu[0].nombre + 1)
            console.log("le nouveau id",nouveau)


         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);


         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };
   useEffect(()=>{

      getData2()
      getDate()
      //console.log(filteredData)
   },[])
   useEffect(()=>{
      console.log(newItem)
      //console.log(filteredData)
   },[newItem])
   const handleDownload = async (url_fichier, nom, extension, nom_fichier) => {
      SetFileChoice(true)
      console.log(nom)
      console.log(url_fichier)

      console.log(extension)
      console.log(nom_fichier)

      console.log(nouveau)


      const newObject = {
         "nom": nom,
         "url": url_fichier,
         "extension": extension,
         "nom_fichier": nom_fichier,
         "id_courrier": nouveau
      }


      try {
         // Vérifiez que tous les champs requis sont remplis

         const formData = new FormData();
         formData.append('nom', nom);
         formData.append('url_fichier', url_fichier);
         formData.append('extension', extension);
         formData.append('nom_fichier', nom_fichier);
         formData.append('id_transfert', nouveau);

         // Effectuez la requête HTTP en utilisant Axios
         const response = await axios.post(`${baseUrl}/data_transfert/add_Doc.php`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         console.log("Truc ajouté avec succès ", response);

      } catch (error) {
         console.error(error);
      }


      setNewItem(prevItems => [...prevItems, newObject]);

   }
   setTimeout(()=>{
      SetLoading (true)
   },80)
   const getData = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/doc_structure/get_byIdStructure.php?id_structure=${structure}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData(response.data.recu)
            SetLoading(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };
   const handleChange = (e) => {
      const { name, value } = e.target;
      let formattedValue = '';
      let cleanedValue = '';
      if (name === 'objet') {
         // Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
         cleanedValue = value.replace(/[^a-zA-Z0-9\séàâç&]/g, '');
         //cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());

         // Mettre à jour l'état avec le nom de l'école nettoyé
         setValues({ ...values, [name]: cleanedValue });
      }else if (name === 'search') {
         // Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
         cleanedValue = value.replace(/[^a-zA-Z0-9\séàâç&]/g, '');
         // Mettre à jour l'état avec le nom de l'école nettoyé
         setValues({ ...values, [name]: cleanedValue });
      }else if (name === 'recepteur') {
         // Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
         // cleanedValue = value.replace(/[^a-zA-Z0-9\séàâç&]/g, '');
         // Mettre à jour l'état avec le nom de l'école nettoyé
         setValues({ ...values, [name]: cleanedValue });
      }
   };

   useEffect(()=>{

      getData()
      //console.log(id)
   },[])

   function chunkArray(array, size) {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += size) {
         chunkedArray.push(array.slice(i, i + size));
      }
      return chunkedArray;
   }





   useEffect(() => {
      console.log("recteur",values);
      // console.log(study1);
   }, [()=>{handleChange()}]);
   const handleChange2 = (e) => {
      const { name, value } = e.target ;
      setValues({...values, [name] : value})
      console.log(values)
      // pour les select
   };




   const deletData = async (nouveau) => {
      // console.log(MyId)
      try {
         const formData = new FormData();
         // Effectuez la requête HTTP en utilisant Axios
         const response = await axios.post(`${baseUrl}/data_transfert/delete_transfert.php?id_transfert=${nouveau}`, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         SetSendFiles(false);
         console.log("Truc supprime avec succès ", response);

      } catch (error) {
         console.error(error);
      }
   };



   // Fonction pour gérer la soumission du formulaire
   const handleSummit = async () => {
      if (values.recepteur === "" && values.expediteur)  {
         SetStatut(1)
      }else if (values.recepteur === "") {
         SetStatut(2)
      } else if (!FileChoice) {
            SetStatut(3) }
       else if (values.recepteur === values.expediteur ) {
         SetStatut(4)
      } else {
         try {
            // Vérifiez que tous les champs requis sont remplis

            const formData = new FormData();
            formData.append('expediteur', values.expediteur);
            formData.append('recepteur', values.recepteur);
            formData.append('date', values.date);
            formData.append('structure', values.structure);

            // Effectuez la requête HTTP en utilisant Axios
            const response = await axios.post(`${baseUrl}/transfert/add_Poste.php`, formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            console.log("Truc ajouté avec succès ", response);
           // SetStatut(7)
            SetSendFiles(false);
         } catch (error) {
            console.error(error);
         }
      }
   }


   return(


      <>
         <div
            className={`fixed top-0 left-0 z-30 bg-black/70 w-screen h-screen overflow-y-auto transition duration-300 ease-in-out`}
         >
            <div className="w-full h-[90%] flex justify-center my-52 md:my-96 lg:my-8">
               <div
                  className={ ` relative  flex flex-col items-center justify-center h-[96%] w-[70%] bg-white border border-gray-700 shadow rounded-lg p-2 ${loading ? 'scale-x-100 scale-y-100 opacity-100'  :'scale-x-0 scale-y-0 opacity-0' }  transition duration-500    ` }>

                  <div
                     className="flex   relative h-[100%] w-[100%]  ">
                     <div className="relative h-[94%] w-[45%]    mt-7">
                        <div className=" relative h-[93%] w-[100%]  rounded-md ">
                           <div className="relative h-[10%] w-[95%] mt-2.5 mx-auto ">
                              <input
                                 onFocus={() => SetFocus6(true)}
                                 onBlur={() => SetFocus6(false)}
                                 type='text'
                                 name="search"
                                 className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                 onChange={handleChange}
                                 value={values.search}
                              />

                              <span
                                 className={(focus6 || values.search) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                Rechercher un fichier
                                </span>
                           </div>
                           <div
                              className="flex flex-wrap mx-auto gap-3  content-normal   p-2  scrollbar-hidden     overflow-auto  ">
                              {filteredData.map((item, index) => (
                                 <div key={item.id} className="relative w-[30%]  h-36  ">
                                    <div
                                       className="relative w-full h-full  cursor-pointer border border-gray-500 rounded-md hover:bg-gray-50  "
                                       onClick={() => {
                                          handleDownload(item.url_fichier, item.nom, item.extension, item.nom_fichier);
                                       }}
                                    >
                                       <div className="relative w-full h-[70%] flex items-center justify-center">
                                          {item.extension === 'Word' ? (
                                             <img
                                                src={word.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[85%] w-[98%] z-40"
                                             />
                                          ) : item.extension === 'PDF' ? (
                                             <img
                                                src={pdf.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[85%] w-full z-40"
                                             />
                                          ) : item.extension === 'Excel' ? (
                                             <img
                                                src={excel.src}
                                                alt="Image sélectionnée"
                                                className="relative  h-[85%] w-[98%]  z-40"
                                             />
                                          ) : (
                                             <img
                                                src={pptx.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[85%] w-[98%] z-40"
                                             />
                                          )}
                                       </div>

                                       <div
                                          className="relative w-full h-[30%] font-semibold text-[10px] flex items-center justify-center">
                                           <span className="relative w-full text-center"
                                                 style={{wordWrap: 'break-word'}}>
                                               {item.nom.includes('.') ? item.nom.substring(0, item.nom.lastIndexOf('.')) : item.nom}
                                           </span>
                                       </div>

                                    </div>
                                 </div>
                              ))}


                           </div>

                        </div>


                        <div className="relative h-[6%] w-[100%]    mx-auto ">
                           {/*<div className="block">*/}

                           <h1 className={ ` ${  statut === 7 ? 'text-blue-600 text-lg -mt-8 mx-3 w-full ' : 'text-red-600 text-xs mt-1 mx-4' } underline underline-offset-8  font-medium`}>
                              {statut === 1 ? 'Aucune Information  n`a ete remplis'
                                 : statut === 2 ? 'Selectionnez le destinataire du fichier'
                                    : statut === 3 ? 'Selectionnez le ou les fichier a envoyer'
                                       : statut === 4 ? 'Nous somme deja dans le service destinataire'

                                          : ''}
                           </h1>

                           {/*</div>*/}
                        </div>
                     </div>


                     <div className=" relative h-[95%] w-[55%]   ">
                        <div
                           className=" absolute -right-2 -top-2 h-[8%] w-[10%] items-center justify-center ">
                           <img
                              src={close.src}
                              alt="Image sélectionnée"
                              className="relative h-[110%] cursor-pointer mx-auto w-[100%] z-40"
                              onClick={() => {

                                 deletData(nouveau)
                              }}
                           />
                        </div>
                        <div className=" relative  h-[30%] w-[99%] mt-6 ">

                           <div className=" h-[50%] flex items-center justify-center">



                              <div className="relative w-[70%]">


                                 <select
                                    onFocus={() => SetFocus5(true)}
                                    onBlur={() => SetFocus5(false)}
                                    name="recepteur"
                                    className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                    onChange={(e) => handleChange2(e)}
                                 >
                                    <option value="0"></option>
                                    <option value='Direction Service'>Direction Service</option>
                                    <option value='Secrétaire'>Secrétaire</option>
                                    <option value='Chef de Service'>Chef de Service</option>
                                    <option value='Particulie(re)'>Particulier(re)</option>
                                 </select>
                                 <span
                                    className={(focus5 || values.recepteur) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                              Destinataire du fichier
                                </span>

                              </div>


                           </div>
                           <div className="h-[50%] flex items-center justify-center">

                              <div className="relative w-[70%]">
                                 <button
                                    className="w-full lg:w-[90%] mx-4 h-12 bg-indigo-600 hover:bg-indigo-950 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold"
                                    onClick={() => {
                                       handleSummit()
                                    }}>Envoyer le(s) fichiers
                                 </button>
                              </div>


                           </div>

                        </div>


                        <div className=" relative h-[70%] w-[100%]  rounded-md border border-gray-600 ">
                           <div
                              className="flex flex-wrap mx-auto  content-normal gap-1 relative h-[98%] w-[100%]   p-1 pb-16  overflow-auto  ">
                              {newItem.map((item, index) => (
                                 <div key={index} className="relative  w-28 h-28  ">
                                    <div
                                       //FileChoice
                                       // className={ FileChoice ? 'relative w-full h-full  cursor-pointer  border border-red-500 rounded-md hover:bg-gray-50' :'relative w-full h-full  cursor-pointer  border border-gray-500 rounded-md hover:bg-gray-50' }
                                       className='relative w-28 h-28  cursor-pointer  border border-gray-500 rounded-md hover:bg-gray-50'
                                    >
                                       <div className="relative w-full h-[70%]  flex items-center justify-center">
                                          {item.extension === 'Word' ? (
                                             <img
                                                src={word.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[85%] w-[98%] z-40"
                                             />
                                          ) : item.extension === 'PDF' ? (
                                             <img
                                                src={pdf.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[85%] w-full z-40"
                                             />
                                          ) : item.extension === 'Excel' ? (
                                             <img
                                                src={excel.src}
                                                alt="Image sélectionnée"
                                                className="relative  h-[85%] w-[98%]  z-40"
                                             />
                                          ) : (
                                             <img
                                                src={pptx.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[85%] w-[98%] z-40"
                                             />
                                          )}
                                       </div>


                                       {/*<div*/}
                                       {/*   className="relative w-full h-[30%] font-semibold text-[10px] flex items-center justify-center">*/}
                                       {/*   <span className="relative w-full text-center"*/}
                                       {/*         style={{wordWrap: 'break-word'}}>{item.nom}</span>*/}
                                       {/*</div>*/}
                                       <div
                                          className="relative w-full h-[30%] font-semibold text-[10px] flex items-center justify-center">
                                           <span className="relative w-full text-center"
                                                 style={{wordWrap: 'break-word'}}>


                                               {item.nom.includes('.') ? item.nom.substring(0, item.nom.lastIndexOf('.')) : item.nom}
                                           </span>
                                       </div>

                                    </div>
                                 </div>
                              ))}


                           </div>


                        </div>

                     </div>


                  </div>


               </div>

            </div>
         </div>
      </>
   )
}