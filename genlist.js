const list = [];
const fs = require("fs");
const count = 1000;
for (let i = 0; i <= count; i++) {
  list.push({
    id: i,
    title: "Телевизор " + i,
    creator: genCreator(),
    inch: Math.floor(Math.random() * 100),
    OLED: Math.random() > 0.5 ? true : false,
    ultraHD: Math.random() > 0.5 ? true : false,
    price: Math.floor(Math.random() * 300000),
    View3D: Math.random() > 0.5 ? true : false,
    curveDisplay: Math.random() > 0.5 ? true : false,
    favorite: Math.random() > 0.5 ? true : false
  });
}

function genCreator() {
  let random = Math.random()
  if (random <= 0.1) {
    return 'Apple'
  }
  if (random <= 0.2) {
    return 'Samsung'
  }
  if (random <= 0.3) {
    return 'Xiaomi'
  }
  if (random <= 0.4) {
    return 'Mi'
  }
  if (random <= 0.5) {
    return 'Panasonic'
  }
  if (random <= 0.6) {
    return 'LG'
  }
  if (random <= 0.7) {
    return 'Sony'
  }
  if (random <= 0.8) {
    return 'Simens'
  }
  if (random <= 0.9) {
    return 'Matroshka'
  }

  if (random <= 1) {
    return 'Balalaika'
  }

}

fs.writeFileSync("productList.json", JSON.stringify(list))