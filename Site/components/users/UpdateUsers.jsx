"use client"
import axios from "axios";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import picture from "@/public/icons/picture.png";
import process from "process";
import {useRouter} from "next/navigation";

export default function updateUsers({setUpdate,idUpdate,handleClickButton8,updateValueNotifications}){
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [loading , SetLoading ] = useState(false)
   const [ etat , setEtat ] = useState(0)
   const [phoneNumber, setPhoneNumber] = useState('');
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [filteredData3, setFilteredData3] = useState([]); // Initialize with all data

   const [isSubmit,SetIsSubmit] = useState(false)
   const [focus , SetFocus] = useState(false)
   const [selectedImage , SetselectedImage] = useState(false)
   const [selectedImage2, setSelectedImage2] = useState("");
   const [focus2 , SetFocus2] = useState(false)
   const [focus3 , SetFocus3] = useState(false)
   const [focus4 , SetFocus4] = useState(false)
   const router2 = useRouter();
   const [focus5 , SetFocus5] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [focus7 , SetFocus7] = useState(false)
   const [focus8 , SetFocus8] = useState(false)
   const [focus9 , SetFocus9] = useState(false)
   const [focus10 , SetFocus10] = useState(false)
   const [change ,setChange]=useState(true)
   const [selectedFile, setSelectedFile] = useState(null);
   let url1 =''
   const [ reponse , setreponse ] = useState("")
   const [ reponse2 , setreponse2 ] = useState("")
   const [values, setValues] = useState({
      nom: "",
      prenom : "",
      adresse:"",
      num:"",
      situation:"",
      structure:"",
      poste:"",
      service :"",
      username:"",
      password:"",
      photo:""

   });


   const [values2, setValues2] = useState({
      nom: "",
      prenom : "",
      adresse:"",
      num:"",
      situation:"",
      structure:"",
      poste:"",
      service :"",
      username:"",
      password:"",
      photo:""

   });
   const [icon, setIcon] = useState({
      4: "blind",
      5: "Eye"
   });

   const showChar = () => {
      setChange(!change)
   };

   setTimeout(()=>{
      SetLoading (true)
   },80)

   const handleChange3 = async (e) => {
      const {name, value} = e.target;
      // setValues({...values, [name]: value})
      // console.log(values)
      if (values.structure  && e.target.value === "Directeur Général") {
         try {
            const response = await axios.get(`${baseUrl}/verification/verification.php?id_structure=${values.structure}&poste_agent=Directeur Général`);

            if (response.data && response.data.recu && response.data.recu.length > 0) {
               setreponse('oui');
               console.log(response.data.recu)
            } else {
               setValues({...values, [name]: value})
               setreponse('non');
               console.log("Pas de correspandonce")
            }
         } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }
      } else {

         setValues({...values, [name]: value})
         setreponse('non');
         console.log(values)
         console.log("le service nest pas la")
      }


   }


   const getData = async () => {
      try {
         const response = await axios.get(`${baseUrl}/admin/get_byId3.php?id=${idUpdate}`);

         if (response.data && response.data.recu && response.data.recu.length > 0) {

            console.log( response.data.recu )
            //console.log( response.data.recu[0].service )
            setFilteredData(response.data.recu)
           // SetPhoto(response.data.recu[0].photo)
           // SetPoste(response.data.recu[0].poste_agent)


            setValues({
               ...values,
               nom: response.data.recu[0].nom,
               prenom: response.data.recu[0].prenom,
               adresse : response.data.recu[0].adresse,
               num : response.data.recu[0].num_phone,
               situation: response.data.recu[0].situation,
               structure:response.data.recu[0].id_structure,
               poste: response.data.recu[0].poste_agent,
               service: response.data.recu[0].service,
               username:response.data.recu[0].username,
               photo : response.data.recu[0].photo
            });


            //let strucutre =  response.data.recu[0].service === 1 ?



            const response2 = await axios.get(`${baseUrl}/Structure/get_byId.php?id_structure=${response.data.recu[0].id_structure}`);

            if (response2.data && response2.data.recu && response2.data.recu.length > 0) {
               //setreponse('oui');
               console.log(response.data.recu)
               setFilteredData3(response2.data.recu)

            } else {
               console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
            }





         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }

   const handleFileChange2 = async (event) => {
      const fileInput = event.target;
      const selectedFile1 = fileInput.files[0];
      // const nomValue = nom
      console.log("LE sélectionné :",selectedFile1);
      if (selectedFile1) {
         //setFile(event.target.files[0]);
         // Vérifier si le fichier est une image en vérifiant l'extension
         const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
         const fileNameParts = selectedFile1.name.split(".");
         const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

         if (allowedExtensions.includes(fileExtension)) {
            // Si c'est une image, mettre à jour les valeurs avec le fichier sélectionné
            setSelectedFile(selectedFile1);
            SetselectedImage(true);
            const url ='/pages/api'
            console.log("Fichier sélectionné :", selectedFile1);
            try {
               const formData = new FormData();
               formData.append('file',selectedFile1);
               // Envoi de la requête POST avec Axios vers le serveur
               const response = await axios.post(url, formData, {
                  headers: {
                     'Content-Type': 'multipart/form-data'
                  }
               });
               console.log('File uploaded successfully:', response.data);
               // Mise à jour de la valeur media avec le chemin du fichier

               url1 =`/pages/api/${selectedFile1.name}`
               console.log(url1)
               setSelectedImage2(`ressources/UsersPicture/${selectedFile1.name}`);
               console.log(`ressources/UsersPicture/${selectedFile1.name}`)

               setValues((prevValues) => ({
                  ...prevValues,
                  photo: `ressources/UsersPicture/${selectedFile1.name}`,
               }));

               console.log(values)
            } catch (error) {
               console.error('Error uploading file:', error);
            }
         } else {
            // Si ce n'est pas une image, ne rien faire
            console.log("Le fichier sélectionné n'est pas une image");
         }
      } else {
         // Si aucun fichier n'est sélectionné, réinitialiser les valeurs
         setSelectedFile(null);
         url1 =''
         SetselectedImage(false);
         setValues((prevValues) => ({
            ...prevValues,
            photo:"",
         }));
         console.log("Aucun fichier sélectionné");
      }
   };

   const handleChange2 = (e) => {
      //controle des champs de saisie
      const { name, value } = e.target;
      let cleanedValue = '';
      let inputVal = e.target.value;
      let formattedPhoneNumber = '';
      let cleanedAddress = '';
      if (name === 'nom'){
         let formattedValue = '';

// Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
         cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
         cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());

         // Mettre à jour l'état avec le nom de l'école nettoyé
         setValues({...values, nom: cleanedValue});
      } else if (name === 'prenom'){
// Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
         cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
         cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());

         // Mettre à jour l'état avec le nom de l'école nettoyé
         setValues({...values, prenom: cleanedValue});
      } else if (name === 'adresse') {
         // Supprimer les caractères spéciaux pour l'adresse
         // cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
         cleanedValue = value.replace(/[^\w\s]/g, '');
         cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());
         // Mettre à jour l'état avec l'adresse nettoyée
         setValues({ ...values, adresse: cleanedValue });
      } else if (name === 'username'  ) {
         // Supprimer les caractères spéciaux pour l'adresse
         // cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
         cleanedValue = value.replace(/[^\w\s]/g, '');
         cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());
         // Mettre à jour l'état avec l'adresse nettoyée
         setValues({ ...values, username: cleanedValue });
      } else if (name === 'password'  ) {
         // Supprimer les caractères spéciaux pour l'adresse
         // cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
         cleanedValue = value.replace(/[^\w\s]/g, '');
         cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());
         // Mettre à jour l'état avec l'adresse nettoyée
         setValues({ ...values, password: cleanedValue });
      } else if (name === 'num'){

         if (inputVal === '') {
            // Si le champ est vide, réinitialiser les valeurs
            setPhoneNumber('');
            setValues({...values, num: ''});
         } else {
            // Supprimer tous les caractères non numériques
            const cleaned = inputVal.replace(/\D/g, '');
            // Ajouter les deux premiers chiffres (06)
            formattedPhoneNumber += cleaned.substring(0, 2);
// Ajouter un espace
            formattedPhoneNumber += ' ';
            // Ajouter le groupe de trois chiffres suivant (650)
            formattedPhoneNumber += cleaned.substring(2, 5);
            // Ajouter un espace
            formattedPhoneNumber += ' ';
            // Ajouter les deux derniers chiffres (07)
            formattedPhoneNumber += cleaned.substring(5, 7);
            // Ajouter un espace
            formattedPhoneNumber += ' ';
            // Ajouter les deux derniers chiffres (97)
            formattedPhoneNumber += cleaned.substring(7, 9);
            setPhoneNumber(formattedPhoneNumber);
            // Mettre à jour l'état avec la valeur formatée dans le champ "num"
            setValues({...values, num: formattedPhoneNumber});
            console.log(values)
         }
      }




   };
   const handleSummit = async () => {
      SetIsSubmit(true);
      const estPresent = filteredData.some((item) => item.username === values.username);
      const valuesNotEmpty = Object.values(values).every(value => value !== "");
      //  if (!valuesNotEmpty){
      //          setEtat(20)
      //       }else

      if (!values.nom){
         console.log("boubouff")
         setEtat(1)
      } else if (!values.prenom) {
         setEtat(2)
      }else if (!values.adresse){
         setEtat(3)
      }else if (!values.num){
         setEtat(4)
      }else if (!values.situation){
         setEtat(5)
      }else if (!values.structure){
         setEtat(6)
      }else if (!values.poste) {
         setEtat(7)
      } else if (!values.service){
         setEtat(7.5)
      } else if (!values.username){
         setEtat(8)
      }else if (estPresent){
         setEtat(9)
      } else if (!values.password){
         setEtat(10)
      }else if (!values.photo){
         setEtat(11)
      }else if (reponse === 'oui'){
         //console.log("boubou")
         setEtat(12)
      }else {

         try {
            // Vérifiez que tous les champs requis sont remplis

            const formData = new FormData();
            formData.append('nom', values.nom);
            formData.append('prenom', values.prenom);
            formData.append('adresse', values.adresse);
            formData.append('num_phone', values.num);
            formData.append('situation', values.situation);
            formData.append('id_structure', values.structure);
            formData.append('service', values.service);
            formData.append('poste_agent', values.poste);
            formData.append('username', values.username);
            formData.append('password', values.password);
            formData.append('photo', values.photo);

            // Effectuez la requête HTTP en utilisant Axios
            const response = await axios.post(`${baseUrl}/agent/add_agent.php`, formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            console.log("Truc ajouté avec succès ", response);

            setValues({
               nom: "",
               prenom : "",
               adresse:"",
               num:"",
               situation:"",
               structure:"",
               poste:"",
               service :"",
               username:"",
               password:"",
               photo:""
            });


            const newValue = 'ajout2'
            updateValueNotifications(newValue)

            handleClickButton8();

            SetDoc2(false)
            // Si la requête réussit, naviguer vers la nouvelle page
            //  router2.replace('../../register/welcome/welcome2');

         } catch (error) {
            console.error(error);
         }


      }
   }

   // pour la structure
   const handleChange = async (e) => {
      const {name, value} = e.target;
      if (e.target.value && values.poste !== "Directeur Général") {
         setValues({...values, [name]: value})
         setreponse('non');
         console.log(values)
         console.log("le poste nest pas la ou different de directeur")







         try {
            const response = await axios.get(`${baseUrl}/Structure/get_byId.php?id_structure=${e.target.value}`);

            if (response.data && response.data.recu && response.data.recu.length > 0) {
               //setreponse('oui');
               console.log(response.data.recu)
               setFilteredData2(response.data.recu)
            } else {
               console.log("Il ya rien")
               setFilteredData2([])
            }
         } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }




      } else{
         console.log(values.poste)
         // verifie si le poste est libre
         try {

            const response2 = await axios.get(`${baseUrl}/Structure/get_byId.php?id_structure=${e.target.value}`);

            if (response2.data && response2.data.recu && response2.data.recu.length > 0) {
               //setreponse('oui');
               console.log(response2.data.recu)
               setFilteredData2(response2.data.recu)
            } else {
               console.log("Il ya rien")
               setFilteredData2([])
            }





            const response = await axios.get(`${baseUrl}/verification/verification.php?id_structure=${e.target.value}&poste_agent=Directeur Général`);

            if (response.data && response.data.recu && response.data.recu.length > 0) {
               setreponse('oui');
               console.log(response.data.recu)
            } else {
               setValues({...values, [name]: value})
               setreponse('non');
               console.log("Pas de correspandonce")
            }
         } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }


         //
         // setValues({...values, [name]: value})
         // console.log(values)
         // console.log("poste nest pas la")
      }
      // pour les select
   };


   const handleChange4 = (e) => {
      const { name, value } = e.target ;
      setValues({...values, [name] : value})
      console.log(values)
      // pour les select
   };

   useEffect(() => {
      getData()
      console.log(values)
   }, []);



   return(
      <>


         <div
            className={`fixed top-0 left-0 z-30 bg-black/70 w-screen h-screen overflow-y-auto transition duration-300 ease-in-out`}
         >
            <div className="w-full h-[90%] flex justify-center my-52 md:my-96 lg:my-8">
               <div
                  className={` relative  flex flex-col items-center justify-center h-[96%] w-[80%] bg-white border border-black shadow rounded-lg p-2 ${loading ? 'scale-x-100 scale-y-100 opacity-100' : 'scale-x-0 scale-y-0 opacity-0'}  transition duration-500    `}>

                  <div
                     className="absolute flex justify-between gap-3 p-1  h-[100%]  top-0  w-full">
                     <div className="h-[80%] w-[40%] flex  items-center mt-8 rounded ">

                        <div className="relative h-[60%] mx-3 items-center  w-[100%] ">
                           {/*<h1 className="text-6xl text-blue-900 font-black w-1/127    py-2">Bienvenu sur <span*/}
                           {/*   className="font-normal text-blue-600 underline underline-offset-1 shadow-blue-300"> MyGED</span>.*/}
                           {/*</h1>*/}
                           <h1 className="text-3xl  font-semibold  text-blue-600  shadow-blue-300"> Gestionnaire
                              Electronique de Document</h1>

                           <h1 className="text-sm py-2  ">Renseignez les informations personnelles sans oublier la
                              photo de profil afin d'inscrire l'agent
                              sur <span
                                 className="font-normal text-blue-600 underline underline-offset-1 shadow-blue-300"> MyGED</span>.
                           </h1>

                           <div className="relative w-[95%] h-[10%]  flex items-center justify-between space-x-3 mt-9 ">
                              <button
                                 className="w-full lg:w-[60%] mx-auto h-12 bg-blue-900 hover:bg-green-900 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold"
                                 onClick={() => {
                                    handleSummit()
                                 }}>Confirmer
                              </button>


                              <button
                                 className="w-full lg:w-[60%] mx-auto h-12 bg-red-600 hover:bg-red-800 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold"
                                 onClick={() => {
                                    setUpdate(false)
                                 }}>Annuler
                              </button>
                           </div>


                           <div
                              className={(reponse === 'oui' || reponse2 === 'oui') ? "block text-xl" : ((reponse === 'oui' && reponse2 === 'oui') ? "block text-xl" : isSubmit ? "block text-xl" : "hidden")}>

                              <h1 className="text-lg text-red-600 underline underline-offset-8 mt-6 mx-4 font-medium">
                                 {(reponse === 'oui' && reponse2 === 'oui') ? 'Le poste de directeur est déjà occupé ainsi que cet username'
                                    : reponse === 'oui' || etat === 12 ? 'Un directeur est déjà enregistré dans la structure sélectionné'
                                       : reponse2 === 'oui' ? 'Cet username est déjà utilisé par un autre utilisateur'
                                          : etat === 20 ? 'Saisissez les Informations'
                                             : etat === 1 ? 'Saisissez le nom'
                                                : etat === 2 ? 'Saisissez le Prénom'
                                                   : etat === 3 ? 'Saisissez l Adresse'
                                                      : etat === 4 ? 'Saisissez le Numéro de téléphone '
                                                         : etat === 5 ? '  Sélectionnez la situation Matrimoniale'
                                                            : etat === 6 ? 'Sélectionnez la Structure'
                                                               : etat === 7 ? 'Saisissez le Poste'
                                                                  : etat === 7.5 ? 'Saisissez le Service affecté'
                                                                     : etat === 8 ? 'Saisissez  l Username'
                                                                        : etat === 9 ? 'Cet username est déjà utilisé par un autre utilisateur'
                                                                           : etat === 10 ? 'Saisissez le password'
                                                                              : etat === 11 ? "Sélectionez la photo d'utilisateur"
                                                                                 : ''}
                              </h1>

                           </div>

                        </div>

                     </div>


                     {/*Le formulaire commence ici*/}

                     <div className="h-[100%] w-[60%] decoration shadow-white  mx-1 rounded-lg">


                        <div
                           className="relative w-[95%] h-[75%]   space-y-6 mt-16">

                           <div className=" h-[10%]  flex items-center justify-between">
                              <div className="relative w-[35%]">
                                 <input
                                    onFocus={() => SetFocus(true)}
                                    onBlur={() => SetFocus(false)}
                                    type='text'
                                    name="nom"
                                    className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                    onChange={(e) => handleChange2(e)}
                                    value={values.nom}

                                    // inuput nom
                                 />
                                 <span
                                    className={(focus || values.nom) ? "absolute left-3 p-1 w-auto top-4 px-1  text-xs font-black text-blue-900  -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                   Nom
                                </span>
                              </div>


                              <div
                                 className=" relative h-[400%] w-[38%] decoration shadow-black  mt-2  p-1 rounded-lg ">
                                 <div className="relative w-[98%] h-[100%]  mx-auto items-center   ">

                                    <img
                                       // src={URL.createObjectURL(selectedFile)}
                                       src={`/${values.photo}`}
                                       alt="Image sélectionnée"
                                       className="relative h-[100%]  border border-black rounded-full  w-[100%]   z-40"
                                    />

                                    {/*a toucher pour pouvoir modifier les photos*/}
                                    {/*<label*/}
                                    {/*   htmlFor="imageInput2"*/}
                                    {/*   className="relative w-[100%] md:w-[90%] lg:w-[100%] h-[100%] md:h-[99%] lg:h-[110%] mt-0  mx-auto bg-transparent border border-black rounded-full flex items-center justify-center cursor-pointer group"*/}

                                    {/*>*/}

                                    {/*   <input*/}
                                    {/*      type="file"*/}
                                    {/*      id="imageInput2"*/}
                                    {/*      name="file"*/}
                                    {/*      accept=".jpg, .jpeg, .png"*/}
                                    {/*      className="sr-only  bg-black cursor-not-allowed "*/}
                                    {/*      // onChange={handleFileChange2}*/}
                                    {/*   />*/}
                                    {/*   /!*<div*!/*/}
                                    {/*   /!*   className={selectedFile ? "hidden" : "relative h-[100%] w-[100%]  inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"}>*!/*/}
                                    {/*   /!*   <Image*!/*/}
                                    {/*   /!*      src={picture.src}*!/*/}
                                    {/*   /!*      alt={`Logo `}*!/*/}
                                    {/*   /!*      width="600"*!/*/}
                                    {/*   /!*      height="600"*!/*/}
                                    {/*   /!*      className="object-contain object-center  w-12 h-12 text-gray-600  "*!/*/}
                                    {/*   /!*   />*!/*/}
                                    {/*   /!*   <img*!/*/}
                                    {/*   /!*      // src={URL.createObjectURL(selectedFile)}*!/*/}
                                    {/*   /!*      src={`/${values.photo}`}*!/*/}
                                    {/*   /!*      alt="Image sélectionnée"*!/*/}
                                    {/*   /!*      className="relative h-[100%]  rounded-full  w-[100%]   z-40"*!/*/}
                                    {/*   /!*   />*!/*/}
                                    {/*   /!*</div>*!/*/}

                                    {/*   {selectedFile && (*/}
                                    {/*      <img*/}
                                    {/*         // src={URL.createObjectURL(selectedFile)}*/}
                                    {/*         src={`/${values.photo}`}*/}
                                    {/*         alt="Image sélectionnée"*/}
                                    {/*         className="relative h-[100%] cursor-not-allowed rounded-full  w-[100%]   z-40"*/}
                                    {/*      />*/}
                                    {/*   )}*/}
                                    {/*</label>*/}

                                 </div>

                              </div>


                           </div>
                           <div className=" h-[10%] flex items-center justify-between">
                              <div className="relative w-[60%]">
                                 <input
                                    onFocus={() => SetFocus2(true)}
                                    onBlur={() => SetFocus2(false)}
                                    type='text'
                                    name="prenom"
                                    className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                    onChange={(e) => handleChange2(e)}
                                    value={values.prenom}
                                    // inuput prenom
                                 />
                                 <span
                                    className={(focus2 || values.prenom) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                  Prénom
                                </span>
                              </div>
                           </div>


                           <div className=" h-[10%] flex items-center justify-between">
                              <div className="relative w-[35%]">
                                 <input
                                    onFocus={() => SetFocus3(true)}
                                    onBlur={() => SetFocus3(false)}
                                    type='text'
                                    name="adresse"
                                    className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                    onChange={(e) => handleChange2(e)}
                                    value={values.adresse}
                                    // inuput nom
                                 />
                                 <span
                                    className={(focus3 || values.adresse) ? "absolute left-3 p-1 w-auto top-4 px-1  text-xs font-black text-blue-900  -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                   adresse
                                </span>
                              </div>

                              <div className="relative w-[60%]">
                                 <input
                                    onFocus={() => SetFocus4(true)}
                                    onBlur={() => SetFocus4(false)}
                                    type='text'
                                    name="num"
                                    className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                    onChange={handleChange2}
                                    value={ values.num ? values.num : phoneNumber }
                                    //placeholder="Numéro de téléphone"
                                 />

                                 <span
                                    className={(focus4 || values.num) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                  numero de téléphone
                                </span>
                              </div>

                           </div>
                           <div className="h-[10%] flex items-center justify-between">
                              <div className="relative w-[90%]">
                                 <select
                                    onFocus={() => SetFocus5(true)}
                                    onBlur={() => SetFocus5(false)}
                                    name="situation"
                                    className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                    onChange={(e) => handleChange4(e)}
                                    value={values.situation}
                                 >
                                    <option value=''></option>
                                    <option value='Célibataire'>Célibataire</option>
                                    <option value='Marié(e)'>Marié(e)</option>
                                    <option value='Divorcé'>Divorcé</option>
                                 </select>
                                 <span
                                    className={(focus5 || values.situation) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                  Situation Matrimoniale
                                </span>
                              </div>
                           </div>

                           <div className=" h-[10%] flex items-center justify-between">
                              <div className="relative w-[100%]">
                                 <select
                                    onFocus={() => SetFocus6(true)}
                                    onBlur={() => SetFocus6(false)}
                                    name="structure"
                                    className={"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"}
                                    onChange={(e) => handleChange(e)}


                                    value={values.structure}
                                 >
                                    <option value=''></option>
                                    <option value='1'>La Direction Générale</option>
                                    <option value='2'>La Direction Technique</option>
                                    <option value='3'>La Direction Administrative et du Personnel</option>
                                    <option value='4'>La Direction Financière et Comptable</option>
                                    <option value='5'>La Direction Commerciale</option>
                                 </select>
                                 <span
                                    className={(focus6 || values.structure) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                 Structure Affecte
                                </span>
                              </div>


                           </div>
                           <div className=" h-[10%] flex items-center justify-between">
                              <div className="relative w-[45%]">
                                 <select
                                    onFocus={() => SetFocus7(true)}
                                    onBlur={() => SetFocus7(false)}
                                    name="poste"
                                    className={"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"}

                                    onChange={(e) => handleChange3(e)}
                                    value={values.poste}
                                   // value={values.service}
                                 >
                                    <option value=''></option>
                                    <option value='Directeur Général'>Directeur Général</option>
                                    <option value='Secrétaire'>Secrétaire</option>
                                    <option value='Chef de Service'>Chef de Service</option>
                                    <option value='Particulie(re)'>Particulier(re)</option>
                                 </select>
                                 <span
                                    className={(focus7 || values.poste) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                  Poste occupé
                                </span>
                              </div>


                              <div className="relative w-[50%]">
                                 <select
                                    onFocus={() => SetFocus10(true)}
                                    onBlur={() => SetFocus10(false)}
                                    name="service"
                                    className={"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"}

                                    onChange={(e) => handleChange3(e)}
                                    value={values.poste}

                                    // value={values.service}
                                    //
                                 >
                                    <option value=''> {values.service} </option>



                                    <option value=''></option>
                                    {filteredData3.map((option) => (
                                       <option key={option.id} value={option.nom}>
                                          {option.nom}
                                       </option>
                                    ))}

                                 </select>
                                 <span
                                    className={(focus10 || values.service) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                  Service affecte
                                </span>
                              </div>


                           </div>
                           <div className=" h-[10%] flex items-center justify-between">
                              <div className="relative w-[35%]">
                                 <input
                                    onFocus={() => SetFocus8(true)}
                                    onBlur={() => SetFocus8(false)}
                                    type='text'
                                    name="username"
                                    className={"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"}

                                    onChange={(e) => handleChange2(e)}
                                    value={values.username}

                                 />
                                 <span
                                    className={(focus8 || values.username) ? "absolute left-3 p-1 w-auto top-4 px-1  text-xs font-black text-blue-900  -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                   Nom d'utilisateur
                                </span>
                              </div>

                              <div className="relative w-[60%]">
                                 <input
                                    onFocus={() => SetFocus9(true)}
                                    onBlur={() => SetFocus9(false)}
                                    type={change ? 'password' : 'text'}
                                    name="password"
                                    className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                    onChange={(e) => handleChange2(e)}
                                    value={values.password}
                                    // inuput prenom
                                 />
                                 <span
                                    className={(focus9 || values.password) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                  Mot de Passe
                                </span>
                                 <img src={change ? `/icons/${icon[4]}.png` : `/icons/${icon[5]}.png`} alt=""
                                      className="absolute right-4 top-[26%] cursor-pointer"
                                      width={25}
                                      height={25} onClick={showChar}/>
                              </div>

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