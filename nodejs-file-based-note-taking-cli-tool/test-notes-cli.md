# 🧪 Test Cases for Notes CLI Tool

This document contains a set of commands and to test the functionality of the Node.js file-based Notes CLI.

## ✅ Setup

Before running the tests, make sure you are in the project directory and have installed dependencies:

```bash
npm install


```

# 1. Add a note

node app.js add --title="Shopping" --body="Buy milk and eggs"

# Add another note with same title but different body

node app.js add --title="Shopping" --body="Buy bread and butter"

# Try to add exact duplicate (same title and body)

node app.js add --title="Shopping" --body="Buy bread and butter"

# 2. List Notes

node app.js list

node app.js find --title="Shopping"

# 3. Search Notes by Content

node app.js search --text="milk"

# 4. Read Note

node app.js read --title="Shopping"

# 5. Remove Note

node app.js remove --title="Shopping"

# 6.Cleanup - To clear all notes manually

echo "[]" > notes.json
