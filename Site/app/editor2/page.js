'use client'
import {  useState } from 'react'
import { Document , Page } from 'react-pdf';
import pdf from '../La Liste des Enfants.pdf'

function PdfComp (){


   const [ numPages,SetnumPages ] = useState()
   const [ pageNumber ,setPageNumber ] = useState(1)


   function onDocumentLoadSucces({numPages}) {
      SetnumPages(numPages)
   }
   return(
     <div>
        <Document file={pdf} onLoadSuccess={onDocumentLoadSucces} >

           <Page  pageNumber={pageNumber} />

        </Document>



        <p>
           page {pageNumber} of {numPages}
        </p>
     </div>
   )
}
export default PdfComp