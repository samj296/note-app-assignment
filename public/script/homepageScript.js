// This is the file that is linked to the homepage.ejs
// Which will act as controller and other module files are there for other tasks
import {loadNotes, loadNoteById, updatingNote, creatingNewNote, deletingNote, creatingNewBook, loadBooks, deleteBook} from "./dataLoading.js"
import {updateTitleText, renderNoteTitle, renderNoteById, renderNewNote, renderAllBook} from "./rendering.js"
import {overlay} from "./infoFunction.js"
const bookDiv = document.getElementById("book-div");
const noteDiv = document.getElementById("note-div");

overlay();

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

let countdownInterval = null;
let waitTime = 3;

noteDiv.addEventListener("input", (e) => {
    if(e.target.id !== "note-title-input" && e.target.id !== "note-body-text-area" ){
        // If the element is not note tile or the note body do nothing
        return;
    };
    const titleInput = document.getElementById("note-title-input");
    const bodyInput = document.getElementById("note-body-text-area");
    const title = titleInput.value.trim();
    const id = titleInput.dataset.id;

    if(!title && id === "create-note"){
        clearInterval(countdownInterval)
        if(!bodyInput.value.trim()){
            updateTitleText(`Add title to create note`)
            return;
        }
        updateTitleText(`Add a title to save this note!`)
        return;
    };

    let method;
    if(!title){
        method = "Deleting";
    }else{
        method = "Save"
    };
    
    clearInterval(countdownInterval);
    waitTime = 3;
    updateTitleText(`${method} in ${waitTime} sec`);
    countdownInterval = setInterval(async () => {
        waitTime--;
        if (waitTime > 0) {
            updateTitleText(`${method} in ${waitTime} sec`);
        } else {
            clearInterval(countdownInterval);
            updateTitleText("Saving…");
            await saveNote(titleInput);
            updateTitleText("Saved");
        }
    }, 1000);
});


async function saveNote(titleInput){
        
        const bodyTextArea = document.getElementById("note-body-text-area");
        let id = titleInput.dataset.id;
        const bookId = titleInput.dataset.bookid 
        const title = titleInput.value.trim();
        const body = bodyTextArea.value
        const note = {id, title,body, bookId};

        if(!id) return;

        if(!title && id !== "create-note"){
            if(window.confirm("Are you sure you want to delete this note")){
                await deletingNote(id);
                window.location.href = "/users/homepage";
            };
            return;
        };

        if(id === "create-note"){
            
            const newNote =  await creatingNewNote(note);
            id = newNote._id;
            note.id = id;
            titleInput.dataset.id = id;
            return;
        };
        await updatingNote(note);
        updateTitleText("saved")
};