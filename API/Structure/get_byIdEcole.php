<?php

require_once '../connection.php';

$answer = array();

if (isset($_GET['id_ecole'])) {
    $id_ecole = $_GET['id_ecole'];

    // Use a try-catch block for better error handling
    try {
        $query = $con->prepare("SELECT id, name, prenom, age, classe,image,id_ecole FROM eleve WHERE id_ecole = ?");
        $query->bind_param("s", $id_ecole);

        if ($query->execute()) {
            $query->store_result();

            if ($query->num_rows > 0) {
                $query->bind_result($resultid, $name, $prenom, $age, $classe , $image, $id_ecole);

                $profiles = array(); // Fixed variable name

                while ($query->fetch()) {
                    // Convertir l'image en base64
                    //$mediaBase64 = base64_encode($image);

                    $profils = array(
                        'id' => $resultid,
                        'name' => $name,
                        'prenom' => $prenom,
                        'image' => $image,
                        'age' => $age,
                        'classe' => $classe,
                        'id_ecole' => $id_ecole,
                    );
                    $profiles[] = $profils;
                }

                $answer['error'] = false;
                $answer['recu'] = $profiles;
                echo json_encode($answer);
            } else {
                $answer['error'] = true;
                $answer['message'] = "Aucun enregistrement trouvé avec l'ID spécifié.$id_ecole" ;
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
