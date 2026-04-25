const addNoteBtn = document.querySelector(".addNote-button");
const noteSection = document.querySelector(".note-section");
const saveNoteBtn = document.querySelector(".saveNote-button");
const deleteNoteBtn = document.querySelector(".deleteNote-button");
const noteInput = document.querySelector(".note-input"); //textarea for writing notes
const noteAppend = document.querySelector(".save-note-container");
const clearBtn = document.querySelector(".clear-button");
const searchInput = document.querySelector(".search-input");

//click add note to show text area
addNoteBtn.addEventListener("click", function () {
  noteSection.classList.toggle("show");
});

//the assembly factory
function renderNote(noteText, index) {
  //apend DOM
  const div = document.createElement("div");

  const p = document.createElement("p");
  p.textContent = noteText;

  const delbtn = document.createElement("button");
  delbtn.textContent = "Delete";

  const editbtn = document.createElement("button");
  editbtn.textContent = "Edit";

  div.append(p);
  div.append(delbtn);
  div.append(editbtn);
  noteAppend.append(div);

  //delete note after save logic
  delbtn.addEventListener("click", function () {
    //call saved notes from storage
    let savedNotes = JSON.parse(localStorage.getItem("notes"));

    //find index and delete it
    savedNotes.splice(index, 1);

    //rewrite local storage
    localStorage.setItem("notes", JSON.stringify(savedNotes));

    syncUI();
  });

  editbtn.addEventListener("click", function () {
    //prevent clicking of other edit buttons before clicking save notes
    if (noteInput.value.trim() != "") {
      const checkoverwrite = confirm(
        "You have an unsaved note. Do you want to discard it and edit this one instead?",
      );
      if (!checkoverwrite) {
        return;
      }
    }

    noteSection.classList.add("show");

    //copy note to the textarea
    noteInput.value = noteText;

    //call notes from local storage
    let savedNotes = JSON.parse(localStorage.getItem("notes"));

    //delete note from the saved notes area
    savedNotes.splice(index, 1);

    //rewrite local storage
    localStorage.setItem("notes", JSON.stringify(savedNotes));

    //sync DOM
    syncUI();
  });
}

//function to sync DOM to local storage immediately
function syncUI() {
  noteAppend.innerHTML = "";

  let savedNotes = JSON.parse(localStorage.getItem("notes"));

  savedNotes.forEach(function (notes, index) {
    //reappend all notes
    renderNote(notes, index);
  });
}

//click save note logic, saved into the local storage
//click save button
saveNoteBtn.addEventListener("click", function () {
  //get text from textarea
  const noteText = noteInput.value;

  //call local storage
  let savedNotes = JSON.parse(localStorage.getItem("notes"));

  //notes need to be in arrays. This is a checker For first data saved, it's blank, then let it be {}
  if (!Array.isArray(savedNotes)) {
    savedNotes = [];
  }

  //push into local storage
  savedNotes.push(noteText);

  //rewrite local storage
  localStorage.setItem("notes", JSON.stringify(savedNotes));

  syncUI();

  //clear input after saved
  noteInput.value = "";
});

//delete note logic
deleteNoteBtn.addEventListener("click", function () {
  noteInput.value = "";
});

//persistence after browser refresh
window.addEventListener("DOMContentLoaded", function (notes) {
  syncUI();
});

//dynamic UI filtering logic
searchInput.addEventListener("input", function (text) {
  //detect text in the input bar
  const userInput = text.target.value.toLowerCase().trim();

  //get all notes from saved notes section, only the div specifically
  const allNotes = noteAppend.querySelectorAll("div");

  //compare notes through loop
  allNotes.forEach(function (note) {
    const p = note.querySelector("p");
    const noteText = p.textContent.toLowerCase();

    if (noteText.includes(userInput)) {
      note.classList.remove("hide");
    } else {
      note.classList.add("hide");
    }

    clearBtn.addEventListener("click", function () {
      searchInput.value = "";
      note.classList.remove("hide");
    });
  });
});
