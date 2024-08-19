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



if (isset($_POST['objet'], $_POST['expediteur'] , $_POST['recepteur'] , $_POST['date'] , $_POST['Type_transmission'] , $_POST['id_structure'], $_POST['Niveau'], $_POST['parafeux'] ,$_POST['transmission_interne'] , $_POST['note'] )) {
    $objet = $_POST['objet'];
    $expediteur = $_POST['expediteur'];
    $recepteur = $_POST['recepteur'];
    $date = $_POST['date'];
    $Type_transmission = $_POST['Type_transmission'];
    $id_structure = $_POST['id_structure'];
    $Niveau = $_POST['Niveau'];
    $parafeux = $_POST['parafeux'];
    $transmission_interne = $_POST['transmission_interne'];
    $note = $_POST['note'];
    $accuse = 'non'; // Valeur ajoutée
    $sous_structure='Secrétariat';

    //parafeux
    $query = $con->prepare("INSERT INTO courier (objet ,expediteur,recepteur , date ,Type_transmission,id_structure,Niveau,parafeux,transmission_interne,sous_structure,note,accuse) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
    $query->bind_param("sssssissssss", $objet, $expediteur,$recepteur,$date ,$Type_transmission,$id_structure,$Niveau,$parafeux,$transmission_interne,$sous_structure,$note,$accuse);
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
