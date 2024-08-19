'use client'
import axios from "axios";
import React, {useEffect, useState} from "react";
import close from "@/public/icons/multiply.png";
import {usePathname} from "next/navigation";
import process from "process";
export default function Return({UpdateYourValueTransmission,TheUpdateValueParafeure ,setReturn,handleClickButton8,updateValueNotification,updateactuNotif,ValueInArrive,poste ,structure, SetResponse }){
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [loading , SetLoading ] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [ border , Setborder ] = useState(false)
   const pathname = usePathname();
   let formattedDate =""

   const [ values , setValues ] = useState({
      contenu : "",
    //  destinataire:"",
      etat:"attente",
      idCourrier:ValueInArrive,
      idStructure:structure,
      poste: pathname.includes('director') ? poste : 'Secrétaire'
      // id:id  pathname.includes('director') ? 'Sécretaire' : poste
   })

   const [values2, setValues2] = useState({
      contenu:`Un courrier vous a été renvoyer provenant du ${poste} de la `,
      expediteur: structure,
      destinataire:structure,
      dat:"",
      Type_transmission:"courrier",
      poste:"Secrétaire",
      lue : 'non'

   });

   setTimeout(()=>{
      SetLoading (true)
   },80)
   useEffect(()=>{
      console.log("la structure ", structure)
      console.log("le poste ", poste)
      console.log("la valeur du courier",ValueInArrive)
      getDate()
   },[])

   const handleChange = (e) => {
      const { name, value } = e.target;
      let formattedValue = '';
      let cleanedValue = '';
      if (name === 'contenu') {
         // Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
         cleanedValue = value.replace(/[^a-zA-Z\s-]/g, '');
         cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());

         // Mettre à jour l'état avec le nom de l'école nettoyé
         setValues({ ...values, [name]: cleanedValue });
         console.log(values)
         console.log(values2)
      }
   };


   useEffect(() => {
      console.log("ee",values);
   }, [()=>{
      handleChange()

   }]);

   const getDate = () =>{
      const currentDate = new Date();
      formattedDate = currentDate.toLocaleDateString(); //obtiens la date systeme
      console.log(formattedDate)
      setValues2(prevValues => ({
         ...prevValues,
         dat: formattedDate,
      }));
      console.log(values2)
   }



   const addData = async () => {
      console.log(values)
      console.log(values2)



      try {
         // Vérifiez que tous les champs requis sont remplis
         if (values.contenu ) {
            const formData = new FormData();
            formData.append('contenu', values.contenu);
            formData.append('etat', values.etat);
            formData.append('idCourrier', values.idCourrier);
            formData.append('idStructure', values.idStructure);
            formData.append('poste', values.poste);

            const response = await axios.post(`${baseUrl}/Note/add_Note.php`, formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });


            // Enregistrement de la notifications
            const formData3 = new FormData();
            formData3.append('contenu', values2.contenu);
            formData3.append('expediteur', values2.expediteur);
            formData3.append('destinataire', values2.destinataire);
            formData3.append('dat', values2.dat);
            formData3.append('Type_transmission', values2.Type_transmission);
            formData3.append('poste', values2.poste);

            formData3.append('lue', values2.lue);
            // Effectuez la requête HTTP en utilisant Axios
            const response3 = await axios.post(`${baseUrl}/notification/add_notification.php`, formData3, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            console.log("Truc ajouté avec succès ", response3);


            const response2 = pathname.includes('director')
                     ?  await axios.get(`${baseUrl}/Courrier/updateCourrier.php?id=${ValueInArrive}&parafeux=deja`)
                        :  await axios.get(`${baseUrl}/Courrier/updateCourrier2.php?id=${ValueInArrive}&transmission_interne=deja`)


            setValues(
               {
                  contenu : "",
                  // destinataire:"",
                  idCourrier:"",
                  idStructure:"",
               }
            )

            const newValue2 = pathname.includes('director')
                  ?  'RenvoiCourrier'
                  : 'Renvoi'


            {
               pathname.includes('director')
                  ?  TheUpdateValueParafeure(true)
                     : UpdateYourValueTransmission(true)
            }
            updateValueNotification(newValue2);
            handleClickButton8();
            updateactuNotif(structure)
            setReturn(false)
            console.log("Truc ajouté avec succès ", response);
            console.log("Truc ajouté avec succès ", response2);

         }
         // Reset form fields after successful submission

      } catch (error) {
         console.error(error);
      }

   };

   const handleSummit = async () => {
      // SetIsSubmit(true);


      if (values.contenu  ) {
         addData()
         //validation des data

      } else {
         Setborder(true)
         //console.log("Veuillez remplir tous les champs avant de soumettre le formulaire.");
         // Ajoutez ici la logique pour afficher un message d'erreur ou une notification à l'utilisateur.
      }
   };


   return(


      <>

         <div
            className={`fixed top-0 left-0 z-30 bg-black/70 w-screen h-screen overflow-y-auto transition duration-300 ease-in-out`}
         >
            <div className="w-full h-[90%] flex items-center justify-center ">
               <div
                  className={` relative  flex flex-col items-center justify-center h-[70%] w-[50%] bg-white border border-gray-700 shadow rounded-lg p-2 ${loading ? 'scale-x-100 scale-y-100 opacity-100' : 'scale-x-0 scale-y-0 opacity-0'}  transition duration-500    `}>

                  <div
                     className="flex   relative h-[100%] w-[100%] items-center justify-center  ">
                     <div
                        className=" absolute -right-2 -top-2 h-[9%] w-[6%] items-center justify-center ">
                        <img
                           src={close.src}
                           alt="Image sélectionnée"
                           className="relative h-[110%] cursor-pointer mx-auto w-[100%] z-40"
                           onClick={() => {
                              // deletData(nouveau)
                              setReturn(false)
                           }}
                        />
                     </div>

                     <div className=" relative h-[95%] w-[90%] mx-auto  ">


                        <div className=" relative  h-[20%] w-[99%] ">


                           <div className="h-[50%] flex items-center justify-between">

                              <div className="relative w-[45%]">
                                 <button
                                    className="w-full lg:w-[90%] mx-4 h-12 bg-indigo-600 hover:bg-indigo-950 text-white transition duration-300 transform hover:scale-105 px-10 py-2 rounded-md font-semibold"
                                    onClick={() => {
                                       handleSummit()
                                    }}>Renvoyer le Courrier
                                 </button>
                              </div>


                           </div>

                        </div>


                        <div className=" relative h-[80%] w-[100%] rounded-md ">

                           <textarea
                              onFocus={() => SetFocus6(true)}
                              onBlur={() => SetFocus6(false)}
                              type='text'
                              name="contenu"
                              className= { border ?      "text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-red-300 py-2 px-4 h-full focus:outline-none focus:border-sky-500"
                                   :      "text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-full focus:outline-none focus:border-sky-500"
                              }


                              // onChange={(e) => handleChange(e)}
                              onChange={handleChange}
                              rows="50"
                              cols="30"
                              value={ values.contenu }
                              //placeholder="Numéro de téléphone"
                           />
                           <span
                              className={(focus6 || values.contenu) ? "absolute left-3 p-1 w-auto top-0 px-1 text-xl  text-sky-700 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                  Instruction sur le courrier
                                </span>
                        </div>

                     </div>


                  </div>


               </div>

            </div>
         </div>
      </>
   )
}