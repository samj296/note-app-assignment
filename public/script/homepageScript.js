// This is the file that is linked to the homepage.ejs
// Which will act as controller and other module files are there for other tasks
import {loadNotes, loadNoteById, updatingNote, creatingNewNote, deletingNote, creatingNewBook, loadBooks, deleteBook} from "./dataLoading.js"
import {renderNoteTitle, renderNoteById, renderNewNote, renderAllBook, updateTimer} from "./rendering.js"

const bookDiv = document.getElementById("book-div");
const noteDiv = document.getElementById("note-div");

bookDiv.addEventListener("click", async (onlyButton) => {
    if(onlyButton.target.tagName === "BUTTON"){

        // checking if the user clicked the add book button
        if(onlyButton.target.dataset.id === "create-book"){
            const input = document.getElementById("book-input")
            const title = input.value.trim();
            if(!title) return;
            const bookInput = document.getElementById("book-input");
            const newBook = bookInput.value;
            await creatingNewBook(newBook);
            const books =  await loadBooks();
            renderAllBook(books,bookDiv,noteDiv);
            return;
        }

        if(onlyButton.target.dataset.action === "delete"){
            const bookId = onlyButton.target.dataset.id
            await deleteBook(bookId);
            const books = await loadBooks();
            renderAllBook(books, bookDiv, noteDiv);
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
const waitingTime = 3000; // 3 sec

noteDiv.addEventListener("input", async (onlyText) => {    
    //reseting the timmer, eventListener is firing when the user is typing
    clearTimeout(typingTimer);
    typingTimer = setTimeout(saveNote, waitingTime);
    
});

let timer = 3;
let countdownInterval = null;

function counter() {
    updateTimer(timer, "save");

    countdownInterval = setInterval(() => {
        timer--;

        if (timer <= 0) {
            updateTimer(0, "save");
            clearInterval(countdownInterval);
            saveNote(); // or whatever you want to trigger
            return;
        }

        updateTimer(timer, "save");
    }, 1000);
}


async function saveNote(){
    const titleInput = document.getElementById("note-title-input");
        const bodyTextArea = document.getElementById("note-body-text-area");
        const id = titleInput.dataset.id;
        const bookId = titleInput.dataset.bookid 
        const title = titleInput.value.trim();
        const body = bodyTextArea.value
        const note = {id, title,body, bookId};
        if(!title && id !== "create-note"){
            if(!window.confirm("Are you sure you want to delete this note")){
                return
            };
            await deletingNote(note.id);
            window.location.href = "/users/homepage";

            return;
        };
        if(id === "create-note"){
           await creatingNewNote(note);
            return;
        };
        await updatingNote(note);
};