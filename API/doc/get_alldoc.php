<?php


require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

if (isset($_GET['id_agent'])) {
    $id_agent = $_GET['id_agent'];
    $query = $con->prepare("SELECT nom,nom_fichier,url_fichier,extension FROM doc WHERE id_agent = ?");
    $query->bind_param("i", $id_agent);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result($nom, $nom_fichier, $url_fichier, $extension); // Change $nom to $resultNom

        $profile = array();

        while ($query->fetch()) {
            $profils = array(

                'nom' => $nom,
                'nom_fichier' => $nom_fichier,
                'url_fichier' => $url_fichier,
                'extension' => $extension,
            );
            $profile [] = $profils;

        }
        $answer['error'] = false;
        $answer['recu'] = $profile;
//        $answer['num_rows'] = $numRows;
    } else {
        $answer['error'] = true;
        $answer['message'] = "Erreur avec la commande";
    }
} else {
    $answer['error'] = true;
    $answer['message'] = "Donnez un nom";
}
echo json_encode($answer);


//require_once '../connection.php';
//
////public function get_allUsers(){
//    $query= $con->prepare("SELECT * FROM document_user");
//    $query->execute();
//    $resultat = $query->get_result();
//$numRows = $query->num_rows;
//    $reponse = array() ;
//    if($query->execute()){
//        $users = array();
//        while ($elmnt  = $resultat->fetch_array(MYSQLI_ASSOC) ){
//            $users[]= $elmnt ;
//
//        }
//        $reponse ['recu'] = $users ;
////        $reponse ['message'] ="Commande effectue avec succes ";
//       $reponse['num_rows'] = $numRows;
//        $query->close();
//       // print_r(json_encode($reponse));
//        //en format json
//        echo json_encode($reponse);
//    }else{
//        $reponse ['message'] ="Erreur avec la Commande ";
//
//
//}
//
//    ?>