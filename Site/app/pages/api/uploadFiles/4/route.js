import { writeFile } from 'fs/promises'
import  { NextResponse } from "next/server";
import axios from "axios";



export async function POST(req){
   const data = await  req.formData()
   const file = data.get('file');
   if(!file){
      return NextResponse.json ({"msg":"pas de image",success:false})
   }
   const byteData = await file.arrayBuffer();
   const buffers =Buffer.from (byteData)
   const path = `./public/ressources/4/doc/${file.name}`


  // const path = `../../ressources/4/doc/${file.name}`
   const path2 = `../../backup/4/doc/${file.name}`

   await  writeFile(path,buffers)
   await writeFile(path2,buffers)
   return NextResponse.json({"msg":"c bn ",success:true})
}
