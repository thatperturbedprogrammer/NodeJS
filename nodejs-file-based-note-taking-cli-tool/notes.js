const fs = require("fs");

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicate = notes.find(
    (note) => note.title === title && note.body === body
  );

  if (!duplicate) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log("✅ Note added!");
  } else {
    console.log("❌ Note with same title and body already exists!");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filtered = notes.filter((note) => note.title !== title);

  if (notes.length > filtered.length) {
    saveNotes(filtered);
    console.log("✅ Note removed!");
  } else {
    console.log("❌ No note found with that title.");
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log("📚 Your Notes:");
  notes.forEach((note, i) => {
    console.log(`${i + 1}. ${note.title} - ${note.body}`);
  });
};

const findNotesByTitle = (titleQuery) => {
  const notes = loadNotes();
  const lowerQuery = titleQuery.toLowerCase();

  const matchingNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(lowerQuery)
  );

  if (matchingNotes.length > 0) {
    console.log(
      `📌 Found ${matchingNotes.length} note(s) matching: "${titleQuery}"`
    );
    matchingNotes.forEach((note, i) => {
      console.log(`\n${i + 1}. Title: ${note.title}\n   Body: ${note.body}`);
    });
  } else {
    console.log("❌ No notes found matching that title.");
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((n) => n.title === title);
  if (note) {
    console.log(`\n📝 ${note.title}\n${"-".repeat(note.title.length + 2)}`);
    console.log(note.body);
  } else {
    console.log("❌ Note not found!");
  }
};

const searchNotesByBody = (searchText) => {
  const notes = loadNotes();
  const query = searchText.toLowerCase();

  const matches = notes.filter((note) =>
    note.body.toLowerCase().includes(query)
  );

  if (matches.length > 0) {
    console.log(
      `🔍 Found ${matches.length} note(s) containing: "${searchText}"`
    );
    matches.forEach((note, i) => {
      console.log(`\n${i + 1}. Title: ${note.title}\n   Body: ${note.body}`);
    });
  } else {
    console.log("❌ No notes found with that content.");
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
  findNotesByTitle,
  searchNotesByBody,
};
