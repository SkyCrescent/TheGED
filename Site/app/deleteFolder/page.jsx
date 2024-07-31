"use client"
import React, { useEffect } from 'react';
import {useRouter} from "next/navigation";
//import  f from '../createFolder/fait'
//import createNewFolder from '../utils/createNewFolder'; // Assurez-vous d'importer correctement le chemin de votre fonction

const MyPage = () => {
   const router = useRouter();

   // async function deleteFolder(folderPath) {
   //    try {
   //       const response = await fetch('/api/deleteFolder', {
   //          method: 'POST',
   //          headers: {
   //             'Content-Type': 'application/json'
   //          },
   //          body: JSON.stringify({ folderPath })
   //       });
   //
   //       const result = await response.json();
   //
   //       if (response.ok) {
   //          console.log('Folder deleted successfully:', result);
   //       } else {
   //          console.error('Error deleting folder:', result.error);
   //       }
   //    } catch (error) {
   //       console.error('Request failed:', error);
   //    }
   // }

   return (
      <div>
         {/*<h1  onClick={()=>router.push(`../createFolder/fait`)} >Ma welcome2 Next.js</h1>*/}
         <h1 onClick={() => router.push(`../deleteFolder/fait`)}>Ma page Next.js</h1>

      </div>
   );
};

export default MyPage;
