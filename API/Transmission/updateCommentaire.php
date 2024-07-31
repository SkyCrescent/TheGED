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


    if (isset($_POST['id']) && isset($_POST['commentaires']) && isset($_POST['id_poste'])
                  ){
        $id = $_POST['id'];
        $commentaires = $_POST['commentaires'] ;
        $id_poste = $_POST['id_poste'];

            $query = $con ->prepare("UPDATE users SET commentaires = '$commentaires', id_poste = '$id_poste'
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