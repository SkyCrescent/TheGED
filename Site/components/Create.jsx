import createNewFolder from "@/app/api/route";


export default function  Create(){

   const folderName = 'nom' ; // Nom du dossier à créer
   const folderPath = 'public/'; // Chemin d'accès où vous souhaitez créer le nouveau dossier
   const subfolders = ['fc']; // Sous-dossiers à créer

   createNewFolder(folderPath,folderName, subfolders);


}