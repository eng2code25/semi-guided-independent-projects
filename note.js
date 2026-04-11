const addnotesbtn = document.querySelector(".add-notes-button");
const editor = document.querySelector(".note-editor");
const savebtn = document.querySelector(".save-btn");
const textarea = document.querySelector(".note-input");
const container = document.querySelector(".save-notes");

//delete logic in a function
function renderNote(noteText, index) {
  const div = document.createElement("div");

  const p = document.createElement("p");
  p.textContent = noteText;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";

  //delete logic
  delBtn.addEventListener("click", function () {
    //call savedNotes
    let savedNotes = JSON.parse(localStorage.getItem("notes"));

    //check if it's an array
    if (!Array.isArray(savedNotes)) {
      savedNotes = [];
    }

    //delete the at the clicked array
    savedNotes.splice(index, 1);

    //rewrite into local storage
    localStorage.setItem("notes", JSON.stringify(savedNotes));

    //need to recalculate index here
    refreshUI();
  });

  //edit notes logic
  //click on edit button
  editBtn.addEventListener("click", function () {
    //check if editor has text in it
    if (textarea.value.trim() !== "") {
      const overwrite = confirm(
        "You have unsaved changes in the editor. Discard them and edit this note instead?",
      );

      if (!overwrite) {
        return;
      }
    }

    //return target text to text box
    textarea.value = noteText;

    //open editor (if hidden)
    editor.classList.add("show");

    //remove old version of notes
    //call local storage
    let savedNotes = JSON.parse(localStorage.getItem("notes"));

    //delete the target note send for edit
    savedNotes.splice(index, 1);

    //rewrite local storage
    localStorage.setItem("notes", JSON.stringify(savedNotes));

    //update DOM
    refreshUI();
  });

  //reappend to DOM
  div.append(p);
  div.append(delBtn);
  div.append(editBtn);
  container.append(div);
}

//syncing UI function
function refreshUI() {
  //clear DOM
  container.innerHTML = "";

  //call local storage
  let savedNotes = JSON.parse(localStorage.getItem("notes"));

  //loop each note
  savedNotes.forEach(function (note, index) {
    renderNote(note, index);
  });
}

//click on +Add notes and text editor drop down
addnotesbtn.addEventListener("click", function () {
  editor.classList.toggle("show");
});

//save logic
//click save button
savebtn.addEventListener("click", function () {
  //get text
  const noteText = textarea.value;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";

  //call local storage
  let savedNotes = JSON.parse(localStorage.getItem("notes"));

  //array check for first note
  if (!Array.isArray(savedNotes)) {
    savedNotes = [];
  }

  //push notes
  savedNotes.push(noteText);

  //rewrite local storage
  localStorage.setItem("notes", JSON.stringify(savedNotes));

  //clear editor after saved to local storage and update DOM
  textarea.value = "";

  refreshUI();
});

//load logic for persistence after reload
window.addEventListener("DOMContentLoaded", function () {
  //call local storage
  let savedNotes = JSON.parse(localStorage.getItem("notes"));

  //loop each notes into function to reappend to DOM
  savedNotes.forEach(function (note, index) {
    renderNote(note, index);
  });
});
