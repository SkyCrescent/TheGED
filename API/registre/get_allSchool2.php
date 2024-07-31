<?php
require_once '../connection.php';

$reponse = array();

$query = $con->prepare("SELECT eleve.name ,eleve.age,eleve.classe ,eleve.age ,eleve.prenom,eleve.image,eleve.id_ecole ,ecole.id,ecole.nom,ecole.adresse,ecole.photo,ecole.phone  FROM ecole INNER JOIN eleve ON eleve.id_ecole = ecole.id ");
if ($query->execute()) {
    $resultat = $query->get_result();
    $numRows = $resultat->num_rows;

    if ($numRows > 0) {
        $posts = array();

        while ($elmnt = $resultat->fetch_assoc()) {
            // Convert BLOB data to base64 encoding
//            $elmnt['photo'] = base64_encode($elmnt['photo']);
//            $elmnt['image'] = base64_encode($elmnt['image']);

            //$elmnt['ecole.photo'] = base64_encode($elmnt['ecole.photo']);
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
