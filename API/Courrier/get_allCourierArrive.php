<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

//&Type_transmission="depart-arrive"

if (isset($_GET['recepteur'] ,$_GET['Type_transmission'] )) {
    $recepteur = $_GET['recepteur'];
  $Type_transmission = $_GET['Type_transmission'];

    $query = $con->prepare("SELECT id,objet, expediteur,date,parafeux,Niveau,transmission_interne,note,accuse FROM courier WHERE recepteur = ? and Type_transmission = ? and sous_structure='Secrétariat' ORDER BY 1 DESC");
    $query->bind_param("ss", $recepteur ,$Type_transmission);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $id, $objet, $expediteur,$date,$parafeux,$Niveau,$transmission_interne,$note,$accuse ); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'id' => $id,
                'objet' => $objet,
                'expediteur' => $expediteur,
                'date' => $date,
                'Niveau' => $Niveau,
                'transmission_interne'=>$transmission_interne,
                'parafeux'=>$parafeux,
                'note'=>$note,
                'accuse'=>$accuse
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

