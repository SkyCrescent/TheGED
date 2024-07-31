<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

if (isset($_GET['id_structure'])) {
    $id = $_GET['id_structure'];
    $query = $con->prepare("SELECT  nom_fichier,nom FROM doc_strucutre WHERE id_structure = ?");
    $query->bind_param("i", $id);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result($nom_fichier,$nom); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                // 'id' => $resultid,
                'nom_fichier' => $nom_fichier,
                'nom' => $nom,
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

