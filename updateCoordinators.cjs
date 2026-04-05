const fs = require('fs');

const eventsFile = './src/utils/eventManager.jsx';
let content = fs.readFileSync(eventsFile, 'utf8');

// Replace old fields with new array
content = content.replace(/coordinatorName:\s*'',\s*coordinatorPhone:\s*''/g, 'coordinators: []');

// Apply mappings
const mapping = {
  'Robo Race': ['Rudra Patel', 'Pradeep Chaudhary', 'Dax Padasala', 'Hiren Ajakiya'],
  'Robo War': ['Rudra Patel', 'Pradeep Chaudhary', 'Dax Padasala', 'Hiren Ajakiya'],
  'Robo Soccer': ['Rudra Patel', 'Pradeep Chaudhary', 'Dax Padasala', 'Hiren Ajakiya'],
  'Constructo': ['Bhumika Prajapati', 'Nilesh Gelot', 'Hardik Prajapati'],
  'Quiz-O-Tech': ['Dhruvi Patel', 'Anju Paregi', 'Talha Manashia', 'Pratik Prajapati'],
  'CADventure': ['Rahul Chaudhary'],
  'Coding': ['Pragat Patel', 'Tarni Patel'],
  'PCB Master': ['Payal Chamachiya', 'Divyang Patel'],
  'Electro': [], // Not mentioned specifically, or wait
  'Rangoli': ['Preeti Chaudhari', 'Shaili Patel'],
  'Free Fire': ['Nehang Patel', 'Gopalsinh Solanki', 'Ved Patel', 'Shivam Shing'],
  'BGMI Tournament': ['Nehang Patel', 'Gopalsinh Solanki', 'Ved Patel', 'Shivam Shing'],
  'Ludo King': ['Nehang Patel', 'Gopalsinh Solanki', 'Ved Patel', 'Shivam Shing'],
  'Treasure Hunt': ['Jay Patel', 'Savan Patel', 'Aditya Devdatt', 'Bhavya Patel', 'Jil Patel'],
  'Exhibition': ['Utsav Bhalala', 'Ankit khumawat', 'Arpit Chodhary'],
  'Short Film / Documentary': ['Tirth Patel', 'Chetan Thakor', 'Ashokji Solanki'],
  'Debate': ['Raghu Prajapati', 'Mihir Raval', 'Prerak Barot'],
  'Story on Pic': ['Shivam Panchal', 'Divyansh Jadhav'],
  'Cooking': ['Vishakha Modi', 'Vishwa Varde'],
  
  // Art events -> distributing Art coords to all art events? Just assigning all of them
  'On-The-Spot Painting': ['Zainika Chaudhary', 'Zeel Patel', 'Isha Chaudhary', 'Jiya Joshi', 'Shruti Rathod', 'Charvi Patel', 'Mahek Patil', 'Nikita Chaudhary', 'Manisha Darji', 'Jiya Prajapati', 'Saloni Prajapati', 'Janvi Chaudhary'],
  'Collage Making': ['Zainika Chaudhary', 'Zeel Patel', 'Isha Chaudhary', 'Jiya Joshi', 'Shruti Rathod', 'Charvi Patel', 'Mahek Patil', 'Nikita Chaudhary', 'Manisha Darji', 'Jiya Prajapati', 'Saloni Prajapati', 'Janvi Chaudhary'],
  'Poster Making': ['Zainika Chaudhary', 'Zeel Patel', 'Isha Chaudhary', 'Jiya Joshi', 'Shruti Rathod', 'Charvi Patel', 'Mahek Patil', 'Nikita Chaudhary', 'Manisha Darji', 'Jiya Prajapati', 'Saloni Prajapati', 'Janvi Chaudhary'],
  'Clay Modeling': ['Zainika Chaudhary', 'Zeel Patel', 'Isha Chaudhary', 'Jiya Joshi', 'Shruti Rathod', 'Charvi Patel', 'Mahek Patil', 'Nikita Chaudhary', 'Manisha Darji', 'Jiya Prajapati', 'Saloni Prajapati', 'Janvi Chaudhary'],
  'Cartooning': ['Zainika Chaudhary', 'Zeel Patel', 'Isha Chaudhary', 'Jiya Joshi', 'Shruti Rathod', 'Charvi Patel', 'Mahek Patil', 'Nikita Chaudhary', 'Manisha Darji', 'Jiya Prajapati', 'Saloni Prajapati', 'Janvi Chaudhary'],

  'Photography': ['Rani Chauhan'],
  'Laser Maze': ['Vasudev Shaini', 'Kuldeep Chauhan'],
  'Darts': ['Nidhi Shiyal', 'Abhijit Chauhan', 'Vandit Prajapati', 'Pranjal Chaudhary'],
  'Talent Show': ['Bansi Chavda', 'Vaishnav Tandel', 'Umangi Patel', 'Nikul Prajapati'],
  'Mind Marathon': ['Yahraj Vaishnav', 'Mayur Vagda', 'Raj Patel', 'Krishana Tank', 'Sonal Chudhary'],
  'Tower of Hanoi': ['Mahimn Joshi', 'Jenil Kotadiya'],
  'Rubik\'s Cube': ['Het Patel', 'Dax Mane', 'Adarsh Shukla'],
  'Poster Presentation': ['Chirag Hadiyal', 'Khushi Prajapati'],
  'Writing': ['Ami Prajapati', 'Saloni Prajapati'],
  'AI Prompt Battle': ['Naresh Chaudhary', 'Nihar Vaghela', 'Vishva Yadav', 'Akshit Suvagiya'],
  'Fun Games': ['Himanshu Nai', 'Rivanshi Darji', 'Yash Thakkar', 'Bhoomi Sadhu', 'Hardik Prajapati', 'Kuldip Parmar', 'Devansh Prajapati', 'Smit Vaghela', 'Man Patel', 'Tejashvi davda']
};

