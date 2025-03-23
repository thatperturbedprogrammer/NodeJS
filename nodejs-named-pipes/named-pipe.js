const net = require("net");
const path = require("path");
const readline = require("readline");

const PIPE_NAME = "mypipe";
const PIPE_PATH = path.join("\\\\?\\pipe", PIPE_NAME);

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a server
const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    console.log("Received from client:", data.toString());
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(PIPE_PATH, () => {
  console.log(`Server listening on ${PIPE_PATH}`);
});

// Create a client
const client = net.createConnection(PIPE_PATH, () => {
  console.log("Connected to server");
  askUserInput();
});

client.on("data", (data) => {
  console.log("Received from server:", data.toString());
});

client.on("end", () => {
  console.log("Disconnected from server");
});

// Function to take user input and send to server
function askUserInput() {
  rl.question("Enter message: ", (message) => {
    if (message.toLowerCase() === "exit") {
      console.log("Closing connection...");
      client.end();
      rl.close();
    } else {
      client.write(message);
      askUserInput(); // Keep asking for input
    }
  });
}
