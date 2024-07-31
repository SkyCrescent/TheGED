<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

//&Type_transmission="depart-arrive"

if (isset($_GET['recepteur']  )) {
    $recepteur = $_GET['recepteur'];

    $query = $con->prepare("SELECT id ,objet,recepteur,date,transmission_interne FROM `courier` WHERE recepteur = ? and transmission_interne = 'oui'");
    $query->bind_param("s", $recepteur );
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $id, $objet, $recepteur,$date,$transmission_interne ); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'id' => $id,
                'objet' => $objet,
                'recepteur' => $recepteur,
                'date'=>$date,
                'transmission_interne' => $transmission_interne,
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

