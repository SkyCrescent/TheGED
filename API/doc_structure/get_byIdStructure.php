<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

if (isset($_GET['id_structure'])) {
    $id_structure = $_GET['id_structure'];
    $query = $con->prepare("SELECT id,nom,nom_fichier,url_fichier,extension,id_agent,nom_agent,date_ajout FROM doc_strucutre WHERE id_structure = ? and archive='non' ");
    $query->bind_param("i", $id_structure);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $id,$nom,$nom_fichier, $url_fichier ,$extension,$id_agent,$nom_agent,$date_ajout); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'id' =>$id,
                'nom' => $nom,
                'nom_fichier' => $nom_fichier,
                'url_fichier' => $url_fichier,
                'extension' => $extension,
                'id_agent'=>$id_agent,
                'nom_agent' => $nom_agent,
                'date_ajout'=>$date_ajout,
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

