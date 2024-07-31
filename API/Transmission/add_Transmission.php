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



if (isset($_POST['date'], $_POST['destinataire'] , $_POST['expediteur'] , $_POST['id_courier'],$_POST['transmis']  )) {
    $date = $_POST['date'];
    $destinataire = $_POST['destinataire'];
    $expediteur = $_POST['expediteur'];
    $id_courier = $_POST['id_courier'];
    $transmis = $_POST['transmis'];

    //parafeux
    $query = $con->prepare("INSERT INTO transmission (date ,destinataire,expediteur , id_courier,transmis) VALUES (?,?,?,?,?)");
    $query->bind_param("sssis", $date, $destinataire,$expediteur,$id_courier,$transmis);
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
