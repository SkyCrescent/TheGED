import React from 'react';
//import createNewFolder from '../utils/createNewFolder'; // Assurez-vous d'importer correctement le chemin de votre fonction
import createNewFolder from "@/app/api/route";
import  deleteFolderRecursive from  '@/app/api/route2'
//import f from '../'
export default function page() {
   // const folderName = 'nfcSky9'; // Nom du dossier à créer
   // const folderPath = 'public/'; // Chemin d'accès où vous souhaitez créer le nouveau dossier
   // const subfolders = ['Admin', 'Recu','Personnel','dark']; // Sous-dossiers à créer

//   createNewFolder(folderPath,folderName, subfolders);
   deleteFolderRecursive('./app/stark')





   return(

      <>
         <div>dfdfd</div>
      </>
   )
}