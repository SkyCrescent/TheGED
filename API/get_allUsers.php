<?php



require_once 'connection.php';

//public function get_allUsers(){
    $query= $con->prepare("SELECT * FROM users");
    $query->execute();
    $resultat = $query->get_result();
$numRows = $query->num_rows;
    $reponse = array() ;
    if($query->execute()){
        $users = array();
        while ($elmnt  = $resultat->fetch_array(MYSQLI_ASSOC) ){
            $users[]= $elmnt ;

        }
        $reponse ['recu'] = $users ;
//        $reponse ['message'] ="Commande effectue avec succes ";
       $reponse['num_rows'] = $numRows;
        $query->close();
       // print_r(json_encode($reponse));
        //en format json
        echo json_encode($reponse);
    }else{
        $reponse ['message'] ="Erreur avec la Commande ";


}
    ?>