<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

//if (isset($_GET['id'])) {
//    $id = $_GET['id'];
    $query = $con->prepare("SELECT Description,dar FROM type_structure WHERE id = 6");
    //$query->bind_param("i", $id);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result($Description,$dar); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'Description' => $Description,
                'dar'=>$dar,
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
//} else {
//    $answer['error'] = true;
//    $answer['message'] = "Donnez un nom";
//}
echo json_encode($answer);

