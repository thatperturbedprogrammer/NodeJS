const yargs = require("yargs");
const notes = require("./notes");

// Customize yargs version
yargs.version("1.0.0");

// Add note command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },

  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Remove note command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },

  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// List notes command
yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    notes.listNotes();
  },
});

// Read note command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// Find all notes with the same title
yargs.command({
  command: "find",
  describe: "Find all notes with the given title",
  builder: {
    title: {
      describe: "Note title to search for",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.findNotesByTitle(argv.title);
  },
});

// Search notes by body content
yargs.command({
  command: "search",
  describe: "Search notes by content in the body",
  builder: {
    text: {
      describe: "Text to search for in note bodies",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.searchNotesByBody(argv.text);
  },
});

yargs.parse(); // Required to parse arguments
