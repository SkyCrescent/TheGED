<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

//&Type_transmission="depart-arrive"

if (isset($_GET['expediteur']  )) {
    $expediteur = $_GET['expediteur'];

    $query = $con->prepare("SELECT id,date, destinataire,expediteur,id_courier FROM transmission WHERE expediteur = ? ORDER BY 1 DESC");
    $query->bind_param("s", $expediteur);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $id, $date,$destinataire, $expediteur,$id_courier ); // Change $nom to $resultNom

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

