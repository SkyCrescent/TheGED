
export  default function page() {





   return(
      <>

         <div className=" flex justify-between w-full h-screen ">


            <div className="relative w-[60%] h-screen">
               <div className="relative bg-indigo-400/75 opacity-95 w-[100%] h-[71%] "></div>
               <div className="relative bg-indigo-500/90 opacity-95 w-[100%] h-[29%] "></div>
            </div>


            <div className="relative w-[40%] h-screen">
               <div
                  className="relative  bg-gradient-to-b from-indigo-400 to-blue-800 opacity-95 w-[100%] h-[100%] "></div>
            </div>


            <div
               className="absolute flex justify-between gap-3 p-1  h-[80%] top-0  w-full">
               <div className="h-[100%] w-[55%]  flex items-center mt-8 rounded ">

                  <div className="relative h-[60%] mx-3 items-center  w-[100%]  ">
                     <h1 className="text-6xl text-blue-900 font-black w-[150%]  cursor-default  py-2">Votre temps d'essai sur <span
                        className="font-normal text-blue-600 underline underline-offset-1 shadow-blue-300"> MyGED</span>.
                     </h1>
                     <h1 className="text-3xl mx-1 font-semibold cursor-default">Est expirée</h1>
                     {/*<h1 className="text-sm py-2 mx-2 cursor-default">*/}
                     {/*   </h1>*/}
                     <div className="-py-3 -mx-1  ">

                        {/*<button*/}
                        {/*   className="w-full lg:w-fit bg-indigo-600 hover:bg-indigo-950 text-white transition duration-300 transform hover:scale-105 px-28 py-4 -mx-6 rounded-md font-semibold"*/}
                        {/*   onClick={() => {*/}
                        {/*      handleSummit2()*/}
                        {/*   }}>Connexion*/}
                        {/*</button>*/}

                        {/*{showHeader && <h1>Header affiché!</h1>}*/}

                        {/*<h1*/}
                        {/*   className={errors ? "block text-xl text-red-600 mt-3 mx-4 cursor-default font-semibold" : "hidden"}>*/}
                        {/*   {NotValue ? "Saisissez vos informations" : NotResult ? "Compte introuvable, réessayez" : CompteLocked ? "Ce compte a ete bloqué ,contacter votre Directeur afin de le débloquer" : ''}*/}
                        {/*</h1>*/}


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


                  </div>


                  <div className="relative w-[80%] h-[20%] mx-5 space-y-4  ">

                     <div className="w-full  flex items-center justify-center">
                        {/*<button*/}
                        {/*   className="relative w-full lg:w-[88%] bg-blue-900 hover:bg-blue-900 text-white transition duration-300 transform hover:scale-105 px-16 py-4 -mx-6 rounded-md font-semibold"*/}
                        {/*   onClick={() => router.push(`register`)}>*/}
                        {/*   Retour*/}
                        {/*</button>*/}
                     </div>

                  </div>


               </div>

            </div>

         </div>
      </>
   )
}