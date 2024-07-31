<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['recepteur']);
//print_r($_GET['Type_transmission']);
//print_r($_GET['expediteur']);
////print_r($_GET['id']);
//die();

//&Type_transmission="depart-arrive"
//

if (isset($_GET['recepteur'] ,$_GET['Type_transmission'] , $_GET['expediteur'] )) {
    $recepteur = $_GET['recepteur'];
    $Type_transmission = $_GET['Type_transmission'];
    $expediteur = $_GET['expediteur'];
//    print_r($_GET['recepteur']);
//    print_r($_GET['Type_transmission']);
//    print_r($_GET['expediteur']);
//print_r($_GET['id']);
   // die();

    $query = $con->prepare("SELECT id,objet, expediteur,recepteur,date,parafeux,Niveau,transmission_interne,note FROM courier WHERE expediteur = ? and Type_transmission = ? and recepteur = ?  ORDER BY 1 DESC");
    $query->bind_param("sss" , $expediteur,$Type_transmission,$recepteur );
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $id, $objet, $expediteur,$recepteur,$date,$parafeux,$Niveau,$transmission_interne,$note ); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'id' => $id,
                'objet' => $objet,
                'expediteur' => $expediteur,
                'recepteur'=>$recepteur,
                'date' => $date,
                'Niveau' => $Niveau,
                'transmission_interne'=>$transmission_interne,
                'parafeux'=>$parafeux,
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
} else if (isset($_GET['expediteur'] ,$_GET['Type_transmission'] , $_GET['objet'] )) {
    $expediteur = $_GET['expediteur'];
    $Type_transmission = $_GET['Type_transmission'];
    $objet = $_GET['objet'];
    $query = $con->prepare("SELECT id,objet, expediteur,recepteur,date,parafeux,Niveau,transmission_interne,note FROM courier WHERE expediteur = ? and Type_transmission = ? and objet LIKE CONCAT( ?, '%') ORDER BY 1 DESC");
    $query->bind_param("sss", $expediteur ,$Type_transmission,$objet);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $id, $objet, $expediteur,$recepteur,$date,$parafeux,$Niveau,$transmission_interne,$note ); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'id' => $id,
                'objet' => $objet,
                'expediteur' => $expediteur,
                'recepteur'=>$recepteur,
                'date' => $date,
                'Niveau' => $Niveau,
                'transmission_interne'=>$transmission_interne,
                'parafeux'=>$parafeux,
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
}   else if (isset($_GET['recepteur'] ,$_GET['Type_transmission'], $_GET['expediteur'] , $_GET['objet'] )) {
    $recepteur = $_GET['recepteur'];
    $Type_transmission = $_GET['Type_transmission'];
    $expediteur = $_GET['expediteur'];
    $objet = $_GET['objet'];
    $query = $con->prepare("SELECT id,objet, expediteur,date,parafeux,Niveau,transmission_interne,note FROM courier WHERE recepteur = ? and Type_transmission = ? and expediteur = ?  and objet = ? ORDER BY 1 DESC");
    $query->bind_param("ssss", $recepteur,$expediteur,$objet ,$Type_transmission);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $id, $objet, $expediteur,$recepteur,$date,$parafeux,$Niveau,$transmission_interne,$note ); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'id' => $id,
                'objet' => $objet,
                'expediteur' => $expediteur,
                'recepteur'=>$recepteur,
                'date' => $date,
                'Niveau' => $Niveau,
                'transmission_interne'=>$transmission_interne,
                'parafeux'=>$parafeux,
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
}      else {
    $answer['error'] = true;
    $answer['message'] = "Donnez un nom";
}
echo json_encode($answer);

