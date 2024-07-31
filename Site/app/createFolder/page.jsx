"use client"
import React, { useEffect } from 'react';
import {useRouter} from "next/navigation";
//import  f from '../createFolder/fait'
//import createNewFolder from '../utils/createNewFolder'; // Assurez-vous d'importer correctement le chemin de votre fonction

const MyPage = () => {
   const router = useRouter();
   return (
      <div>
         {/*<h1  onClick={()=>router.push(`../createFolder/fait`)} >Ma welcome2 Next.js</h1>*/}
         <h1 onClick={() => router.push(`../createFolder/fait`)}>Ma page Next.js</h1>

      </div>
   );
};

export default MyPage;
