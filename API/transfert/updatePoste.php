<?php

header('Content-Type: application/json');
require_once '../connection.php';

$answer = array();
//
//error_log(var_dump($_POST, true));
//error_log(print_r($_FILES, true));
//die();
//$photo = file_get_contents($_FILES['media']['tmp_name']);
//print_r("id".$_POST['id']);
//print_r("media".$photo);
//print_r($_POST['dat']);
//print_r( $_POST['contenu']);
//print_r($_POST['visible']);
//die();
//
if (isset($_POST['id'], $_POST['dat'], $_POST['contenu'], $_POST['visible'])) {
    try {
        //$media = $_FILES['media'];
        $dat = $_POST['dat'];
        $contenu = $_POST['contenu'];
        $visible = $_POST['visible'];
        $id = $_POST['id'];

        $query = $con->prepare("UPDATE postes SET  dat = ?, contenu = ?, visible = ? WHERE id = ?");
        $query->bind_param("sssi",  $dat, $contenu, $visible, $id);

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