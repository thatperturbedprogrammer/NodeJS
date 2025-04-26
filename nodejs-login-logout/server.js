const express = require("express");
const cors = require("cors");
const argon2 = require("argon2");
const app = express();
app.use(express.json());
app.use(express.text());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const users = [{ username: "Sid0", password: "0000" }];
// register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  try {
    if (username.length > 0 && password.length > 0) {
      //   console.log(username.length);
      users.push({ username: username, password: password });

      console.log("After Registration Users array: ", users);

      return res.status(200).json({ message: "Registration Successful" });
    } else {
      return res.status(500).json({ message: "Fields should not be blank" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error registering user" });
  }
});

// login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  try {
    if (user.password === password) {
      console.log("After Login Users array: ", users);

      return res.status(200).json({ message: "Login Successful" });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error logging in" });
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Login Server running on http://localhost:${PORT}`);
});

console.log("Users array: ", users);
