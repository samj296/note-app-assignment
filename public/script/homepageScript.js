// This is the file that is linked to the homepage.ejs
// Which will act as controller and other module files are there for other tasks
import {loadNotes} from "./dataLoading.js"
import {renderNoteTitle, renderNoteById} from "./rendering.js"

const bookDiv = document.getElementById("book-div");
const noteDiv = document.getElementById("note-div");

bookDiv.addEventListener("click", async (onlyButton) => {
    if(onlyButton.target.tagName === "BUTTON"){
        const bookId = onlyButton.target.dataset.id;
        // fetch note based on the bookId
        const notes = await loadNotes(bookId);
        await renderNoteTitle(notes, noteDiv);

    };
});

noteDiv.addEventListener("click", async (onlyButton) => {
    if (onlyButton.target.tagName === "BUTTON"){
        const noteId = onlyButton.target.dataset.id

    };
});

// Only update if the user stop typing for 5 sec
// 1000 ms is 1 sec
let typingTimer;
const waitingTime = 5000; // 5 sec

noteDiv.addEventListener("input", async (onlyText) => {    
    //reseting the timmer, eventListener is firing when the user is typing
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        
    }, waitingTime);
});
