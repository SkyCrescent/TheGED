<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

//&Type_transmission="depart-arrive"

if (isset($_GET['expediteur'],$_GET['destinataire']  )) {
    $expediteur = $_GET['expediteur'];
    $destinataire = $_GET['destinataire'];

    $query = $con->prepare("SELECT id,date, destinataire,expediteur,id_courier,transmis FROM transmission WHERE expediteur = ? and destinataire = ? and transmis='oui' ORDER BY 1 DESC ");
    $query->bind_param("ss", $expediteur,$destinataire);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $id, $date,$destinataire, $expediteur,$id_courier,$transmis ); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'id' => $id,
                'date' => $date,
                'destinataire'=>$destinataire,
                'expediteur' => $expediteur,
                'id_courier' => $id_courier,
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

