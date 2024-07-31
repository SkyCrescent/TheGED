<?php

header('Content-Type: application/json');
require_once '../connection.php';

$answer = array();
//print_r($_GET['id']);
//die()
//
//
if (isset($_GET['id'])) {
    try {
       // $lue = $_POST['lue'];
        $id = $_GET['id'];

        $query = $con->prepare("UPDATE notification SET  lue ='oui' WHERE id = ?");
        $query->bind_param("i",  $id);

        if ($query->execute()) {
            $answer['error'] = false;
            $answer['message'] = "Mise à jour effectuée avec succès.";
        } else {
            $answer['error'] = true;
            $answer['message'] = "Mise à jour impossible : " . $con->error;
        }
    } catch (Exception $e) {
        $answer['error'] = true;
        $answer['message'] = "Erreur : " . $e->getMessage();
    }
} else {
    $answer['error'] = true;
    $answer['message'] = "Fournir les éléments à mettre à jour.";
}

echo json_encode($answer);
?>