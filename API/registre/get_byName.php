<?php
header('Content-Type: application/json');
require_once 'connection.php';

$answer = array();

if (isset($_GET['nom'])) {
    $nom = $_GET['nom'];
    $query = $con->prepare("SELECT  id, nom, adresse, photo, phone FROM ecole WHERE nom = ?");
    $query->bind_param("s", $nom);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result($id, $resultNom, $adresse, $photo, $phone); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){

            $profils = array(
                'id' => $id,
                'nom' => $resultNom, // Change $nom to $resultNom
                'adresse' => $adresse,
                'photo' => $photo,
                'phone' => $phone,
            );
            $profile [] = $profils ;
        }
        //$answer['error'] = false;
        $answer['recu'] = $profile;
//        $answer['message'] = "Commande effectuée avec succès";
//        $answer['num_rows'] = $numRows;
        echo json_encode($answer);
    } else {
        $answer['error'] = true;
        $answer['message'] = "Erreur avec la commande";
    }
} else {
    $answer['error'] = true;
    $answer['message'] = "Donnez un nom";
}

?>
