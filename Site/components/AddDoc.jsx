"use client"
import React, {useEffect, useState} from "react";
import doc from '../public/icons/document_127px.png'
import Image from "next/image";
import axios from "axios";
import word from "../public/icons/word.png"
import excel from "../public/icons/excel2.png"
import pdf from "../public/icons/pdf.png"
import pptx from "../public/icons/pptx.png"
import process from "process";
export default function AddDoc({id, SetAdmin,structure,updateValueNotifications,updateValueNotification,valueNotifications , handleClickButton8, handleClickButton1}) {
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [loading , SetLoading ] = useState(false)
   const [ extensionVisible , setExtension ] = useState(false)
   const [ extensionFiles , setExtensionFiles ] = useState("")
   const [isSubmit,SetIsSubmit] = useState(false)
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [focus4 , SetFocus4] = useState(false)
   const [selectedFile, setSelectedFile] = useState(null);
   const [selectedImage1 , SetselectedImage1] = useState(false)
   const [ reponse , setreponse ] = useState("")
   const [ reponse2 , setreponse2 ] = useState("")
   const [ isEtat ,setEtat ] = useState(0)
   const [focus5 , SetFocus5] = useState(false)
   const [file, setFile] = useState('');
   let formattedDate =""
   const [ values , setValues ] = useState({
      nom : "",
      fileName:"",
      extension:"",
      archive:"non",
      url:'',
      date:formattedDate,
      id:id
   })

   setTimeout(()=>{
      SetLoading (true)
   },80)

   const getDate = () =>{
      const currentDate = new Date();
      formattedDate = currentDate.toLocaleDateString(); //obtiens la date systeme
      console.log(formattedDate)
      setValues(prevValues => ({
         ...prevValues,
         date: formattedDate,
      }));

   }

   useEffect(()=>{
      getDate()
      getData2()
      console.log(id)
   },[])

   const getData2 = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/doc/get_allName.php?id_agent=${id}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData(response.data.recu)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   const handleFileChange = async (event) => {
      const fileInput = event.target;
      const selectedFile1 = fileInput.files[0];

      if (selectedFile1) {
         // Vérifier si le fichier est une image en vérifiant l'extension
         const allowedExtensions = ["docx" ,"xls" ,"pdf" ,"pptx" ,"ppt"];
         const fileNameParts = selectedFile1.name.split(".");
         const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

         if (allowedExtensions.includes(fileExtension)) {
            // Si c'est une image, mettre à jour les valeurs avec le fichier sélectionné
            setSelectedFile(selectedFile1);
            SetselectedImage1(true);
            console.log("Fichier sélectionné :", selectedFile1.name);
            SetFocus4(true)
            setValues((prevValues) => ({
               ...prevValues,
               nom: selectedFile1.name.includes('.') ? selectedFile1.name.substring(0, selectedFile1.name.lastIndexOf('.')) : selectedFile1.name  ,

            }));

            setValues((prevValues) => ({
               ...prevValues,
               fileName: selectedFile1.name,
            }));
            setFile(event.target.files[0]);
            console.log(event.target.files[0])
            console.log("Fichier sélectionné :", selectedFile1.type);
            setExtensionFiles(selectedFile1.type)

            try {
               const formData = new FormData();
               formData.append('file', selectedFile1);
               // Envoi de la requête POST avec Axios vers le serveur
               const response = await axios.post(`/pages/api/uploadFiles/${structure}`, formData, {
                  headers: {
                     'Content-Type': 'multipart/form-data'
                  }
               });
               console.log('File uploaded successfully:', response.data);
               const path = `ressources/${structure}/doc/${selectedFile1.name}`
               console.log(path)
               console.log(structure)
               setValues((prevValues) => ({
                  ...prevValues,
                  url: path,
               }))


               selectedFile1.type ==='application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
                  setValues((prevValues) => ({
                     ...prevValues,
                     extension: "Word",
                  }))

               ) : selectedFile1.type === 'application/vnd.ms-excel' ? (
                  setValues((prevValues) => ({
                     ...prevValues,
                     extension: "Excel",
                  }))

               ) :selectedFile1.type === 'application/pdf' ? (
                  setValues((prevValues) => ({
                     ...prevValues,
                     extension: "PDF",
                  }))
               ) : (
                  setValues((prevValues) => ({
                     ...prevValues,
                     extension: "PPTX",
                  }))
               )



            } catch (error) {
               console.error('Error uploading file:', error);
            }

            console.log(values)

         } else {
            // Si ce n'est pas une image, ne rien faire
            console.log("Le fichier sélectionné n'est pas une image");
         }
      } else {
         // Si aucun fichier n'est sélectionné, réinitialiser les valeurs
         setSelectedFile(null);
         setValues((prevValues) => ({
            ...prevValues,
            extension: "", // Réinitialise la valeur media s'il n'y a pas de fichier sélectionné
         }));
         setValues((prevValues) => ({
            ...prevValues,
            nom: "", // Réinitialise la valeur media s'il n'y a pas de fichier sélectionné
         }));
         SetselectedImage1(false);
         console.log("Aucun fichier sélectionné");
      }
   };
   const handleUpload = async () => {


      try {
         const formData = new FormData();
         formData.append('file', file);
         // Envoi de la requête POST avec Axios vers le serveur
         const response = await axios.post(`/pages/api/uploadFiles/${structure}`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         });
         console.log('File uploaded successfully:', response.data);
         const path = `ressources/${structure}/doc/${file.name}`
         console.log(path)
         console.log(structure)
         setValues((prevValues) => ({
            ...prevValues,
            url: path,
         }))

      } catch (error) {
         console.error('Error uploading file:', error);
      }
   };


   const handleChange = (e) => {
      const { name, value } = e.target;
      let formattedValue = '';
      let cleanedValue = '';
      if (name === 'nom') {
         // Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
         cleanedValue = value.replace(/[^a-zA-Z\s-]/g, '');
         cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());

         // Mettre à jour l'état avec le nom de l'école nettoyé
         setValues({ ...values, [name]: cleanedValue });
         console.log(values)
      }
   };

   const addData = async () => {

      try {
         // Vérifiez que tous les champs requis sont remplis
         if (values.nom && values.extension && values.id && values.url) {
            const formData = new FormData();
            formData.append('nom', values.nom);
            formData.append('extension', values.extension);
            formData.append('id_agent', values.id);
            formData.append('url_fichier', values.url);
            formData.append('archive', values.archive);
            formData.append('nom_fichier', values.fileName);
            formData.append('date', values.date);
            const response = await axios.post(`${baseUrl}/doc/add_Doc.php`, formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });

            const newValue = values.extension === "Word" ? 'Word'
               : values.extension ==='Excel' ? 'Excel'
                  : values.extension === 'PDF' ? 'PDF'
                     : values.extension === 'PPTX' ? 'PPTX'
                        : null;
            updateValueNotification(newValue);
            handleClickButton8();



            const contenu = values.extension === "Word" ? 'ajouter un document Word'
               : values.extension ==='Excel' ? 'ajouter un document Excel'
                  : values.extension === 'PDF' ? 'ajouter un document PDF'
                     : values.extension === 'PPTX' ? 'ajouter un document PowerPoint'
                        : null;

            const action = values.extension === "Word" ? 'ajout Word'
               : values.extension ==='Excel' ? 'ajout Excel'
                  : values.extension === 'PDF' ? 'ajout PDF'
                     : values.extension === 'PPTX' ? 'ajout PowerPoint'
                        : null;

            const formData2 = new FormData();
            formData2.append('date', values.date);
            formData2.append('id_agent', id);
            formData2.append('action', action);
            formData2.append('contenu', contenu);
            const response2 = await axios.post(`${baseUrl}/Historic/add_Historic.php`, formData2, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            setValues(
               {
                  nom : "",
                  extension:"",
                  url:'',
                  id:""
               }
            )
            const newValue2 = true;
            updateValueNotifications(newValue2);
            SetAdmin(false)
            console.log("Truc ajouté avec succès ", response);
            console.log("Truc ajouté avec succès ", response2);
         }
         // Reset form fields after successful submission

      } catch (error) {
         console.error(error);
      }
   };

   const handleSummit = async () => {

      SetIsSubmit(true);
      const estPresent = filteredData.some((item) => item.nom_fichier === values.fileName);
      const estPresent2 = filteredData.some((item) => item.nom === values.nom);
      //ces deux const teste si parmis les valeur renvoyes dans filterdeData correspondant aux conditions mis la haut

      if ( !values.fileName && !values.nom ) {
         setEtat(1)

      }else if( !values.nom  && values.fileName ){
         setEtat(2)
      }else if (!values.fileName  && values.nom){
         setEtat(3)
      }else if (values.nom.length > 50) {
         setEtat(4);
      }else  if ( estPresent ){
         setreponse2('oui')
      }else if (estPresent2){
         setreponse('oui')
      }else {
         addData()
      }
   };





   return (


      <>
         <div
            className={`fixed top-0 left-0 z-30 bg-black/70 w-screen h-screen overflow-y-auto transition duration-300 ease-in-out`}
         >
            <div className="w-full flex justify-center my-52 md:my-96 lg:my-32">
               <div
                  className={ ` relative  flex items-center justify-center h-72 w-[35%] bg-white border border-gray-700 shadow rounded-lg p-3 ${loading ? 'scale-x-100 scale-y-100 opacity-100'  :'scale-x-0 scale-y-0 opacity-0' }  transition duration-500    ` }>

                  <div
                     className="flex flex-col items-center justify-center  relative h-[100%] w-[100%]">
                     <div
                        className="flex items-center justify-center top-3   relative h-[8%] w-[100%]">
                              <span
                                 className="text-xl text-center font-black font-[Gotham] text-blue-900">Sélectionnez  le document scanné à insérer</span>

                        {/*<button className="absolute  -right-1 -top-5 w-[8%]  text-lg font-black text-red-600"*/}
                        {/*        onClick={() => {*/}
                        {/*           SetLoading(false);*/}
                        {/*           SetAdmin(false);*/}
                        {/*        }}*/}
                        {/*>X*/}
                        {/*</button>*/}

                     </div>


                     <div
                        className="flex items-center  relative h-[82%] w-[100%] p-4  justify-between">
                        <div className=" w-[28%] h-[100%]    ">
                           <div className="flex-col  items-center justify-center relative w-[100%] h-[98%]  ">
                              {/*<div*/}
                              {/*   className="absolute border border-black flex items-center justify-center top-3.5 -left-2  bg-transparent text-xl">*/}
                              {/*   <div*/}
                              {/*      className="w-40 h-44 right-0 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>*/}
                              {/*</div>*/}
                              <label
                                 htmlFor="imageInput"
                                 className="relative w-[100%] h-[75%] top-6 mx-3.5  bg-transparent border border-black flex items-center justify-center cursor-pointer group"

                              >
                                 <input
                                    type="file"
                                    id="imageInput"
                                    name="file"
                                    accept=".docx , .xls , .pdf ,.pptx "
                                    className="sr-only"
                                    onChange={handleFileChange}
                                 />
                                 <div
                                    className={selectedFile ? "hidden" : "relative h-[50%] inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"}>
                                    <Image
                                       src={doc.src}
                                       alt={`Logo `}
                                       width="600"
                                       height="600"
                                       className="object-contain object-center w-8 h-8 text-gray-600  "
                                    />
                                    {/*<div className="text-gray-400 text-center opacity-100 z-10"> Importer le media</div>*/}
                                 </div>
                                 {selectedFile && (


                                    extensionFiles.includes("word") ? (
                                       <img src={word.src}
                                            alt="Image sélectionnée"
                                            className="relative h-[80%]  w-[95%] mx-auto  z-40"
                                       />
                                    ) : extensionFiles.includes("excel") ? (
                                       <img src={excel.src}
                                            alt="Image sélectionnée"
                                            className="relative h-[70%]  w-full mx-auto   z-40"
                                       />
                                    ) : extensionFiles.includes("pdf") ? (
                                       <img src={pdf.src}
                                            alt="Image sélectionnée"
                                            className="relative h-[72%]  w-full mx-auto  z-40"
                                       />
                                    ) : (
                                       <img src={pptx.src}
                                            alt="Image sélectionnée"
                                            className="relative h-[72%]  w-[95%] mx-auto  z-40"
                                       />
                                    )


                                 )}
                              </label>

                           </div>

                           {/*<div*/}
                           {/*   className={(reponse2 === 'oui') ? " -mt-8 -left-4 block text-xs absolute   w-auto" : "hidden"}>*/}
                           {/*   <h1*/}
                           {/*      className="text-xs text-red-600 underline underline-offset-8 mt-6 mx-11 font-medium"> Ce*/}
                           {/*      fichier existe deja</h1>*/}
                           {/*</div>*/}
                           <div
                              className={(reponse2 === 'oui') ? " -mt-8 -left-4 block text-xs absolute   w-auto" : isSubmit ? " -mt-8 -left-4 block text-xs absolute   w-auto" : "hidden"}>
                              <h1
                                 className="text-xs text-red-600 underline underline-offset-8 mt-6 mx-11 font-medium">
                                 {
                                    (reponse2 === 'oui') ? ' Vous possédez deja ce fichier'
                                       : isEtat === 1 ? 'Importer votre fichier'
                                          : isEtat === 3 ? 'Importer votre fichier'
                                             : null
                                 }
                              </h1>
                           </div>

                        </div>


                        <div className="relative w-[60%] space-y-6 ">
                           <input
                              onFocus={() => SetFocus4(true)}
                              onBlur={() => !values.nom ? SetFocus4(false) : null}
                              type='text'
                              name="nom"
                              className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                              onChange={handleChange}
                              value={values.nom}
                              //placeholder="Numéro de téléphone"
                           />

                           <span
                              className={(focus4) ? "absolute left-3 p-1 w-auto -top-2 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 -top-3 px-5 text-sky-700"}>
                                 Nom de votre fichier
                                </span>
                        </div>
                        {/*<div className="mt-12 right-4  block text-xs absolute border border-sky-700  w-auto"><h1*/}
                        {/*   className="text-lg text-red-600  underline underline-offset-8 mt-6 mx-4 font-medium"> Ce*/}
                        {/*   fichier existe deja</h1>*/}
                        {/*</div>*/}

                        <div
                           className={(reponse === 'oui') ? "block mt-14 right-0 text-xs absolute   w-auto" : isSubmit ? "block mt-14 right-0 text-xs absolute   w-auto" : "hidden"}>
                           <h1
                              className="text-xs text-red-600 underline underline-offset-8 mt-6 mx-4 font-medium">
                              {
                                 (reponse === 'oui') ? ' Ce nom est deja attribue'
                                    : isEtat === 1 ? 'Veuillez importer un fichier'
                                       : isEtat === 2 ? 'Saisissez le nom de ce fichier'
                                          : isEtat === 4 ? 'Ce nom est trop long '
                                             : null
                              }


                           </h1>
                        </div>

                     </div>


                     <div
                        className="flex justify-between bottom-1 z-10 space-x-6 relative w-[80%] h-[15%] ">
                        <button
                           className={`bg-indigo-600 text-white rounded-3xl w-32 h-10 font-bold top-0 mx-auto text-sm cursor-pointer transform hover:scale-x-110 hover:scale-y-110 hover:bg-indigo-800 transition duration-300  `}
                           onClick={handleSummit}>Confirmer
                        </button>
                        <button
                           className={`bg-black text-white rounded-3xl w-32 h-10 font-bold top-0 mx-auto text-sm cursor-pointer transform hover:scale-x-110 hover:scale-y-110  transition duration-300  `}
                           onClick={() => {
                              SetLoading(false);
                              SetAdmin(false);
                           }}>Annuler
                        </button>

                     </div>

                  </div>
               </div>

            </div>
         </div>
      </>
   )
}