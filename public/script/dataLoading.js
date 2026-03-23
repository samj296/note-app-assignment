async function loadNotes(bookId){
    try{
        const res = await fetch(`/notes/book/${bookId}`, {cache: "no-store"});
        const data = await res.json();
        return data.notes
    }catch(err){
        alert(`Error loading notes ${err}`)
    };
}

async function loadNoteById(noteId){
    try{
        const res = await fetch(`/notes/note/${noteId}`, {cache: "no-store"});
        const note = await res.json();
        return note;
    }catch(err){
        alert(`Error loading note ${err}`);
    };
};

async function updatingNote(note){
    try{
        const updatedNote = await fetch(`/notes/note/${note.id}`,{
            method: "put",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                title: note.title,
                body: note.body
            })
        });

        const data = await updatedNote.json();
        return data;
        
    }catch(err){
        alert(`Error updating the note ${err}`);
    };
};

async function creatingNewNote(note){
    try{
        const newNote = await fetch(`/notes/note`,{
            method: "post",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                title: note.title,
                body: note.body,
                bookId: note.bookId
            })
            
        });
        const data = await newNote.json();
        return data;
    }catch(err){
        alert(`Error creating new note ${err}`);
    };
};

async function deletingNote(note){
    try{
        const deleteNote = await fetch(`/notes/note/${note.id}`,{
            method: "delete"
        }); 
    }catch(err){};
};

async function creatingNewBook(book){
    try{
        const newBook = await fetch(`/books`,{
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: book,
            })
        });
        const data = await newBook.json();
        return data
    }catch(err){
        alert(`Error creating new book ${err}`)
    };
};



export {loadNotes, loadNoteById, updatingNote, creatingNewNote, deletingNote, creatingNewBook}