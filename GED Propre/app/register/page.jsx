"use client"
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Image from "next/image";
import picture from "@/../public/icons/picture.png"
import {useRouter} from "next/navigation";
export default function page() {
   const [phoneNumber, setPhoneNumber] = useState('');
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [loading , SetLoading ] = useState(false)
   const [error , SetError ] = useState(false)
   const [isSubmit,SetIsSubmit] = useState(false)
   const [focus , SetFocus] = useState(false)
   const [focus2 , SetFocus2] = useState(false)
   const [focus3 , SetFocus3] = useState(false)
   const [focus4 , SetFocus4] = useState(false)
   const router2 = useRouter();
   const [focus5 , SetFocus5] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [focus7 , SetFocus7] = useState(false)
   const [focus8 , SetFocus8] = useState(false)
   const [focus9 , SetFocus9] = useState(false)
   const [change ,setChange]=useState(true)
   const [selectedFile2, setSelectedFile2] = useState(null);
   const [selectedImage , SetselectedImage] = useState(false)
   const [selectedFile, setSelectedFile] = useState(null);
   const [Errors,SetErrors] = useState(false)
   const [souligneWidth, setSouligneWidth] = useState(0);
   const router = useRouter();
   const [ etat , setEtat ] = useState(0)
   const [selectedImage2, setSelectedImage2] = useState("");
   let url1 =''
   const [ reponse , setreponse ] = useState("")
   const [ reponse2 , setreponse2 ] = useState("")

   const [values, setValues] = useState({
      nom: "",
      prenom : "",
      adresse:"",
      num:"",
      situation:"",
      service :"",
      poste:"",
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
   const getData2 = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`http://localhost:8000/agent/get_allusername.php`);
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



   // Fonction pour vérifier si le contenu de values.username est égal à une des valeurs de new
   const verifierUsername = () => {
      // Vérifie si values.username est vide
      if (!values.username) {
         console.log("Le champ username est vide");
         return;
      }

      // Vérifie si values.username est égal à une des valeurs dans new
      const estPresent = filteredData.some((item) => item.username === values.username);

      if (estPresent) {
         console.log("Le username existe déjà dans la liste renvoyée par l'API.");
         // Tu peux effectuer d'autres actions ici si besoin
      } else {
         console.log("Le username n'existe pas dans la liste renvoyée par l'API.");
         // Tu peux effectuer d'autres actions ici si besoin
      }
   };


   // pour les services
   const handleChange = async (e) => {
      const {name, value} = e.target;
      if (e.target.value && values.poste !== "Directeur Général") {
         setValues({...values, [name]: value})
         setreponse('non');
         console.log(values)
         console.log("le poste nest pas la ou different de directeur")
      } else{
         console.log(values.poste)

         try {
            const response = await axios.get(`http://localhost:8000/verification/verification.php?id_structure=${e.target.value}&poste_agent=Directeur Général`);

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



// celui du poste
const handleChange3 = async (e) => {
   const {name, value} = e.target;
   // setValues({...values, [name]: value})
   // console.log(values)
   if (values.service  && e.target.value === "Directeur Général") {
      try {
            const response = await axios.get(`http://localhost:8000/verification/verification.php?id_structure=${values.service}&poste_agent=Directeur Général`);

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

   // celui des situation Matrimoniale
   const handleChange4 = (e) => {
      const { name, value } = e.target ;
      setValues({...values, [name] : value})
      console.log(values)
      // pour les select
   };

   useEffect(() => {
      console.log("recteur",values);
      // console.log(study1);
   }, [()=>{handleChange(3)}]);




   useEffect(() => {
      getData2()
   }, []);

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


   const getData3 = async () => {
     if (values.poste === "Directeur de Général "){
        try {
           const response = await axios.get(`http://localhost:8000/verification/verification.php?id_structure=${values.service}&poste_agent=Directeur Général`);

           if (response.data && response.data.recu && response.data.recu.length > 0) {
              setreponse('oui');
              console.log(reponse)
           } else {
              setreponse('non');
           }
        } catch (error) {
           console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
        }
     }else{
        setreponse('non');
     }
   };

// Fonction pour vérifier si l'username est libre
   const getData4 = async () => {
      try {
         const response = await axios.get(`http://localhost:8000/verification/verificationUsername.php?username=${values.username}`);

         if (response.data && response.data.recu && response.data.recu.length > 0) {
            setreponse2('oui');
            console.log(reponse2)
         } else {
            setreponse2('non');
            if (reponse === 'non' && reponse2 === 'non') {
               const encryptedData = JSON.stringify(values);
               router.push(`../register/welcome?utytrcd=${encodeURIComponent(encryptedData)}`);
            }
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }

   // Fonction pour gérer la soumission du formulaire
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
      }else if (!values.service){
         setEtat(6)
      }else if (!values.poste){
         setEtat(7)
      }else if (!values.username){
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
            formData.append('id_structure', values.service);
            formData.append('poste_agent', values.poste);
            formData.append('username', values.username);
            formData.append('password', values.password);
            formData.append('photo', values.photo);

            // Effectuez la requête HTTP en utilisant Axios
            const response = await axios.post('http://localhost:8000/agent/add_agent.php', formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            console.log("Truc ajouté avec succès ", response);


            // Si la requête réussit, naviguer vers la nouvelle page
            router2.replace('../../register/welcome/welcome2');

         } catch (error) {
            console.error(error);
         }


      }
   }







   return(
      <>

         <div className=" flex justify-between w-full h-screen ">


            <div className="relative w-[54%] h-screen">
               <div className="relative bg-indigo-400/75 opacity-95 w-[100%] h-[71%] "></div>
               <div className="relative bg-indigo-500/90 opacity-95 w-[100%] h-[29%] "></div>
            </div>


            <div className="relative w-[46%] h-screen">
               <div
                  className="relative  bg-gradient-to-b from-indigo-400 to-blue-800 opacity-95 w-[100%] h-[100%] "></div>
            </div>









            <div
               className="absolute flex justify-between gap-3 p-1  h-[100%]  top-0  w-full">
               <div className="h-[80%] w-[55%] flex  items-center mt-8 rounded ">

                  <div className="relative h-[60%] mx-3 items-center  w-[150%] ">
                     <h1 className="text-6xl text-blue-900 font-black w-1/127    py-2">Bienvenu sur <span
                        className="font-normal text-blue-600 underline underline-offset-1 shadow-blue-300"> MyGED</span>.
                     </h1>
                     <h1 className="text-3xl  font-semibold">Votre Gestionnaire Electronique de Document</h1>
                     <h1 className="text-sm py-2  ">Renseignez vos informations personnelles sans oublier votre
                        photo de profil afin d'etre inscrit
                        sur <span
                           className="font-normal text-blue-600 underline underline-offset-1 shadow-blue-300"> MyGED</span>.
                     </h1>
                     <div
                        className={(reponse === 'oui' || reponse2 === 'oui') ? "block text-xl" : ((reponse === 'oui' && reponse2 === 'oui') ? "block text-xl" :  isSubmit ? "block text-xl" : "hidden")}>

                        <h1 className="text-lg text-red-600 underline underline-offset-8 mt-6 mx-4 font-medium">
                           { (reponse === 'oui' && reponse2 === 'oui') ? 'Le poste de directeur est déjà occupé ainsi que cet username'
                              : reponse === 'oui' || etat === 12 ? 'Un directeur est déjà enregistré dans la structure sélectionné'
                                 : reponse2 === 'oui' ? 'Cet username est déjà utilisé par un autre utilisateur'
                                    : etat === 20 ? 'Saisissez vos Informations'
                                       : etat === 1 ? 'Saisissez votre nom'
                                       : etat === 2 ? 'Saisissez votre Prenom'
                                          : etat === 3 ? 'Saisissez votre Adresse'
                                             : etat === 4 ? 'Saisissez votre Numero de telephone '
                                                : etat === 5 ? '  Selectionnez votre situation Matrimoniale'
                                                   : etat === 6 ? 'Selectionnez votre Structure'
                                                      : etat === 7 ? 'Saisissez votre Poste'
                                                         : etat === 8 ? 'Saisissez votre Username'
                                                            : etat === 9 ? 'Cet username est déjà utilisé par un autre utilisateur'
                                                            : etat === 10 ? 'Saisissez votre password'
                                                               : etat === 11 ? "Selectionez votre photo d'utilisateur"










                                                               :''}
                        </h1>

                     </div>
                  </div>

               </div>







               {/*Le formulaire commence ici*/}

               <div className="h-[100%] w-[45%] decoration shadow-white  mx-1 rounded-lg">





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

                              <label
                                 htmlFor="imageInput2"
                                 className="relative w-[100%] md:w-[90%] lg:w-[100%] h-[100%] md:h-[99%] lg:h-[110%] mt-0  mx-auto bg-transparent border-2 border-white rounded-full flex items-center justify-center cursor-pointer group"

                              >

                                 <input
                                    type="file"
                                    id="imageInput2"
                                    name="file"
                                    accept=".jpg, .jpeg, .png"
                                    className="sr-only  bg-black "
                                    onChange={handleFileChange2}
                                 />
                                 <div
                                    className={selectedFile ? "hidden" : "relative h-[100%] w-[100%]  inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"}>
                                    <Image
                                       src={picture.src}
                                       alt={`Logo `}
                                       width="600"
                                       height="600"
                                       className="object-contain object-center  w-12 h-12 text-gray-600  "
                                    />
                                 </div>
                                 {selectedFile && (
                                    <img
                                       src={URL.createObjectURL(selectedFile)}
                                       alt="Image sélectionnée"
                                       className="relative h-[100%]  rounded-full  w-[100%]   z-40"
                                    />
                                 )}
                              </label>

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
                              value={phoneNumber}
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
                              name="service"
                              className={"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"}
                              onChange={(e) => handleChange(e)}
                              value={values.service}
                           >
                              <option value=''></option>
                              <option value='1'>La Direction Général</option>
                              <option value='2'>La Direction Technique</option>
                              <option value='3'>La Direction Administrative et du Personnel</option>
                              <option value='4'>La Direction Financière et Comptable</option>
                              <option value='5'>La Direction Commerciale</option>
                           </select>
                           <span
                              className={(focus6 || values.service) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                 Structure Affecte
                                </span>
                        </div>


                     </div>
                     <div className=" h-[10%] flex items-center justify-between">
                        <div className="relative w-[100%]">
                           <select
                              onFocus={() => SetFocus7(true)}
                              onBlur={() => SetFocus7(false)}
                              name="poste"
                              className={"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"}

                              onChange={(e) => handleChange3(e)}
                              value={values.poste}
                           >
                              <option value=''></option>
                              <option value='Directeur Général'>Directeur Général</option>
                              <option value='Sécretaire'>Sécretaire</option>
                              <option value='Chef de Service'>Chef de Service</option>
                              <option value='Particulie(re)'>Particulie(re)</option>
                           </select>
                           <span
                              className={(focus7 || values.poste) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                  Poste occupé
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

                  <div className="relative w-[95%] h-[10%] flex items-center justify-center mt-3 ">
                     <button
                        className="w-full lg:w-[60%] mx-auto h-12 bg-blue-900 hover:bg-green-900 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold"
                        onClick={() => {
                           handleSummit()
                        }}>Confirmer mon inscription
                     </button>
                  </div>

               </div>
            </div>

         </div>
      </>
   )
}