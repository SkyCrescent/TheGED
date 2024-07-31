<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

if (isset($_GET['idCourrier'])) {
    $id = $_GET['idCourrier'];
    $query = $con->prepare("SELECT  contenu,poste FROM notes WHERE idCourrier = ?");
    $query->bind_param("i", $id);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result($contenu,$poste); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
               // 'id' => $resultid,
                'contenu' => $contenu,
                'poste' => $poste,
                //'etat' => $etat
            );
            $profile [] = $profils ;

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

