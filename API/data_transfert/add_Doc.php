<?php
header('Content-Type: application/json');
require_once '../connection.php';
$answer = array();

//var_dump($_POST['nom']);
//var_dump($_POST['url_fichier']);
//var_dump($_POST['extension']);
//var_dump($_POST['id_courier']);
//var_dump($_POST['nom_fichier']);
//
//var_dump($_POST); // Vérifiez si les données POST sont correctement reçues
//die();
//







if (isset($_POST['nom'], $_POST['url_fichier'] , $_POST['extension'] , $_POST['id_transfert'] , $_POST['nom_fichier'] )) {
    $nom = $_POST['nom'];
    $url_fichier = $_POST['url_fichier'];
    $extension = $_POST['extension'];
    $id_transfert = $_POST['id_transfert'];
    $nom_fichier = $_POST['nom_fichier'];

    $query = $con->prepare("INSERT INTO data_transfere (nom ,url_fichier,extension , id_transfert ,nom_fichier) VALUES (?,?,?,?,?)");
    $query->bind_param("sssis", $nom, $url_fichier,$extension,$id_transfert ,$nom_fichier);
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
