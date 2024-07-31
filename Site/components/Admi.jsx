'use client'
import axios from "axios";
import React, {useEffect, useState} from "react";
import mail from "@/public/icons/mail.png";
import word from "@/public/icons/word.png";
import pdf from "@/public/icons/pdf.png";
import excel from "@/public/icons/excel2.png";
import pptx from "@/public/icons/pptx.png";
import {usePathname} from "next/navigation";
import dowload2 from "@/public/icons/locked_with_key_127px.png";
import process from "process";
export  default function Admi({reduce,TheId2,structure}){
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const pathname = usePathname();

   const [ TheId , Setid] = useState(0 )
   const [ nom , SetNom] = useState("" )
   const [ prenom , SetPreNom] = useState("" )
   const [ adresse , SetAdresse] = useState("" )
   const [ photo , SetPhoto] = useState("" )
   const [ phone , SetPhone] = useState("" )
   const [poste , SetPoste] = useState("" )
   const [ username , SetUsername] = useState("" )
   const [structure2 , SetStructure] = useState("" )



   const [ id2 , Setid2] = useState(0 )
   const [ nom2 , SetNom2] = useState("" )
   const [ prenom2 , SetPreNom2] = useState("" )
   const [ adresse2 , SetAdresse2] = useState("" )
   const [ photo2 , SetPhoto2] = useState("" )
   const [ phone2 , SetPhone2] = useState("" )
   const [poste2 , SetPoste2] = useState("" )
   const [ username2 , SetUsername2] = useState("" )
   const [structure3 , SetStructure2] = useState("" )




   const getData = async () => {
      try {
         const response = await axios.get(`${baseUrl}/admin/get_byId.php?id_structure=${structure}`);

         if (response.data && response.data.recu && response.data.recu.length > 0) {

            console.log( response.data.recu )
            setFilteredData(response.data.recu)
            Setid(response.data.recu[0].id)
            SetNom(response.data.recu[0].nom)
            SetPreNom(response.data.recu[0].prenom)
            SetAdresse(response.data.recu[0].adresse)
            SetPhoto(response.data.recu[0].photo)
            SetPhone(response.data.recu[0].phone)
            SetPoste(response.data.recu[0].poste_agent)
            SetUsername(response.data.recu[0].username)
            SetStructure(response.data.recu[0].id_structure)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }
   const getData2 = async () => {
      try {
         const response = await axios.get(`${baseUrl}/admin/get_byId2.php?id=${TheId2}`);

         if (response.data && response.data.recu && response.data.recu.length > 0) {
            console.log( response.data.recu )
            setFilteredData2(response.data.recu)
            Setid2(response.data.recu[0].id)
            SetNom2(response.data.recu[0].nom)
            SetPreNom2(response.data.recu[0].prenom)
            SetAdresse2(response.data.recu[0].adresse)
            SetPhoto2(response.data.recu[0].photo)
            SetPhone2(response.data.recu[0].phone)
            SetPoste2(response.data.recu[0].poste_agent)
            SetUsername2(response.data.recu[0].username)
            SetStructure2(response.data.recu[0].id_structure)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }



   const getData4 =  async (id) => {
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/admin/updateActif.php?id=${id}&actif=non`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici", response.data.recu)

            // setFilteredData2(response.data.recu)
            // SetLoading2(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            setFilteredData([])
            getData()
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }


   const getData5 =  async (Myid) => {
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/admin/updateActif.php?id=${Myid}&actif=oui`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici", response.data.recu)

            // setFilteredData2(response.data.recu)
            // SetLoading2(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            setFilteredData([])
            getData()
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }



   useEffect(() => {
      console.log("lid du courrier",structure);
      getData()
      getData2()
      // console.log(study1);
   }, []);

   function chunkArray(array, size) {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += size) {
         chunkedArray.push(array.slice(i, i + size));
      }
      return chunkedArray;
   }

   return(

      <>
         <div className="relative  h-[100%] flex items-center justify-center ">

            {
               pathname.includes('director')
                  ? (

               <>

                  <div className="relative h-[100%] w-[99%]  mx-auto   flex justify-between ">


                     {/*Le profil*/}


                     <div className="relative h-[100%] w-[98%] mx-auto  p-1  content-normal    scrollbar-hidden     overflow-auto  flex  justify-between ">

                        {/*La liste des gens ddu service */}

                        {chunkArray(filteredData, reduce ? 9 : 9).map((group, index) => (
                           <div key={index} className="flex flex-wrap mx-auto p-2 ">
                              {group.map((item, itemIndex) => (
                                 <div key={item.id} className="relative w-80 h-[80%] mb-3 mr-3">
                                    <div
                                       className="relative w-full h-full  p-2 border border-gray-300  rounded-xl  cursor-pointer shadow-xl  transform hover:scale-x-105 hover:scale-y-105 decoration-sky-500 hover:shadow-2xl transition duration-300  ">
                                       <div
                                          className="relative w-full h-[40%]  flex items-center justify-center">
                                          <img
                                             src={`/${item.photo}`}
                                             alt="Image sélectionnée"
                                             className="relative h-[95%]  w-[55%] z-40 rounded-full "
                                          />
                                       </div>
                                       <div
                                          className="relative w-full h-[60%]  font-semibold text-[12px]">
                                             <div className="relative h-[80%] w-full  space-y-2 top-2 ">
                                                <p>
                                                   Nom de l'agent : <span className="font-[Poppins] text-sky-400 text-[14px]">{item.nom}</span>
                                                </p>
                                                <p>
                                                   Prénom de l'agent : <span className="font-[Poppins] text-sky-400 text-[14px]">{item.prenom}</span>
                                                </p>
                                                <p>
                                                   Adresse de l'agent : <span className="font-[Poppins] text-sky-400 text-[14px]">{item.adresse}</span>
                                                </p>
                                                <p>
                                                   Numéro de Téléphone : <span className="font-[Poppins] text-sky-400 text-[14px]">{item.num_phone}</span>
                                                </p>
                                                <p>
                                                   Situation Matrimoniale : <span className="font-[Poppins] text-sky-400 text-[14px]">{item.situation}</span>
                                                </p>
                                                <p>
                                                   Poste de l'agent : <span className="font-[Poppins] text-sky-400 text-[14px]">{item.poste_agent}</span>
                                                </p>
                                                <p>
                                                   Nom du Compte : <span className="font-[Poppins] text-sky-400 text-[14px]">{item.username}</span>
                                                </p>
                                             </div>


                                          {

                                             item.id === TheId2 ?
                                                (
                                                <button
                                                   className="relative h-[15%] mx-auto top-3 text-md bg-violet-800 w-[80%] text-white font-[Trebuchet] text-sm font-thin flex items-center justify-center transition duration-300 transform hover:bg-violet-700 hover:scale-105 rounded-md p-1">
                                                   Votre Compte Personnel
                                                </button>


                                                ) : item.actif === 'oui' ? (
                                                   <>
                                                      <button
                                                         className="relative h-[15%] space-x-3 mx-auto top-3 bg-green-800 w-[80%] flex items-center justify-center transition duration-300 transform hover:bg-violet-700 hover:scale-105 rounded-md p-1"
                                                      onClick={()=>{
                                                         getData4(item.id)
                                                      }}
                                                      >
                                                         <img
                                                            className="h-auto"
                                                            src={dowload2.src}
                                                            height={18}
                                                            width={18}
                                                            alt="Nfc"
                                                         />


                                                                 <span className="text-white font-[Trebuchet] text-sm font-thin">Verouillé ce compte</span>

                                                      </button>
                                                   </>
                                                ) : item.actif === 'non' ? (
                                                   <>
                                                      <button
                                                         className="relative h-[15%] space-x-3 mx-auto top-3 bg-violet-800 w-[80%] flex items-center justify-center transition duration-300 transform hover:bg-violet-700 hover:scale-105 rounded-md p-1"
                                                         onClick={()=>{
                                                            getData5(item.id)
                                                         }}
                                                      >
                                                         <img
                                                            className="h-auto"
                                                            src={dowload2.src}
                                                            height={18}
                                                            width={18}
                                                            alt="Nfc"
                                                         />


                                                         <span
                                                            className="text-white font-[Trebuchet] text-sm font-thin">Deverouillé ce compte</span>

                                                      </button>
                                                   </>
                                                ) : null


                                          }

                                       </div>
                                    </div>
                                 </div>

                              ))}
                           </div>
                        ))}

                     </div>

                  </div>

               </>


                  )
                  : (
                     filteredData2.map((subItem, subIndex) => (
                        <div
                           className={subIndex % 2 === 0 ? 'bg-transparent border-b border-blue-400  cursor-pointer font-medium text-black hover:bg-gray-100 ' : 'bg-transparent text-black border-b border-blue-400 font-medium cursor-pointer hover:bg-gray-100'}>
                           <div key={subIndex}
                                className={`border-b border-blue-400 h-12 flex   px-2 md:px-2  
                                                ${subIndex % 2 === 0 ? "bg-indigo-600/15" : "bg-transparent"} text-black  md:font-[Poppins] text-[14px] cursor-pointer items-center hover:bg-gray-200 `
                                }
                                onClick={() => {
                                   handleRowClick(`${subItem.id_courier}`, `${subItem.id}`);
                                }}


                              //onClick={() => SetOptions(subIndex)}
                              //onMouseLeave={() => SetOptions(null)}
                           >
                              <img
                                 src={mail.src}
                                 alt="Image sélectionnée"
                                 className="relative h-[70%]  w-[3%]   z-40"
                              />
                              <h1 className="relative w-[90%] mx-auto h-16 md:h-auto  "> Transmission
                                 Interne effectue
                                 le <span className="text-sky-800">{formatDate(subItem.date)} </span>
                                 vers le(la) <span
                                    className="text-sky-800"> {subItem.destinataire}</span>

                              </h1>


                           </div>

                           {
                              options === subItem.id.toString() ? (


                                 <div className="flex flex-wrap mx-auto   ">
                                    {
                                       filteredData2.map((item, index) => (

                                          <div key={item.id}
                                               className="relative w-full h-16 flex items-center justify-center font-[Poppins]  text-[14px] cursor-pointer text-center rounded-md hover:bg-gray-50  "
                                               onClick={() => {
                                                  // handleDownload(item.url_fichier, item.nom);
                                                  // console.log(`/${item.url_fichier}`);
                                               }}
                                          >


                                             <h1
                                                className="relative w-[90%] mx-1 h-16 md:h-6 "> Courrier
                                                recu
                                                le <span
                                                   className="text-sky-800">{formatDate(item.date)} </span>
                                                dont l'objet est <span
                                                   className="text-sky-800"> {item.objet}</span> provenant
                                                de <span
                                                   className="text-sky-800"> {item.expediteur === "1" ? "La Direction Générale"
                                                   : item.expediteur === "2" ? "La Direction Technique"
                                                      : item.expediteur === "3" ? "La Direction Administrative et du Personnel"
                                                         : item.expediteur === "4" ? "La Direction Financière et Comptable"
                                                            : "La Direction Commerciale"}</span> avec
                                                un niveau
                                                d'urgence <span
                                                   className="text-sky-800">{item.Niveau}</span>


                                             </h1>


                                          </div>


                                       ))
                                    }

                                 </div>

                              ) : null
                           }


                           {/* Ajoutez d'autres informations ici si nécessaire */}
                        </div>

                     ))
                  )
            }



         </div>
      </>
   )
}