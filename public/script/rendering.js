
async function renderNoteTitle(notes, noteDiv){
    
    noteDiv.innerHTML = ""; // clearing the p tag or other notes

    const createNote = document.createElement("Button");
    createNote.classList.add("btn", "btn-outline-dark");
    createNote.dataset.id = "create-note"
    createNote.innerText = "New note"

    noteDiv.appendChild(createNote)

    if(notes.length === 0){
        const messageTag = document.createElement("p");
        messageTag.innerText = "There are no notes in this book";
        noteDiv.appendChild(messageTag);
        return
    };
        

    notes.forEach(note => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note-item");
        const noteButton = document.createElement("button");
        noteButton.classList.add("btn", "btn-outline-dark");
        noteButton.dataset.id = note._id;
        noteButton.innerText = "Open";

        const pTag = document.createElement("p");
        pTag.innerText = note.title

        noteElement.appendChild(pTag);
        noteElement.appendChild(noteButton)
        
        noteDiv.appendChild(noteElement);
    });
};

async function renderNoteById(note, noteDiv){
    noteDiv.innerHTML = ""; // clearing all the note titles to prepare for the single note view
    const titleDiv = document.createElement("div");
    const  titleInput = document.createElement("input");
    titleInput.classList.add("note-title");
    titleInput.value = note.title;

    titleDiv.appendChild(titleInput);
    noteDiv.appendChild(titleDiv);

    const bodyDiv = document.createElement("div");
    const bodyTextArea = document.createElement("textarea");
    bodyTextArea.classList.add("note-body-text");
    bodyTextArea.value = note.body;

    bodyDiv.appendChild(bodyTextArea);
    noteDiv.appendChild(bodyDiv);
};

export {renderNoteTitle, renderNoteById}