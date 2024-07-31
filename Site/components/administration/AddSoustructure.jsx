import React, {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import axios from "axios";

export default function AddSoustructure({SetDoc,handleClickButton8,updateValueNotifications,valueInTransmission}){
   const [focus6 , SetFocus6] = useState(false)
   const [loading , SetLoading] = useState(false )
   const router = useRouter();
   const [ statut , SetStatut ] = useState(0)
   const [values, setValues] = useState({
      // droit : "",
      id:valueInTransmission,
      nom:"",
   });


   setTimeout(()=>{
      // SetAlldisplay(false)
      SetLoading (true)
   },80)



   const handleChange = (e) => {
      const { name, value } = e.target;
      let formattedValue = '';
      let cleanedValue = '';
      if (name === 'nom') {
         // Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
         cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
         // Mettre à jour l'état avec le nom de l'école nettoyé
         setValues({ ...values, [name]: cleanedValue });
         console.log(values)
      }
   };


   useEffect(()=>{
      console.log( valueInTransmission)
   },[])


   // Fonction pour gérer la soumission du formulaire
   const handleSummit = async () => {
      if (values.nom === "" )  {
         SetStatut(1)
      }

      else {

         try {
            const formData = new FormData();
            formData.append('nom', values.nom);
            formData.append('id_structure', values.id);


            // Effectuez la requête HTTP en utilisant Axios
            const response = await axios.post('http://localhost:8000/type_structure/add_SouStructure.php', formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            console.log("Truc ajouté avec succès ", response);
             const newValue = 'ajout1'
            updateValueNotifications(newValue)

            handleClickButton8();

            SetDoc(false);

           // updateshowHeader(true)


            //
            // const newValue2 = 'SendCourrier'
            // updateValueNotification(newValue2);
            // handleClickButton8();
            // const newValue3 = true;
            // updateValueNotifications(newValue3);
            // const newValue = 1;
            // updateCourrier(newValue)
            // updateactuNotif(structure)
            // SetStatut(8)
            // SetSendCourier(false);
         } catch (error) {
            console.error(error);
         }
      }
   }



   return(


      <>


         <div
            className={`fixed top-0 left-0 z-30 bg-black/70  w-screen h-screen overflow-y-auto transition duration-300 ease-in-out`}
         >
            <div className="w-full flex justify-center my-52 md:my-96 lg:my-48">
               <div
                  className={` relative  flex items-center justify-center h-64 w-[35%] bg-white border border-gray-600 shadow rounded-lg p-4 ${loading ? 'scale-x-100 scale-y-100 opacity-100' : 'scale-x-0 scale-y-0 opacity-0'}  transition duration-500    `}>

                  <div
                     className="flex flex-col items-center justify-center  space-y-10 border border-gray-500 rounded-lg relative h-[100%] w-[100%]">
                     <div
                        className=" flex flex-col items-center justify-center  top-7 relative h-[50%] w-[100%]">
                              <span
                                 className="text-xl text-center font-black font-[Gotham] text-blue-900">Quel est le nom de la nouvelle Sous structure </span>

                     </div>

                     <div
                        className="flex justify-between  space-x-6 relative w-[90%] h-96 ">
                        <div className="relative h-[10%] w-[100%]  mx-auto ">
                           <input
                              onFocus={() => SetFocus6(true)}
                              onBlur={() => SetFocus6(false)}
                              type='text'
                              name="nom"
                              className=
                                 {
                               statut === 1 ?     "text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-red-500  py-2 px-4 h-12 focus:outline-none focus:border-red-500 "
                                             :     "text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300  py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                                 }



                              //onChange={handleChange4}
                              onChange={(e) => handleChange(e)}

                              value={values.nom}
                           />

                           <span
                              className={(focus6 || values.nom) ? "absolute left-3 p-1 w-auto top-4 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>

                              {
                                 statut === 1 ?  "Saisissez le nom de votre nouveau service"
                                    :'Nom du Service'
                              }

                                </span>
                        </div>

                     </div>


                     <div
                        className=" absolute -bottom-3  text-center flex justify-between  space-x-14 bg-white font-semibold text-xl text-blue-600 transform duration-200">


                        <button
                           className={`bg-sky-600 text-white rounded-xl w-32 h-10 font-bold text-sm cursor-pointer transform hover:scale-x-110 hover:scale-y-110 hover:bg-sky-800 transition duration-300  `}
                           onClick={() => {
                              handleSummit()
                           }}>Valider
                        </button>

                        <button
                           className={`bg-black text-white rounded-xl w-32 h-10 font-bold text-sm cursor-pointer transform hover:scale-x-110 hover:scale-y-110 hover:bg-red-700 transition duration-300  `}
                           onClick={() => {
                              SetLoading(false);
                              SetDoc(false);

                           }}>Annuler
                        </button>

                     </div>

                  </div>
               </div>

            </div>
         </div>

      </>
   )
}