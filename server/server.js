


const io = require("socket.io")(3000, {
   cors: {
      origin: "http://localhost:3001",
      methods: ['GET', 'POST']
   }
});



io.on("connection", (socket) => {
   console.log("User connected");

   socket.on('buttonClicked', () => {
      io.emit('showHeader');
   });

   socket.on('decompresse', () => {
      io.emit('showArchive');
   });
   socket.on('decompresser', () => {
      console.log('c repartire')
      io.emit('showDirector');
   });
   socket.on('archive', () => {
      io.emit('update');
   });

   socket.on('SendCourier', () => {
      io.emit('CourierEnvoye');
   });
   socket.on('SendCourier22', () => {
      console.log('2 repartire')
      io.emit('CourierEnvoye2');
   });

   socket.on('actualiser', () => {
     console.log('repartire')
      io.emit('Notificationloader');
   });


   socket.on('addFor4', (structure) => { // Recevoir l'ID de l'utilisateur
      if (structure !== 0) { // Condition pour afficher le header
         io.emit('return4');
         console.log("Truc recu");
      }
   });



   socket.on('addDirector44', (structure) => { // Recevoir l'ID de l'utilisateur
      if (structure !== 0) { // Condition pour afficher le header
         io.emit('Director4');
         console.log("Truc du directeur");
      }
   });

   // on est l'evenement recu depuis le front et emit cest ce que tu vas renvoyer dans ce cas cest un fonction

   socket.on("disconnect", () => {
      console.log("User disconnected");
   });
});

console.log("Hello")