//websocket.js

const server = require('http').createServer();
const io = require('socket.io')(server);


   io.on('connection'  , (socket) =>{
         socket.on('afficherPopUp' ,() =>{
            io.emit('popUpVisible')
         });
   });



      server.listen( 3001 , ()=>{
         console.log('Serveur Websocket en ecoute sur le port 3001')
      } )