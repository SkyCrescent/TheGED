"use client"
import Image from 'next/image';
import { useState , useEffect} from "react";
import axios from  'axios'
import {useRouter} from "next/navigation";
import {encode} from "next/dist/shared/lib/base64-arraybuffer";

import io from 'socket.io-client';

export default function Home() {
   const [souligneWidth, setSouligneWidth] = useState(0);
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [loading , SetLoading ] = useState(false)
   const [ NotValue , SetValue ] = useState( false)
   const [  CompteLocked ,SetLocked ] = useState(false)
   const [ errors , Seterros ] = useState( false)
   const [  NotResult , SetResult ] = useState(false)
   const [isSubmit,SetIsSubmit] = useState(false)
   const [focus , SetFocus] = useState(false)
   const router = useRouter();
   const [icon, setIcon] = useState({
      4: "blind",
      5: "Eye"
   });
   const [values, setValues] = useState({
      username: "",
      password: ""
   });


   const input = [
      { id: 1, name: "username", type: "text", placeholder: "Nom",value: values.username   ,label: "Entrez votre Username", className: `text-xl w-[90%] text-gray-700 bg-white/75 border rounded-lg border-gray-300 py-2 px-10 h-14 focus:outline-none focus:border-blue-500 `,
         img: ``,
      },
      { id: 4, name: "password",type: icon[4] === "blind" ? "password" : "text",value: values.password  , placeholder: "password", label: "Entrez le mot de Passe",
         className: "text-xl relative w-[90%] text-gray-700 border rounded-lg border-gray-300 py-2 px-10 h-14 focus:outline-none focus:border-blue-500",
          img: `/icons/${icon[4] || "blind"}.png` }


   ]
   const [inputValue, setInputValue] = useState('');


   const showChar = (id) => {
      setIcon(prevState => ({
         ...prevState,
         [id]: prevState[id] === "blind" ? "Eye" : "blind",

      }));
   };

   const handleChange = (e) => {
      const { name, value } = e.target ;
      setValues({...values, [name] : value})
      console.log(values)
      // faire ca avec label
   };


   const handleSummit = async () => {
      SetIsSubmit(true);
      console.log(values);
      const valuesNotEmpty = Object.values(values).every(value => value !== "");

      if (valuesNotEmpty) {
         try {
            const response = await axios.get(`http://localhost:8000/verification/connexion.php?username=${values.username}&password=${values.password}`);


            console.log(response.data.recu);
            console.log(response.data.recu.pass);

            if (response.data && response.data.recu  && response.data.recu.pass === true) {



               if (response.data.recu.actif === 'non'){
                  console.log("dddd")
                  Seterros(true);
                  SetValue(false);
                  SetResult(false);
                  SetLocked(true)
               }else{
                  console.log(response.data.recu);
                  setFilteredData(response.data.recu);
                  SetLoading(true);
                  Seterros(false);
                  SetValue(false);
                  SetResult(false);
                  SetLocked(false)
                  // router.push(`/admin/home`);
                  const encryptedData = btoa(response.data.recu.id);

                  console.log(response.data.recu.poste_agent)

                  {
                     response.data.recu.poste_agent === "Directeur Général" ? router.push(`./home/director?bla=${encodeURIComponent(encryptedData)}`)
                        :  response.data.recu.poste_agent === "Chef de Service" || response.data.recu.poste_agent === "Particulie(re)"  ? router.push(`./home/else?bla=${encodeURIComponent(encryptedData)}`)
                           : router.push(`./home/second?bla=${encodeURIComponent(encryptedData)}`)
                  }

               }







            } else {
               Seterros(true);
               SetValue(false);
               SetResult(true);
               SetLocked(false)
               console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            }
         } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }


      } else {
         Seterros(true);
         SetValue(true);
         SetResult(false);
         SetLocked(false)
      }
   }

   return (
      <>
         <div className=" flex justify-between w-full h-screen ">


            <div className="relative w-[60%] h-screen">
               <div className="relative bg-indigo-400/75 opacity-95 w-[100%] h-[71%] "></div>
               <div className="relative bg-indigo-500/90 opacity-95 w-[100%] h-[29%] "></div>
            </div>


            <div className="relative w-[40%] h-screen">
               <div className="relative  bg-gradient-to-b from-indigo-400 to-blue-800 opacity-95 w-[100%] h-[100%] "></div>
            </div>


            <div
               className="absolute flex justify-between gap-3 p-1  h-[80%] top-0  w-full">
               <div className="h-[100%] w-[55%]  flex items-center mt-8 rounded ">

                  <div className="relative h-[60%] mx-3 items-center  w-[100%]  ">
                     <h1 className="text-6xl text-blue-900 font-black w-1/127  cursor-default  py-2">Bienvenu sur <span
                        className="font-normal text-blue-600 underline underline-offset-1 shadow-blue-300"> MyGED</span>.</h1>
                     <h1 className="text-3xl mx-1 font-semibold cursor-default">Votre Gestionnaire Electronique de Document</h1>
                     <h1 className="text-sm py-2 mx-2 cursor-default">Inserez les informations de votre Compte Utilisateur afin d'acceder a votre WorkSpace.</h1>
                     <div className="-py-3 -mx-1  ">

                        {/*<button*/}
                        {/*   className="w-full lg:w-fit bg-indigo-600 hover:bg-indigo-950 text-white transition duration-300 transform hover:scale-105 px-28 py-4 -mx-6 rounded-md font-semibold"*/}
                        {/*   onClick={() => {*/}
                        {/*      handleSummit2()*/}
                        {/*   }}>Connexion*/}
                        {/*</button>*/}

                        {/*{showHeader && <h1>Header affiché!</h1>}*/}

                        <h1
                           className={errors ? "block text-xl text-red-600 mt-3 mx-4 cursor-default font-semibold" : "hidden"}>
                           {NotValue ? "Saisissez vos informations" : NotResult ? "Compte introuvable, réessayez" : CompteLocked ? "Ce compte a ete bloqué ,contacter votre Directeur afin de le débloquer" : ''}
                        </h1>


                     </div>
                  </div>
               </div>
               <div className="h-[70%] w-[33%] decoration shadow-black  mr-24 mt-28 p-2 rounded-lg ">
                  {/*<div*/}
                  {/*   className="relative w-full h-[20%]   flex items-center justify-center font-[Poppins] font-semibold text-4xl leading- text-sky-800">*/}
                  {/*   Connectez Vous*/}
                  {/*</div>*/}
                  <div
                     className="relative w-full h-[60%] p-2  flex flex-col items-center justify-center space-y-4">

                     {input.map((inputs) => (
                        <div className="rounded-md h-24 w-full  mx-auto flex flex-col items-center justify-center"
                             key={inputs.id}>
                           <div className="relative w-full  ">
                              <input
                                 onFocus={() => SetFocus(true)}
                                 onBlur={() => SetFocus(false)}
                                 type={inputs.type}
                                 name={inputs.name}
                                 className={inputs.className}
                                 onChange={(e) => handleChange(e)}
                                 value={inputs.value}
                                 defaultValue={inputs.defaultValue}
                              />
                              {inputs.img ? (
                                 <img src={inputs.img} alt="" className="absolute right-16 top-[26%] cursor-pointer"
                                      width={25}
                                      height={25} onClick={() => showChar(inputs.id)}/>
                              ) : null}
                              <span
                                 className={(focus|| values.password || values.username ) ? "absolute left-3 p-1  w-auto top-4 text-lg font-normal text-white -translate-y-12 duration-300" : "absolute tracking-wide  pointer-events-none duration-300 left-0 top-4 px-10 text-sky-600"}>
                    {inputs.label}
                          </span>


                           </div>
                           <div>
                              {/*{ Errors[inputs.name]  ? (<> <div className="text-[75%] text-red-600"> {inputs.error} </div> </> ): null  }*/}
                              {isSubmit && inputs.error ? (
                                 <div className="text-[70%] text-red-600">{inputs.error}</div>
                              ) : null}
                           </div>

                        </div>

                     ))}
                  </div>


                  <div className="relative w-[80%] h-[20%] mx-5 space-y-4  ">
                     <div className="w-full  flex items-center justify-center">
                        <button
                           className="w-full lg:w-fit bg-indigo-600 hover:bg-indigo-950 text-white transition duration-300 transform hover:scale-105 px-28 py-4 -mx-6 rounded-md font-semibold"
                           onClick={() => {
                              handleSummit()
                           }}>Connexion
                        </button>


                     </div>


                     <div className="w-full  flex items-center justify-center">
                        <button
                           className="relative w-full lg:w-[88%] bg-blue-900 hover:bg-blue-900 text-white transition duration-300 transform hover:scale-105 px-16 py-4 -mx-6 rounded-md font-semibold"
                           onClick={() => router.push(`register`)}>
                           Je n'ai pas de Compte
                        </button>
                     </div>

                  </div>


               </div>

            </div>

         </div>
      </>

   )
}
