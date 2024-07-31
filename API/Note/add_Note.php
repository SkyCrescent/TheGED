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



if (isset($_POST['contenu'] , $_POST['idCourrier'] , $_POST['etat'], $_POST['idStructure'],$_POST['poste'] )) {
    $contenu = $_POST['contenu'];
    $etat = $_POST['etat'];
    $idCourrier = $_POST['idCourrier'];
    $idStructure = $_POST['idStructure'];
    $poste=$_POST['poste'];
    $query = $con->prepare("INSERT INTO notes (contenu ,idCourrier,etat , idStructure,poste) VALUES (?,?,?,?,?)");
    $query->bind_param("sisis", $contenu,$idCourrier,$etat,$idStructure,$poste);
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
