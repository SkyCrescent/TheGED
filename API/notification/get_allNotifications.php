<?php

require_once '../connection.php';

$answer = array();

if (isset($_GET['destinataire'])) {
    $destinataire = $_GET['destinataire'];
    $poste = $_GET['poste'];

    try {
        $query = $con->prepare("SELECT COUNT(*) FROM notification WHERE destinataire = ? and poste = ? and lue ='non'");
        $query->bind_param("is", $destinataire,$poste);

        if ($query->execute()) {
            $query->store_result();

            if ($query->num_rows > 0) {
                $query->bind_result( $destinataire );
                $profiles = array(); // Fixed variable name
                while ($query->fetch()) {
                    $profils = array(
                        'destinataire' => $destinataire,
                    );
                    $profiles[] = $profils;
                }

                $answer['error'] = false;
                $answer['recu'] = $profiles;
                echo json_encode($answer);
            } else {
                $answer['error'] = true;
                $answer['message'] = "Aucun enregistrement trouvé avec l'ID spécifié." .$destinataire;
                echo json_encode($answer);
            }
        } else {
            $answer['error'] = true;
            $answer['message'] = "Erreur avec la commande : " . $con->error;
            echo json_encode($answer);
        }
    } catch (Exception $e) {
        $answer['error'] = true;
        $answer['message'] = "Erreur : " . $e->getMessage();
        echo json_encode($answer);
    }
} else {
    $answer['error'] = true;
    $answer['message'] = "Donnez un ID valide.";
    echo json_encode($answer);
}
?>
