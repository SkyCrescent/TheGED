<?php
header('Content-Type: application/json');
require_once '../connection.php';
$answer = array();

//var_dump($_POST['nom']);
//var_dump($_POST['date']);
//var_dump($_POST['id_agent']);
//var_dump($_POST['action']);
//var_dump($_POST['contenu']);
//
//die();
//var_dump($_POST); // Vérifiez si les données POST sont correctement reçues


if (isset($_POST['date'] , $_POST['id_agent'] , $_POST['action'],$_POST['contenu'] )) {
    $date = $_POST['date'];
    $id_agent = $_POST['id_agent'];
    $action = $_POST['action'];
    $contenu = $_POST['contenu'];

    $query = $con->prepare("INSERT INTO historic (date ,id_agent,action,contenu ) VALUES (?,?,?,?)");
    $query->bind_param("siss", $date,$id_agent,$action,$contenu);
    if ($query->execute()) {
        $answer['error'] = false;
        $answer['message'] = "Insertion effectuée avec succès.";
    } else {
        $answer['error'] = true;
        $answer['message'] = "Échec de l'insertion : " . $query->error;
    }
} else {
    $answer['error'] = true;
    $answer['message'] = "Paramètres manquants";
}

echo json_encode($answer);
?>
