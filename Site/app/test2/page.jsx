 //import { Document , Packer , Paragraph } from "docx"; //a cause de lui
import  { saveAs } from "filesaver"
//import d from "../../src/save.js"
// import  DocViewer ,{ DocumentViewer } from "@cyntler/react-doc-viewer"

// import  DocViewer , {DocViewerRenderers}   from "react-doc-viewer"
export default function page() {



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


   // document
   //    .getElementById('button-uploadFiles')
   //    .addEventListener('click',generateNewWordDocument,false)


   const doc = [
      {
         uri :"C:\\UsersList\\Freze Crescent\\Documents\\La Liste des Enfants.docx",
         fileType:"docx",
         filename:"La Liste des Enfants.docx"
      },
   ]

   return (
      <>


         <div>

            <DocViewer  documents={doc}  pluginRenderes={DocumentViewer} />

         </div>

      </>
   );
}



 {/*<input*/}
 {/*   type="text"*/}
 {/*   value={folderName}*/}
 {/*   onChange={(e) => setFolderName(e.target.value)}*/}
 {/*   placeholder="Folder Name"*/}
 {/*/>*/}
 {/*<button  className="bg-black text-white" id='button-uploadFiles'>Create Folder</button>*/}
 {/*<script src="../../src"></script>*/}