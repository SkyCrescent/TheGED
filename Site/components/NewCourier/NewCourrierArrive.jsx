"use client"
import axios from "axios";
import React, {useEffect, useState} from "react";
import word from "@/public/icons/word.png";
import excel from "@/public/icons/excel2.png";
import pdf from "@/public/icons/pdf.png";
import pptx from "@/public/icons/pptx.png";
import close from '@/public/icons/multiply.png'
import deleyter from '@/public/icons/delete_127px.png'
import process from "process";

export default function NewCourrierArrive({SetEnterCourrier,  structure,updateactuNotif,updateshowHeader,showHeader,SetSendCourier,id,updateCourrier,handleClickButton8,updateValueNotification,updateValueNotifications}){
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [nouveau , Setnouveau] = useState("")
   const [loading , SetLoading ] = useState(false)
   const [focus3 , SetFocus3] = useState(false)
   const [focus4 , SetFocus4] = useState(false)
   const [focus5 , SetFocus5] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [focus7 , SetFocus7] = useState(false)
   const [focus8 , SetFocus8] = useState(false)

   const [FileChoice ,  SetFileChoice] = useState(false) //si un fichier a ete selectionne
   const [ statut , SetStatut ] = useState(0)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [ newItem , setNewItem]  =useState([])
   const [ search ,setSearch ] = useState("")
   let selectedValues=[]
   const [selectedValues2, setSelectedValues2] = useState([]);
   let formattedDate =""
   const [values, setValues] = useState({
      //le courier
      //les dates sont associes a la date systeme
      objet: "",
      recepteur:id,
      niveau:"",
      parafeux:"non",
      //automatique
      // droit : "",
      expediteur:"",
      date:formattedDate,
      service:"",
      // date_recep :formattedDate,
      type_trans:"depart-arrive",
      transmission_interne: "non",
      note:""
   });


   const getDate = () =>{
      const currentDate = new Date();
      formattedDate = currentDate.toLocaleDateString(); //obtiens la date systeme
      console.log(formattedDate)
      setValues(prevValues => ({
         ...prevValues,
         date: formattedDate,
      }));
      // setValues2(prevValues => ({
      //    ...prevValues,
      //    dat: formattedDate,
      // }));

   }

   const getData2 = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/Courrier/get_allCourier.php`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("l'ancien id est ",response.data.recu[0].id)

            //nouveau = response.data.recu[0].nombre + 1
            Setnouveau(response.data.recu[0].id + 1)
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
      console.log("la structure est",structure)
   },[])

   const handleDownload2 = async (url_fichier, nom, extension, nom_fichier) => {
      SetFileChoice(true)
      console.log(nom)
      console.log(url_fichier)
      console.log(extension)
      console.log(nom_fichier)
      console.log(nouveau)

      try {
         // Vérifiez que tous les champs requis sont remplis

         const formData = new FormData();
         formData.append('nom', nom);
         formData.append('url_fichier', url_fichier);
         formData.append('extension', extension);
         formData.append('nom_fichier', nom_fichier);
         formData.append('id_courier', nouveau);


         // Effectuez la requête HTTP en utilisant Axios
         const response = await axios.post(`${baseUrl}/doc_users/add_Doc.php`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         console.log("Truc ajouté avec succès ", response);
               const response2 = await axios.get(`${baseUrl}/doc_users/get_byIdCourrier.php?id_courier=${nouveau}`);
               // console.log(response.data && response.data.recu && response.data.recu.length > 0)
               if (response2.data && response2.data.recu && response2.data.recu.length > 0) {
                  // Vérifiez que la réponse contient les données attendues
                  console.log(response2.data.recu)
                  setFilteredData2(response2.data.recu)
                  SetLoading(true)
                  }
      } catch (error) {
         console.error(error);
      }


      //setNewItem(prevItems => [...prevItems, newObject]);

   }

   setTimeout(()=>{
      SetLoading (true)
   },80)

   const getData = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/doc_structure/get_byIdStructure.php?id_structure=${id}`);
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
      console.log(e.target.name)
      let formattedValue = '';
      let cleanedValue = '';
      if (name === 'objet'  || name === 'note') {
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
      }else if (name === 'niveau') {
         // Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
        // cleanedValue = value.replace(/[^a-zA-Z0-9\séàâç&]/g, '');
         // Mettre à jour l'état avec le nom de l'école nettoyé
         setValues({ ...values, [name]: cleanedValue });
      }else if (name === 'service') {
         // Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
         // Mettre à jour l'état avec le nom de l'école nettoyé
         setValues({ ...values, [name]: cleanedValue });
      }else if (name === 'expediteur') {
         // Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
         // Mettre à jour l'état avec le nom de l'école nettoyé
         cleanedValue = value.replace(/[^a-zA-Z0-9\séàâç&]/g, '');
         setValues({ ...values, [name]: cleanedValue });
         console.log(values)
      }
   };

   useEffect(()=>{

      getData()
      console.log(id)
   },[])


   useEffect(() => {
      console.log("recteur",values);
      // console.log(study1);
   }, [()=>{handleChange()}]);

   const handleChange3 = (e) => {
      const { name, value } = e.target ;
      setValues({...values, [name] : value})
      console.log(values)
      // pour les select
   };

   const handleChange2 = (e) => {
      const value = e.target.value;
      // Ajoute la valeur au tableau si elle n'existe pas déjà
      if (value && !selectedValues2.includes(value)) {
         setSelectedValues2([...selectedValues2, value]);
         console.log(selectedValues2)
      }
   };


   const deletData = async (nouveau) => {

      try {
         const formData = new FormData();
         // Effectuez la requête HTTP en utilisant Axios
         const response = await axios.post(`${baseUrl}/doc/delete_doc.php?id_courier=${nouveau}`, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         SetLoading(false);
         SetEnterCourrier(false);
          console.log("Truc supprime avec succès ", response);

      } catch (error) {
         console.error(error);
      }
   };

   const deletFiles = async (id) => {
      try {
         const formData = new FormData();
         // Effectuez la requête HTTP en utilisant Axios
         const response = await axios.post(`${baseUrl}/doc_users/delete_doc2.php?id=${id}`, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         setFilteredData2([])
         const response2 = await axios.get(`${baseUrl}/doc_users/get_byIdCourrier.php?id_courier=${nouveau}`);
         if (response2.data && response2.data.recu && response2.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response2.data.recu)
            setFilteredData2(response2.data.recu)
            SetLoading(true)
         }else{
            SetFileChoice(false)
         }

         console.log("Truc supprime avec succès ", response);

      } catch (error) {
         console.error(error);
      }
   };

   const handleSummit = async () => {
      if (values.objet === "" && values.expediteur === "" && values.niveau === "" &&values.note === "" && !FileChoice) {
         SetStatut(1);
      } else if (values.expediteur === "") {
         SetStatut(2);
      } else if (values.niveau === "") {
         SetStatut(3);
      } else if (!FileChoice) {
         SetStatut(4);
      } else if (values.objet === "") {
         SetStatut(5);
      }else if (values.note === "") {
         SetStatut(6);
      } else {
         try {
            // for (let recepteur of values.recepteur) {
            //
            // }

            const formData = new FormData();
            formData.append('objet', values.objet);
            formData.append('expediteur', values.expediteur);
            formData.append('recepteur', values.recepteur); // Enregistre une seule valeur de 'recepteur' à la fois
            formData.append('date', values.date);
            formData.append('Type_transmission', values.type_trans);
            formData.append('id_structure', id);
            formData.append('Niveau', values.niveau);
            formData.append('parafeux', values.parafeux);
            formData.append('transmission_interne', values.transmission_interne);
            formData.append('note', values.note);

            // Effectuez la requête HTTP en utilisant Axios
            const response = await axios.post(`${baseUrl}/Courrier/add_Courier.php`, formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            console.log("Courrier ajouté avec succès ", response);


            const newValue2 = 'NewCourrier';
            updateValueNotification(newValue2);
            handleClickButton8();
            // const newValue3 = true;
            // updateValueNotifications(newValue3);
            // const newValue = 1;
            // updateCourrier(newValue);
            // updateactuNotif(structure);
            SetStatut(8);
            SetEnterCourrier(false);
         } catch (error) {
            console.error(error);
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
           // cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
            cleanedValue = value.replace(/[^a-zA-Z0-9\séàâç&]/g, '');
            //cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());
         }

         const newData = { ...values, [name]: cleanedValue };
         setValues(newData);
         console.log(values);

         let apiUrl = `${baseUrl}/filter/Workspace.php?id_structure=${id}`;
         if (name === 'nom' && cleanedValue) {
            apiUrl += `&nom=${cleanedValue}`;
         } else if (name === 'service' && cleanedValue) {
            apiUrl += `&recepteur=${cleanedValue}`;
         } else if (name === 'nom' && name === 'service' && cleanedValue) {
            apiUrl += `&nom=${cleanedValue}&recepteur=${cleanedValue}`;
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


   return(


      <>
         <div
            className={`fixed top-0 left-0 z-30 bg-black/70 w-screen h-screen overflow-y-auto transition duration-300 ease-in-out`}
         >
            <div className="w-full h-[85%] flex justify-center my-52 md:my-96 lg:my-6">
               <div
                  className={ ` relative  flex flex-col items-center justify-center h-[100%] w-[90%] bg-white border border-gray-700 shadow rounded-lg p-2 ${loading ? 'scale-x-100 scale-y-100 opacity-100'  :'scale-x-0 scale-y-0 opacity-0' }  transition duration-500    ` }>

                  <div
                     className="flex   relative h-[100%] w-[100%]  ">
                     <div className="relative h-[95%] w-[28%]  rounded-md">
                        <div className=" relative h-[100%] w-[100%]  rounded-md ">
                           <div className="relative h-[10%] w-[95%] mt-2 mx-auto ">
                              <input
                                 onFocus={() => SetFocus6(true)}
                                 onBlur={() => SetFocus6(false)}
                                 type='text'
                                 name="nom"
                                 className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                 //onChange={handleChange4}
                                 onChange={(e) => handleChange4(e)}

                                 value={values.nom}
                              />

                              <span
                                 className={(focus6 || values.nom) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                Rechercher un fichier
                                </span>
                           </div>
                           <div
                              className=" relative h-[90%]  flex flex-wrap mx-auto gap-3  content-normal   p-2  scrollbar-hidden  overflow-y-auto ">
                              {filteredData.map((item, index) => (
                                 <div key={item.id} className="relative w-[30%]  h-[30%]  content-container overflow-hidden  ">
                                    <div
                                       className='relative w-full h-full  cursor-pointer border border-gray-500 rounded-md hover:bg-gray-50 '
                                       onClick={() => {
                                          handleDownload2(item.url_fichier, item.nom, item.extension, item.nom_fichier)
                                       }}
                                    >
                                       <div className="relative w-[90%] mx-auto h-[60%] flex items-center justify-center">
                                          {item.extension === 'Word' ? (
                                             <img
                                                src={word.src}
                                                alt="Image sélectionnée"
                                                className="relative h-[85%] w-[98%]  z-40"
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


                     <div className=" relative h-[95%] w-[73%]    ">
                        <div
                           className=" absolute -right-2 -top-2 h-[9%] w-[6%] items-center justify-center ">
                           <img
                              src={close.src}
                              alt="Image sélectionnée"
                              className="relative h-[110%] cursor-pointer mx-auto w-[100%] z-40"
                              onClick={() => {
                                 deletData(nouveau)
                                // updateshowHeader(true);

                              }}
                           />
                        </div>
                        <div className=" relative  h-[30%] w-[99%]  z-10 ">

                           <div className=" h-[50%] flex items-center  justify-between">
                              <div className="relative w-[60%] -mt-3 ">
                                 <input
                                    onFocus={() => SetFocus4(true)}
                                    onBlur={() => SetFocus4(false)}
                                    type='text'
                                    name="objet"
                                    className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                    value={values.objet}
                                 />

                                 <span
                                    className={(focus4 || values.objet) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                  Objet du Courrier
                                </span>
                              </div>

                              <div className="relative w-[35%] mt-32 -mx-8">
                                 <button
                                    className="w-full lg:w-[86%] mx-4 h-12 bg-indigo-600 hover:bg-indigo-950 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold"
                                    onClick={() => {
                                       handleSummit()
                                    }}>Envoyer le Courrier
                                 </button>
                              </div>


                           </div>

                           <div className="h-[50%] w-[70%] flex  items-end  justify-between -mt-6">
                              <div className="relative w-[68%]">
                                 <input
                                    onFocus={() => SetFocus3(true)}
                                    onBlur={() => SetFocus3(false)}
                                    type='text'
                                    name="expediteur"
                                    className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
 //                                    onChange={handleChange}


                                    onChange={(e) => handleChange(e)}

                                    value={values.expediteur}
                                 />
                                 <span
                                    className={(focus3 || values.expediteur) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                  Expéditeur du courrier
                                </span>
                              </div>

                              <div className="relative w-[48%] mx-20 ">


                                 <select
                                    onFocus={() => SetFocus5(true)}
                                    onBlur={() => SetFocus5(false)}
                                    name="niveau"
                                    className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                    onChange={(e) => handleChange3(e)}
                                 >
                                    <option value=''></option>
                                    <option value='Urgent'>Urgent</option>
                                    <option value='Prioritaire'>Prioritaire</option>
                                    <option value='Normal'>Normal</option>
                                 </select>
                                 <span
                                    className={(focus5 || values.niveau) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                              Niveau d'urgence
                                </span>

                              </div>





                           </div>


                        </div>


                        <div className=" relative h-[70%] w-[100%] flex justify-between    ">


                           <div className="relative w-[70%] ">

                              {/*<div*/}
                              {/*   className="flex flex-wrap mx-0 -top-7   content-normal gap-1 relative h-[15%] w-[91%]  rounded-md border border-gray-600   p-1   overflow-auto  ">*/}
                              {/*   {selectedValues2.map((item, index) => (*/}
                              {/*      <div key={index} className="relative w-[20%] md:w-[19%] h-12 ">*/}
                              {/*         <div*/}
                              {/*            className=" absolute z-20 right-0 top-1 h-[25%] w-[16%] items-center justify-center  ">*/}
                              {/*            <img*/}
                              {/*               src={deleyter.src}*/}
                              {/*               alt="Image sélectionnée"*/}
                              {/*               className="relative h-[100%] cursor-pointer mx-auto w-[100%] z-40"*/}
                              {/*               onClick={() => removeValue(item)} // Appelle removeValue avec l'élément à supprimer*/}

                              {/*            />*/}
                              {/*         </div>*/}
                              {/*         <div*/}
                              {/*            className='relative w-full h-full  z-10 cursor-pointer  border border-gray-500 rounded-md hover:bg-gray-50'*/}
                              {/*         >*/}
                              {/*            <div className="relative w-full h-[70%]  flex items-center justify-center">*/}
                              {/*               {item === '1' ? (*/}
                              {/*                 <span>LA DG</span>*/}
                              {/*               ) : item === '2' ? (*/}
                              {/*                  <span>LA DT</span>*/}
                              {/*               ) : item === '3' ? (*/}
                              {/*                  <span>LA DAP</span>*/}
                              {/*               ): item === '4' ? (*/}
                              {/*                     <span>LA DFC</span>*/}
                              {/*                  ) : (*/}
                              {/*                  <span>LA DC</span>*/}
                              {/*               )}*/}
                              {/*            </div>*/}
                              {/*         </div>*/}
                              {/*      </div>*/}
                              {/*   ))}*/}


                              {/*</div>*/}


                              <div
                                 className="flex flex-wrap mx-auto  content-normal gap-1 relative h-[98%] w-[100%] rounded-md border border-gray-600   p-1 pb-14 top-2  overflow-auto  ">
                                 {filteredData2.map((item, index) => (
                                    <div key={index} className="relative w-[20%] md:w-[19%] h-36 ">
                                       <div
                                          className=" absolute z-20 right-0 top-1 h-[12%] w-[16%] items-center justify-center  ">
                                          <img
                                             src={deleyter.src}
                                             alt="Image sélectionnée"
                                             className="relative h-[100%] cursor-pointer mx-auto w-[100%] z-40"
                                             onClick={() => {
                                                deletFiles(item.id)
                                                //console.log(item.id)
                                             }}
                                          />
                                       </div>
                                       <div
                                          className='relative w-full h-full  z-10 cursor-pointer  border border-gray-500 rounded-md hover:bg-gray-50'
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

                           <div
                              className=" relative h-[100%] w-[30%] -top-2 ">


                              <div
                                 className="flex flex-wrap mx-auto  content-normal gap-1 relative h-[100%] w-[100%] p-1  overflow-auto items-end  ">
                              <textarea
                                 name='note'
                                 onFocus={() => SetFocus7(true)}
                                 onBlur={() => SetFocus7(false)}

                                 className=
                                    {
                                       statut === 2 ? "text-large relative w-[100%] text-gray-700  border rounded-[10px] border-red-500  py-2 px-4 h-[95%] focus:outline-none focus:border-blue-700"
                                          : "text-large relative w-[100%] text-gray-700 bottom-0 border rounded-[10px] border-gray-700  py-2 px-4 h-[95%] focus:outline-none focus:border-blue-700"
                                    }

                                 rows="10"
                                 cols="50"
                                 value={values.note}
                                 onChange={(e) => handleChange(e)}
                              />


                                 <span
                                    className={(focus7 || values.note) ? "absolute z-50 left-3 p-1 w-auto top-9 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute z-50 tracking-wide pointer-events-none duration-300 left-0 top-7 px-5 text-sky-700"}>
                            Note pour le transfert
                                </span>


                              </div>


                           </div>

                        </div>

                        <div className="relative h-[6%] w-[100%] top-2   mx-auto ">
                           <h1
                              className={` ${statut === 8 ? 'text-blue-600 text-lg -mt-8 mx-3 w-full ' : 'text-red-600 text-sm -mt-1 mx-4'} underline underline-offset-8  font-medium`}>
                              {statut === 1 ? 'Aucune Information sur le courrier n`a ete remplis'
                                 : statut === 2 ? 'Saisissez l`éxpediteur de ce courrier'
                                    : statut === 3 ? 'Quel est le niveau d`urgence du courrier'
                                       : statut === 4 ? 'Aucun fichier n`a été mis dans le courrier'
                                          : statut === 5 ? 'Saisissez l`objet du courrier'
                                             : statut === 6 ? 'Saisissez l`instruction correspondant à ce courrier'
                                                      : ''}
                           </h1>

                           {/*</div>*/}
                        </div>
                     </div>


                  </div>


               </div>

            </div>
         </div>
      </>
   )
}