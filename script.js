document.addEventListener("DOMContentLoaded", () => {
    const noteText = document.getElementById("noteText");
    const addNoteBtn = document.getElementById("addNoteBtn");
    const notesContainer = document.getElementById("notesContainer");
    const searchInput = document.getElementById("searchInput");
  
    let notes = [];
  
    function renderNotes(filteredNotes = notes) {
      notesContainer.innerHTML = ""; // Clear previous notes
      filteredNotes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";
  
        const noteContent = document.createElement("p");
        noteContent.className = "note-text";
        noteContent.innerText = note;
  
        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", () => editNote(index));
  
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => deleteNote(index));
  
        noteDiv.appendChild(noteContent);
        noteDiv.appendChild(editBtn);
        noteDiv.appendChild(deleteBtn);
  
        notesContainer.appendChild(noteDiv);
      });
    }
  
    function addNote() {
      const note = noteText.value.trim();
      if (note) {
        notes.push(note);
        noteText.value = "";
        renderNotes();
      }
    }
  
    function editNote(index) {
      const newNote = prompt("Edit your note:", notes[index]);
      if (newNote !== null) {
        notes[index] = newNote.trim();
        renderNotes();
      }
    }
  
    function deleteNote(index) {
      notes.splice(index, 1);
      renderNotes();
    }
  
    // Filter notes based on search query
    function searchNotes(query) {
      const filteredNotes = notes.filter(note => note.toLowerCase().includes(query.toLowerCase()));
      renderNotes(filteredNotes);
    }
  
    // Event listeners
    addNoteBtn.addEventListener("click", addNote);
    searchInput.addEventListener("input", (e) => searchNotes(e.target.value));
});
  