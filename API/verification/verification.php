<?php

require_once '../connection.php';

$answer = array();

if (isset($_GET['id_structure'], $_GET['poste_agent'])) {
    $id_structure = $_GET['id_structure'];
    $poste_agent = $_GET['poste_agent'];

    $query = $con->prepare("SELECT nom FROM agent WHERE id_structure = ? and poste_agent = ?");
    $query->bind_param("is", $id_structure ,$poste_agent);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result($nom); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'nom' => $nom,
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

