<?php
header('Content-Type: application/json');
require_once '../connection.php';
$answer = array();

//var_dump($_POST['nom']);
//die();
//var_dump($_POST); // Vérifiez si les données POST sont correctement reçues
//die();

if (isset($_POST['commentaires'], $_POST['id_poste'])) {
    $commentaires = $_POST['commentaires'];
    $id_poste = $_POST['id_poste'];

    $query = $con->prepare("INSERT INTO commentaires (commentaires, id_poste) VALUES (?, ?)");
    $query->bind_param("si", $commentaires, $id_poste);
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
