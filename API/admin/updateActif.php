<?php

header('Content-Type: application/json');
require_once '../connection.php';

$answer = array();

//var_dump($_POST['id']);
//var_dump($_POST['actif']);
//print_r ($_GET['id']);
//    print_r ($_GET['actif']);
//die();
//var_dump($_POST); // Vérifiez si les données POST sont correctement reçues
////die();


    if (isset($_GET['id']) && isset($_GET['actif'])){
        $id = $_GET['id'];
        $actif = $_GET['actif'] ;

            $query = $con ->prepare("UPDATE agent SET actif = '$actif'
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