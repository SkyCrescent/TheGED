<?php

header('Content-Type: application/json');
require_once '../connection.php';

$answer = array();

//var_dump($_POST['nom']);
//echo $_POST['id'];
//    //print_r ($_POST['prenom']);
//die();
////var_dump($_POST); // Vérifiez si les données POST sont correctement reçues
////die();


if (isset($_GET['id_courier']) ){
    $id = $_GET['id_courier'];
    $query = $con->prepare("DELETE from document_user WHERE id_courier =?  ");
 $query -> bind_param("i",$id);
    if ($query->execute()){
        $answer['error'] =false ;
        $answer['messsage'] = "Mise a jour effectuer avec succes ";
    }else{
        $answer['error'] =true ;
        $answer['messsage'] = "Mise a jour impossible ";
    }
}else{
    $answer['error'] =true ;
    $answer['messsage'] = "Fournisser les element  a mettre jour ";
}
print_r($answer);