const fs = require('fs');
const coordData = JSON.parse(fs.readFileSync('public/coord_data.json', 'utf8'));

let currentEvent = null;
const map = {};

for (let row of coordData) {
  if (row[0] === 'Sr.No') continue;
  if (row[1]) {
    currentEvent = row[1].trim();
    if (currentEvent === "Overall co-ordinators Praxes 2k26" || currentEvent === "Overall co-ordinators Praxes 2k28") continue;
    map[currentEvent] = [];
  }
  if (currentEvent && currentEvent !== "Overall co-ordinators Praxes 2k26" && currentEvent !== "Overall co-ordinators Praxes 2k28" && row[2]) {
    map[currentEvent].push(row[2].trim());
  }
}

// Hardcode some corrections for event names because excel vs eventManager might differ a bit
const translations = {
  "CADveture(2D,3D,\r\nDesign)": "CADveture (2D, 3D)",
  "Short film (Documentary) & Social media (Reels on Clg)": "Short Film & Reels",
  "Story on Pic": "Story On Pic",
  "Cooking and salad decoration": "Cooking & Salad Decoding",
  "Tower of hanoi": "Tower of Hanoi"
};

const finalMap = {};
for (const [k, v] of Object.entries(map)) {
  const correctedName = translations[k] || k;
  finalMap[correctedName] = v;
}

let code = fs.readFileSync('src/utils/eventManager.jsx', 'utf8');

// Also bump version
code = code.replace(/EVENTS_VERSION = \d+;/, 'EVENTS_VERSION = 6;');

for (const [eventName, coords] of Object.entries(finalMap)) {
  const c1 = coords[0] || '';
  const c2 = coords[1] || '';
  
  // Create a regex to find the event block
  // We look for name: 'EventName' or name: "EventName", followed by coordinatorName: '',
  const regex = new RegExp(`(name:\\s*['"]${eventName.replace(/[.*+?^$\\{\\}()|[\\]\\\\]/g, '\\\\$&')}['"].*?coordinatorName:\\s*['"])[^'"]*(['"].*?coordinator2Name:\\s*['"])[^'"]*(['"])`, 's');
  
  if (regex.test(code)) {
    code = code.replace(regex, `$1${c1}$2${c2}$3`);
    console.log('Updated:', eventName, '->', c1, c2);
  } else {
    console.log('Not found matched block for:', eventName);
  }
}

fs.writeFileSync('src/utils/eventManager.jsx', code);
console.log('Done mapping coordinators.');
