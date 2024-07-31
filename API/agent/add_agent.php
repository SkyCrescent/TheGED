<?php
header('Content-Type: application/json');
require_once '../connection.php';
$answer = array();

//var_dump($_POST['nom']);
//die();
//var_dump($_POST); // Vérifiez si les données POST sont correctement reçues
//die();


//nom:"Nounga"
//prenom:"Sky Crescent"
//adresse:"Kpg Kalimalang No 517"
//num:"06 566 04 56"
//situation:"Célibataire"
//poste:"Sécretaire"
//username:"Alfred"
//password:"7410"
//photo:"ressources/UsersPicture/IMG_2239.JPG"
//service:"4"



if (isset($_POST['nom'], $_POST['prenom']
    , $_POST['adresse']
    , $_POST['num_phone'] , $_POST['situation'] ,
    $_POST['poste_agent']
    , $_POST['username'] , $_POST['password'] ,$_POST['photo'],
    $_POST['service']
    , $_POST['id_structure'])) {

    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $adresse = $_POST['adresse'];
    $num_phone = $_POST['num_phone'];
    $situation = $_POST['situation'];
    $poste_agent = $_POST['poste_agent'];
    $username = $_POST['username'];
    $password = password_hash($_POST['password'],PASSWORD_DEFAULT);
    $id_structure = $_POST['id_structure'];
    $photo = $_POST['photo'];
    $service = $_POST['service'];
    $actif = 'oui';

    $query = $con->prepare("INSERT INTO agent (nom, prenom,adresse,num_phone,situation,poste_agent,username,password,id_structure,service,photo,actif) VALUES (?,?,?, ?,?,?,?,?,?,?,?,?)");
    $query->bind_param("ssssssssisss", $nom, $prenom,$adresse,$num_phone,$situation,$poste_agent,$username,$password,$id_structure,$service,$photo,$actif);
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
