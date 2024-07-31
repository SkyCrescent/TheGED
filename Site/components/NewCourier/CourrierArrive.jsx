"use client"
import Image from "next/image";
import doc from "@/public/icons/document_127px.png";
import word from "@/public/icons/word.png";
import excel from "@/public/icons/excel2.png";
import pdf from "@/public/icons/Sans titre.png";
import pptx from "@/public/icons/pptx.png";
import {useState} from "react";

export default function CourrierArrive({SetSendParafeux}){
   const [loading , SetLoading ] = useState(false)


   setTimeout(()=>{
      // SetAlldisplay(false)
      SetLoading (true)
      // console.log(structure)
   },80)


   return(


      <>
         <div
            className={`fixed top-0 left-0 z-30 bg-black/70 w-screen h-screen overflow-y-auto transition duration-300 ease-in-out`}
         >
            <div className="w-full flex justify-center my-52 md:my-96 lg:my-32">
               <div
                  className={ ` relative  flex items-center justify-center h-72 w-[35%] bg-white border border-gray-700 shadow rounded-lg p-3 ${loading ? 'scale-x-100 scale-y-100 opacity-100'  :'scale-x-0 scale-y-0 opacity-0' }  transition duration-500    ` }>

                  <div
                     className="flex flex-col items-center justify-center  relative h-[100%] w-[100%]">
                     <div
                        className="flex items-center justify-center top-3   relative h-[8%] w-[100%]">
                        {/*<span*/}
                        {/*   className="text-xl text-center font-black font-[Gotham] text-blue-900">Voulez vous vraiment vous déconnecter ? </span>*/}

                        <button className="absolute  -right-1 -top-5 w-[8%]  text-lg font-black text-red-600"
                                onClick={() => {
                                   SetLoading (false);
                                   SetSendParafeux(false);
                                }}
                        >X</button>

                     </div>


                     <div
                        className="flex items-center  relative h-[82%] w-[100%] p-4  justify-between">
                        <div className=" w-[28%] h-[100%]    ">
                           {/*<div className="flex-col  items-center justify-center relative w-[100%] h-[98%]  ">*/}
                           {/*   /!*<div*!/*/}
                           {/*   /!*   className="absolute border border-black flex items-center justify-center top-3.5 -left-2  bg-transparent text-xl">*!/*/}
                           {/*   /!*   <div*!/*/}
                           {/*   /!*      className="w-40 h-44 right-0 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>*!/*/}
                           {/*   /!*</div>*!/*/}
                           {/*   <label*/}
                           {/*      htmlFor="imageInput"*/}
                           {/*      className="relative w-[100%] h-[75%] top-6 mx-3.5  bg-transparent border border-black flex items-center justify-center cursor-pointer group"*/}

                           {/*   >*/}
                           {/*      <input*/}
                           {/*         type="file"*/}
                           {/*         id="imageInput"*/}
                           {/*         name="file"*/}
                           {/*         accept=".docx , .xls , .pdf ,.pptx "*/}
                           {/*         className="sr-only"*/}
                           {/*         //onChange={handleFileChange}*/}
                           {/*      />*/}
                           {/*      <div*/}
                           {/*         className={selectedFile ? "hidden" : "relative h-[50%] inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"}>*/}
                           {/*         <Image*/}
                           {/*            src={doc.src}*/}
                           {/*            alt={`Logo `}*/}
                           {/*            width="600"*/}
                           {/*            height="600"*/}
                           {/*            className="object-contain object-center w-8 h-8 text-gray-600  "*/}
                           {/*         />*/}
                           {/*         /!*<div className="text-gray-400 text-center opacity-100 z-10"> Importer le media</div>*!/*/}
                           {/*      </div>*/}
                           {/*      {selectedFile && (*/}


                           {/*         extensionFiles.includes("word") ? (*/}
                           {/*            <img src={word.src}*/}
                           {/*                 alt="Image sélectionnée"*/}
                           {/*                 className="relative h-[80%]  w-[95%] mx-auto  z-40"*/}
                           {/*            />*/}
                           {/*         ) : extensionFiles.includes("excel") ? (*/}
                           {/*            <img src={excel.src}*/}
                           {/*                 alt="Image sélectionnée"*/}
                           {/*                 className="relative h-[70%]  w-full mx-auto   z-40"*/}
                           {/*            />*/}
                           {/*         ) : extensionFiles.includes("pdf") ? (*/}
                           {/*            <img src={pdf.src}*/}
                           {/*                 alt="Image sélectionnée"*/}
                           {/*                 className="relative h-[72%]  w-full mx-auto  z-40"*/}
                           {/*            />*/}
                           {/*         ) : (*/}
                           {/*            <img src={pptx.src}*/}
                           {/*                 alt="Image sélectionnée"*/}
                           {/*                 className="relative h-[72%]  w-[95%] mx-auto  z-40"*/}
                           {/*            />*/}
                           {/*         )*/}


                           {/*      )}*/}
                           {/*   </label>*/}

                           {/*</div>*/}

                           {/*<div*/}
                           {/*   className={(reponse2 === 'oui') ? " -mt-8 -left-4 block text-xs absolute   w-auto" : "hidden"}>*/}
                           {/*   <h1*/}
                           {/*      className="text-xs text-red-600 underline underline-offset-8 mt-6 mx-11 font-medium"> Ce*/}
                           {/*      fichier existe deja</h1>*/}
                           {/*</div>*/}


                        </div>


                        <div className="relative w-[60%] space-y-6 ">
                           {/*<input*/}
                           {/*   onFocus={() => SetFocus4(true)}*/}
                           {/*   onBlur={() => !values.nom ? SetFocus4(false) : null}*/}
                           {/*   type='text'*/}
                           {/*   name="nom"*/}
                           {/*   className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"*/}
                           {/*   onChange={handleChange}*/}
                           {/*   value={values.nom}*/}
                           {/*   //placeholder="Numéro de téléphone"*/}
                           {/*/>*/}

                           {/*<span*/}
                           {/*   className={(focus4) ? "absolute left-3 p-1 w-auto -top-2 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 -top-3 px-5 text-sky-700"}>*/}
                           {/*      Nom de votre fichier*/}
                           {/*     </span>*/}
                        </div>
                        {/*<div className="mt-12 right-4  block text-xs absolute border border-sky-700  w-auto"><h1*/}
                        {/*   className="text-lg text-red-600  underline underline-offset-8 mt-6 mx-4 font-medium"> Ce*/}
                        {/*   fichier existe deja</h1>*/}
                        {/*</div>*/}

                        {/*<div*/}
                        {/*   className={(reponse === 'oui') ? "block mt-14 right-0 text-xs absolute   w-auto" : "hidden"}>*/}
                        {/*   <h1*/}
                        {/*      className="text-xs text-red-600 underline underline-offset-8 mt-6 mx-4 font-medium">*/}
                        {/*      Ce nom est deja attribue</h1>*/}
                        {/*</div>*/}

                     </div>


                     {/*<div*/}
                     {/*   className="flex justify-between bottom-1 z-10 space-x-6 relative w-[80%] h-[15%] ">*/}
                     {/*   <button*/}
                     {/*      className={`bg-indigo-600 text-white rounded-3xl w-32 h-10 font-bold top-0 mx-auto text-sm cursor-pointer transform hover:scale-x-110 hover:scale-y-110 hover:bg-indigo-800 transition duration-300  `}*/}
                     {/*      onClick={ handleSummit}>Confirmer*/}
                     {/*   </button>*/}

                     {/*</div>*/}

                  </div>
               </div>

            </div>
         </div>
      </>
   )
}