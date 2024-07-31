<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

if (isset($_GET['id_agent'] ,$_GET['nom'])   ) {
    $id_agent = $_GET['id_agent'];
    $nom = $_GET['nom'];
//    $query = $con->prepare("SELECT id,nom,nom_fichier,url_fichier,extension,id_agent,nom_agent,date_ajout FROM doc_strucutre WHERE id_structure = ? and  nom LIKE CONCAT( ?, '%') and archive='non' ");
    $query = $con->prepare("SELECT id,nom,date,nom_fichier,url_fichier,extension FROM doc WHERE id_agent = ? and  nom LIKE CONCAT( ?, '%') and archive = 'oui' ");
    $query->bind_param("is", $id_agent,$nom);
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
}else if (isset($_GET['id_agent'] ,$_GET['extension'])) {
    $id_agent = $_GET['id_agent'];
    $extension = $_GET['extension'];

    $query = $con->prepare("SELECT id,nom,date,nom_fichier,url_fichier,extension FROM doc WHERE id_agent = ? and  extension = ? and archive = 'oui' ");
    $query->bind_param("is", $id_agent,$extension);
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
}else if (isset($_GET['id_agent'] ,$_GET['extension'], $_GET['nom'] )){
    $id_agent = $_GET['id_agent'];
    $extension = $_GET['extension'];
    $search = $_GET['nom'];



    $query = $con->prepare("SELECT id,nom,date,nom_fichier,url_fichier,extension FROM doc WHERE id_agent = ? and  extension = ? and nom = ? and archive = 'oui' ");
    $query->bind_param("iss", $id_agent,$extension,$search);
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
    } else {
        $answer['error'] = true;
        $answer['message'] = "Erreur avec la commande";
    }




}else {
//    print_r($_GET['id']);
//    print_r($_GET['extension']);
//    print_r($_GET['nom']);
//die();
    $answer['error'] = true;
    $answer['message'] = "Donnez un nom";
}
echo json_encode($answer);

