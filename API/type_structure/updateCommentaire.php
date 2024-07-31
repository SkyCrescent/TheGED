<?php

header('Content-Type: application/json');
require_once '../connection.php';

$answer = array();

//var_dump($_POST['nom']);
//print_r ($_GET['description']);
  //  print_r ($_GET['dar']);
//die();
////var_dump($_POST); // Vérifiez si les données POST sont correctement reçues
////die();

//
    if (isset($_GET['description']) && isset($_GET['dar'])
                  ){
        $description = $_GET['description'] ;
        $dar = $_GET['dar'];

            $query = $con ->prepare("UPDATE type_structure SET description = '$description', dar = '$dar'
             WHERE id = '6'");

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