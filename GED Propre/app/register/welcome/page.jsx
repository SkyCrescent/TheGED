"use client"
import Image from 'next/image';
import { useState , useEffect} from "react";
import axios from  'axios'
import picture from "@/../public/icons/picture.png"
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import Link from "next/link";

export default function Home() {
   const [file, setFile] = useState('');
   const router = useRouter();
   const router2 = useRouter();
   const[visible , setvisible] = useState(false)
   const [selectedFile, setSelectedFile] = useState(null);
   const [selectedImage2, setSelectedImage2] = useState(null);

   const [isSubmit,SetIsSubmit] = useState(false)
   const [selectedImage , SetselectedImage] = useState(false)
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const encryptedData = searchParams.get('utytrcd');
   let url1 =''
   let jsonData = {}
   const [nom, setNom] = useState('');
let nom2 =""
   if (encryptedData) {
      try {
         // Attempt to decode the URL-encoded data
         const decodedData = decodeURIComponent(encryptedData);

         // Parse the decoded data as JSON
         jsonData = JSON.parse(decodedData);
         // Set the data state with the parsed values

         console.log(jsonData);
        // setNom(jsonData.service);
        //  nom2 === jsonData.service
      } catch (error) {
         console.error('Error parsing data:', error);
         // Handle parsing errors gracefully, e.g., display an error message
      }
   }




   useEffect(() => {
      console.log("ffsoo", jsonData);
      setNom(jsonData.service);
      console.log("ffsoo",nom);
   }, [jsonData]);

   const handleFileChange2 = async (event) => {
      const fileInput = event.target;
      const selectedFile1 = fileInput.files[0];
      const nomValue = nom
      console.log("LE sélectionné :",nom);
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
            const url =
               nom == 1
                  ? '/pages/api/uploadPicture/1/'
                  : nom == 2
                     ? '/pages/api/uploadPicture/2/'
                     : nom == 3
                        ? '/pages/api/uploadPicture/3/'
                        : nom == 4
                           ? '/pages/api/uploadPicture/4/'
                           : '/pages/api/uploadPicture/5/';

            console.log("Fichier sélectionné :", nom);
            console.log("Fichier sélectionnéfff :", url);

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
               url1 =nom == 1
                     ? `/pages/api/uploadPicture/1/${selectedFile1.name}`
                     : nom == 2
                        ? `/pages/api/uploadPicture/2/${selectedFile1.name}`
                        : nom == 3
                           ? `/pages/api/uploadPicture/3/${selectedFile1.name}`
                           :nom === 4 ?`/pages/api/uploadPicture/4/${selectedFile1.name}`
               :`/pages/api/uploadPicture/5/${selectedFile1.name}`
               ;
               console.log(url1)
               setSelectedImage2(`ressources/${nom}/${selectedFile1.name}`);

               setvisible(true)

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
         console.log("Aucun fichier sélectionné");
      }
   };



   const handleSummit = async () => {


         try {
            // Vérifiez que tous les champs requis sont remplis

            const formData = new FormData();
            formData.append('nom', jsonData.nom);
            formData.append('prenom', jsonData.prenom);
            formData.append('adresse', jsonData.adresse);
            formData.append('num_phone', jsonData.num);
            formData.append('situation', jsonData.situation);
            formData.append('id_structure', jsonData.service);
            formData.append('poste_agent', jsonData.poste);
            formData.append('username', jsonData.username);
            formData.append('password', jsonData.password);
            formData.append('photo', selectedImage2);

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

   };






   return (
      <>
         <div className=" flex justify-between w-full h-screen ">
            <div className="relative w-[60%] h-screen">
               <div className="relative bg-indigo-400/75 opacity-95 w-[100%] h-[71%] "></div>
               <div className="relative bg-indigo-500/90 opacity-95 w-[100%] h-[29%] "></div>
            </div>


            <div className="relative w-[40%] h-screen">
               <div
                  className="relative  bg-gradient-to-b from-indigo-400 to-blue-800 opacity-95 w-[100%] h-[100%] "></div>
            </div>


            <div
               className="absolute flex justify-between gap-3 p-1  h-[80%] top-0  w-full">
               <div className="h-[100%] w-[55%]  flex items-center mt-8 rounded ">

                  <div className="relative h-[60%] mx-3 items-center  w-[100%]  ">
                     <h1 className="text-6xl text-blue-900 font-black w-1/127    py-2">{jsonData.nom} {jsonData.prenom}
                     </h1>
                     <h1 className="text-3xl mx-1 font-semibold">Votre Inscription est presque termine</h1>
                     <h1 className="text-sm py-2 mx-2 ">Inserez Juste vote photo de Profils afin de terminer votre
                        inscription</h1>
                     <div className={" -mx-1 "}>
                        <button
                           className={selectedFile ? ' block w-full lg:w-[30%] mx-4 h-12 bg-indigo-600 hover:bg-green-700 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold' : ' w-full lg:w-[30%] mx-4 h-12 bg-indigo-600 hover:bg-green-700 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold hidden'}
                           onClick={() => {
                              handleSummit()
                           }}>Terminer
                        </button>

                     </div>


                     {/*<button*/}
                     {/*   className={!visible ? ' block w-full lg:w-[30%] mx-4 h-12 bg-indigo-600 hover:bg-green-700 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold' : ' w-full lg:w-[30%] mx-4 h-12 bg-indigo-600 hover:bg-green-700 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold hidden'}*/}
                     {/*   onClick={() => {*/}
                     {/*      router.push('../../register/welcome/welcome2')*/}
                     {/*   }}>Terminer*/}
                     {/*</button>*/}


                  </div>
               </div>
               <div className="h-[100%] w-[43%] decoration shadow-black  mr-6 mt-2 p-2 rounded-lg ">
                  <div className="relative w-[98%] h-[100%]  mx-auto items-center  ">

                     <label
                        htmlFor="imageInput2"
                        className={isSubmit && !selectedImage ?
                           "relative w-[100%] md:w-[90%] lg:w-[65%] h-[100%] md:h-[99%] lg:h-[75%]  mt-1  mx-auto bg-transparent border-2 border-red-300 rounded-full flex items-center justify-center cursor-pointer group"
                           : "relative w-[100%] md:w-[90%] lg:w-[65%] h-[100%] md:h-[99%] lg:h-[75%]  mt-1  mx-auto bg-transparent border-2 border-white rounded-full flex items-center justify-center cursor-pointer group"}

                     >

                        <input
                           type="file"
                           id="imageInput2"
                           name="file"
                           accept=".jpg, .jpeg, .png"
                           className="sr-only"
                           onChange={handleFileChange2}
                        />
                        <div
                           className={selectedFile ? "hidden" : "relative h-[100%] inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"}>
                           <Image
                              src={picture.src}
                              alt={`Logo `}
                              width="600"
                              height="600"
                              className="object-contain object-center w-8 h-8 text-gray-600  "
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

         </div>
      </>

   )
}
