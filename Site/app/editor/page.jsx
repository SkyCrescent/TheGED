// 'use client'
// import {useEffect ,useRef} from "react";
// import WebViewer from "@pdftron/webviewer";
//
//
// export default function HomePage(){
//
//    const viewer = useRef(null)
//    useEffect(() => {
//       import('@pdftron/webviewer').then(()=>{
//
//             WebViewer(
//                {
//                   path : './lib',
//                   initialeDoc:'SOPECO.xls'
//                },
//                viewer.current,
//             ).then((instance)=>{
//                const {docViewer} = instance
//             })
//
//       })
//    }, []);
//
//
//    return(
//
//       <>
//          <div className="bg-black">
//             <div className="h-screen w-full" ref={viewer} style={{height: "100vh"}}></div>
//          </div>
//       </>
//    )
//
//
//  }

"use client"

import {useEffect, useRef} from 'react';
import WebViewer from "@pdftron/webviewer";
// import WebViewer from "@pdftron/webviewer";

export default function HomePage() {

   const viewer = useRef(null);

   useEffect(() => {
      import('@pdftron/webviewer').then(() => {
         WebViewer(
            {
               path: '/lib',
               initialDoc: 'SOPECO.xls',

            },
            viewer.current,
         ).then((instance) => {
            const { docViewer } = instance;
            // you can now call WebViewer APIs here...
         });

      })
   }, []);


   return (
      <div className="bg-white">
         <div className="text-5xl font-semibold text-amber-600">React sample</div>
         <button>Sauvegarder</button>
         <div className="h-screen w-full" ref={viewer} style={{height: "100vh"}}></div>
      </div>
   );

}



//
//
//
// import React, { useEffect, useRef, useState } from 'react';
// import WebViewer from "@pdftron/webviewer";
//
// export default function HomePage() {
//    const [instanceCreated, setInstanceCreated] = useState(false);
//    const viewer = useRef(null);
//
//    useEffect(() => {
//       if (instanceCreated) return; // Prevent re-creating instance
//
//       import('@pdftron/webviewer').then(() => {
//          WebViewer({
//             path: './lib',
//             //licenseKey: 'YOUR_LICENSE_KEY', // sign up to get a key at https://dev.apryse.com
//             initialDoc: 'La Liste des Enfants.docx',
//             enableOfficeEditing: true,
//          }, viewer.current)
//             .then((instance) => {
//                const { docViewer } = instance;
//                // Call WebViewer APIs here...
//                setInstanceCreated(true); // Mark instance as created
//             })
//             .catch((error) => {
//                // Handle any errors
//                console.error('Error creating WebViewer instance:', error);
//             });
//       });
//    }, []);
//
//    return (
//       <div className="bg-white">
//          <div className="text-5xl font-semibold text-amber-600">React sample</div>
//          <button>Sauvegarder</button>
//          <div className="h-screen w-full" ref={viewer} style={{ height: "100vh" }}></div>
//       </div>
//    );
// }
