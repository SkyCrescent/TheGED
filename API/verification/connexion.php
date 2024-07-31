<?php

require_once '../connection.php';

$answer = array();

if (isset($_GET['username'], $_GET['password'])) {
    $username = $_GET['username'];
    $password = $_GET['password'];

    // Récupérer le mot de passe haché depuis la base de données
    $query = $con->prepare("SELECT id, poste_agent,actif,password FROM agent WHERE username = ?");
    $query->bind_param("s", $username);
    if ($query->execute()) {
        $query->store_result();
        $numRows = $query->num_rows;

        if ($numRows == 1) {
            $query->bind_result($id, $poste_agent,$actif, $hashed_password);
            $query->fetch();

            // Vérifier si le mot de passe fourni correspond au mot de passe haché
            if (password_verify($password, $hashed_password)) {
                // Authentification réussie
                $profile = array(
                    'id' => $id,
                    'poste_agent' => $poste_agent,
                    'actif'=>$actif,
                    'pass'=>password_verify($password, $hashed_password),
                );

                $answer['error'] = false;
                $answer['recu'] = $profile;
            } else {
                // Mot de passe incorrect
                $answer['error'] = true;
                $answer['recu'] = "Mot de passe incorrect";
            }
        } else {
            // Nom d'utilisateur non trouvé
            $answer['error'] = true;
            $answer['recu'] = "Nom d'utilisateur non trouvé";
        }
    } else {
        // Erreur de requête
        $answer['error'] = true;
        $answer['recu'] = "Erreur avec la commande";
    }
} else {
    // Nom d'utilisateur ou mot de passe manquant
    $answer['error'] = true;
    $answer['recu'] = "Donnez un nom d'utilisateur et un mot de passe";
}

echo json_encode($answer);
