'use client'
import search from "@/public/icons/search_126px.png";
import deleted from "@/public/icons/delete_127px.png";
import dowload from "@/public/icons/download.png";
import word from "@/public/icons/word.png";
import pdf from "@/public/icons/pdf.png";
import excel from "@/public/icons/excel2.png";
import pptx from "@/public/icons/pptx.png";
import {usePathname} from "next/navigation";
import axios from "axios";
import {useEffect, useState} from "react";
import share from "@/public/icons/share_127px.png";
import dowload2 from "@/public/icons/download_127px.png";
import deletef from "@/public/icons/trash_127px.png";
import zip from "@/public/icons/archive_folder_127px.png";
import process from 'process';
import io from "socket.io-client";
// Importez process.env pour accéder aux variables d'environnement

export  default function Archive({data,setValueUpdateArchive,structure, id ,reduce,click,id_agent, handleClickButton1,updateValueNotification,handleClickButton8}){
   // Utilisez la variable d'environnement pour construire l'URL de base
   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
   const [loading , SetLoading] = useState(false )
   const [filteredData, setFilteredData] = useState([]); // Initialize with all data
   const [loading2 , SetLoading2] = useState(false )
   const [filteredData2, setFilteredData2] = useState([]); // Initialize with all data
   const [filteredData3, setFilteredData3] = useState([]); // Initialize with all data
   const pathname = usePathname();
   const [nom, setNom] = useState(""); // Initialize with all data
   const [focus , SetFocus] = useState(false)
   const [focus6 , SetFocus6] = useState(false)
   const [ addDoc,SetDoc  ] = useState(false)
   const [myId , SetMyId] = useState(0)
   const [values, setValues] = useState({
      nom: "",
      service :""
   });
   function formatDate(apiDate) {
      // Séparer la date en jour, mois et année
      const [day, month, year] = apiDate.split('/').map(Number);

      // Utiliser new Date(year, monthIndex, day) pour construire une date
      const formattedDate2 = new Date(year, month - 1, day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

      return formattedDate2;
   }
   const getData3 = async () => {
      try {
         // Recuperes les types de structure
         const response = await axios.get(`${baseUrl}/doc_structure/get_byIdStructure2.php?id_structure=${structure}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData3(response.data.recu)
            SetLoading(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   const getData2 = async () => {
      try {
         // Recuperes les types de structure
         const response = await (`${baseUrl}/doc/get_byId2.php?id_agent=${id}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData(response.data.recu)
            SetLoading(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   const getData = async () => {
      try {
         // Recuperes les types de structure
         const response = await ( `${baseUrl}/type_structure/get_byId.php?id=${structure}`);
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log(response.data.recu)
            setFilteredData2(response.data.recu)
            setNom(response.data.recu[0].Description)

            SetLoading2(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.",response);
         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   };

   useEffect(()=>{
      getData2()
      getData()
      getData3()
      console.log(id_agent)
   },[])

   function chunkArray(array, size) {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += size) {
         chunkedArray.push(array.slice(i, i + size));
      }
      return chunkedArray;
   }

   const GotoArchive =  async (Myid) => {
      //onsole.log(Myid)
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/doc_structure/updateArchive.php?id=${Myid}&archive=non`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici", response.data.recu)
            // setFilteredData2(response.data.recu)
            // SetLoading2(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);

            const socket = io("http://localhost:3000");
            socket.emit('decompresse'); // Envoyer l'ID de la structure avec l'événement

         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }

   const GotoArchive2 =  async (Myid) => {
      //onsole.log(Myid)
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/doc/updateArchive.php?id=${Myid}&archive=non`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici", response.data.recu)
            // setFilteredData2(response.data.recu)
            // SetLoading2(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);

            const socket = io("http://localhost:3000");
            socket.emit('decompresser'); // Envoyer l'ID de la structure avec l'événement

         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }


   const getData4 =  async (Myid) => {
      //onsole.log(Myid)
      try {
         // Remplacez l'URL par la bonne URL de votre API

         const response = await axios.get(`${baseUrl}/doc_structure/updateArchive.php?id=${Myid}&archive=non`)
         // console.log(response.data && response.data.recu && response.data.recu.length > 0)
         if (response.data && response.data.recu && response.data.recu.length > 0) {
            // Vérifiez que la réponse contient les données attendues
            console.log("ici", response.data.recu)
            // setFilteredData2(response.data.recu)
            // SetLoading2(true)

         } else {
            console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);

            // const socket = io("http://localhost:3000");
            // socket.emit('decompresse'); // Envoyer l'ID de la structure avec l'événement

         }
      } catch (error) {
         console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
      }
   }

   useEffect(() => {
      const socket = io("http://localhost:3000");

      socket.on('connect', () => {
         console.log('Connected to server');
      });
      socket.on('showArchive', () => {

         const newValue =  'decompresse'

         updateValueNotification(newValue);
         handleClickButton8()
         //   SetArchiv(true)
         setFilteredData3([])
         getData3()
      });


      socket.on('showDirector', () => {

         const newValue =  'decompresse'

         updateValueNotification(newValue);
         handleClickButton8()
         setFilteredData([])
         getData2()
      });

      socket.on('update', () => {
         getData4()
         //setValueUpdateArchive(false)
      });

      socket.on('disconnect', () => {
         console.log('Disconnected from server');
      });

      return () => {
         socket.disconnect();
      };
   }, []);

   {
      data ? (() => {
         const socket = io("http://localhost:3000");
         socket.emit('archive'); // Envoyer l'ID de la structure avec l'événement
         console.log("Truc envoyé");
        // console.log(data)
         setValueUpdateArchive(false)
      })() : null;

   }
   {
      data ? (() => {
         getData3()
      })() : null;

   }


   const handleChange2 = async (e) => {


      const { name, value } = e.target;
      setFilteredData3([]);
      if (name === 'nom' || name === 'service') {
         let cleanedValue = value;
         if (name === 'nom' && value) {
            // Appliquer les expressions régulières à value
            cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
            cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());
         }

         const newData = { ...values, [name]: cleanedValue };
         setValues(newData);
         console.log(values);

         let apiUrl = `${baseUrl}/filter/Archive.php?id_structure=${structure}`;
         if (name === 'nom' && cleanedValue) {
            apiUrl += `&nom=${cleanedValue}`;
         } else if (name === 'service' && cleanedValue) {
            apiUrl += `&extension=${cleanedValue}`;
         } else if (name === 'nom' && name === 'service' && cleanedValue) {
            apiUrl += `&extension=${cleanedValue}&nom=${cleanedValue}`;
         } else {
            getData3();
         }

         try {
            const response = await axios.get(apiUrl);
            if (response.data && response.data.recu && response.data.recu.length > 0) {
               setFilteredData3(response.data.recu);
            } else {
               console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            }
         } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }
      }
   };

   const handleChange4 = async (e) => {

      const { name, value } = e.target;
      setFilteredData([]);
      if (name === 'nom' || name === 'service') {
         let cleanedValue = value;
         if (name === 'nom' && value) {
            // Appliquer les expressions régulières à value
            cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
            cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());
         }

         const newData = { ...values, [name]: cleanedValue };
         setValues(newData);
         console.log(values);

         let apiUrl = `${baseUrl}/filter/ArchiveDirector.php?id_agent=${id_agent}`;
         if (name === 'nom' && cleanedValue) {
            apiUrl += `&nom=${cleanedValue}`;
         } else if (name === 'service' && cleanedValue) {
            apiUrl += `&extension=${cleanedValue}`;
         } else if (name === 'nom' && name === 'service' && cleanedValue) {
            apiUrl += `&extension=${cleanedValue}&nom=${cleanedValue}`;
         } else {
            getData2();
         }

         try {
            const response = await axios.get(apiUrl);
            if (response.data && response.data.recu && response.data.recu.length > 0) {
               setFilteredData(response.data.recu);
            } else {
               console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
            }
         } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
         }
      }

   };


   return(

      <>
         <div className="relative w-[100%]  h-[100%]">

            <div className="relative w-[100%]  h-[12%]  pt-1 flex  items-center  ">

               <div className="relative h-[70%]  w-[45%] ">

                  <div
                     className="relative flex justify-between items-center justify-center w-[80%]  mx-2 border rounded-lg border-gray-300 ">
                     <input
                        onFocus={() => SetFocus(true)}
                        onBlur={() => SetFocus(false)}
                        type='text'
                        name="nom"
                        className="text-large relative w-[80%] mx-auto text-gray-700  bg-white/90  py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                        onChange={(e) => {
                           window.location.pathname.includes('director') ? handleChange4(e) : handleChange2(e);
                        }}
                        // onChange={(e) => handleChange2(e)}
                        //
                        value={values.nom}
                        // inuput nom
                     />
                     <img
                        className=" mx-3 h-5 w-5  absolute"
                        src={search.src}
                        height={20}
                        width={20}
                        alt="Nfc"
                     />

                     <span
                        className={(focus || values.nom) ? "absolute left-3 p-1 w-auto top-6 px-10   text-xs font-black text-sky-700  -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-12 text-sky-700"}>
                                  Rechercher une archive
                                </span>
                  </div>

               </div>
               <div className="relative h-[70%]  w-[40%]  ">
                  <div className="relative w-[100%] ">
                     <select
                        onFocus={() => SetFocus6(true)}
                        onBlur={() => SetFocus6(false)}
                        name="service"
                        className={"text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"}
                        onChange={(e) => {
                           window.location.pathname.includes('director') ? handleChange4(e) : handleChange2(e);
                        }}

                        value={values.service}
                     >
                        <option value=''> </option>
                        <option value='Word'>Word</option>
                        <option value='PDF'>PDF</option>
                        <option value='Excel'>Excel</option>
                        <option value='PPTX'>PowerPoint</option>
                     </select>
                     <span
                        className={(focus6 || values.service) ? "absolute left-3 p-1 w-auto top-6 px-1 text-xs font-black text-blue-900 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}>
                                 Filter votre recherche
                                </span>
                  </div>
               </div>



            </div>


            <div className="relative w-[98%] mx-auto  h-[88%]   ">

               <div id="d"
                    className="h-[98%] top-0  p-0.5  content-normal  relative  scrollbar-hidden     overflow-auto">

                  {
                     pathname.includes('director') ?
                        //  See === 1 ?

                        <>
                           {chunkArray(filteredData, reduce ? 14 : 14).map((group, index) => (
                              <div key={index} className="flex flex-wrap mx-auto ">
                                 {group.map((item, itemIndex) => (
                                    <div key={item.id} className="relative w-[15%] h-52   mb-2 mr-3">
                                       <div
                                          className="relative w-full h-full p-1  cursor-pointer border border-gray-500 rounded-md hover:bg-gray-50  "
                                          onClick={() => {
                                             // handleDownload(item.url_fichier, item.nom);
                                             console.log(`/${item.url_fichier}`);
                                          }}
                                       >
                                          <div className="relative w-full h-[60%] flex items-center justify-center ">
                                             {item.extension === 'Word' ? (
                                                <img
                                                   src={word.src}
                                                   alt="Image sélectionnée"
                                                   className="relative h-[85%]  w-[65%] mx-auto  z-40"
                                                />
                                             ) : item.extension === 'PDF' ? (
                                                <img
                                                   src={pdf.src}
                                                   alt="Image sélectionnée"
                                                   className="relative h-[75%]  w-[95%]  z-40"
                                                />
                                             ) : item.extension === 'Excel' ? (
                                                <img
                                                   src={excel.src}
                                                   alt="Image sélectionnée"
                                                   className="relative h-[70%]  w-[90%] mx-auto z-40"
                                                />
                                             ) : (
                                                <img
                                                   src={pptx.src}
                                                   alt="Image sélectionnée"
                                                   className="relative h-[70%]  w-[93%] mx-auto z-40"
                                                />
                                             )}
                                          </div>

                                          <div
                                             className="relative w-full h-[20%] font-semibold text-[12px] flex items-center justify-center ">

                                             <span className="relative w-full text-center"
                                                   style={{wordWrap: 'break-word'}}>
                                                 {item.nom.includes('.') ? item.nom.substring(0, item.nom.lastIndexOf('.')) : item.nom}
                                             </span>

                                          </div>
                                          <div
                                             className="relative w-full h-[20%]  font-semibold text-[12px] flex items-center ">
                                             <button
                                                className="relative h-[80%] mx-auto bg-gray-200 w-[80%]  flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                onClick={() => {
                                                   GotoArchive2(` ${item.id} `)
                                                }}

                                             >
                                                <img
                                                   className=" h-auto  "
                                                   title="Désarchiver le fichier"
                                                   src={zip.src}
                                                   height={18}
                                                   width={18}
                                                   alt="Nfc"

                                                />
                                             </button>

                                          </div>


                                       </div>
                                    </div>

                                 ))}
                              </div>
                           ))}

                        </>
                        :
                        <>
                           {chunkArray(filteredData3, reduce ? 14 : 14).map((group, index) => (
                              <div key={index} className="flex flex-wrap mx-auto ">
                                 {group.map((item, itemIndex) => (
                                    <div key={item.id} className="relative w-[15%] h-52   mb-2 mr-3">
                                       <div
                                          className="relative w-full h-full p-1  cursor-pointer border border-gray-500 rounded-md hover:bg-gray-50  "
                                          onClick={() => {
                                             // handleDownload(item.url_fichier, item.nom);
                                             console.log(`/${item.url_fichier}`);
                                          }}
                                       >
                                          <div className="relative w-full h-[60%] flex items-center justify-center ">
                                             {item.extension === 'Word' ? (
                                                <img
                                                   src={word.src}
                                                   alt="Image sélectionnée"
                                                   className="relative h-[85%]  w-[65%] mx-auto  z-40"
                                                />
                                             ) : item.extension === 'PDF' ? (
                                                <img
                                                   src={pdf.src}
                                                   alt="Image sélectionnée"
                                                   className="relative h-[75%]  w-[95%]  z-40"
                                                />
                                             ) : item.extension === 'Excel' ? (
                                                <img
                                                   src={excel.src}
                                                   alt="Image sélectionnée"
                                                   className="relative h-[70%]  w-[90%] mx-auto z-40"
                                                />
                                             ) : (
                                                <img
                                                   src={pptx.src}
                                                   alt="Image sélectionnée"
                                                   className="relative h-[70%]  w-[93%] mx-auto z-40"
                                                />
                                             )}
                                          </div>

                                          <div
                                             className="relative w-full h-[20%] font-semibold text-[12px] flex items-center justify-center ">

                                             <span className="relative w-full text-center"
                                                   style={{wordWrap: 'break-word'}}>
                                                 {item.nom.includes('.') ? item.nom.substring(0, item.nom.lastIndexOf('.')) : item.nom}
                                             </span>

                                          </div>
                                          <div
                                             className="relative w-full h-[20%] font-semibold text-[12px] flex items-center justify-center">
                                             {
                                                item.id_agent === id_agent ? (
                                                   <div
                                                   >
                                                      <div>
                                                         Archiver par vous
                                                      </div>

                                                      <div
                                                         className="relative flex  items-center  justify-center h-full w-full ">
                                                         <button
                                                            className="relative h-[90%] bg-gray-100 w-[60%] flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                            onClick={() => {
                                                               GotoArchive(` ${item.id} `)
                                                            }}

                                                         >
                                                            <img
                                                               className=" h-auto  "
                                                               title="Désarchiver le fichier"
                                                               src={zip.src}
                                                               height={18}
                                                               width={18}
                                                               alt="Nfc"

                                                            />
                                                         </button>
                                                      </div>


                                                   </div>
                                                ) : (
                                                   <div
                                                   >


                                                      <div>
                                                         Archiver par {item.nom_agent}
                                                      </div>

                                                      <div
                                                         className="relative flex  items-center  justify-center h-full w-full ">
                                                         <button
                                                            className="relative h-[90%] bg-gray-100 w-[60%] flex items-center  justify-center transition duration-300 transform hover:scale-105  rounded-md  p-1"
                                                            onClick={() => {
                                                               GotoArchive(` ${item.id} `)
                                                            }}

                                                         >
                                                            <img
                                                               className=" h-auto  "
                                                               title="Désarchiver le fichier"
                                                               src={zip.src}
                                                               height={18}
                                                               width={18}
                                                               alt="Nfc"

                                                            />
                                                         </button>
                                                      </div>


                                                   </div>
                                                )
                                             }


                                          </div>


                                       </div>
                                    </div>

                                 ))}
                              </div>
                           ))}

                        </>
                  }
               </div>


            </div>

         </div>

      </>
   )
}