let monitorear = false;

let FREC_MIN = 900;
let FREC_MAX = 2000;

let AMP_MIN = 0.01;
let AMP_MAX = 0.4;


let mic;
let pitch;
let audioCotext;

let gestorAmp;
let gestorPitch;

let haySonido; // estado de cómo está el sonido en cada momento
let antesHabiaSonido; // moemoria del estado anterior del sonido

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let marca;
let tiempoLimiteAgregar = 3000;
let tiempoLimitePinceladasRosas = 3000;
let tiempoLimitePinceladasAmarillas = 3000;
let tiempoLimiteLineas = 3000;
let tiempoLimiteMonday = 3000;
let tiempoLimiteFirma = 5000;

let estado = "fondo";

let trazos;
let cantidad = 13;
let Capa1 = 0;
let Capa2 = 0;
let Capa3 = 0;
let Capa4 = 0;
let Capa5 = 0;
let Capa6 = 0;
let Capa7 = 0;
let firma;
let monday;
let posiciones;

function preload() {
  firma = loadImage("data/TrazoFirma.png");
  monday = loadImage("data/Monday.png");
  trazos = new Array(cantidad);
  for (let i = 0; i < cantidad; i++) {
    let nombre = "data/Trazo"+nf( i , 2 )+ ".png";
    trazos[i] = loadImage(nombre);
  }
}

