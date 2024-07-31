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
export default function Transfert3({updateactuNotif,updateValueNotification,theposte,handleClickButton8,id,structure,idFiles,SetSendFiles1}){

   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [nouveau , Setnouveau] = useState("")
   const [loading , SetLoading ] = useState(false)
   const [focus5 , SetFocus5] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [poste , SetPoste] = useState("")
   const [ statut , SetStatut ] = useState(0)
   const [ nom ,setNom ] = useState('')
   const [ nomFichier ,setNomFichier ] = useState('')
   const [ url ,seturl ] = useState('')
   const [ extension ,setExtension ] = useState('')
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [ newItem , setNewItem]  =useState([])
   let formattedDate =""
   const [values, setValues] = useState({
      recepteur:"",
      expediteur:"",
      structure:structure ,
      date:formattedDate,
      note:""
   });

   const [values2, setValues2] = useState({
      contenu:`Vous avez reçu un fichier provenant de la ${theposte} de la`,
      expediteur: structure,
      destinataire:structure,
      dat:formattedDate,
      Type_transmission:"fichier",
      poste:"",
      lue : 'non'

   });
   const getDate = () =>{
      const currentDate = new Date();
      formattedDate = currentDate.toLocaleDateString(); //obtiens la date systeme
      console.log(formattedDate)
      setValues(prevValues => ({
         ...prevValues,
         date: formattedDate,
      }));
      setValues2(prevValues => ({
         ...prevValues,
         dat: formattedDate,
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


            // setValues2((prevValues) => ({
            //    ...prevValues,
            //    expediteur: response.data.recu[0].poste_agent,
            // }));


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

   setTimeout(()=>{
      SetLoading (true)
   },80)
   const getData = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/doc_structure/get_byId2.php?id=${idFiles}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setNom(response.data.recu[0].nom)
            setNomFichier(response.data.recu[0].nom_fichier)
            seturl(response.data.recu[0].url_fichier)
            setExtension(response.data.recu[0].extension)
            setFilteredData(response.data.recu)
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
   },[])

   const handleChange = (e) => {
      const { name, value } = e.target;
      let formattedValue = '';
      let cleanedValue = '';
       if ( name === 'note' ) {
         // Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
          cleanedValue = value.replace(/[^a-zA-Z0-9\séàâç&]/g, '');
         // Mettre à jour l'état avec le nom de l'école nettoyé
         setValues({ ...values, [name]: cleanedValue });
      }
   };

   useEffect(() => {
      console.log("lid du courrier",idFiles);
      console.log("le poste",theposte)
      console.log("la strucutre",structure)
      // console.log(study1);
   }, []);


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
   const handleSummit = async () => {
      if (values.recepteur === "")  {
         SetStatut(1)
      }else if (values.recepteur === theposte){
         SetStatut(3)
      }else if (values.note === "") {
         SetStatut(2)
      }  else {
         try {
            // Vérifiez que tous les champs requis sont remplis
            const formData = new FormData();
            formData.append('expediteur', values.expediteur);
            formData.append('recepteur', values.recepteur);
            formData.append('date', values.date);
            formData.append('structure', values.structure);
            formData.append('note', values.note);

            // Effectuez la requête HTTP en utilisant Axios
            const response = await axios.post(`${baseUrl}/transfert/add_Poste.php`, formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            console.log("Truc ajouté avec succès ", response);

            const formData2 = new FormData();
            formData2.append('nom',nom);
            formData2.append('nom_fichier', nomFichier);
            formData2.append('url_fichier', url);
            formData2.append('extension', extension);
            formData2.append('id_transfert',nouveau);

            // Effectuez la requête HTTP en utilisant Axios
            const response2 = await axios.post(`${baseUrl}/data_transfert/add_Doc.php`, formData2, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            console.log("Truc ajouté avec succès ", response2);

            const newValue =  'tranfert'
            // Appelez la fonction de mise à jour de la valeur dans BackEndNotifications
            updateValueNotification(newValue);
            handleClickButton8()

            const formData3 = new FormData();
            formData3.append('contenu', values2.contenu);
            formData3.append('expediteur', values2.expediteur);
            formData3.append('destinataire', values2.destinataire);
            formData3.append('dat', values2.dat);
            formData3.append('Type_transmission', values2.Type_transmission);
            formData3.append('poste', values.recepteur);
            formData3.append('lue', values2.lue);
            // Effectuez la requête HTTP en utilisant Axios
            const response3 = await axios.post(`${baseUrl}/notification/add_notification.php`, formData3, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            console.log("Truc ajouté avec succès ", response3);
            // SetStatut(7)



            // const contenu = extension === "Word" ? 'archiver un document Word'
            //    : extension ==='Excel' ? 'archiver un document Excel'
            //       : extension === 'PDF' ? 'archiver un document PDF'
            //          : extension === 'PPTX' ? 'archiver un document PowerPoint'
            //             : null;
            //
            // const action = extension === "Word" ? 'ajout Word'
            //    : extension ==='Excel' ? 'ajout Excel'
            //       : extension === 'PDF' ? 'ajout PDF'
            //          : extension === 'PPTX' ? 'ajout PowerPoint'
            //             : null;

            const formData6 = new FormData();
            formData6.append('date', values.date);
            formData6.append('id_agent', id);
            formData6.append('action', "transfert");
            formData6.append('contenu', " partage un document vers un utilisateur de votre service");
            const response4 = await axios.post(`${baseUrl}/Historic/add_Historic.php`, formData6, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            console.log("Truc ajouté avec succès ", response4);

            updateactuNotif(structure)
            SetSendFiles1(false);
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
            <div className="w-full h-[70%] flex justify-center my-52 md:my-96 lg:my-20">
               <div
                  className={ ` relative  flex flex-col items-center justify-center h-[96%] w-[40%] bg-white border border-gray-700 shadow rounded-lg p-2 ${loading ? 'scale-x-100 scale-y-100 opacity-100'  :'scale-x-0 scale-y-0 opacity-0' }  transition duration-500    ` }>

                  <div
                     className="flex   relative h-[100%] w-[100%]  ">

                     <div className=" relative h-[90%] w-[90%]  mx-auto ">
                        <div
                           className=" absolute -right-9 -top-2 h-[12%] w-[10%]  items-center justify-center ">
                           <img
                              src={close.src}
                              alt="Image sélectionnée"
                              className="relative h-[110%] cursor-pointer mx-auto w-[100%] z-40"
                              onClick={() => {
                                 SetSendFiles1(false);
                               //  deletData(nouveau)
                              }}
                           />
                        </div>
                        <div className=" relative  h-[30%] w-[99%] mt-6  ">

                           <div className=" h-[50%] flex items-center justify-center">



                              <div className="relative w-[70%]">


                                 <select
                                    onFocus={() => SetFocus5(true)}
                                    onBlur={() => SetFocus5(false)}
                                    name="recepteur"
                                    className=
                                       {
                                          statut === 1 ||   statut === 3 ?     "text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-red-500 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                                         :    "text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300  py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                       }
                                    onChange={(e) => handleChange2(e)}
                                 >
                                    <option value="0"></option>
                                    <option value='Directeur Général'>Directeur Général</option>
                                    <option value='Secrétaire'>Secrétaire</option>
                                    <option value='Chef de Service'>Chef de Service</option>
                                    <option value='Particulie(re)'>Particulie(re)</option>
                                 </select>
                                 <span
                                    className={(focus5 || values.recepteur) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                              Destinataire du fichier
                                </span>

                              </div>


                           </div>
                           <div className="h-[50%] flex items-center justify-center bg-transparent">

                              <div className="relative w-[70%] bg-transparent">
                                 <button
                                    className="w-full lg:w-[90%] mx-4 h-12 bg-indigo-600 hover:bg-indigo-950 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold"
                                    onClick={() => {
                                       handleSummit()
                                    }}>Envoyer le(s) fichiers
                                 </button>
                              </div>


                           </div>

                        </div>


                        <div className=" relative h-[70%] w-[100%]  rounded-md ">
                           <div
                              className="flex flex-wrap mx-auto  content-normal gap-1 relative h-[98%] w-[100%]   p-1  overflow-auto  ">
                              <textarea
                                 name='note'
                                 onFocus={() => SetFocus6(true)}
                                 onBlur={() => SetFocus6(false)}

                                 className=
                                    {
                                       statut === 2 ?        "text-large relative w-[100%] text-gray-700 border rounded-[10px] border-red-500  py-2 px-4 h-[100%] focus:outline-none focus:border-blue-500"
                                          :       "text-large relative w-[100%] text-gray-700 border rounded-[10px] border-gray-700  py-2 px-4 h-[100%] focus:outline-none focus:border-blue-500"
                                    }

                                 rows="10"
                                 cols="50"
                                 value={values.note}
                                 onChange={(e) => handleChange(e)}
                              />


                              <span
                                 className={(focus6|| values.note) ? "absolute z-50 left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute z-50 tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                            Note pour le transfert
                                </span>


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