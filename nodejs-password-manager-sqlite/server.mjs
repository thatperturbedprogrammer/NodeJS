import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
const filepath = "./passwords.db";

// db connection
const db = new sqlite3.Database(filepath, (error) => {
  if (error) {
    return console.error(error.message);
  }
});
console.log("Connection with SQLite has been established");

// CREATE TABLE
db.exec(`CREATE TABLE IF NOT EXISTS passwordstable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    accountname VARCHAR(50),
    password VARCHAR(60),
    secret VARCHAR(100)
    )`);

const app = express();

app.use(cors());
app.use(express.json());

// save password
app.post("/savepassword", (req, res) => {
  const { accountName, passwordName } = req.body;

  db.run(
    `INSERT INTO passwordstable (accountname, password) VALUES(?, ?)`,
    [accountName, passwordName],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
      return res.json({ message: "Password saved successfully" });
    }
  );
});

// save secret
app.post("/savesecret", (req, res) => {
  const { secretName, accountName } = req.body;

  db.run(
    `UPDATE passwordstable SET secret = ? WHERE accountname = ?`,
    [secretName, accountName],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Updated rows: ${this.changes}`);
      return res.json({
        message: `Secret saved successfully for account: ${accountName}`,
      });
    }
  );
});

// verify secret
app.post("/verifysecret", (req, res) => {
  console.log("Secret req body: ", req.body);
  const { secretEntered } = req.body;

  db.all(
    `SELECT * from passwordstable WHERE secret = ?`,
    [secretEntered],
    function (error, row) {
      if (error) {
        throw new Error(error.message);
      }
      console.log(row);

      if (row.length === 0) {
        return res.status(200).json("Invalid Secret!");
      }
      return res.status(200).json(row);
    }
  );
});
app.listen(4000, () => {
  console.log(`SQLite Password Server listening on http://localhost:4000`);
});
