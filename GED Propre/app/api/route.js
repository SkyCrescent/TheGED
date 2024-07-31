// import fs from 'fs';
// import path from 'path';
//
// // Fonction pour créer un nouveau dossier
// const createNewFolder = async (folderPath, folderName) => {
//    try {
//       // Chemin complet du nouveau dossier à créer
//       const newFolderPath = path.join(folderPath, folderName);
//
//       // Vérifie si le dossier existe déjà
//       if (!fs.existsSync(newFolderPath)) {
//          // Crée le nouveau dossier
//          fs.mkdirSync(newFolderPath, { recursive: true }); // Utilisez { recursive: true } pour créer des dossiers parents si nécessaire
//          console.log('Le dossier a été créé avec succès.');
//       } else {
//          console.log('Le dossier existe déjà.', newFolderPath);
//       }
//    } catch (error) {
//       console.error('Erreur lors de la création du dossier :', error);
//    }
// };
// fionction pour creer un seul
// export default createNewFolder;

//
import fs from 'fs';
import path from 'path';

// Fonction pour créer un nouveau dossier
const createNewFolder = async (folderPath, folderName, subfolders = []) => {
   try {
      // Chemin complet du nouveau dossier à créer
      const newFolderPath = path.join(folderPath, folderName);

      // Vérifie si le dossier existe déjà
      if (!fs.existsSync(newFolderPath)) {
         // Crée le nouveau dossier principal
         fs.mkdirSync(newFolderPath, { recursive: true }); // Utilisez { recursive: true } pour créer des dossiers parents si nécessaire
         console.log('Le dossier principal a été créé avec succès :', newFolderPath);

         // Crée les sous-dossiers
         if (subfolders.length > 0) {
            subfolders.forEach(subfolder => {
               const subfolderPath = path.join(newFolderPath, subfolder);
               fs.mkdirSync(subfolderPath);
               console.log('Sous-dossier créé avec succès :', subfolderPath);
            });
         }
      } else {
         console.log('Le dossier principal existe déjà :', newFolderPath);
      }
   } catch (error) {
      console.error('Erreur lors de la création des dossiers :', error);
   }
};

export default createNewFolder;
