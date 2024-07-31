"use client"
import React, {useEffect, useState} from "react";

import Barre from "@/components/Barre";
import ComeBack from "@/components/ComeBack";
import UsersList from "@/components/users/UsersList";
import AdminsList from "@/components/administration/AdminsList";
import AddSoustructure from "@/components/administration/AddSoustructure";
import AddUsers from "@/components/users/AddUsers";
import Delete from "@/components/users/Delete";
import UpdateUsers from "@/components/users/UpdateUsers";
import Image from "next/image";
import h from "../../../public/icons/menu_127px.png"
import house from "../../../public/icons/home_127px.png"
import  shut from "../../../public/icons/shutdown_127px.png"
import work from "../../../public/icons/user_folder_127px3.png"
import workspace from "@/public/img/maxresdefault (3).jpg";
import admins from '@/public/icons/administrative_tools_127px3.png'
import axios from "axios";
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import { io } from 'socket.io-client'

import Notifications from "@/components/Notifications";
import notif from "@/public/img/administration.jpg";
import process from "process";
export default function page() {
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [openSubMenu, setOpenSubMenu] = useState(false);
   const [reduce , setReduce] = useState(false)
   const [click ,setClick] = useState(1)
   const [comeBack , SetComeBack] = useState(false)
   const router = useRouter();
   const [ nom , SetNom] = useState("" )
   const [ photo , SetPhoto] = useState("" )
   const [ TheId , Setid] = useState(0 )
   const [poste , SetPoste] = useState("" )
   const [structure , SetStructure] = useState("" )
   const [ ShowNotifications , SetNotifications] = useState(false)    // constante pour afficher et cacher les notifications

   const [valueInTransmission, setValueTransmission] = useState(""); //constante qui permettra de recevoir les id de la strucure selectionner
   const updateValueInTransmission = (newValue) => {
      setValueTransmission(newValue);
   };

   const [valueNotification, setValueNotification] = useState(false); //constante qui permettra d'actualise la page de workspace
   const updateValueNotifications = (newValue2) => {
      setValueNotification(newValue2);
   };



   //constante d'ouverture de formulaire
   const [addDoc , SetDoc] = useState(false ) //nouveau fichier perso
   const [addDoc2 , SetDoc2] = useState(false ) // nouveau fichier des secretaires et autres structure
   const [ Showdelete ,SetDelete ] = useState(false)// formulaire de suppresion
   const [  ShowUpdate , setUpdate ] = useState(false)   //constante qui ouvre le formulaire de modif de users

   const [idAgent, setidAgent] = useState(false); //constante qui met a jour lorsque on appuie sur le bouton transmission sur la page courrier arrive
   const updateidAgent = (newValue2) => {
      setidAgent(newValue2);
   };

   const [ValueInArrive, setValueInArrive] = useState(0); //constante qui recuperer l'id du courrier pour mettre dans le formulaire de note
   const updateValueInArrive= (newValue) => {
      setValueInArrive(newValue);
   };




   const [showHeader, setshowHeader] = useState(false); //constante qui permettra d'actualiser le page archive des qu'un truc est archives
   const updateshowHeader = (newValue4) => {
      setshowHeader(newValue4);
   };



   const [valueAtransmettre, setValueAtransmettre] = useState(""); //constante qui dynamiser le contenu d'une notification
   const updateValueAtransmettre= (newValue) => {
      setValueAtransmettre(newValue);
   };


   const [actuNotif, setactuNotif] = useState(0); //constante qui permettra d'actualiser le nombre des notifiaction des que une action est effectue
   const updateactuNotif = (newValue) => {
      setactuNotif(newValue);
   };



   const [idDelete, setidDelete] = useState(0); //constante qui permettra d'actualiser le nombre des notifiaction des que une action est effectue
   const updateidDelete = (newValue) => {
      setidDelete(newValue);
   };


   const [idUpdate, setidUpdate] = useState(0); //constante qui permettra d'actualiser le nombre des notifiaction des que une action est effectue
   const updateidUpdate = (newValue) => {
      setidUpdate(newValue);
   };


   const pathname = usePathname();
   const searchParams = useSearchParams();
   const query = searchParams.get("bla");
   //fonction pour rechercher data dans l'url
   let decodedData = null;

   if (query) {
      decodedData = atob(decodeURIComponent(query));
      //decryptage des data present dans l"URL
   }
   const dat = JSON.parse(decodedData)
   console.log(dat);

   useEffect(() => {
   }, [decodedData]);

   const handleClickButton1 = () => {
      setClick(11);
   };

   const handleClickButton2 = () => {
      SetDoc(true)
   };
   const handleClickButton8 = () => {
      SetNotifications(true)
   };

   const handleClickButton3 = () => {
      SetDoc2(true)
   };
   const handleClickButton4 = () => {
      SetDelete(true)
   };

   const handleClickButton5 = () => {
      setUpdate(true)
   };



   const handleClickButton11 = () => {
      SetBackEndNotification(true)
   };


   const getData = async () => {
      try {
         const response = await axios.get(`${baseUrl}/agent/get_byId.php?id=${decodedData}`);

         if (response.data && response.data.recu && response.data.recu.length > 0) {

            console.log( response.data.recu )
            Setid(response.data.recu[0].id)
            SetNom(response.data.recu[0].nom)
            SetPhoto(response.data.recu[0].photo)
            SetPoste(response.data.recu[0].poste_agent)
            SetStructure(response.data.recu[0].id_structure)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }

   useEffect(()=>{
      getData()
   },[])
   useEffect(()=>{
      console.log(structure)
   },[getData])

   return(
      <>
         <div className="relative w-[100%] h-screen flex justify-between">

            <div
               className={`relative ${reduce ? ' w-[4%] transform duration-200' : ' w-[14%] transform duration-200'}  space-y-3 w- h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 opacity-95  content-container overflow-hidden `}>

               <div
                  className="relative h-[8%] bg-blue-950 text-center flex items-center justify-evenly bg-opacity-80">
                  <div>
                     <img src={h.src} alt=""
                          className={reduce ? 'absolute left-4 top-4 cursor-pointer' : 'absolute left-6 top-4 cursor-pointer'}
                          width={25}
                          height={25}
                          onClick={() => {
                             setReduce(!reduce);
                             setOpenSubMenu(false)
                          }}
                     />
                  </div>
                  <span
                     className={reduce ? ' hidden transform duration-200' : 'block font-semibold text-3xl text-blue-600 transform duration-200'}> MyGED</span>

               </div>
               <div className="relative  h-[92%] cursor-pointer w-[100%] overflow-y-auto scrollbar-hidden">
                  <div
                     className="relative h-[10%] flex justify-between text-white text-center hover:bg-white/5   decoration-sky-500 hover:shadow-2xl transition duration-300"
                     onClick={() => {
                        setClick(1);
                        setOpenSubMenu(setOpenSubMenu(false))
                     }}>
                     <div className={click === 1 ? "relative  w-[3%] bg-blue-500" : "hidden"}></div>

                     {/* Couleur bleue */}
                     <div className="relative  w-[90%] mx-3 space-x-9 flex items-center justify-center">
                        <img src={house.src} alt=""
                             className={reduce ? 'absolute left-1  cursor-pointer' : 'absolute left-3  cursor-pointer'}
                             width={25}
                             height={25}/>
                        <span
                           className={reduce ? ' hidden transform duration-200' : 'block font-extralight relative text-left  w-[60%] text-[16px] font-[Trebuchet] shadow-blue-300   transform duration-200'}>Accueil</span>

                     </div>
                  </div>


                  <div
                     className="relative h-[10%] flex justify-between text-white text-center hover:bg-white/5 decoration-sky-500 hover:shadow-2xl transition duration-300"
                     onClick={() => {
                        setClick(2)
                     }}
                  >
                     {/* Couleur bleue */}
                     <div className={click === 2 ? "relative  w-[3%] bg-blue-500" : "hidden"}></div>

                     <div className="relative  w-[90%] mx-2.5 space-x-9 flex items-center justify-center">
                        <img src={work.src} alt=""
                             className={reduce ? 'absolute left-1  cursor-pointer' : 'absolute left-3  cursor-pointer'}
                             width={25}
                             height={25}/>
                        <span
                           className={reduce ? ' hidden transform duration-200' : 'block font-extralight relative text-left  w-[60%] text-[16px] font-[Trebuchet] shadow-blue-300   transform duration-200'}>Utilisateurs</span>
                     </div>


                  </div>


                  {/*d*/}
                  <div
                     className="relative h-[10%] flex justify-between text-white text-center hover:bg-white/5 decoration-sky-500 hover:shadow-2xl transition duration-300"
                     onClick={() => {
                        setClick(3)
                     }}
                  >
                     {/* Couleur bleue */}
                     <div className={click === 3 ? "relative  w-[3%] bg-blue-500" : "hidden"}></div>

                     <div className="relative  w-[90%] mx-2.5 space-x-9 flex items-center justify-center">
                        <img src={admins.src} alt=""
                             className={reduce ? 'absolute left-1  cursor-pointer' : 'absolute left-3  cursor-pointer'}
                             width={25}
                             height={25}/>
                        <span
                           className={reduce ? ' hidden transform duration-200' : 'block font-extralight relative text-left  w-[60%] text-[16px] font-[Trebuchet] shadow-blue-300   transform duration-200'}>Administration</span>
                     </div>


                  </div>

                  {/*d*/}
                  <div
                     className="relative h-[10%] flex justify-between text-white text-center hover:bg-white/5 decoration-sky-500 hover:shadow-2xl transition duration-300"
                     onClick={() => {
                        // SetLoading (true);
                        setOpenSubMenu(setOpenSubMenu(false));
                        SetComeBack(!comeBack);

                     }}
                  >
                     <div className={click === 8 ? "relative  w-[3%] bg-blue-500" : "hidden"}></div>

                     <div className="relative  w-[90%] mx-2.5 space-x-9 flex items-center justify-center">
                        <img src={shut.src} alt=""
                             className={reduce ? 'absolute left-1  cursor-pointer' : 'absolute left-3  cursor-pointer'}
                             width={25}
                             height={25}/>
                        <span
                           className={reduce ? ' hidden transform duration-200' : 'block font-extralight relative text-left  w-[60%] text-[16px] font-[Trebuchet] shadow-blue-300   transform duration-200'}>Déconnexion</span>
                     </div>
                  </div>


               </div>
            </div>

            <div
               className={reduce ? ' relative w-[96%] h-screen transform duration-200' : ' relative w-[86%] h-screen  transform duration-200'}>
               <div
                  className="relative w-[100%] h-[8%]  space-x-2 shadow-md shadow-black/25   ">

                  <Barre id={decodedData} poste={poste} updateactuNotif={updateactuNotif} actuNotif={actuNotif}
                         valueAtransmettre={valueAtransmettre} showHeader={showHeader}
                         updateshowHeader={updateshowHeader} structure={structure}
                         handleClickButton11={handleClickButton11} updateValueAtransmettre={updateValueAtransmettre}/>

               </div>

               <div className="relative w-[100%] h-[92%]  ">
                  {click === 1 ?
                     <>
                        <div
                           className={'relative w-[100%] h-[100%] '}>
                           <div className="relative h-[100%] w-full   ">

                              <div
                                 className="relative w-[99%] mx-auto  h-[50%]  flex justify-between p-2 gap-1  ">

                              <div
                                    className="relative bg-white h-[110%]  w-[40%] border border-gray-400 rounded-xl  cursor-pointer  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 "

                                    onClick={() => {
                                       setClick(2)
                                    }}>
                                    <div className="relative h-[100%] w-[100%] flex items-center justify-center ">
                                       <img src={workspace.src} alt=""
                                            className="relative h-[100%] w-[100%] rounded-xl cursor-pointer"
                                       />


                                       <div
                                          className="absolute bottom-2 h-[63%] w-[100%] items-center justify-center  ">
                                          <div className="relative h-[50%] top-0 w-[100%] flex items-center  ">
                                          <span
                                             className="text-[40px] mx-auto  font-black font-[Gotham] text-indigo-900">Users Management</span>
                                          </div>
                                          <div
                                             className="absolute bottom-12  h-auto w-[100%]  items-center justify-center text-center ">
                                        <span
                                           className="text-sm text-justify ">Gérez les utilisateurs de l'application</span>

                                          </div>
                                       </div>
                                    </div>

                                 </div>

                                 {/*   Le 2eme*/}


                                 <div
                                    className="relative bg-white h-[110%]  w-[40%] border border-gray-400 rounded-xl  cursor-pointer  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 "
                                    onClick={() => {
                                       setClick(3)
                                    }}>
                                    <div className="relative h-[100%] w-[100%] flex items-center justify-center ">
                                       <img src={notif.src} alt=""
                                            className="relative h-[100%] w-[100%] rounded-xl cursor-pointer"
                                       />

                                       <div
                                          className="absolute bottom-2 h-[63%] w-[100%] items-center justify-center  ">
                                          <div className="relative h-[50%] top-0 w-[100%] flex items-center  ">
                                             {/*<span*/}
                                             {/*   className="text-[40px] mx-auto  font-black font-[Gotham] text-indigo-900">Archives</span>*/}
                                          </div>
                                          <div
                                             className="absolute bottom-4  h-auto w-[100%]  items-center justify-center text-center ">
                                        <span
                                           className="text-sm text-justify ">Pour la Gestion de l'administration de votre entrerpise</span>

                                          </div>
                                       </div>

                                    </div>

                                 </div>


                              </div>


                           </div>
                        </div>

                        {/*pour id et strucutre jenvoie les les infos a savoir i du gars et celui de la structure handleClickButton1 ouvir le component  */}

                     </> : click === 2 ? <UsersList handleClickButton3={handleClickButton3} handleClickButton8={handleClickButton8} updateValueNotifications={updateValueNotifications} handleClickButton4={handleClickButton4} updateidDelete={updateidDelete} handleClickButton5={handleClickButton5} updateidUpdate={updateidUpdate}/>
                       :click === 3 ? < AdminsList handleClickButton2={handleClickButton2}  updateValueInTransmission={updateValueInTransmission}/>
                        : null}
               </div>


            </div>


         </div>


         {
            ShowUpdate ? (<UpdateUsers setUpdate={setUpdate} idUpdate={idUpdate} handleClickButton8={handleClickButton8} updateValueNotifications={updateValueNotifications} />   ) :null
         }


         {
            Showdelete ? ( < Delete  SetDelete={SetDelete} idDelete={idDelete} updateidDelete={updateidDelete} handleClickButton8={handleClickButton8} updateValueNotifications={updateValueNotifications} /> ) :null
         }


         {
            comeBack ? (<ComeBack come={SetComeBack}/>) : null
         }

         {/*/!*Formulaire d'ajout de fichiers des autres*!/*/}
         {
            addDoc ? ( <AddSoustructure   SetDoc={SetDoc} handleClickButton8={handleClickButton8} updateValueNotifications={updateValueNotifications}  valueInTransmission={valueInTransmission}  /> ) : null
         }


         {/*/!*Formulaire de new users/*/}
         {
            addDoc2 ? ( <AddUsers SetDoc2={SetDoc2} handleClickButton8={handleClickButton8} updateValueNotifications={updateValueNotifications} /> ) : null
         }

         {/*Popup de notification*/}

         {
            ShowNotifications ? (  < Notifications SetNotifications={SetNotifications}  valueNotification={valueNotification} /> ) :null
         }





         {/*updateValueInTransmission={updateValueInTransmission}*/}







      </>
   )
}