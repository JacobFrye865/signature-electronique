//Class est un modèle de données définissant la structure commune à tous les objets qui seront créés
class Signature {

    // je vais creer mon constructeur qui me construira par default toutes les infos que j'ai besoin pour ma signature
    //constructor permet de créer et initialiser un objet lorsqu'on utilise le mot clé class.
    constructor(canvas){
        this.sign = false
        this.prevX = 0  
        this.prevY = 0

        this.canvas = document.querySelector(canvas);
        this.ctx = this.canvas.getContext("2d"); //retourne un contexte de dessin sur le canevas, ou null si l'identificateur de contexte n'est pas supporté.
        this.ctx.strokeStyle = "black" // strokeStyle permet de  définir une couleur 
        this.ctx.lineWidth = 2
        

        //on va ecouter notre objet sur la fonction du clique de la souris 
        this.canvas.addEventListener("mousedown", (e) => {
            this.sign = true
            this.prevX = e.clientX - this.canvas.offsetLeft // offset signifie decalage 
            this.prevY = e.clientY - this.canvas.offsetTop
        })
        //on ecoute le mouvement de la souris pour signer
        this.canvas.addEventListener("mousemove", (e) =>{
            if (this.sign){
                let currX = e.clientX - this.canvas.offsetLeft
                let currY = e.clientY - this.canvas.offsetTop
                this.draw(this.prevX, this.prevY, currX, currY);
                this.prevX = currX
                this.prevY = currY
            }
        });
        this.canvas.addEventListener("mouseup", (e) =>{
            this.sign = false
        });
        this.canvas.addEventListener("mouseout", (e) => {
            this.sign = false
        });
    }
    //on va construire son dessin 
    draw(depX, depY, destX, destY){ // dep= depart et dest= destination
        this.ctx.beginPath() // ouverture du dessin
        this.ctx.moveTo(depX, depY);
        this.ctx.lineTo(destX, destY);
        this.ctx.closePath() //fermer le dessin
        this.ctx.stroke() // fermeture definitive
    }

    /* les classes se sont des templates qui nous permettent de pourvoir etre reutiliser dans des methodes sur d'autres 
    fonction en JS*/
    effacer (){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height); // 0,0 signifie que X et Y repartent de 0
    } /*clearRect met en noir transparent tous les pixels dans le rectangle défini par le 
    point de départ de coordonnées (x, y) et par les tailles (largeur, hauteur), supprimant tout contenu précédemment dessiné.*/
    generateImage(){
        let image = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream") // transformer l'image png en octet-stream
        return image;
    }
}