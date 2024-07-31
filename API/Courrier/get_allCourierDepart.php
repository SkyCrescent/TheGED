<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

//&Type_transmission="depart-arrive"

if (isset($_GET['expediteur'] ,$_GET['Type_transmission'] )) {
    $expediteur = $_GET['expediteur'];
  $Type_transmission = $_GET['Type_transmission'];

    $query = $con->prepare("SELECT id,objet, recepteur,date,Niveau,note FROM courier WHERE expediteur = ? and Type_transmission = ? ORDER BY 1 DESC");
    $query->bind_param("ss", $expediteur ,$Type_transmission);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $id, $objet, $recepteur,$date,$Niveau,$note ); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'id' => $id,
                'objet' => $objet,
                'recepteur' => $recepteur,
                'date' => $date,
                'Niveau' => $Niveau,
                'note'=>$note
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

