const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./studybuddy.db");

/* Courses Table */
db.run(`
CREATE TABLE IF NOT EXISTS courses(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT
)
`);

/* Notes Table */
db.run(`
CREATE TABLE IF NOT EXISTS notes(
id INTEGER PRIMARY KEY AUTOINCREMENT,
course_id INTEGER,
title TEXT,
content TEXT
)
`);

/* ===== Seed Study Notes ===== */

const coursesData = [

{
name:"Python",
noteTitle:"Python Introduction",
content:`
Python is a high level programming language.

Python is used for:
- Web Development
- Data Science
- Automation
- Machine Learning

Python syntax is simple and easy to learn.

Example:
print("Hello StudyBuddy")
`
},

{
name:"JavaScript",
noteTitle:"JavaScript Basics",
content:`
JavaScript is used to make web pages interactive.

Main JavaScript topics:

• Variables  
• Functions  
• Events  
• DOM Manipulation  

Example:

let name = "StudyBuddy";
console.log(name);
`
},

{
name:"React",
noteTitle:"React Introduction",
content:`
React is a JavaScript library for building user interfaces.

React helps create modern web applications.

Important React concepts:

• Components  
• State  
• Props  
• Hooks  
`
}

];

/* Seed Data Only If Database Is Empty */

db.get("SELECT COUNT(*) as count FROM courses", (err,row)=>{

if(row.count === 0){

coursesData.forEach(course=>{

db.run(
"INSERT INTO courses(name) VALUES(?)",
[course.name],
function(){

db.run(
"INSERT INTO notes(course_id,title,content) VALUES(?,?,?)",
[
this.lastID,
course.noteTitle,
course.content
]
);

});

});

}

});

module.exports = db;