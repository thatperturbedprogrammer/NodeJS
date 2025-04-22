const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const filepath = "./products.db";

// db connection
const db = new sqlite3.Database(filepath, (error) => {
  if (error) {
    return console.error(error.message);
  }
});
console.log("Connection with SQLite has been established");

// CREATE TABLE
db.exec(`CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    price INT)`);

// express
const app = express();

// cors & json middleware
app.use(cors());
app.use(express.json());

// insert into db
app.post("/insert", (req, res) => {
  const { insertName, insertPrice } = req.body;
  db.run(
    `INSERT INTO products (name, price) VALUES (?, ?)`,
    [insertName, insertPrice],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
      return res.json({ message: "Inserted successfully" });
    }
  );
});

// get products
app.get("/products", (req, res) => {
  db.all(`SELECT * FROM products`, (error, row) => {
    if (error) {
      throw new Error(error.message);
    }
    console.log(row);
    return res.status(200).json(row);
  });
});

// search products by http post
app.post("/search", (req, res) => {
  const { searchInput } = req.body;

  console.log("Product name from client : ", req.body);

  db.all(
    `SELECT * FROM products WHERE name = ?`,
    [searchInput],
    (error, row) => {
      if (error) {
        throw new Error(error.message);
      }
      console.log(row);
      return res.json(row);
    }
  );
});

app.listen(4000, () => {
  console.log(`SQLite Server listening on http://localhost:4000`);
});
