"use client"
import { useState, useEffect } from "react";
import React from "react";
import h from "../public/icons/user_127px.png";
import notification from '@/public/icons/notification_127px.png'
import notification2 from '@/public/icons/alarm_clock_127px.png'
import add from '@/public/icons/plus_math_127px2.png'
import add2 from '@/public/icons/plus_math_127px.png'

import axios from "axios";
import io from 'socket.io-client';
import process from "process";
import {usePathname} from "next/navigation";

export default function Barre({id,poste,actuNotif ,updateactuNotif,valueAtransmettre,showHeader,updateshowHeader,structure,handleClickButton11,updateValueAtransmettre}) {
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;

   const [ nom , SetNom] = useState("" )
   const [ photo , SetPhoto] = useState("" )
   const [poste2 , SetPoste] = useState("" )
   const [service , setService] = useState("")
   const [ Description , SetDescription ] = useState("")
   const [ changePhoto , SetChangePhoto ] = useState(false)
   const [structure2 , SetStructure2] = useState("" )
   const [ TheId , Setid] = useState(0 )
   const [ number , SetNumber] = useState(0 )
   // Nouvel état local pour stocker la valeur de structure2 avant d'ouvrir le formulaire
   const [tempStructure2, setTempStructure2] = useState(0);
   const [tempStructure3, setTempStructure3] = useState(false);
   const pathname = usePathname();


   useEffect(() => {
      if (structure2) {
         getData3(structure2);
         getData2()
      }
   }, [structure2]);

   const getData4 = async () => {
      try {
         const response = await axios.get(`${baseUrl}/agent/get_byId.php?id=${id}`);

         if (response.data && response.data.recu && response.data.recu.length > 0) {

            console.log( response.data.recu )
            Setid(response.data.recu[0].id)
            SetStructure2(response.data.recu[0].id_structure)
            SetPoste(response.data.recu[0].poste_agent)
            setService(response.data.recu[0].service)
            const response2 = await axios.get(`${baseUrl}/notification/get_allNotifications.php?destinataire=${response.data.recu[0].id_structure}&poste=${response.data.recu[0].poste_agent}`);
            console.log( response2.data.recu[0].destinataire )
            if ( response2.data.recu[0].destinataire !== 0) {
               SetNumber(response2.data.recu[0].destinataire)
               setTempStructure2(response2.data.recu[0].destinataire)

               console.log( response2.data.recu[0].destinataire )

               SetChangePhoto(true)
            } else {
               SetNumber(0)
               console.log("il ya rien " )

               SetChangePhoto(false)
               console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response2);
            }





         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }

   const getData = async () => {
      try {
         const response = await axios.get(`${baseUrl}/agent/get_byId.php?id=${id}`);

         if (response.data && response.data.recu && response.data.recu.length > 0) {

            console.log( response.data.recu )
            SetNom(response.data.recu[0].nom)
            SetPhoto(response.data.recu[0].photo)
            SetPoste(response.data.recu[0].poste_agent)
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }

   const getData2 = async () => {
      try {
         const response = await axios.get(`${baseUrl}/Structure/get_byId2.php?id=${structure2}`);

         if (response.data && response.data.recu && response.data.recu.length > 0) {

            console.log( response.data.recu )
            SetDescription(response.data.recu[0].Description)
         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }

   const getData3 = async (structure2) => {
      try {
         const response = await axios.get(`${baseUrl}/notification/get_allNotifications.php?destinataire=${structure2}&poste=${poste}`);

         if ( response.data.recu[0].destinataire !== 0) {
               SetNumber(response.data.recu[0].destinataire)
            setTempStructure2(response.data.recu[0].destinataire)
            console.log( response.data.recu[0].destinataire )

            SetChangePhoto(true)
         } else {
            console.log("il ya rien " )

            SetChangePhoto(false)
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }

   const getData5 = async () => {
   //  console.log((valueAtransmettre))
     //console.log(tempStructure2)
      try {
         const response = await axios.get(`${baseUrl}/notification/get_allNotifications.php?destinataire=${valueAtransmettre}&poste=${poste}`);

         if ( response.data.recu[0].destinataire !== 0) {
            SetNumber(response.data.recu[0].destinataire)
            setTempStructure2(response.data.recu[0].destinataire)
            console.log( response.data.recu[0].destinataire )

            SetChangePhoto(true)
         } else {
            SetNumber(0)
            console.log("il ya rien " )

            SetChangePhoto(false)
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }

   {
      showHeader  ? (()=>{
         console.log("valeur recuperer ",valueAtransmettre)
         getData5()
         console.log('actualisation effctue');
         updateshowHeader(false)
          } )():null
   }

   {
      console.log("la valeur recu est ",actuNotif)
      actuNotif !== 0 ? (() => {
         const socket = io("http://localhost:3000");
         socket.emit('actualiser'); // Envoyer l'ID de la structure avec l'événement
        console.log('Votre nombre pour cette notif', actuNotif);
         updateactuNotif(0)
      })() : (
         console.log("Il n'y a rien")
      );
   }


   useEffect(() => {
      getData()
      console.log(photo)
      getData4();

   }, []);


   useEffect(() => {
      const socket = io("http://localhost:3000");

      socket.on('connect', () => {
         console.log('Connected to server');
      });
      socket.on('Notificationloader', () => {
         getData4()
         //getData6(structure2)
         console.log('Votre notificationffdggfs')
      });
      socket.on('disconnect', () => {
         console.log('Disconnected from server');
      });

      return () => {
         socket.disconnect();
      };
   }, []);

   return(


      <>

         <div
            className="absolute left-0 flex justify-evenly space-x-3 px-3  w-[40.5%] h-[100%] text-left items-center justify-center ">
            <div className="relative h-[50%] w-[100%] text-xl text-sky-800 font-bold  "

            >


               {
                  pathname.includes('admin')   ? "Vous êtes le Super Administrateur de MyGED" :

                     Description

               }


            </div>

         </div>
         <div
            className="absolute right-2 flex justify-between space-x-0  w-[65%] h-[100%]  text-center ">

            <div className="relative mx-3 w-[80%] text-right ">

               <div className="relative h-[50%] w-[100%] text-xl font-bold "> {nom} </div>
               <div className="relative h-[50%] w-[100%] text-sm text-gray-600">
                  {
                     pathname.includes('admin')
                        ? poste
                        : <>
                           {poste} au <span className='font-bold'>{service}</span>
                        </>
                  }
               </div>

               {/*<div className="relative h-[50%] w-[100%] text-sm text-gray-600 ">*/}


               {/*   {*/}
               {/*      pathname.includes('admin')   ? null:*/}

               {/*         {poste}     au <span className='font-bold'>{service}</span>*/}


               {/*   }*/}


               {/*</div>*/}

            </div>


            <div
               className=
                  {
                     pathname.includes('admin') ? "hidden" :

                        "relative w-[6%] h-[83%] top-1 -right-2 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer "

                  }



               onClick={() => {
                  updateValueAtransmettre(structure2);
                  handleClickButton11();
               }}
            >


               <img
                  src={notification2.src}
                  title="Vos notifications"
                  onClick={handleClickButton11}
                  alt="Image sélectionnée"
                  className="relative h-[55%] z-10 rounded-full w-[50%] "
               />
               <span className=" absolute bg-red-600 rounded-full  z-20 size-3/6 -right-0.5 top-5 flex items-center justify-center font-light text-white text-sm">
                  {number}
               </span>


            </div>



            <div
               className="relative w-[10%] h-[95%] top-0.5 -right-2 flex items-center justify-center rounded-full ">
               <img
                  src={`/${photo}`}
                  alt="Image sélectionnée"
                  className="relative h-[100%] rounded-full w-[70%] z-40"
               />
            </div>

         </div>

         {/*<div className="relative w-[100%] h-[8%]  space-x-2 shadow-md shadow-black/25  flex  border border-black bg-black  ">*/}

         {/*   <div*/}
         {/*      className="absolute right-2 flex justify-between w-[55%] h-[100%] text-center ">*/}
         {/*      <div className="relative w-[90%] text-right">*/}
         {/*         <div className="relative h-[50%] w-[100%] text-xl font-bold ">Jean Bourreau</div>*/}
         {/*         <div className="relative h-[50%] w-[100%] text-sm text-gray-50 opacity-100 ">Chef de Serice :La Direction Administrative et du Personnel</div>*/}

         {/*      </div>*/}
         {/*      <div*/}
         {/*         className="relative w-[12%] h-[100%] top-0 right-2 flex items-center justify-center rounded-full ">*/}
         {/*         <img*/}
         {/*            src={h.src}*/}
         {/*            alt="Image sélectionnée"*/}
         {/*            className="relative h-full rounded-full w-auto z-40"*/}
         {/*         />*/}
         {/*      </div>*/}

         {/*   </div>*/}
         {/*</div>*/}
      </>
   )
}