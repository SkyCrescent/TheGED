"use client"
import React, {useEffect, useState} from "react";

import Barre from "@/components/Barre";
import FilterArchive from "@/components/FilterArchive";
import MenuPrincipal from "@/components/MenuPrincipal";
import Workspace from "@/components/Workspace";
import Message from "@/components/Message";
import Notifications from "@/components/Notifications";
import NOTREGED from "@/components/NOTREGED";
import HISTORIC from "@/components/HISTORIC.jsx";
import Register from "@/components/Register";
import Archive from "@/components/Archive";
import Admi from "@/components/Admi";
import ComeBack from "@/components/ComeBack";
import AddDoc from "@/components/AddDoc";
import AddDoc2 from '@/components/AddDoc2'
import CourrierDepart from '@/components/NewCourier/CourrierDepart'
import CourrierArrive from "@/components/NewCourier/CourrierArrive";
import NewCourrierArrive from "@/components/NewCourier/NewCourrierArrive";
import Transmission from "@/components/NewCourier/Transmission";
import Transfert from "@/components/Transfert";
import Transfert3 from "@/components/Transfert3";
import Delete from "@/components/Delete";
import BackEndNotifications from "@/components/Notifications/BackEndNotifications";
import DirectorHistoric from "@/components/DirectorHistoric";

import Return from "@/components/NewCourier/Return";

