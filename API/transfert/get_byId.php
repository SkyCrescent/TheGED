<?php

require_once '../connection.php';

$answer = array();

if (isset($_GET['structure'] ,$_GET['expediteur'])) {
    $id = $_GET['structure'];
    $expediteur = $_GET['expediteur'];
    // Use a try-catch block for better error handling
    try {
        $query = $con->prepare("SELECT id ,recepteur,expediteur,date,structure,note FROM transfert WHERE structure = ? and expediteur = ? ORDER BY 1 DESC");
        $query->bind_param("is", $id,$expediteur);

        if ($query->execute()) {
            $query->store_result();

            if ($query->num_rows > 0) {
                $query->bind_result($resultid, $recepteur, $expediteur, $date, $structure,$note );

                $profiles = array(); // Fixed variable name

                while ($query->fetch()) {
                    $profils = array(
                        'id' => $resultid,
                        'recepteur' => $recepteur,
                        'expediteur' => $expediteur,
                        'date' => $date,
                        'structure' => $structure,
                        'note'=>$note
                    );
                    $profiles[] = $profils;
                }

                $answer['error'] = false;
                $answer['recu'] = $profiles;
                echo json_encode($answer);
            } else {
                $answer['error'] = true;
                $answer['message'] = "Aucun enregistrement trouvé avec l'ID spécifié." .$id;
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
