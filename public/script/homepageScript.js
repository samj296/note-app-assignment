// This is the file that is linked to the homepage.ejs
// Which will act as controller and other module files are there for other tasks
import {loadNotes, loadNoteById, updatingNote, creatingNewNote, deletingNote, creatingNewBook} from "./dataLoading.js"
import {renderNoteTitle, renderNoteById, renderNewNote} from "./rendering.js"

const bookDiv = document.getElementById("book-div");
const noteDiv = document.getElementById("note-div");

bookDiv.addEventListener("click", async (onlyButton) => {
    if(onlyButton.target.tagName === "BUTTON"){

        // checking if the user clicked the add book button
        if(onlyButton.target.dataset.id === "create-book"){
            const bookInput = document.getElementById("book-input");
            const newBook = bookInput.value;
            creatingNewBook(newBook);
            window.location.href = "/users/homepage"
            return;
        }
         
        const bookId = onlyButton.target.dataset.id;
        // fetch note based on the bookId
        const notes = await loadNotes(bookId);
        await renderNoteTitle(notes, noteDiv, bookId);

    };
});

noteDiv.addEventListener("click", async (onlyButton) => {
    if (onlyButton.target.tagName === "BUTTON"){
        const bookId = onlyButton.target.dataset.bookid
           //if the user clicked the create note button
        if(onlyButton.target.dataset.id === "create-note"){
            
            renderNewNote(noteDiv, bookId);
            return;
        };

        const noteId = onlyButton.target.dataset.id
        const note = await loadNoteById(noteId)
        renderNoteById(note, noteDiv, bookId)
    };
});

// Only update if the user stop typing for 5 sec
// 1000 ms is 1 sec
let typingTimer = null;
const waitingTime = 5000; // 5 sec
let deleteTimer = null;
let deleteCountdown = 5;

noteDiv.addEventListener("input", async (onlyText) => {    
    //reseting the timmer, eventListener is firing when the user is typing
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        const titleInput = document.getElementById("note-title-input");
        const bodyTextArea = document.getElementById("note-body-text-area");
        const id = titleInput.dataset.id;
        const bookId = titleInput.dataset.bookid 
        const title = titleInput.value;
        const body = bodyTextArea.value
        const note = {id, title,body, bookId};
        if(!title && id !== "create-note"){
            deletingNote(note)
            
        };
        if(id === "create-note"){
            creatingNewNote(note);
            return;
        };
        updatingNote(note);
    }, waitingTime);
});