import Image from "next/image";
import h from "../../../public/icons/menu_127px.png"
import house from "../../../public/icons/home_127px.png"
import  msg from "../../../public/icons/messaging_127px.png"
import  register from "../../../public/icons/book_127px.png"
import  shut from "../../../public/icons/shutdown_127px.png"
import  bas from "../../../public/icons/down.png"
import  space from "../../../public/icons/workspace_127px2.png"
import work from "../../../public/icons/historical_127px.png"
import notif from "@/public/img/administration.jpg"
import notif2 from "@/public/icons/google_alerts_127px.png"
import archive from "../../../public/icons/archive_127px.png"
import Style from "../../../styles/Page.css"
import ged from "@/public/img/GED.jpg";
import workspace from "@/public/img/maxresdefault (3).jpg";
import work2 from "@/public/img/partage.jpg"
import zip from "@/public/img/Archivage.jpeg";
import histo from '@/public/img/1599218815.jpeg'
import axios from "axios";
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import { io } from 'socket.io-client'
import process from "process";
export default function page() {
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [openSubMenu, setOpenSubMenu] = useState(false);
   const [reduce , setReduce] = useState(false)
   const [click ,setClick] = useState(1)
   const [comeBack , SetComeBack] = useState(false)
   const router = useRouter();
   const [word , Setwork] = useState(false)
   const [Archives , SetArchives] = useState(false)
   const [GED , SetGED] = useState(false)
   const [Histo , SetHisto] = useState(false)
   const [Admin , SetAdmin] = useState(false)
   const [Admin2 , SetAdmin2] = useState(false)
   const [ nom , SetNom] = useState("" )
   const [ photo , SetPhoto] = useState("" )
   const [ TheId , Setid] = useState(0 )
   const [poste , SetPoste] = useState("" )
   const [structure , SetStructure] = useState("" )
   const [ service ,SetService ] = useState("")
   const [ comegreen , SetComegreen ] = useState(false)  // Le centre define enorme et vert
   const [ ShowNotifications , SetNotifications] = useState(false)    // constante pour afficher et cacher les notifications

   const [valueInTransmission, setValueTransmission] = useState(""); //constante qui permettra de recevoir les id de transmision
   const updateValueInTransmission = (newValue) => {
      setValueTransmission(newValue);
   };

   const [valueNotifications, setValueNotifications] = useState(false); //constante qui permettra d'actualise la page de workspace
   const updateValueNotifications = (newValue2) => {
      setValueNotifications(newValue2);
   };

   const [valueCourrier, setCourrier] = useState(0); //constante qui permettra d'actualise la page des courrier
   const updateCourrier = (newValue2) => {
      setCourrier(newValue2);
   };

   const [valueNotification, setValueNotification] = useState(""); //constante qui dynamiser le contenu d'une notification
   const updateValueNotification= (newValue) => {
      setValueNotification(newValue);
   };

   const [ValueInArrive, setValueInArrive] = useState(0); //constante qui recuperer l'id du courrier pour mettre dans le formulaire de note
   const updateValueInArrive= (newValue) => {
      setValueInArrive(newValue);
   };


   const [valueDelete, setValueDelete] = useState(0); //constante qui dynamiser l'id  de la page de suppression'
   const updateValueDelete= (newValue) => {
      setValueDelete(newValue);
   };

   //constante d'ouverture de formulaire
   const [addDoc , SetDoc] = useState(false ) //nouveau fichier perso
   const [addDoc2 , SetDoc2] = useState(false ) // nouveau fichier des secretaires et autres structure
   const [ EnterCourrier ,SetEnterCourrier] = useState(false) // nouveau courrier entrant
   const [ SendCourier ,SetSendCourier ] = useState(false) // nouveau courier depart
   const [ SendParafeux ,SetSendParafeux ] = useState(false) // Envoyer ver le parafeux
   const [ SendInterne ,SetInterne ] = useState(false) // Transmission Intenne
   const [ sendFiles , SetSendFiles ] = useState(false) //Transfert ou partage de fichiers
   const [ sendFiles1 , SetSendFiles1 ] = useState(false) //Transfert ou partage de fichiers
   const [ Showdelete , SetDelete  ] = useState(false)  // le component de suppression de fichier
   const [ ShowBackEndNotification , SetBackEndNotification  ] = useState(false)  // le component qui affiche les notifications venant du back
   const [  ShowReturn , setReturn ] = useState(false)   //constante qui ouvre le formulaire d'envoi de notes pour la reponse a la transmission interne

   const [ ShowHistoric ,setShowHistoric ] = useState(false)
   const [idAgent, setidAgent] = useState(false); //constante qui met a jour lorsque on appuie sur le bouton transmission sur la page courrier arrive
   const updateidAgent = (newValue2) => {
      setidAgent(newValue2);
   };


   const [idFiles, setidFiles] = useState(0); //constante qui dynamiser le contenu da la page de transfert de workspace
   const updateIdFiles= (newValue) => {
      setidFiles(newValue);
   };


   const [valueUpdateArchive, setValueUpdateArchive] = useState(false); //constante qui permettra d'actualiser le page archive des qu'un truc est archives
   const updateValueUpdateArchive = (newValue4) => {
      setValueUpdateArchive(newValue4);
   };


   const [showHeader, setshowHeader] = useState(false); //constante qui permettra d'actualiser le page archive des qu'un truc est archives
   const updateshowHeader = (newValue4) => {
      setshowHeader(newValue4);
   };



   const [valueAtransmettre, setValueAtransmettre] = useState(""); //constante qui dynamiser le contenu d'une notification
   const updateValueAtransmettre= (newValue) => {
      setValueAtransmettre(newValue);
   };


   const [actuNotif, setactuNotif] = useState(0); //constante qui permettra d'actualiser le page archive des qu'un truc est archives
   const updateactuNotif = (newValue) => {
      setactuNotif(newValue);
   };


   const [UpdateValueTransmission, setUpdateValueTransmission] = useState(false); //constante qui permettra d'actualiser le page transmission interne des que le formulaire note est valide
   const UpdateYourValueTransmission = (newValue) => {
      setUpdateValueTransmission(newValue);
   };

   const [RefreshTransmissionInterne, setRefreshTransmissionInterne] = useState(false); //constante qui met a jour lorsque on appuie sur le bouton transmission sur la page courrier arrive
   const updateRefreshTransmissionInterne = (newValue2) => {
      setRefreshTransmissionInterne(newValue2);
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

   const handleClickButton3 = () => {
      SetDoc2(true)
   };

   const handleClickButton4 = () => {
      SetSendCourier(true)
   };

   const handleClickButton5 = () => {
      SetSendParafeux(true)
   };

   const handleClickButton6 = () => {
      SetInterne(true)
   };

   const handleClickButton7 = () => {
      SetSendFiles(true)
   };

   const handleClickButton8 = () => {
      SetNotifications(true)
   };

   const handleClickButton9 = () => {
      SetSendFiles1(true)
   };

   const handleClickButton10 = () => {
      SetDelete(true)
   };

   const handleClickButton11 = () => {
      SetBackEndNotification(true)
   };

   const handleClickButton12 = () => {
      setReturn(true)
   };

   const handleClickButton13 = () => {
      setShowHistoric(true)
   };
   const handleClickButton14 = () => {
      SetEnterCourrier(true)
   }

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
            SetService(response.data.recu[0].service)

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
               className={`relative ${reduce ? ' w-[4%] transform duration-200' : ' w-[16%] transform duration-200'}  space-y-3 w- h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 opacity-95  content-container overflow-hidden `}>

               <div
                  className="relative h-[8%] bg-blue-950 text-center flex items-center justify-center bg-opacity-80">
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
                     className="relative h-[10%] flex justify-between text-white text-center hover:bg-white/5   decoration-sky-500 hover:shadow-2xl transition duration-300"
                     onClick={() => {
                        setClick(2);
                        setOpenSubMenu(setOpenSubMenu(false))
                     }}>
                     <div className={click === 2 ? "relative  w-[3%] bg-blue-500" : "hidden"}></div>

                     {/* Couleur bleue */}
                     <div className="relative  w-[90%] mx-3 space-x-9 flex items-center justify-center">
                        <img src={space.src} alt=""
                             className={reduce ? 'absolute left-1  cursor-pointer' : 'absolute left-3  cursor-pointer'}
                             width={25}
                             height={25}/>
                        <span
                           className={reduce ? ' hidden transform duration-200' : 'block font-extralight relative text-left  w-[60%] text-[16px] font-[Trebuchet] shadow-blue-300   transform duration-200'}>WorkSpace</span>

                     </div>
                  </div>
                  {/*<div*/}
                  {/*   className="relative h-[10%] flex justify-between text-white text-center hover:bg-white/5 decoration-sky-500 hover:shadow-2xl transition duration-300"*/}
                  {/*   onClick={() => {*/}
                  {/*      setClick(3);*/}
                  {/*      setOpenSubMenu(setOpenSubMenu(false))*/}
                  {/*   }}>*/}
                  {/*   /!*<div className="relative  w-[3%] bg-blue-500"></div>*!/*/}
                  {/*   /!* Couleur bleue *!/*/}
                  {/*   <div className={click === 3 ? "relative  w-[3%] bg-blue-500" : "hidden"}></div>*/}

                  {/*   <div className="relative  w-[90%] mx-2.5 space-x-9 flex items-center justify-center">*/}
                  {/*      <img src={msg.src} alt=""*/}
                  {/*           className={reduce ? 'absolute left-1  cursor-pointer' : 'absolute left-3  cursor-pointer'}*/}
                  {/*           width={25}*/}
                  {/*           height={25}/>*/}
                  {/*      <span*/}
                  {/*         className={reduce ? ' hidden transform duration-200' : 'block font-extralight relative text-left  w-[60%] text-[16px] font-[Trebuchet] shadow-blue-300   transform duration-200'}>Notes</span>*/}
                  {/*   </div>*/}


                  {/*</div>*/}

                  {/*<div*/}
                  {/*   className="relative h-[10%] flex justify-between text-white text-center hover:bg-white/5 decoration-sky-500 hover:shadow-2xl transition duration-300"*/}
                  {/*   onClick={() => {*/}
                  {/*      setClick(4);*/}
                  {/*      setOpenSubMenu(setOpenSubMenu(false))*/}
                  {/*   }}>*/}
                  {/*   /!*<div className="relative  w-[3%] bg-blue-500"></div>*!/*/}
                  {/*   /!* Couleur bleue *!/*/}
                  {/*   <div className={click === 4 ? "relative  w-[3%] bg-blue-500" : "hidden"}></div>*/}

                  {/*   <div className="relative  w-[90%] mx-2.5 space-x-9 flex items-center justify-center">*/}
                  {/*      <img src={notif2.src} alt=""*/}
                  {/*           className={reduce ? 'absolute left-1  cursor-pointer' : 'absolute left-3  cursor-pointer'}*/}
                  {/*           width={25}*/}
                  {/*           height={25}/>*/}
                  {/*      <span*/}
                  {/*         className={reduce ? ' hidden transform duration-200' : 'block font-extralight relative text-left  w-[60%] text-[16px] font-[Trebuchet] shadow-blue-300   transform duration-200'}>Notification</span>*/}
                  {/*   </div>*/}


                  {/*</div>*/}

                  <div
                     className="relative h-[10%] w-[100%] flex text-white text-center hover:bg-white/5 decoration-sky-500 hover:shadow-2xl transition duration-300"
                     onClick={() => {
                        setClick(9)
                     }}>
                     {/* Couleur bleue */}
                     <div className={click === 9 ? "relative  w-[3%] bg-blue-500" : "hidden"}></div>

                     <div className="relative  w-[100%] mx-2.5 space-x-12 flex items-center justify-center"
                          onClick={() => {
                             !reduce ? setOpenSubMenu(!openSubMenu) : null
                          }}>
                        <img src={register.src} alt=""
                             className={reduce ? 'absolute left-1  cursor-pointer' : 'absolute left-3  cursor-pointer'}
                             width={25}
                             height={25}/>
                        <span
                           className={reduce ? ' hidden transform duration-200' : 'block font-extralight relative text-left  w-[60%] text-[16px] font-[Trebuchet] shadow-blue-300   transform duration-200'}>Registre Journalier</span>
                     </div>
                  </div>

                  <div
                     className="relative h-[10%] flex justify-between text-white text-center hover:bg-white/5 decoration-sky-500 hover:shadow-2xl transition duration-300"
                     onClick={() => {
                        setClick(6);
                        setOpenSubMenu(setOpenSubMenu(false))
                     }}
                  >
                     {/* Couleur bleue */}
                     <div className={click === 6  ? "relative  w-[3%] bg-blue-500" : "hidden"}></div>

                     <div className="relative  w-[90%] mx-2.5 space-x-9 flex items-center justify-center">
                        <img src={archive.src} alt=""
                             className={reduce ? 'absolute left-1  cursor-pointer' : 'absolute left-3  cursor-pointer'}
                             width={25}
                             height={25}/>
                        <span
                           className={reduce ? ' hidden transform duration-200' : 'block font-extralight relative text-left  w-[60%] text-[16px] font-[Trebuchet] shadow-blue-300   transform duration-200'}>Archives</span>
                     </div>


                  </div>

                  <div
                     className="relative h-[10%] flex justify-between text-white text-center hover:bg-white/5 decoration-sky-500 hover:shadow-2xl transition duration-300"
                     onClick={() => {
                        setClick(11)
                     }}
                  >
                     {/* Couleur bleue */}
                     <div className={click === 11 ? "relative  w-[3%] bg-blue-500" : "hidden"}></div>

                     <div className="relative  w-[90%] mx-2.5 space-x-9 flex items-center justify-center">
                        <img src={work.src} alt=""
                             className={reduce ? 'absolute left-1  cursor-pointer' : 'absolute left-3  cursor-pointer'}
                             width={25}
                             height={25}/>
                        <span
                           className={reduce ? ' hidden transform duration-200' : 'block font-extralight relative text-left  w-[60%] text-[16px] font-[Trebuchet] shadow-blue-300   transform duration-200'}>Historique</span>
                     </div>


                  </div>

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


                  {/*   test*/}


                  {/*<div*/}
                  {/*   className="relative h-[10%] flex justify-between text-white text-center hover:bg-white/5 decoration-sky-500 hover:shadow-2xl transition duration-300"*/}
                  {/*   onClick={() => {*/}
                  {/*      // SetLoading (true);*/}
                  {/*     // setOpenSubMenu(setOpenSubMenu(false));*/}
                  {/*     // SetComeBack(!comeBack);*/}

                  {/*   }}*/}
                  {/*>*/}
                  {/*   <div className={click === 8 ? "relative  w-[3%] bg-blue-500" : "hidden"}></div>*/}

                  {/*   <div className="relative  w-[90%] mx-2.5 space-x-9 flex items-center justify-center">*/}
                  {/*      <img src={shut.src} alt=""*/}
                  {/*           className={reduce ? 'absolute left-1  cursor-pointer' : 'absolute left-3  cursor-pointer'}*/}
                  {/*           onClick={()=>{*/}
                  {/*              updateshowHeader(!showHeader)*/}
                  {/*           }}*/}
                  {/*           width={25}*/}
                  {/*           height={25}/>*/}
                  {/*      <span*/}
                  {/*         className={reduce ? ' hidden transform duration-200' : 'block font-extralight relative text-left  w-[60%] text-[16px] font-[Trebuchet] shadow-blue-300   transform duration-200'}>test</span>*/}
                  {/*   </div>*/}
                  {/*</div>*/}

               </div>
            </div>

            <div
               className={reduce ? ' relative w-[96%] h-screen transform duration-200' : ' relative w-[84%] h-screen  transform duration-200'}>
               <div
                  className="relative w-[100%] h-[8%]  space-x-2 shadow-md shadow-black/25   ">

                  <Barre id={decodedData} poste={poste} updateactuNotif={updateactuNotif}  actuNotif={actuNotif} valueAtransmettre={valueAtransmettre} showHeader={showHeader} updateshowHeader={updateshowHeader} structure={structure}  handleClickButton11={handleClickButton11} updateValueAtransmettre={updateValueAtransmettre}/>

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
                                    className="relative bg-white h-[100%]  w-[33%] border border-gray-400 rounded-xl  cursor-pointer  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 "
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
                                             className="text-[40px] mx-auto  font-black font-[Gotham] text-indigo-900">WorkSpace</span>
                                          </div>
                                          <div
                                             className="absolute bottom-12  h-auto w-[100%]  items-center justify-center text-center ">
                                        <span
                                           className="text-sm text-justify ">Accedez a vos fichiers personnels</span>

                                          </div>
                                       </div>
                                    </div>

                                 </div>


                                 <div
                                    className="relative bg-white h-[100%]  w-[33%] border border-gray-400 rounded-xl  cursor-pointer  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 "
                                    onClick={() => {
                                       setClick(6)
                                    }}>
                                    <div className="relative h-[100%] w-[100%] flex items-center justify-center ">
                                       <img src={zip.src} alt=""
                                            className="relative h-[100%] w-[100%] rounded-xl cursor-pointer"
                                       />

                                       <div
                                          className="absolute bottom-2 h-[63%] w-[100%] items-center justify-center  ">
                                          <div className="relative h-[50%] top-0 w-[100%] flex items-center  ">
                                          <span
                                             className="text-[40px] mx-auto  font-black font-[Gotham] text-white">Archives</span>
                                          </div>
                                          <div
                                             className="absolute bottom-12  h-auto w-[100%]  items-center justify-center text-center ">
                                        <span
                                           className="text-sm text-justify ">Visualiser les archives liées a votre direction</span>

                                          </div>
                                       </div>

                                    </div>
                                 </div>


                                 <div
                                    className="relative bg-white h-[100%]  w-[33%] border border-gray-400 rounded-xl  cursor-pointer  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 "
                                    onClick={() => {
                                       setClick(9)
                                    }}>
                                    <div className="relative h-[100%] w-[100%] flex items-center justify-center ">
                                       <img src={ged.src} alt=""
                                            className="relative h-[100%] w-[100%] rounded-xl cursor-pointer"
                                       />

                                       <div
                                          className="absolute bottom-2 h-[63%] w-[100%] items-center justify-center  ">
                                          <div className="relative h-[50%] top-0 w-[100%] flex items-center  ">
                                          <span
                                             className="text-[40px] mx-auto  font-black font-[Gotham] text-gray-100">GED</span>
                                          </div>
                                          <div
                                             className="absolute bottom-6 text-white  h-auto w-[100%]  items-center justify-center text-center ">
                                        <span
                                           className="text-sm text-justify ">Acceder aux documents de votre service via les registres Journaliers</span>

                                          </div>
                                       </div>

                                    </div>
                                 </div>


                              </div>

                              <div
                                 className="relative w-[99%] mx-auto h-[50%]   flex   p-2 gap-2  ">
                                 <div
                                    className="relative bg-white h-[100%]  w-[33%] border border-gray-400 rounded-xl  cursor-pointer  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 "
                                    onClick={() => {
                                       setClick(10)
                                    }}>
                                    <div className="relative h-[100%] w-[100%] flex items-center justify-center ">
                                       <img src={work2.src} alt=""
                                            className="relative h-[100%] w-[100%] rounded-xl cursor-pointer"
                                       />
                                       <div
                                          className="absolute bottom-2 h-[63%] w-[100%] items-center justify-center  ">
                                          <div className="relative h-[50%] top-0 w-[100%] flex items-center  ">
                                          <span
                                             className="text-[40px] mx-auto  font-black font-[Gotham] text-black">Partage </span>

                                          </div>
                                          <div
                                             className="absolute bottom-12  h-auto w-[100%]  items-center justify-center text-center ">
                                        <span
                                           className="text-sm text-justify text-black font-semibold ">Partager vos fichiers avec differente personne de votre direction</span>

                                          </div>
                                       </div>
                                    </div>

                                 </div>

                                 <div
                                    className="relative bg-white h-[100%]  w-[33%] border border-gray-400 rounded-xl  cursor-pointer  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 "
                                    onClick={() => {
                                       setClick(11)
                                    }}>
                                    <div className="relative h-[100%] w-[100%] flex items-center justify-center ">
                                       <img src={histo.src} alt=""
                                            className="relative h-[100%] w-[100%] rounded-xl cursor-pointer"
                                       />

                                       <div
                                          className="absolute bottom-2 h-[63%] w-[100%] items-center justify-center  ">
                                          <div className="relative h-[50%] top-0 w-[100%] flex items-center  ">
                                             {/*<span*/}
                                             {/*   className="text-[40px] mx-auto  font-black font-[Gotham] text-indigo-900">Archives</span>*/}
                                          </div>
                                          <div
                                             className="absolute   h-auto w-[100%]  items-center justify-center text-center ">
                                        <span
                                           className="text-sm text-justify  font-semibold">Pour voir vos différentes activites sur MyGED</span>

                                          </div>
                                       </div>

                                    </div>
                                 </div>

                              </div>
                           </div>
                        </div>

                        {/*pour id et strucutre jenvoie les les infos a savoir i du gars et celui de la structure handleClickButton1 ouvir le component  */}

                     </> : click === 2 ? <Workspace updateValueUpdateArchive={updateValueUpdateArchive} nomAgent={nom}
                                                    updateValueDelete={updateValueDelete}
                                                    handleClickButton10={handleClickButton10}
                                                    updateValueNotification={updateValueNotification}
                                                    handleClickButton8={handleClickButton8}
                                                    updateIdFiles={updateIdFiles}
                                                    handleClickButton9={handleClickButton9}
                                                    updateValueNotifications={updateValueNotifications}
                                                    valueNotifications={valueNotifications} id_agent={TheId}
                                                    id={decodedData} structure={structure} reduce={reduce}
                                                    handleClickButton1={handleClickButton2}
                                                    handleClickButton2={handleClickButton3}/>
                        : click === 3 ? <Message structure={structure}/>
                           : click === 4 ? <Notifications/>
                              : click === 5 ? <Register/>
                                 : click === 6 ?
                                    <Archive data={valueUpdateArchive} setValueUpdateArchive={setValueUpdateArchive}
                                             updateValueNotification={updateValueNotification}
                                             handleClickButton8={handleClickButton8} id_agent={TheId}
                                             structure={structure} id={decodedData} reduce={reduce} click={click}
                                             handleClickButton1={handleClickButton1}/>
                                    : click === 7 ? <Admi />
                                       : click === 9 ? <NOTREGED
                                             handleClickButton14 = {handleClickButton14}
                                             service={service}
                                             updateactuNotif={updateactuNotif} structure={structure}
                                                                 updateRefreshTransmissionInterne={updateRefreshTransmissionInterne}
                                                                 UpdateYourValueTransmission={UpdateYourValueTransmission}
                                                                 UpdateValueTransmission={UpdateValueTransmission}
                                                                 updateValueInArrive={updateValueInArrive}
                                                                 handleClickButton12={handleClickButton12} updateValueNotifications={updateValueNotifications} handleClickButton8={handleClickButton8} updateValueNotification={updateValueNotification} valueCourrier={valueCourrier} updateCourrier={updateCourrier}  updateValueInTransmission={updateValueInTransmission}  Myid={structure} handleClickButton4={handleClickButton4} handleClickButton5={handleClickButton5} handleClickButton6={handleClickButton6}  />
                                          :click === 10 ? <HISTORIC poste={poste} id={decodedData} structure={structure} handleClickButton7={handleClickButton7}/>
                                             :click === 11 ? <FilterArchive handleClickButton13={handleClickButton13} updateidAgent={updateidAgent}  reduce={reduce} TheId={TheId} structure={structure}  />
                                                : <MenuPrincipal/>}
               </div>


            </div>


         </div>



         {
            Showdelete ? ( < Delete  SetDelete={SetDelete} valueDelete={valueDelete} updateValueNotification={updateValueNotification} handleClickButton8={handleClickButton8} updateValueNotifications={updateValueNotifications} /> ) :null
         }



         {
            comeBack ? ( <ComeBack come ={SetComeBack}  /> ) : null
         }

         {/*Formulaire d'ajout de fichiers des autres*/}
         {
            addDoc ? ( <AddDoc  id={decodedData} structure={structure}  SetAdmin ={SetDoc}    /> ) : null
         }


         {/*Formulaire d'ajout de fichiers des secretaires*/}
         {
            addDoc2 ? ( <AddDoc2 nomAgent={nom} updateValueNotification={updateValueNotification} handleClickButton8={handleClickButton8} valueNotifications={valueNotifications} updateValueNotifications={updateValueNotifications}  id={TheId} structure={structure}  SetAdmin2 ={SetDoc2}   /> ) : null
         }

         {/*Popup de notification*/}

         {
            ShowNotifications ? (  < Notifications SetNotifications={SetNotifications}  valueNotification={valueNotification} /> ) :null
         }


         {
            SendCourier ? ( <CourrierDepart structure={structure} updateactuNotif={updateactuNotif}  updateshowHeader={updateshowHeader} showHeader={showHeader} SetSendCourier={SetSendCourier} id={structure}  updateCourrier={updateCourrier} handleClickButton8={handleClickButton8} updateValueNotification={updateValueNotification}  updateValueNotifications={updateValueNotifications}/> ) : null
         }


         {
            SendParafeux ? (<  CourrierArrive SetSendParafeux={SetSendParafeux} />) : null
         }


         {
            SendInterne ? ( <  Transmission SetInterne={SetInterne} id={structure} valueInTransmission={valueInTransmission} handleClickButton8={handleClickButton8} updateValueNotification={updateValueNotification}  updateValueNotifications={updateValueNotifications} /> ) :null
         }



         {
            sendFiles ? (  < Transfert id={decodedData} structure={structure} SetSendFiles={SetSendFiles} />  ) : null
         }




         {
            sendFiles1 ? ( < Transfert3 updateactuNotif={updateactuNotif} updateValueNotification={updateValueNotification}  handleClickButton8={handleClickButton8} theposte={poste} id={decodedData} structure={structure} idFiles={idFiles}  SetSendFiles1={SetSendFiles1} /> ) :null
         }



         {
            ShowBackEndNotification ? ( <BackEndNotifications poste={poste} updateValueAtransmettre={updateValueAtransmettre} valueAtransmettre={valueAtransmettre}  updateshowHeader={updateshowHeader} SetBackEndNotification={SetBackEndNotification} structure={structure} />) : null
         }

         {
            ShowReturn ? (  <Return UpdateYourValueTransmission={UpdateYourValueTransmission} updateValueNotification={updateValueNotification} handleClickButton8={handleClickButton8} ValueInArrive={ValueInArrive}  updateactuNotif={updateactuNotif}  structure={structure} poste={poste} setReturn={setReturn} /> ) : null

         }
         {
            EnterCourrier ? ( <NewCourrierArrive    SetEnterCourrier={SetEnterCourrier} />) : null

         }


         {/*{*/}
         {/*   SetSendParafeux ? (< CourrierArrive/ >): null*/}
         {/*}*/}

      </>
   )
}