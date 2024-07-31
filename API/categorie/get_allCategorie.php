<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

//&Type_transmission="depart-arrive"

if (isset($_GET['id_sousStructure']  )) {
    $id_sousStructure = $_GET['id_sousStructure'];

    $query = $con->prepare("SELECT nom FROM categorie WHERE id_sousStructure = ? ");
    $query->bind_param("i", $id_sousStructure );
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $nom ); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'nom' => $nom,
               // 'id_sousStructure' => $id_sousStructure,
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