for (const [eventName, coords] of Object.entries(mapping)) {
  const arrStr = coords.map(c => `{ name: '${c.replace(/'/g, "\\'")}', phone: '' }`).join(', ');
  
  // Find name: 'event name', ...
  const regex = new RegExp(`name:\\s*['"\`]${eventName}['"\`],([\\s\\S]*?)(coordinators: \\[\\])`);
  if (regex.test(content)) {
    content = content.replace(regex, `name: '${eventName}',$1coordinators: [${arrStr}]`);
  } else {
    // Try without case sens
    const regexI = new RegExp(`name:\\s*['"\`]${eventName}['"\`],([\\s\\S]*?)(coordinators: \\[\\])`, 'i');
    if (regexI.test(content)) {
        content = content.replace(regexI, `name: '${eventName}',$1coordinators: [${arrStr}]`);
    } else {
        console.log("Could not find", eventName);
    }
  }
}

// Ensure version bump to 8
content = content.replace(/const EVENTS_VERSION = \d+;/, 'const EVENTS_VERSION = 8;');

// Also handle the getEventsList migration for older items if they don't have coordinators
// Let's just rewrite getEventsList explicitly
const newGetEventsList = `export const getEventsList = () => {
  const savedVersion = localStorage.getItem('praxes_events_version');
  const saved = localStorage.getItem('praxes_events');
  
  if (saved && savedVersion === String(EVENTS_VERSION)) {
    try {
      const parsed = JSON.parse(saved);
      // Migration: convert to array if old version
      return parsed.map(ev => {
        if (!ev.coordinators) {
          ev.coordinators = [];
          if (ev.coordinatorName) ev.coordinators.push({ name: ev.coordinatorName, phone: ev.coordinatorPhone || '' });
          if (ev.coordinator2Name) ev.coordinators.push({ name: ev.coordinator2Name, phone: ev.coordinator2Phone || '' });
          delete ev.coordinatorName; delete ev.coordinatorPhone; delete ev.coordinator2Name; delete ev.coordinator2Phone;
        }
        return ev;
      });
    } catch (e) {
      console.error("Error parsing events from localStorage");
    }
  }
  // Initialize or refresh stale data
  localStorage.setItem('praxes_events', JSON.stringify(DEFAULT_EVENTS));
  localStorage.setItem('praxes_events_version', String(EVENTS_VERSION));
  return DEFAULT_EVENTS;
};`;

content = content.replace(/export const getEventsList = \(\) => {[\s\S]*?};/, newGetEventsList);

fs.writeFileSync(eventsFile, content, 'utf8');
console.log('Update Complete.');
