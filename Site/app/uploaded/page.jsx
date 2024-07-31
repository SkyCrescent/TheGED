"use client"

import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
//import picture from "../../../public/icons/picture.png";
import axios from "axios";

export default function page(){
   const [isSubmit,SetIsSubmit] = useState(false)
   const [file, setFile] = useState('');
   const [selectedFile, setSelectedFile] = useState(null);
   const [selectedFile2, setSelectedFile2] = useState(null);
   const [selectedImage , SetselectedImage] = useState(false)
   const [values, setValues] = useState({
      name: "",
      prenom : "",
      adresse:"",
      num:"",
      situation:"",
      service :"",
      poste:"",
      username:"",
      password:"",
      media:""

   });
   const handleFileChange2 = (event) => {
      const fileInput = event.target;
      const selectedFile = fileInput.files[0];

      if (selectedFile) {
         setSelectedFile(selectedFile);
         setValues((prevValues) => ({
            ...prevValues,
            media: selectedFile,
            typemedia: selectedFile.type,
         }));
         console.log(fileInput.files[0])
         setFile(event.target.files[0]);
         console.log("fichier sélectionné frr", selectedFile.name);
         console.log("fichier sélectionné frr", selectedFile.type);
         setSelectedFile2(selectedFile.type)
         // Vous pouvez effectuer d'autres opérations avec le fichier si nécessaire
      } else {
         setSelectedFile(null);
         setValues((prevValues) => ({
            ...prevValues,
            media: "", // Réinitialise la valeur media s'il n'y a pas de fichier sélectionné
         }));
         console.log("Aucun fichier sélectionné");
      }
   };

   const handleUpload = async () => {


      try {
         const formData = new FormData();
         formData.append('file', file);
         // Envoi de la requête POST avec Axios vers le serveur
         const response = await axios.post('/pages/api', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         });
         console.log('File uploaded successfully:', response.data);
               const path = `./public/${file.name}`
              console.log(path)
      } catch (error) {
         console.error('Error uploading file:', error);
      }
   };
   return(
      <>
         <div className="absolute w-[98%] h-[50%] mt-20  mx-auto items-center  ">

            <label
               htmlFor="imageInput2"
               className={isSubmit && !selectedImage ?
                  "relative w-[100%] md:w-[90%] lg:w-[100%] h-[100%] md:h-[99%] lg:h-[100%]  mx-auto bg-transparent border border-red-300 rounded-full flex items-center justify-center cursor-pointer group"
                  : "relative w-[100%] md:w-[90%] lg:w-[25%] h-[100%] md:h-[99%] lg:h-[100%]  mx-auto bg-transparent border border-red-500 rounded-full flex items-center justify-center cursor-pointer group"}

            >

               <input
                  type="file"
                  id="imageInput2"
                  name="file"
                  accept=".jpg, .jpeg, .png,.docx"
                  className="sr-only"
                  onChange={handleFileChange2}
               />
               <div
                  className={selectedFile2 ? "hidden" : "relative h-[100%] inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"}>
               </div>
               {selectedFile  && (
                  selectedFile2 === "video/mp4"  ?
                     <video
                        src={URL.createObjectURL(selectedFile)}
                        controls
                        onMouseEnter={(event) => { event.target.play(); }}
                        onMouseLeave={(event) => { event.target.pause(); }}
                        alt="Vidéo sélectionnée"
                        className="relative h-[100%]  w-[100%]   z-40"
                     ></video>  :
                     <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Image sélectionnée"
                        className="relative h-[100%]  w-[100%]  z-40"
                     />
               )}
            </label>


            <button
               className="w-full lg:w-[30%] mx-4 h-12 bg-indigo-600 hover:bg-indigo-950 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold"
               onClick={() => {
                  handleUpload()
               }}>upload
            </button>

         </div>
      </>
   )
}

