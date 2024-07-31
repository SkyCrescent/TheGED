<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

if (isset($_GET['nom_fichier'])) {
    $nom_fichier = $_GET['nom_fichier'];
    $query = $con->prepare("SELECT  url_fichier  FROM document_user WHERE nom_fichier = ?");
    $query->bind_param("s", $nom_fichier);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $url_fichier ); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'url_fichiers' => $url_fichier,
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

