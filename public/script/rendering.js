function createNoteButton(noteDiv, bookId){
    const createNote = document.createElement("Button");
    createNote.classList.add("btn", "btn-outline-light");
    createNote.dataset.id = "create-note";
    createNote.dataset.bookid = bookId;
    createNote.innerText = "New note";

    noteDiv.appendChild(createNote);
};

function createNoteHeader(){
    const titleDiv = document.createElement("div");
    const pTag = document.createElement("p");
    pTag.innerText = "Title"
    const  titleInput = document.createElement("input");
    titleInput.classList.add("note-title");
    titleInput.id = "note-title-input"
    titleDiv.appendChild(pTag);
    const bodyHeader = document.createElement("p");
    bodyHeader.innerText = "BODY"

    return {titleDiv, titleInput, bodyHeader}
};

function createNoteBody(){
    const bodyDiv = document.createElement("div");
    const bodyTextArea = document.createElement("textarea");
    bodyTextArea.classList.add("note-body-text");
    bodyTextArea.id = "note-body-text-area"

    return {bodyDiv, bodyTextArea}
}


async function renderNoteTitle(notes, noteDiv, bookId){
    
    noteDiv.innerHTML = ""; // clearing the p tag or other notes

    createNoteButton(noteDiv, bookId);    

    if(notes.length === 0){
        const messageTag = document.createElement("p");
        messageTag.innerText = "There are no notes in this book";
        noteDiv.appendChild(messageTag);
        return;
    };
        

    notes.forEach(note => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note-item");
        noteElement.dataset.bookId = bookId;
        const noteButton = document.createElement("button");
        noteButton.classList.add("btn", "btn-outline-light");
        noteButton.dataset.id = note._id;
        noteButton.innerText = "Open";

        const pTag = document.createElement("p");
        pTag.innerText = note.title

        noteElement.appendChild(pTag);
        noteElement.appendChild(noteButton)
        
        noteDiv.appendChild(noteElement);
    });
};

async function renderNoteById(note, noteDiv, bookId){
    noteDiv.innerHTML = ""; // clearing all the note titles to prepare for the single note view
    
    createNoteButton(noteDiv, bookId);

    const {titleDiv, titleInput, bodyHeader} = createNoteHeader();
    titleInput.dataset.id = note._id;
    titleInput.dataset.bookid = bookId;
    titleInput.value = note.title;

    titleDiv.appendChild(titleInput);
    titleDiv.appendChild(bodyHeader);
    noteDiv.appendChild(titleDiv);

    const {bodyDiv, bodyTextArea} = createNoteBody();
    bodyTextArea.value = note.body;

    bodyDiv.appendChild(bodyTextArea);
    noteDiv.appendChild(bodyDiv);
};

async function renderNewNote(noteDiv,bookId){
    noteDiv.innerHTML = "";
    const {titleDiv, titleInput, bodyHeader} = createNoteHeader();
    titleInput.dataset.id = "create-note"
    titleInput.dataset.bookid = bookId

    titleDiv.appendChild(titleInput);
    titleDiv.appendChild(bodyHeader);
    noteDiv.appendChild(titleDiv);

    const {bodyDiv, bodyTextArea} = createNoteBody();
    bodyDiv.appendChild(bodyTextArea);
    noteDiv.appendChild(bodyDiv);
}

export {renderNoteTitle, renderNoteById, renderNewNote}