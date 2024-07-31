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


    if (isset($_GET['id']) && isset($_GET['transmission_interne'])
                  ){
        $id = $_GET['id'];
        $transmission_interne = $_GET['transmission_interne'] ;

            $query = $con ->prepare("UPDATE courier SET transmission_interne = '$transmission_interne'
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