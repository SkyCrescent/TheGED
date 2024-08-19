<?php

header('Content-Type: application/json');
require_once '../connection.php';

$answer = array();

//var_dump($_POST['transmission_interne']);
//var_dump($_POST['sous_structure']);
//print_r ($_GET['transmission_interne']);
 // print_r ($_GET['sous_structure']);
//die();
//var_dump($_POST); // Vérifiez si les données POST sont correctement reçues
//die();


    if (isset($_GET['id']) && isset($_GET['transmission_interne'])  && isset($_GET['sous_structure'])
                  ){
        $id = $_GET['id'];
        $transmission_interne = $_GET['transmission_interne'] ;
        $sous_structure = $_GET['sous_structure'];
            $query = $con ->prepare("UPDATE courier SET transmission_interne ='$transmission_interne' , sous_structure = '$sous_structure'
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