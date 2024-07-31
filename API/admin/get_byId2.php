<?php

require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $query = $con->prepare("SELECT id,nom,prenom,adresse,actif,situation,photo,num_phone,poste_agent,username,id_structure FROM agent WHERE id = ?");
    $query->bind_param("i", $id);
    if ($query->execute()) {
        $query->store_result(); // Stocke les résultats dans le client
        $numRows = $query->num_rows;
        $query->bind_result( $id,$nom, $prenom,$adresse,$actif,$situation,$photo,$num_phone,$poste_agent,$username,$id_structure); // Change $nom to $resultNom

        $profile = array();

        while ( $query->fetch()){
            $profils = array(
                'id'=>$id,
                'nom' => $nom,
                'prenom' => $prenom,
                'adresse' => $adresse,
                'actif'=>$actif,
                'situation'=>$situation,
                'photo' => $photo,
                'num_phone' => $num_phone,
                'poste_agent' => $poste_agent,
                'username'=>$username,
                'id_structure' => $id_structure,

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

