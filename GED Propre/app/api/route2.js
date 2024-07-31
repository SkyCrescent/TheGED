import fs from 'fs';
import path from 'path';

// Fonction pour supprimer un dossier de manière récursive
const deleteFolderRecursive = async (folderPath) => {
   if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file, index) => {
         const currentPath = path.join(folderPath, file);
         if (fs.lstatSync(currentPath).isDirectory()) {
            // Répertoire
            deleteFolderRecursive(currentPath);
         } else {
            // Fichier
            fs.unlinkSync(currentPath);
         }
      });
      fs.rmdirSync(folderPath);
   }
};

export default deleteFolderRecursive;