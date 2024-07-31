<?php
header('Content-Type: application/json');
require_once '../connection.php';
$answer = array();


//var_dump($_POST['nom_fichier']);
//
//var_dump($_POST); // Vérifiez si les données POST sont correctement reçues
//die();
//



if (isset($_POST['nom'], $_POST['id_sousStructure']  )) {
    $nom = $_POST['nom'];
    $id_sousStructure = $_POST['id_sousStructure'];

    //parafeux
    $query = $con->prepare("INSERT INTO categorie (nom ,id_sousStructure) VALUES (?,?)");
    $query->bind_param("si", $nom, $id_sousStructure);
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
