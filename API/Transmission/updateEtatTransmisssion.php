<?php

header('Content-Type: application/json');
require_once '../connection.php';

$answer = array();

//var_dump($_POST['nom']);
////print_r ($_POST['nom']);
//    //print_r ($_POST['prenom']);
//die();
////var_dump($_POST); // Vérifiez si les données POST sont correctement reçues
////die();


    if (isset($_GET['id_courier']) && isset($_GET['transmis'])
                  ){
        $id_courier = $_GET['id_courier'];
        $transmis = $_GET['transmis'] ;

            $query = $con ->prepare("UPDATE transmission SET transmis = '$transmis'
             WHERE id_courier = '$id_courier'");

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