<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

if (isset($_GET['id_transfert'])) {
    $id_transfert = $_GET['id_transfert'];
    $query = $con->prepare("SELECT nom,nom_fichier,url_fichier,extension FROM data_transfere WHERE id_transfert = ?");
    $query->bind_param("i", $id_transfert);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $nom,$nom_fichier, $url_fichier ,$extension); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(

                'nom' => $nom,
                'nom_fichier' => $nom_fichier,
                'url_fichier' => $url_fichier,
                'extension' => $extension,
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

