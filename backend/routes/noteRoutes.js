const express = require("express");
const db = require("../database");

const router = express.Router();

/* Add Note */
router.post("/", (req,res)=>{

const {course_id,title,content}=req.body;

db.run(
"INSERT INTO notes(course_id,title,content) VALUES(?,?,?)",
[course_id,title,content],
function(){
res.json({id:this.lastID});
}
);

});

/* Get Notes of Course */
router.get("/course/:id",(req,res)=>{

db.all(
"SELECT * FROM notes WHERE course_id=?",
[req.params.id],
(err,rows)=>{
res.json(rows);
});

});

/* Delete Note */
router.delete("/:id",(req,res)=>{

db.run("DELETE FROM notes WHERE id=?", [req.params.id]);

res.json({message:"deleted"});

});

module.exports = router;