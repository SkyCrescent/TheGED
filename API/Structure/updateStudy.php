<?php

header('Content-Type: application/json');
require_once 'connection.php';

$answer = array();

//var_dump($_POST['nom']);
////print_r ($_POST['nom']);
//    //print_r ($_POST['prenom']);
//die();
////var_dump($_POST); // Vérifiez si les données POST sont correctement reçues
////die();


if ( isset($_POST['name'],$_POST['id'], $_POST['prenom'], $_POST['age'], $_POST['classe'] , $_POST['image'], $_POST['id_ecole'] )) {
    $name = $_POST['name'];
    $prenom = $_POST['prenom'];
    $age = $_POST['age'];
    $classe = $_POST['classe'];
    $image = $_POST['image'];
    $id_ecole = $_POST['id_ecole'];
    $id = $_POST['id'];
    $query = $con ->prepare("UPDATE users SET name = '$name', prenom = '$prenom',age = '$age', classe = '$classe' ,
                 image = '$image', id_ecole = '$id_ecole'
             WHERE id = '$id'");

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