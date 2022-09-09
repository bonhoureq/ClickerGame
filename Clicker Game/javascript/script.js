//Variable pour les fonctions

var golds = 0;
var x = 1;
var gps = 0;
var minions = [
    { id: 1, name: "Wooden Sword", cost: 10, gps: 1, owned: 0 },
    { id: 2, name: "Stone Sword", cost: 5000, gps: 150, owned: 0 },
    { id: 3, name: "Iron Sword", cost: 150000, gps: 1650, owned: 0 },
    { id: 4, name: "Dispelda", cost: 1150000, gps: 10000, owned: 0 },
    { id: 5, name: "Zanma no Katana", cost: 35000000, gps: 35000, owned: 0 },
    { id: 6, name: "Divine Sword", cost: 5000000000, gps: 169000, owned: 0 }
];
var clickdb = 1;


//Ajout des golds/click

function addGolds(x) {
    golds += x;
    golds.toFixed(2);
}

//Affichage des golds

function displayGolds() {
    setInterval(function () {
        document.querySelector("#gold").innerHTML = 'Golds :' + " " + golds.toFixed(2);
    }, 1);
}

//Compteur lier au bouton pour le fonctionnement de l'ajout des golds et sound associer avec

function counter() {
    addGolds(x);
    var bruit = new Audio();
    bruit.src = "../audio/clickcombat.mp4";
    bruit.play();
}

//Configuration de l'ajout des golds par seconde

function goldPerSecond() {
    setInterval(function () {
        a = document.querySelector("#gold").innerText = gps;
        addGolds(gps);
    }, 1000);
}

//Ajout des golds par seconde provenant des minions acheter ainsi que le multiplicateur de celui-ci selon leur nombre

function getGPS() {
    gps = 0;
    minions.forEach(function (minion) {
        gps += minion.gps * minion.owned * clickdb;
    });
}

//Affichage des golds par seconde

function displayGps() {
    document.querySelector("#gps").innerHTML = 'Hit per second :' + " " + gps;
}

//Fonction afin de pouvoir acheter des minions, multiplicateur à chaque achat de minions avec un sound associé,
//ainsi la seconde partie de la multiplication du gps à chaque achat de minions par tranche

function buyMinion(id) {
    minions.forEach(minion => {
        if (minion.id == id && golds >= minion.cost) {
            golds = golds - minion.cost;
            minion.owned = minion.owned + 1;
            minion.cost = (minion.cost * 1.15).toFixed(2);
            if (minion.owned == 25) {
                clickdb = 2;
            }
            if (minion.owned == 50) {
                clickdb = 4;
            }
            if (minion.owned == 100) {
                clickdb = 8;
            }
            if (minion.owned == 250) {
                clickdb = 16;
            }
            if (minion.owned == 1000) {
                clickdb = 32;
            }
            getGPS();
            displayGps();

            document.querySelector("#gold").innerHTML = 'Golds :' + " " + golds;
            document.getElementById(`cost${minion.id}`).innerHTML = minion.cost;
            document.getElementById(`owned${minion.id}`).innerHTML = minion.owned;
            var bruit = new Audio();
            bruit.src = "../audio/shop.mp3";
            bruit.play();
        }
    })
}

//Tentative du fonctionnement du double click tout les 50 minions / non finalisé

function upgrade() {
    let totalowned = 0;
    minions.forEach(minion => {
        totalowned = minion.owned
    });
    if (totalowned >= 50) {
        x = 2 ** Math.trunc(totalowned / 50);
    }
}

//Tentative de sauvegarde des données du joueur ainsi qu'une sauvegarde tout les X secondes / non finalisé

function save() {
    setInterval(function () {
        var data = {
            golds: golds,
            gps: gps,
            ownedc: minions.forEach(minion => { document.getElementById(`cost${minion.id}`).innerHTML = minion.cost }),
            ownedh: minions.forEach(minion => { document.getElementById(`owned${minion.id}`).innerHTML = minion.owned })
        }
        localStorage.setItem("data", JSON.stringify(data));
    }, 1500);
}

//Chargement de sauvegarde des données du joueur

function load() {
    var save = JSON.parse(localStorage.getItem("data"));
    if (typeof save.golds !== "undefined") golds = save.golds;
    if (typeof save.gps !== "undefined") gps = save.gps;
    if (typeof save.ownedc !== "undefined") ownedc = save.ownedc;
    if (typeof save.ownedh !== "undefined") ownedh = save.ownedh;
}

//Lancement de tout les fonctions

displayGolds();
goldPerSecond();
getGPS();
displayGps();
upgrade();
save();
load();