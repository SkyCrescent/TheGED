// import { Document , Packer , Paragraph } from "docx";
// import  { saveAs } from "filesaver"
//
//
// const generateNewWordDocument = () => {
//    let doc = new Document()
//    doc.createParagraph('Hello uploadFiles')
//
//    saveDocument(doc,'SkyCresent1.docx')
//
// };
//
// function saveDocument(doc,fileName) {
//
//    const Packer = new Packer()
//    const mineType = "application/vnd.malformations-office document.uploadFiles processing"
//    Packer.toBlob(doc).then(blob  =>{
//       const docblob = blob.slice (0,blob.size ,mineType)
//       saveAs(docblob,fileName)
//    } )
// }
//
//
// document
//    .getElementById('button-uploadFiles')
//    .addEventListener('click',generateNewWordDocument,false)
//

import fs from 'fs';
import path from 'path';

export default async function createNewFolder(folderName) {
   const folderPath = path.join(process.cwd(), folderName);

   try {
      // Vérifier si le dossier existe déjà
      if (!fs.existsSync(folderPath)) {
         // Créer le dossier
         fs.mkdirSync(folderPath);
         console.log(`Dossier "${folderName}" créé avec succès.`);
         return { message: `Dossier "${folderName}" créé avec succès.` };
      } else {
         console.log(`Le dossier "${folderName}" existe déjà.`);
         return { message: `Le dossier "${folderName}" existe déjà.` };
      }
   } catch (error) {
      console.error(`Une erreur est survenue lors de la création du dossier "${folderName}":`, error);
      throw error;
   }
}
