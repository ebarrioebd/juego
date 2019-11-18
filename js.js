let canvas = document.getElementById("canvas");
let areaW = canvas.width;
let areaH = canvas.height;
let ctx = canvas.getContext("2d");
ctx.fillStyle = "rgb(0, 129, 255)"
ctx.fillRect(0, 0, areaW, areaH);
ctx.fillStyle = "black"
ctx.font = '30px verdana';
ctx.fillText(' Presione Enter enpezar el juego ', canvas.width / 2 - 230, canvas.height / 2)
//puntos
let puntos = 0
ctx.font = '18px verdana';
ctx.fillText('Puntos: ' + puntos, canvas.width - 120, 50)
let b_moverX = true;
let b_moverX2 = true;
let prsionasteD = false;
let presionasteS = false;
let bComenzar = true;
let bPerdiste = false;
let perdiste = false;
window.addEventListener("keyup", e => {
    c(e.keyCode)
    // c((xCuadro) + ">" + (100 + 50))
    if (e.keyCode === 65) {///s
        if (xCuadro > (100 + 50))
            // xCuadro -= 150;
            b_moverX2 = false
        presionasteS = true
        prsionasteD = false

    } else if (e.keyCode === 68) {//d
        if (xCuadro < (xRallac2 - 50))
            b_moverX = false;
        prsionasteD = true
        presionasteS = false
        //  xCuadro += 150;
        //  c("xcuadro=" + xCuadro)
    }
    if (e.keyCode == 13 && bComenzar == true) {
        f()
        bComenzar = false;
    }

    if (e.keyCode === 32 && perdiste == true) {
        comenzaOtraves();
        interval = 0
        perdiste = false;
    }

});
let interval = 0;
let yarbustos = 0;
let velocidad = 15;
let tiempo = 30;
let yRalla = 0, xRalla = 230, yRallac1 = 230, yRallac1_2 = -220
let xRallac2 = 400
let xCuadro = 150, ycuadro = areaH - 70 //xcuadro1 jugador1 
let xObtaculo1 = 150, yObstaculo1 = 0 - (Math.random() * 3000)//x,y del obstaculo 1
let xObtaculo2 = 300, yObstaculo2 = 0 - (Math.random() * 3000)//x,y del obstaculo 1
let xObtaculo3 = 450, yObstaculo3 = 0 - (Math.random() * 3000)//x,y del obstaculo 1
let xarbustos1 = 560, xarbustos2 = 580, xarbustos3 = 600;
let yarbustos1 = 0 - (Math.random() * 3000), yarbustos2 = 0 - (Math.random() * 3000), yarbustos3 = 0 - (Math.random() * 3000);
 
