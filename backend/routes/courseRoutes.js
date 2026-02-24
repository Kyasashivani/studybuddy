const express = require("express");
const db = require("../database");

const router = express.Router();

/* Create Course */
router.post("/", (req, res) => {
  const { name } = req.body;

  db.run(
    "INSERT INTO courses(name) VALUES(?)",
    [name],
    function () {
      res.json({ id: this.lastID });
    }
  );
});

/* Get Courses */
router.get("/", (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    res.json(rows);
  });
});

/* Delete Course */
router.delete("/:id", (req, res) => {
  db.run(
    "DELETE FROM courses WHERE id=?",
    [req.params.id]
  );

  res.json({ message: "Deleted" });
});

module.exports = router;