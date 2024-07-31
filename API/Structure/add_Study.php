<?php
header('Content-Type: application/json');
require_once '../connection.php';
$answer = array();


//print_r("le nom: " . $_POST['nom']);
//print_r("adresse".$_POST ['prenom']);
//print_r("la photo".$_POST ['age']);
//print_r("Le phone".$_POST ['classe']);
//print_r("Le phone".$_POST ['id_ecole']);
//print_r($_FILES['photo']);
//die();

//var_dump($_POST['nom']);
//die();
//var_dump($_POST); // Vérifiez si les données POST sont correctement reçues
//die();

if (isset($_POST['name'], $_POST['prenom'], $_POST['age'], $_POST['classe'] ,$_POST['image'], $_POST['id_ecole'] )) {
    $name = $_POST['name'];
    $prenom = $_POST['prenom'];
    $age = $_POST['age'];
    $classe = $_POST['classe'];
    $image = $_POST['image'];
    $id_ecole = $_POST['id_ecole'];

    $query = $con->prepare("INSERT INTO eleve (name, prenom, age, classe,image,id_ecole) VALUES (?, ?, ?, ? ,?,?)");
    $query->bind_param("ssissi", $name, $prenom, $age, $classe ,$image,$id_ecole );
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
