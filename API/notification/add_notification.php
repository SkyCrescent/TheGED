<?php
header('Content-Type: application/json');
require_once '../connection.php';
$answer = array();

//var_dump($_POST); // Vérifiez si les données POST sont correctement reçues
//die();

// Augmenter la taille de max_allowed_packet avant la requête

if (isset($_POST['contenu'], $_POST['expediteur'],$_POST['destinataire'], $_POST['Type_transmission'], $_POST['dat']  , $_POST['lue']  )) {
    $contenu = $_POST['contenu'];
    $expediteur = $_POST['expediteur'];
    $destinataire = $_POST['destinataire'];
    $Type_transmission = $_POST['Type_transmission'];
    $dat = $_POST['dat'];
    $poste = $_POST['poste'];
    $lue = $_POST['lue'] ;
    // Préparation de la requête
    $query = $con->prepare("INSERT INTO notification (contenu, expediteur, destinataire,Type_transmission,date,poste,lue) VALUES (?,?,?,?,?,?,?)");
    if (!$query) {
        $answer['error'] = true;
        $answer['message'] = "Erreur de préparation de la requête : " . $con->error;
        echo json_encode($answer);
        exit;
    }
//
    // Liaison des paramètres
    $query->bind_param("sssssss", $contenu, $expediteur, $destinataire, $Type_transmission,$dat,$poste,$lue);

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

