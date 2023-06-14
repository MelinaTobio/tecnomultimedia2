int estado;
int trazos;
int cantidad = 13;
int Capa1 = 0;
int Capa2 = 0;
int Capa3 = 0;
int Capa4 = 0;
int Capa5 = 0;
PImage end;

void setup() {
  size(700, 800);
  background(224, 207, 200);
  end = loadImage("END.png");
}

void draw() {
  PImage[] trazos = new PImage[cantidad];
  for (int i = 0; i < cantidad; i++) {
    String nombre = "Trazo" + nf(i, 2) + ".png";
    trazos[i] = loadImage(nombre);
  }
  if (Capa1 < 30) {
    int cual = int(random(cantidad));
    float x = random(width - 200);
    float y = random(height - 250);
    tint(0, 10, random(50, 150));
    image(trazos[cual], x, y, 80, 200);
    Capa1++;
  } 
   else if (Capa2 < 25) {
    int cual = int(random(cantidad));
    float x = random(width - 200);
    float y = random(height - 250);
    tint(0, 10, random(150, 200));
    image(trazos[cual], x, y, 80, 200);
    Capa2++;
  } 
  else if (Capa3 < 18) {
    int cual = int(random(cantidad));
    float x = random(width - 150);
    float y = random(height - 40);
    //if (random(100) < 50) {
      tint(196, 79, 140);
   // } else {
     // tint(255,random(100, 120), 0);
    //}
    image(trazos[cual], x, y, 80, 150);
    Capa3++;
  }
  else if (Capa4 < 12){
     int cual = int(random(cantidad));
     float x = random(width - 150);
    float y = random(height - 70);
     tint(255,random(100, 120), 0);
    image(trazos[cual], x, y, 80, 150);
    Capa4++;
  }
   else if (Capa5 < 18) {
    int cual = int(random(cantidad));
    float x = random(width - 150);
    float y = random(height - 70);
    if(random(100) < 50){
       tint(160, 90, 40);
    }else {
      tint(#FF9BD0);
   }
     image(trazos[cual], x, y, 100, 5);
    Capa5++;
     //image(end, 0, 0, width, height);
  }
}
