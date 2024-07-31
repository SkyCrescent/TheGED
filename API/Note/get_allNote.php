
<?php


require_once '../connection.php';

$answer = array();
//print_r($_GET['idCourrier']);
//print_r($_GET['poste']);
//
//die()

//&Type_transmission="depart-arrive"

if (isset($_GET['idCourrier'], $_GET['poste'])) {
    $idCourrier	 = $_GET['idCourrier'];
    $poste = $_GET['poste'];

    $query = $con->prepare("SELECT contenu,idCourrier,idStructure,poste FROM notes WHERE idCourrier = ? and poste = ?");
    $query->bind_param("ss", $idCourrier, $poste);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result($contenu, $idCourrier, $idStructure, $poste); // Change $nom to $resultNom

        $profile = array();

        while ($query->fetch()) {
            $profils = array(
                'contenu' => $contenu,
                'idCourrier' => $idCourrier,
                'idStructure' => $idStructure,
                'poste' => $poste,
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


//
//
//
//require_once '../connection.php';
//
////SELECT  id FROM `courier` ORDER BY id DESC LIMIT 1
////public function get_allUsers(){
//    $query= $con->prepare("SELECT contenu, FROM note  ");
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
//    ?>