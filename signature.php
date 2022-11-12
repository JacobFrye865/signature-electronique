<?php
if($_SERVER['REQUEST_METHOD'] === 'POST'){ //on va attendre que le server nous renvoie une requete de method post .
    $donnees = json_decode(file_get_contents('php://input'), false);
        
    list($type, $data) = explode(';', $donnees->image); //explode retourne une donnee d'un tableau (comme split en JS).
    list(, $image) = explode(',', $data);

    $image_decodee = base64_decode($image); // decode l'image

    $fichier = md5(uniqid()). '.png';// le md5 sert pour encoder les images unique et on la veut en format png

    if(file_put_contents(__DIR__."/images/$fichier", $image_decodee)){ //file input contents permet de telecharger notre image
        // DIR permet d'avoir la racine de notre repertoire de travail
        echo 'Succès';//ne s'affcihera pas sur la page mais dans l'inspecteur reseau car c'est en AJAX 
    }else{
        echo 'Echec';
    }
}
?>