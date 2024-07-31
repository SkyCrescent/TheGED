<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

if (isset($_GET['id_agent'])) {
    $id = $_GET['id_agent'];
    $query = $con->prepare("SELECT id,date, contenu,action FROM historic WHERE id_agent = ? ORDER BY id DESC ");
    $query->bind_param("i", $id);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result($resultid, $date,$contenu, $action); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'id' => $resultid,
                'date'=>$date,
                'contenu' => $contenu,
                'action' => $action,
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

