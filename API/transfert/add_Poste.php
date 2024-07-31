<?php
header('Content-Type: application/json');
require_once '../connection.php';
$answer = array();

if (isset($_POST['expediteur'], $_POST['recepteur'],$_POST['date'], $_POST['structure'], $_POST['note'])) {
    $expediteur = $_POST['expediteur'];
    $recepteur = $_POST['recepteur'];
    $date = $_POST['date'];
    $structure = $_POST['structure'];
    $note = $_POST['note'];

    // Préparation de la requête
    $query = $con->prepare("INSERT INTO transfert (expediteur, recepteur, date, structure,note) VALUES (?,?, ?, ?, ?)");
    if (!$query) {
        $answer['error'] = true;
        $answer['message'] = "Erreur de préparation de la requête : " . $con->error;
        echo json_encode($answer);
        exit;
    }
//
    // Liaison des paramètres
    $query->bind_param("sssss", $expediteur, $recepteur, $date, $structure,$note);

    // Exécution de la requête
    if ($query->execute()) {
        $con->commit();
        $answer['error'] = false;
        $answer['message'] = "Insertion effectuée avec succès.";
    } else {
        $con->rollback();
        $answer['error'] = true;
        $answer['message'] = "Échec de l'insertion : " . $query->error;
    }
/// Fermeture de la requête
    $query->close();

} else {
    $answer['error'] = true;
    $answer['message'] = "Paramètres manquants";
}

echo json_encode($answer);
?>

