<?php
require_once '../connection.php';

$reponse = array();

$query = $con->prepare("SELECT * FROM postes  ");
if ($query->execute()) {
    $resultat = $query->get_result();
    $numRows = $resultat->num_rows;

    if ($numRows > 0) {
        $posts = array();

        while ($elmnt = $resultat->fetch_assoc()) {
//
            $posts[] = $elmnt;
        }

        $reponse['recu'] = $posts;
        $reponse['num_rows'] = $numRows;
        $reponse['error'] = false;
        $reponse['message'] = "Récupération réussie.";
    } else {
        $reponse['error'] = true;
        $reponse['message'] = "Aucun résultat trouvé.";
    }
} else {
    $reponse['error'] = true;
    $reponse['message'] = "Erreur avec la commande : " . $query->error;
}

$query->close();
echo json_encode($reponse);
?>
