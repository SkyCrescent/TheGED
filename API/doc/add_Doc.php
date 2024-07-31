<?php
header('Content-Type: application/json');
require_once '../connection.php';
$answer = array();


if (isset($_POST['nom'], $_POST['url_fichier'] , $_POST['extension'] , $_POST['id_agent'] ,$_POST['archive'], $_POST['nom_fichier'] , $_POST['date'] )) {
    $nom = $_POST['nom'];
    $nom_fichier = $_POST['nom_fichier'];
    $url_fichier = $_POST['url_fichier'];
    $extension = $_POST['extension'];
    $archive = $_POST['archive'];

    $id_agent = $_POST['id_agent'];
    $date = $_POST['date'];
    $query = $con->prepare("INSERT INTO doc (nom ,nom_fichier,url_fichier,extension,date ,archive, id_agent ) VALUES (?,?,?,?,?,?,?)");
    $query->bind_param("sssssss", $nom ,$nom_fichier, $url_fichier,$extension,$date,$archive,$id_agent );
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
