const addNoteBtn = document.getElementById('addNoteBtn');
const noteText = document.getElementById('noteText');
const notesContainer = document.getElementById('notesContainer');

document.addEventListener('DOMContentLoaded', displayNotes);

// Add or save note
addNoteBtn.addEventListener('click', () => {
  const noteContent = noteText.value.trim();
  if (noteContent) {
    if (addNoteBtn.dataset.editing) {
      // Save the edited note
      const index = addNoteBtn.dataset.editing;
      saveEditedNote(index, noteContent);
      delete addNoteBtn.dataset.editing;
      addNoteBtn.textContent = 'Add Note';
    } else {
      // Add a new note
      saveNote(noteContent);
    }
    noteText.value = '';
    displayNotes();
  }
});

function saveNote(content) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(content);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function saveEditedNote(index, content) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes[index] = content;
  localStorage.setItem('notes', JSON.stringify(notes));
}

function displayNotes() {
  notesContainer.innerHTML = '';
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');

    noteElement.innerHTML = `
      <span class="note-text">${note}</span>
      <button class="edit-btn" onclick="editNote(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
    `;

    notesContainer.appendChild(noteElement);
  });
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes();
}

function editNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  noteText.value = notes[index];
  addNoteBtn.textContent = 'Save Note';
  addNoteBtn.dataset.editing = index;
}