let carro1 = new Image;
carro1.src = 'carro2.png';
let carroOb = new Image;
carroOb.src = 'carroO.png';
let arbusto = new Image;
arbusto.src = 'arbusto.png';
const f = () => {
    ctx.clearRect(0, 0, areaW, areaH);
    ctx.beginPath()
    ctx.fillStyle = "#93511d";
    ctx.fillRect(0, 0, areaW, areaH)
    //dibujar  rallas black 
    ctx.fillStyle = "black";
    ctx.fillRect(100, 0, 450, areaH); //rallaleft 
    ctx.fillRect(550, 0, 10, areaH); //rallaend 
    ///dibujar rallas mamarillas columna 1 
    dibujarRallas(xRalla, yRalla)
    dibujarRallas(xRalla, yRallac1)
    dibujarRallas(xRalla, yRallac1_2)
    ///dibujar rallas mamarillas columna 2
    dibujarRallas(xRallac2, yRalla)
    dibujarRallas(xRallac2, yRallac1)
    dibujarRallas(xRallac2, yRallac1_2)
    //obtculo s
    dibujarObstaculos(xObtaculo1, yObstaculo1)
    yObstaculo1 = siObtaculos(yObstaculo1)
    dibujarObstaculos(xObtaculo2, yObstaculo2)
    yObstaculo2 = siObtaculos(yObstaculo2)
    dibujarObstaculos(xObtaculo3, yObstaculo3)
    yObstaculo3 = siObtaculos(yObstaculo3)
    //  
    dibujarArbustos(xarbustos1, yarbustos1);
    yarbustos1 = siObtaculos(yarbustos1)
    dibujarArbustos(xarbustos2, yarbustos2);
    yarbustos2 = siObtaculos(yarbustos2)
    dibujarArbustos(xarbustos3, yarbustos3);
    yarbustos3 = siObtaculos(yarbustos3)
    jugador1(xCuadro, ycuadro)// dibujarjugador 

    yRalla = sI(yRalla)//si yRalla=height 
    yRallac1 = sI(yRallac1)//si yRalla=height 
    yRallac1_2 = sI(yRallac1_2)//si yRalla=height  


    interval = setTimeout(() => f(), tiempo);


    yRalla += 5
    yRallac1 += 5
    yRallac1_2 += 5
    yObstaculo1 += velocidad
    yObstaculo2 += velocidad
    yObstaculo3 += velocidad
    yarbustos1 += 5
    yarbustos2 += 5
    yarbustos3 += 5
    puntos += tiempo;

    colision(xObtaculo1, xCuadro, yObstaculo1, ycuadro);//objeot1
    colision(xObtaculo2, xCuadro, yObstaculo2, ycuadro);//objeot2
    colision(xObtaculo3, xCuadro, yObstaculo3, ycuadro);//objeot3 
    dibujarVida()


}
function dibujarArbustos(x, y) {
    ctx.drawImage(arbusto, x, y, 130, 70);

}
function c(x) {
    console.log("" + x)
}
function dibujarRallas(x, yr) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(x, yr, 10, 100);
}
function sI(y) {
    if (y >= canvas.height) {
        y = 0 - 100
    }
    return y
}
let B = false;
function siObtaculos(y) {
    if (y >= canvas.height) {
        y = 0 - (Math.random() * 3000)
        // c("y==" + y)
        B = true
    }
    return y
}
function jugador1(x, y) {
    if (prsionasteD == true) {
        if (b_moverX == false & prsionasteD == true) {
            xCuadro += 10;
            // c("x:"+x+"  b:"+b_moverX)
        }
        if (xCuadro == 300 & prsionasteD == true) {
            //  c("x2:"+x+"  b:"+b_moverX)
            b_moverX = true;
            xCuadro = 300
            // c("x2:"+x+"  b:"+b_moverX)
        }
        if (xCuadro == 450 & prsionasteD == true) {
            b_moverX = true;
            xCuadro = 450
            //  c("x2:"+x+"  b:"+b_moverX)
        }

    }
    if (presionasteS == true) {
        if (b_moverX2 == false) {
            xCuadro -= 10;
            //  c("x2:"+x+"  b2:"+b_moverX)
        }
        if (xCuadro == 150) {
            b_moverX2 = true
            xCuadro = 150
        }
        if (xCuadro == 300) {
            b_moverX2 = true
            xCuadro = 300
        }
    }

    ctx.drawImage(carro1, x, y, 50, 70);
    /* ctx.fillRect(x, y, 5, 5);
     ctx.fillRect(x, y + 50, 5, 5);
     ctx.fillRect(x + 40, y, 5, 5);
     ctx.fillRect(x + 40, y + 50, 5, 5);*/
    // ctx.fillStyle = "blue";
    // ctx.fillRect(x, y, 50, 50);  ///jugador 1 
}
function dibujarObstaculos(x, y) {
    // ctx.fillStyle = "red";
    ctx.drawImage(carroOb, x, y, 50, 70);
    /* ctx.fillRect(x, y, 5, 5);
     ctx.fillRect(x, y + 50, 5, 5);
     ctx.fillRect(x + 40, y, 5, 5);
     ctx.fillRect(x + 40, y + 50, 5, 5);*/
}
function dibujarVida() {
    fillStyle = "yellow"
    ctx.font = '18px verdana';
    ctx.fillText('Puntos: ' + parseInt(puntos / 1000),  canvas.width - 120, 50)
}
let siBolean = false;
function colision(xo, xc, yo, yc) {
    if ((xo) >= xc & (yo + 50) >= yc & (xo) <= (xc + 40) & (yo + 50) <= (yc + 50) ||
        (xo + 40) >= xc & (yo) >= yc & (xo + 40) <= (xc + 40) & (yo) <= (yc + 50)) {
        c("primer if")
        gameover();
        perdiste = true;
        clearInterval(interval)
    }
    if ((xo + 40) >= xc & (xo + 40) <= (xc + 40) & (yo + 50) >= yc & (yo + 50) <= (yc + 50) ||
        (xo + 40) >= xc & (xo + 40) <= (xc + 40) & yo >= yc & yo <= (yc + 50)) {
        c("segundo if")
        gameover();
        perdiste = true;
        clearInterval(interval)
    }
    if (xo >= xc & xo <= (xc + 40) & (yo + 50) >= yc & (yo + 50) <= (yc + 50) ||
        (xo + 40) >= xc & (xo + 40) <= (xc + 40) & (yo + 50) >= yc & (yo + 50) <= (yc + 50)
    ) {
        c("tercer if")
        gameover();
        perdiste = true;
        clearInterval(interval)
    }

    /*
     if ((xo) == xc && (yo + 50) > yc) {
        c("Coision ..........")
        // alert("colision")
        siBolean = true;
     }
     if (siBolean && B) {
        if (vida >= (-1)) {
            vida -= 7;
        }
        if (vida <= 0) {
            clearInterval(interval)
            alert("perdiste");
            vida = 0;
        }
        siBolean = false
        B = false
     }
    */
}
function gameover() {
    ctx.fillStyle = "white"
    ctx.fillRect(160, 250, 400, 130);
    ctx.font = '50px verdana';
    ctx.fillStyle = "black"
    ctx.fillText('GAME OVER ', canvas.width / 2 - 130, canvas.height / 2);
    ctx.font = '20px black';
    ctx.fillText('Presiona espacio para reiniciar', canvas.width / 2 - 130, (canvas.height / 2) + 50)
}
function comenzaOtraves() {
    perdiste = false;
    velocidad = 15;
    tiempo = 30;
    yRalla = 0, xRalla = 230, yRallac1 = 230, yRallac1_2 = -220
    xRallac2 = 400
    xCuadro = 150, ycuadro = areaH - 70 //xcuadro1 jugador1 
    xObtaculo1 = 150, yObstaculo1 = 0 - (Math.random() * 3000)//x,y del obstaculo 1
    xObtaculo2 = 300, yObstaculo2 = 0 - (Math.random() * 3000)//x,y del obstaculo 1
    xObtaculo3 = 450, yObstaculo3 = 0 - (Math.random() * 3000)//x,y del obstaculo 1
    b_moverX = true;
    b_moverX2 = true;
    prsionasteD = false;
    presionasteS = false;
    bPerdiste = false;
    perdiste = false;
    bComenzar = false;
    puntos = 0;
    f();
}

