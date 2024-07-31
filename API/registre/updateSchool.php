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


    if (isset($_POST['id']) && isset($_POST['nom']) && isset($_POST['adresse'])
                 && isset($_POST['photo']) && isset($_POST['phone']) ){
        $id = $_POST['id'];
        $nom = $_POST['nom'] ;
        $adresse = $_POST['adresse'];
        $photo = $_POST['photo'];
        $phone = $_POST['phone'] ;

            $query = $con ->prepare("UPDATE users SET nom = '$nom', adresse = '$adresse',photo = '$photo', phone = '$phone'
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