function setup() {
  createCanvas(600, 700);
  background(250);
  
  audioContext = getAudioContext(); // inicia el motor de audio
  mic = new p5.AudioIn(); // inicia el micrófono
  mic.start(startPitch); // se enciende el micrófono y le transmito el analisis de frecuencia (pitch) al micrófono. Conecto la libreria con el micrófono


  userStartAudio(); // por la dudas para forzar inicio de audio en algunos navegadores

  gestorAmp =  new GestorSenial( AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial( FREC_MIN, FREC_MAX);

  antesHabiaSonido = false;

  posiciones = new Array(20).fill().map(() => new Array(2)); // Ajustar el tamaño del array posiciones
  colorMode(HSB, 360, 100, 100);
}

function draw() {

  let vol = mic.getLevel(); // cargo en vol la amplitud del micrófono (señal cruda);
  gestorAmp.actualizar(vol);

  haySonido = gestorAmp.filtrada > 0.1; // umbral de ruido que define el estado haySonido

  let inicioElSonido = haySonido && !antesHabiaSonido; // evendo de INICIO de un sonido
  let finDelSonido = !haySonido && antesHabiaSonido; // evento de fIN de un sonido

  if(estado == "fondo"){
    if(inicioElSonido){
      if (Capa1 < 20){
      let cual = int(random(cantidad));
      let x = random(width - 100);
      let y = random(height/3 - 150);
      let y2 = random(height/3,(height/3)*2 - 150);
      let y3 = random((height/3)*2,height - 150);
      while (posicionOcupada(x, y)) {
        x = random(width - 100);
        y = random(height - 150);
      }
      posiciones[Capa1][0] = int(x); // Almacenar la posición ocupada
      posiciones[Capa1][1] = int(y);
      tint(240, 80, random(40, 50));
      image(trazos[cual], x, y, 80, 200);
      Capa1++;
    }
  }
 if(finDelSonido){
marca = millis();
 }
 if(!haySonido){
 let ahora = millis();
 if(ahora > marca + tiempoLimiteAgregar){
estado = "pinceladas celestes";
marca = millis();

 }

 }
  }else if(estado == "pinceladas celestes"){
if(inicioElSonido){
  if (Capa2 < 20){
    let cual = int(random(cantidad));
    let x = random(width - 100);
    let y = random(height/3 - 150);
    let y2 = random(height/3,(height/3)*2 - 150);
    let y3 = random((height/3)*2,height - 150);
    while (posicionOcupada(x, y)) {
      x = random(width - 100);
      y = random(height - 150);
    }
    posiciones[Capa2][0] = int(x); // Almacenar la posición ocupada
    posiciones[Capa2][1] = int(y);
    tint(240, 80, random(180, 200));
    image(trazos[cual], x, y, 80, 200);
    Capa2++;

}

  }
 }
    if(finDelSonido){
      marca = millis();
    }
    if(!haySonido){
      let ahora = millis();
      if(ahora > marca + tiempoLimiteAgregar){
        estado = "pinceladas rosas";
        marca = millis();
      }
    }else if(estado == "pinceladas rosas") {
    if(inicioElSonido){
      if (Capa3 < 10){
        let cual = int(random(cantidad));
        let x = random(width - 150);
        let y = random(height - 40);
        let y2= random(height/2 - 150);
        let y3 =random(height/3 - 80);
        while (posicionOcupada(x, y)) {
          x = random(width - 150);
          y = random(height - 40);
        }
      posiciones[Capa3][0] = int(x); // Almacenar la posición ocupada
       posiciones[Capa3][1] = int(y);
        tint(330, random(30, 85), random(65, 85));
        image(trazos[cual], x, y, 40, 60);
        Capa3++;
    }
  }

  if(finDelSonido){
    marca = millis();
  }
  if(!haySonido){
    let ahora = millis();
    if(ahora > marca + tiempoLimitePinceladasRosas){
      estado = "pinceladas amarillas";
      marca = millis();
    }
  }

  } else if(estado == "pinceladas amarillas") {
    if(inicioElSonido){

      if (Capa4 < 10) {
      let cual = int(random (cantidad));
      let x = random(width - 150);
      let y = random(height - 70);
      let y2 = random((height/3)*2- 100);
      let y3 = random(height/2 - 60);
      while (posicionOcupada(x, y)) {
       x = random(width - 150);
        y = random(height - 70);
      }
      posiciones[Capa4][0] = int(x); // Almacenar la posición ocupada
      posiciones[Capa4][1] = int(y);
      tint(36, random(70, 85), 95);
      image(trazos[cual], x, y, 40, 60);
      Capa4++;
    }

  }
  if(finDelSonido){
    marca = millis();
  }
  if(!haySonido){
    let ahora = millis();
    if(ahora > marca + tiempoLimitePinceladasAmarillas){
      estado = "lineas";
      marca = millis();
    }
  }

} else if(estado == "lineas") {
  if(inicioElSonido){
    if (Capa5 < 30) {
      let cual = int(random(cantidad));
      let x = random(width - 150);
      let y = random(height - 70);
      tint(334, 55, 80);
      image(trazos[cual], x, y, 20, 100);
  
      Capa5++;  
    } 
}

if(finDelSonido){
  marca = millis();
}
if(!haySonido){
  let ahora = millis();
  if(ahora > marca + tiempoLimiteLineas){
    estado = "monday";
    marca = millis();
  }
}

  } else if(estado == "monday") {
    if(inicioElSonido){
      if (Capa6 < 1) {
        tint(5, 12, 35);
        image(monday, 50, 100, 500, 500);
        Capa6++;
      }
  } 

  if(finDelSonido){
    marca = millis();
  }
  if(!haySonido){
    let ahora = millis();
    if(ahora > marca + tiempoLimiteMonday){
      estado = "firma";
      marca = millis();
    }
  }
} else if(estado == "firma") {
  if(inicioElSonido){
  if (Capa7 < 1) {
    let x = 134;
    let y = 48;
    tint(0, 0, 0);
    image(firma, 450, 630, x, y);

    Capa7++;
  }
}

  if(finDelSonido){
    marca = millis();
  }
  if(!haySonido){
    let ahora = millis();
    if(ahora > marca + tiempoLimiteFirma){
      estado = "reinicio";
      marca = millis();
    }
  }

  } else if(estado == "reinicio") {
    
    fill(250);
    noStroke();
    rect(0, 0, 600, 700);
     Capa1 = 0;
    Capa2 = 0;
    Capa3 = 0;
    Capa4 = 0;
    Capa5 = 0;
    Capa6 = 0;
    Capa7 = 0;
    estado = "fondo";
    marca = millis();
  }

if(monitorear){
  gestorAmp.dibujar(100, 100);
  gestorPitch.dibujar(100, 300);
}

console.log(estado);
antesHabiaSonido =  haySonido;

}

// Función para verificar si una posición está ocupada
function posicionOcupada(x, y) {
  for (let i = 0; i < Capa1; i++) {
    if (dist(x, y, posiciones[i][0], posiciones[i][1]) < 100) {
      return true;
    }
  }

  for (let i = 0; i < Capa2; i++) {
    if (dist(x, y, posiciones[i][0], posiciones[i][1]) < 100) {
      return true;
    }
  }
 // for (let i = 0; i < Capa3; i++) {
  //  if (dist(x, y, posiciones[i][0], posiciones[i][1]) < 100) {
    //  return true;
    //}
 // }

  return false;
}


// ---- Pitch detection ---
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {

      gestorPitch.actualizar(frequency);    
      //console.log(frequency);
    } 
    getPitch();
  })
}
