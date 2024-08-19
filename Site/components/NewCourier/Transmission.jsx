"use client"
import {useEffect, useState} from "react";
import axios from "axios";
import word from "@/public/icons/word.png";
import pdf from "@/public/icons/pdf.png";
import excel from "@/public/icons/excel2.png";
import pptx from "@/public/icons/pptx.png";
import close from "@/public/icons/multiply.png";
import process from "process";

export default function Transmission({updateactuNotif, RefreshTransmissionInterne,structure,updateRefreshTransmissionInterne,SetInterne,updateCourrier,id,valueInTransmission,handleClickButton8,updateValueNotification,updateValueNotifications}){
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [focus4 , SetFocus4] = useState(false)
   let formattedDate =""
   const [ statut , SetStatut ] = useState(0)
   const [nouveau , Setnouveau] = useState("")
   const [loading , SetLoading ] = useState(false)
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [values, setValues] = useState({
      destinataire:"Chef de Service",
      sous_service:"",
       transmis:"oui",
      expediteur:id,
      date:"",
      id_courier :valueInTransmission
   });
   const [values2, setValues2] = useState({
      contenu:`Un courrier provenant du secretariat vous a ete transferé`,
      expediteur: structure,
      destinataire:structure,
      dat:"",
      Type_transmission:"courrier",
      poste:"",
      lue : 'non'

   });

   setTimeout(()=>{
      // SetAlldisplay(false)
      SetLoading (true)
      // console.log(structure)
   },80)


   const getData1 = async ()=>{
      try {
         const response = await axios.get(`${baseUrl}/Structure/get_byId.php?id_structure=${id}`);

         if (response.data && response.data.recu && response.data.recu.length > 0) {
            //setreponse('oui');
            console.log(response.data.recu)
            setFilteredData2(response.data.recu)
         } else {
            console.log("Il ya rien")
            setFilteredData2([])
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }

   const getData2 = async () => {
      try {
         // Remplacez l'URL par la bonne URL de votre API
         const response = await axios.get(`${baseUrl}/Transmission/get_allTransmission.php`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("l'ancien id est ",response.data.recu[0].nombre)

            //nouveau = response.data.recu[0].nombre + 1
            Setnouveau(response.data.recu[0].nombre + 1)
            console.log("le nouveau id",nouveau)


         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);


         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   useEffect(()=>{
      getData2()
      getData1()
      //console.log(filteredData)
      //console.log("le nouveau id",nouveau)
   },[])

   useEffect(()=>{


      console.log("la strucutre",structure)
      console.log("le nouveau id",nouveau)
   },[getData2])

   const getDate = () =>{
      const currentDate = new Date();
      formattedDate = currentDate.toLocaleDateString(); //obtiens la date systeme
      console.log(formattedDate)
      setValues(prevValues => ({
         ...prevValues,
         date: formattedDate,
      }));
      setValues2(prevValues => ({
         ...prevValues,
         dat: formattedDate,
      }));
      console.log(values)
   }

   useEffect(()=>{
      console.log(values)
   },[getDate])

   useEffect(()=>{
      getDate()
      console.log("Mon id de transmisson",id)
      console.log('lid de mon courier est ' ,valueInTransmission)
      console.log(values)
      console.log("la valeur" , RefreshTransmissionInterne)
   },[])

   const handleSummit = async () => {
      if (values.sous_service === "" )  {
         SetStatut(1)
      }else  if (values.sous_service .includes("Secrétariat")||values.sous_service .includes("Secrétaire") || values.sous_service .includes("Secretariat") ||values.sous_service .includes("Secretaire")  )  {
         SetStatut(2)
      } else {
         try {
            const formData = new FormData();
            formData.append('date', values.date);
            formData.append('destinataire', values.destinataire);
            formData.append('expediteur', values.expediteur);
            formData.append('id_courier', values.id_courier);
            formData.append('transmis', values.transmis);
            // Effectuez la requête HTTP en utilisant Axios
            const response = await axios.post(`${baseUrl}/Transmission/add_Transmission.php`, formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
                  const response2 = await axios.get(`${baseUrl}/Transmission/updateTransmisssion.php?id=${valueInTransmission}&transmission_interne=oui&sous_structure=${values.sous_service}`)
            console.log("Resultat de la mise a jour 2 ",response2)




            const formData3 = new FormData();
            formData3.append('contenu', values2.contenu);
            formData3.append('expediteur', values2.expediteur);
            formData3.append('destinataire', values2.destinataire);
            formData3.append('dat', values2.dat);
            formData3.append('Type_transmission', values2.Type_transmission);
            formData3.append('poste', values.destinataire);

            formData3.append('lue', values2.lue);
            // Effectuez la requête HTTP en utilisant Axios
            const response3 = await axios.post(`${baseUrl}/notification/add_notification.php`, formData3, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            console.log("Truc ajouté avec succès ", response3);

            //console.log("Truc ajouté avec succès ", response2);
            const newValue = 3;
            updateCourrier(newValue)
            updateactuNotif(structure)
            const newValue2 = 'SendFiles'
            updateValueNotification(newValue2);
            handleClickButton8();
            const newValue3 = true;
            updateValueNotifications(newValue3);
            updateRefreshTransmissionInterne(true)

            console.log("Truc ajouté avec succès ", response);
            SetStatut(7)
            SetInterne(false);
         } catch (error) {
            console.error(error);
         }
      }
   }

   const handleChange2 = (e) => {
      const { name, value } = e.target ;
      setValues(prevValues => ({
         ...prevValues,
         sous_service: value,
      }));
      console.log(values)
      // faire ca avec label
   };

   return(


      <>

         <div
            className={`fixed top-0 left-0 z-30 bg-black/70 w-screen h-screen overflow-y-auto transition duration-300 ease-in-out`}
         >
            <div className="w-full h-[20%] flex justify-center my-52 md:my-96 lg:my-40">
               <div
                  className={` relative  flex flex-col items-center justify-center h-[96%] w-[80%] bg-white border border-gray-700 shadow rounded-lg p-1 ${loading ? 'scale-x-100 scale-y-100 opacity-100' : 'scale-x-0 scale-y-0 opacity-0'}  transition duration-500    `}>

                  <div
                     className="flex   relative h-[100%] w-[100%]  ">
                     <div className="relative h-[94%] w-[33%]  rounded-md">

                        <div className="relative h-[8%] w-[100%]  flex items-center justify-center  mx-auto ">

                           <h1
                              className={` ${statut === 7 ? 'text-blue-600 text-lg -mt-8 mx-3 w-full ' : 'text-red-600 text-xs mt-24 mx-4'} underline underline-offset-8  font-medium`}>
                              {statut === 1 ? 'Aucune Information sur la transmission n`a ete remplis':
                                 statut === 2 ? 'Nous sommes deja au secrétariat'
                                 : ''}
                           </h1>
                        </div>
                     </div>


                     <div className=" relative h-[100%] w-[70%]  ">
                        <div
                           className=" absolute -right-2 -top-2 h-[32%] w-[6%] items-center justify-center ">
                           <img
                              src={close.src}
                              alt="Image sélectionnée"
                              className="relative h-[110%] cursor-pointer mx-auto w-[100%] z-40"
                              onClick={() => {
                                 SetInterne(false)
                              }}
                           />
                        </div>


                        <div
                           className=" relative  h-[80%] w-[100%] mt-3 flex items-center justify-center  ">

                           <div className="relative w-[50%]">
                              <select
                                 onFocus={() => SetFocus4(true)}
                                 onBlur={() => SetFocus4(false)}
                                 name="recepteur"
                                 className={"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"}
                                 onChange={(e) => handleChange2(e)}
                              >
                                 <option value=""></option>
                                 {/*<option value='Chef de Service'>Chef de Service</option>*/}
                                 {/*<option value='Particulie(re)'>Particulie(re)</option>*/}
                                 {filteredData2.map((option) => (
                                    <option key={option.id} value={option.nom}>
                                       {option.nom}
                                    </option>
                                 ))}
                              </select>
                              <span
                                 className={(focus4 || values.destinataire) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                  Destinataires du courrier
                                </span>



                           </div>
                           <div className="relative w-[50%]">
                              <button
                                 className="w-full lg:w-[90%] mx-4 h-12 bg-indigo-600 hover:bg-indigo-950 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold"
                                 onClick={() => {
                                    handleSummit()
                                 }}>Effectuer la transmission
                              </button>
                           </div>



                        </div>


                     </div>


                  </div>


               </div>

            </div>
         </div>
      </>
   )
}