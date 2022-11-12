// lancement du script au chargement de la page

window.onload = () => {
    let canvas = new Signature("#signature");
    
    //on va creer un ecouteur d'evenement pour effacer notre image
    document.querySelector('#effacer').addEventListener('click', (e) => {
        e.preventDefault();
        canvas.effacer();
    })

    document.querySelector("#enregistrer").addEventListener('click', (e) => {
        
        e.preventDefault();
        let data = {
            image: canvas.generateImage()
        }
    
        fetch("signature.php", {
            method: "POST",
            body: JSON.stringify(data)
        }).then((reponse) => {
            console.log(reponse)
        })
    })
}