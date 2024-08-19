'use client'
import React, {useEffect, useState} from "react";


import workspace from "@/public/img/15110-01.jpg";
import zip from "@/public/img/15120-01.jpg";
import ged from "@/public/img/dauphin2.JPG";
import Parafeux from "@/components/Register/Parafeux";
import R_Arrive from "@/components/Register/R_Arrive";
import R_transmission from "@/components/Register/R_transmission";
import R_Depart from "@/components/Register/R_Depart";
import {usePathname} from "next/navigation";
export default function NOTREGED({handleClickButton14,updateactuNotif,service,UpdateValueParafeure,TheUpdateValueParafeure,structure,UpdateValueTransmission,UpdateYourValueTransmission,updateValueInArrive,handleClickButton12,RefreshTransmissionInterne,updateRefreshTransmissionInterne,valueInTransmission,updateValueNotification,updateValueNotifications,valueCourrier,updateCourrier,updateValueInTransmission,handleClickButton10,MyPoste,Myid,handleClickButton4,handleClickButton5,handleClickButton6,handleClickButton8}){
const [ etat, SetEtat ] = useState(1)
   const pathname = usePathname();

   const handleClickButton1 = () => {
      SetEtat(1);
   };

   useEffect(()=>{

      console.log(MyPoste)
   },[])



   // UpdateValueParafeure={UpdateValueParafeure} setUpdateValueParafeure={setUpdateValueParafeure}
   return(

      <>
         <div
            className={'relative w-[100%] h-[100%] '}>
            <div className="relative h-[100%] w-full   ">
               <div
                  className={etat === 1 ? " block relative w-[99%] mx-auto  h-[50%]  flex p-2 gap-2  " : 'hidden'}>
                  <div
                     className={
                        pathname.includes('director') ||  pathname.includes('else')  ? "hidden" :
                           "relative bg-white h-[100%]  w-[33%] border border-gray-400 rounded-xl  cursor-pointer  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 "
                     }
                     onClick={() => {
                        SetEtat(2)
                     }}>
                     <div className="relative h-[100%] w-[100%] flex items-center justify-center ">
                        <img src={workspace.src} alt=""
                             className="relative h-[100%] w-[100%] rounded-xl cursor-pointer"
                        />
                        <div
                           className="absolute bottom-2 h-[63%] w-[100%] items-center justify-center  ">
                           <div className="relative h-[50%] top-0 w-[100%] flex items-center text-center  ">
                                          <span
                                             className="text-[40px] mx-auto   font-black font-[Gotham] text-indigo-900">Courrier Arrive</span>
                           </div>
                           <div
                              className="absolute bottom-12  h-auto w-[100%]  items-center justify-center text-center ">
                                        <span
                                           className="text-md text-justify ">Accédez au courrier reçu dans votre service</span>

                           </div>
                        </div>
                     </div>

                  </div>




                  <div
                     className={
                     pathname.includes('director')||  pathname.includes('else') ? "hidden" :
                        "relative bg-white h-[100%]  w-[33%] border border-gray-400 rounded-xl  cursor-pointer  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 "

                  } onClick={() => {
                        SetEtat(3)
                     }}>
                     <div className="relative h-[100%] w-[100%] flex items-center justify-center ">
                        <img src={zip.src} alt=""
                             className="relative h-[100%] w-[100%] rounded-xl cursor-pointer"
                        />

                        <div
                           className="absolute bottom-2 h-[63%] w-[100%] items-center justify-center  ">
                           <div className="relative h-[50%] top-0 w-[100%] flex items-center text-center  ">
                                          <span
                                             className="text-[40px] mx-auto   font-black font-[Gotham] text-indigo-900">Courrier Depart</span>
                           </div>
                           <div
                              className="absolute bottom-12  h-auto w-[100%]  items-center justify-center text-center ">
                                        <span
                                           className="text-md text-justify ">Accédez au courrier sortant dans votre service</span>

                           </div>
                        </div>

                     </div>
                  </div>










                  <div
                     className={
                     pathname.includes('director')||  pathname.includes('second') ? "hidden" :
                        "relative bg-white h-[100%]  w-[33%] border border-gray-400 rounded-xl  cursor-pointer  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 "}
                     onClick={() => {
                        SetEtat(4)
                     }}>
                     <div className="relative h-[100%] w-[100%] flex items-center justify-center ">
                        <img src={ged.src} alt=""
                             className="relative h-[100%] w-[100%] rounded-xl cursor-pointer"
                        />

                        <div
                           className="absolute bottom-2 h-[63%] w-[100%] items-center justify-center  ">
                           <div className="relative h-[50%] top-0 w-[100%] flex items-center text-center  ">
                                          <span
                                             className="text-[40px] mx-auto   font-black font-[Gotham] text-green-500 ">Transmission Interne</span>
                           </div>
                           <div
                              className="absolute bottom-3  h-auto w-[100%]  items-center justify-center text-center ">
                                        <span
                                           className="text-md text-justify text-white ">Accédez au courrier transfére au sein de votre service</span>

                           </div>
                        </div>

                     </div>
                  </div>








                  <div
                     className={
                        pathname.includes('second')  ||  pathname.includes('else')? "hidden" : "relative bg-white h-[100%]  w-[33%] border border-gray-400 rounded-xl  cursor-pointer  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300 "

                     }
                     onClick={() => {
                        SetEtat(5)
                     }}>
                     <div className="relative h-[100%] w-[100%] flex items-center justify-center ">
                        <img src={ged.src} alt=""
                             className="relative h-[100%] w-[100%] rounded-xl cursor-pointer"
                        />

                        <div
                           className="absolute bottom-2 h-[63%] w-[100%] items-center justify-center  ">
                           <div className="relative h-[50%] top-0 w-[100%] flex items-center text-center  ">
                                          <span
                                             className="text-[40px] mx-auto   font-black font-[Gotham] text-indigo-900">Parapheur</span>
                           </div>
                           <div
                              className="absolute bottom-12  h-auto w-[100%]  items-center justify-center text-center ">
                                        <span
                                           className="text-md text-justify text-white ">Accédez au courrier provenant dans votre service</span>

                           </div>
                        </div>

                     </div>
                  </div>








               </div>


               <div className={etat === 2 ? 'block w-full h-full' : 'hidden'}>
                  <R_Arrive handleClickButton14={handleClickButton14} updateactuNotif={updateactuNotif} structure={structure} RefreshTransmissionInterne={RefreshTransmissionInterne} updateRefreshTransmissionInterne={updateRefreshTransmissionInterne} valueInTransmission={valueInTransmission} valueCourrier={valueCourrier} updateCourrier={updateCourrier}  updateValueNotification={updateValueNotification} updateValueNotifications={updateValueNotifications} handleClickButton8={handleClickButton8} updateValueInTransmission={updateValueInTransmission} Myid={Myid} etat={etat} handleClickButton1={handleClickButton1} handleClickButton5={handleClickButton5} handleClickButton6={handleClickButton6} />
               </div>


               <div className={etat === 3 ? 'block' : 'hidden'}>
                  <R_Depart valueCourrier={valueCourrier} updateCourrier={updateCourrier} Myid={Myid} etat={etat} handleClickButton1={handleClickButton1} handleClickButton4={handleClickButton4}/>
               </div>
               <div className={etat === 4 ? 'block' : 'hidden'}>
                  <R_transmission service={service} UpdateYourValueTransmission={UpdateYourValueTransmission} UpdateValueTransmission={UpdateValueTransmission} handleClickButton12={handleClickButton12} MyPoste={MyPoste} Myid={Myid} handleClickButton10={handleClickButton10} updateValueInArrive={updateValueInArrive} etat={etat} handleClickButton1={handleClickButton1} handleClickButton6={handleClickButton6}/>
               </div>
               <div className={etat === 5 ? 'block' : 'hidden'}>
                  <Parafeux UpdateValueParafeure={UpdateValueParafeure} TheUpdateValueParafeure={TheUpdateValueParafeure}  handleClickButton12={handleClickButton12} Myid={Myid} etat={etat} handleClickButton10={handleClickButton10} handleClickButton1={handleClickButton1} handleClickButton8={handleClickButton8} updateValueInArrive={updateValueInArrive}/>
               </div>

            </div>
         </div>

      </>
   )
}