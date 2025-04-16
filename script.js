
const data = {
  "VTI": 80,
  "Caisson Sekoia": 100,
  "VMC Sanitaire": 70,
  "VMC Classique": 80
};

const equipements = {
  "Module fenêtre": { "m3/h": [15, 30], "Pa": [20, 40], "m/s": [0.5, 1.0] },
  "Bouche SDB": { "m3/h": [15, 30], "Pa": [80, 100], "m/s": [0.6, 1.1] },
  "Bouche WC": { "m3/h": [15, 30], "Pa": [80, 100], "m/s": [0.6, 1.1] },
  "Bouche Cuisine": { "m3/h": [45, 90], "Pa": [80, 120], "m/s": [1.2, 2.5] }
};

let content = "";

for (let [type, pressure] of Object.entries(data)) {
  content += `<h2>${type} (Pression de référence : ${pressure} Pa)</h2>`;
  content += `<table><tr><th>Équipement</th><th>Débit (m³/h)</th><th>Pression (Pa)</th><th>Vitesse (m/s)</th></tr>`;
  for (let [eq, val] of Object.entries(equipements)) {
    content += `<tr><td>${eq}</td><td>${val["m3/h"][0]} à ${val["m3/h"][1]}</td><td>${val["Pa"][0]} à ${val["Pa"][1]}</td><td>${val["m/s"][0]} à ${val["m/s"][1]}</td></tr>`;
  }
  content += `</table>`;
}

document.getElementById("content").innerHTML = content;
