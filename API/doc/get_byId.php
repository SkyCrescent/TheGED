<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

if (isset($_GET['id_agent'])) {
    $id_agent = $_GET['id_agent'];
    $query = $con->prepare("SELECT id,nom,date,nom_fichier,url_fichier,extension FROM doc WHERE id_agent = ? and archive = 'non' ");
    $query->bind_param("i", $id_agent);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $id,$nom,$date,$nom_fichier, $url_fichier ,$extension); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'id' => $id,
                'nom' => $nom,
                'date'=>$date,
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

