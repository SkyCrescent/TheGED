<?php
header('Content-Type: application/json');
require_once '../connection.php';
$answer = array();

//var_dump($_POST['nom']);
//die();
//var_dump($_POST); // Vérifiez si les données POST sont correctement reçues
//die();

if (isset($_POST['nom'], $_POST['url_fichier'] , $_POST['extension'] , $_POST['id_structure'],$_POST['archive'],$_POST['id_agent'] , $_POST['nom_fichier']

            ,$_POST['nom_agent'],$_POST['date_ajout'],$_POST['categorie']
        )) {
    $nom = $_POST['nom'];
    $url_fichier = $_POST['url_fichier'];
    $extension = $_POST['extension'];
    $id_structure = $_POST['id_structure'];
    $archive = $_POST['archive'];
    $id_agent = $_POST['id_agent'];
    $nom_fichier = $_POST['nom_fichier'];
    $nom_agent=$_POST['nom_agent'];
    $date_ajout=$_POST['date_ajout'];
    $categorie=$_POST['categorie'];
    $query = $con->prepare("INSERT INTO doc_strucutre(nom ,url_fichier,extension ,id_structure,archive,id_agent ,nom_fichier,nom_agent,date_ajout,categorie) VALUES (?,?,?,?,?,?,?,?,?,?)");
    $query->bind_param("sssisissss", $nom, $url_fichier,$extension,$id_structure ,$archive,$id_agent,$nom_fichier,$nom_agent,$date_ajout,$categorie);
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
