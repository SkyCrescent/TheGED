"use client"
import React, {useEffect, useState} from "react";

import {usePathname, useRouter, useSearchParams} from 'next/navigation'

export default function ComeBack({come}){

   const [loading , SetLoading] = useState(false )

   const router = useRouter();

   setTimeout(()=>{
      // SetAlldisplay(false)
      SetLoading (true)
   },80)
   return(

      <>
         <div
            className={`fixed top-0 left-0 z-30 bg-black/70 w-screen h-screen overflow-y-auto transition duration-300 ease-in-out`}
         >
            <div className="w-full flex justify-center my-52 md:my-96 lg:my-48">
               {/*<div*/}
               {/*   className={`  opacity-100    `}>*/}


               <div
                  className={ ` relative  flex items-center justify-center h-64 w-[35%] bg-white border border-gray-600 shadow rounded-lg p-4 ${loading ? 'scale-x-100 scale-y-100 opacity-100'  :'scale-x-0 scale-y-0 opacity-0' }  transition duration-500    ` }>

                  <div
                     className="flex flex-col items-center justify-center  space-y-20 border border-gray-500 rounded-lg relative h-[100%] w-[100%]">
                     <div
                        className="flex flex-col items-center justify-center  top-7 relative h-[50%] w-[100%]">
                              <span
                                 className="text-4xl text-center font-black font-[Gotham] text-blue-900">Voulez vous vraiment vous déconnecter ? </span>

                     </div>

                     <div
                        className="flex justify-between bottom-3 space-x-6 relative w-[80%] h-96 ">
                        <button
                           className={`bg-indigo-600 text-white rounded-3xl w-32 h-10 font-bold text-sm cursor-pointer transform hover:scale-x-110 hover:scale-y-110 hover:bg-indigo-800 transition duration-300  `}
                           onClick={() => {
                              router.push(`../`);
                           }}>OUI
                        </button>

                        <button
                           className={`bg-black text-white rounded-3xl w-32 h-10 font-bold text-sm cursor-pointer transform hover:scale-x-110 hover:scale-y-110 transition duration-300  `}
                           onClick={() => {
                              SetLoading (false);
                              come(false);

                           }}>NON
                        </button>

                     </div>


                     {/*<div*/}
                     {/*   className={loading ? `  transition duration-1000 opacity-100    h-[80%] w-[80%] mx-auto  md:w-[100%]    ` : comegreen ? "absolute transition duration-1000 opacity-100   h-0 w-0   " : " z-30 scale-x-50 scale-y-50 opacity-0  "}>*/}
                     {/*   /!*top-[35%] md:left-[36%]  md:top-[30%]    border border-yellow-300*!/*/}
                     {/*   <Image*/}
                     {/*      src={house.src}*/}
                     {/*      alt={`Logo `}*/}
                     {/*      width="600"*/}
                     {/*      height="600"*/}
                     {/*      className="object-contain object-center w-full h-full opacity-100     "*/}
                     {/*   />*/}
                     {/*</div>*/}


                     <div
                        className=" absolute -bottom-3 w-24 text-center bg-white font-semibold text-xl text-blue-600 transform duration-200">
                        MyGED
                     </div>

                  </div>
               </div>

            </div>
         </div>
      </>
   )
}