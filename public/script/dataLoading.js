import {ensureLoggedIn} from "./errorReq.js";

async function loadNotes(bookId){
    try{
        const res = await fetch(`/notes/book/${bookId}`, {cache: "no-store"});
        if(ensureLoggedIn(res)) return;
        const data = await res.json();
        return data.notes
    }catch(err){
        alert(`Error loading notes ${err}`)
    };
}

async function loadNoteById(noteId){
    try{
        const res = await fetch(`/notes/note/${noteId}`, {cache: "no-store"});
        if(ensureLoggedIn(res)) return;
        const note = await res.json();
        return note;
    }catch(err){
        alert(`Error loading note ${err}`);
    };
};

async function updatingNote(note){
    try{
        const res = await fetch(`/notes/note/${note.id}`,{
            method: "put",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                title: note.title,
                body: note.body
            })
        });
        if(ensureLoggedIn(res)) return;
        const data = await res.json();
        return data;
        
    }catch(err){
        alert(`Error updating the note ${err}`);
    };
};

async function creatingNewNote(note){
    try{
        const res = await fetch(`/notes/note`,{
            method: "post",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                title: note.title,
                body: note.body,
                bookId: note.bookId
            })
            
        });

        if(ensureLoggedIn(res)) return;
        const data = await res.json();

        
        return data;
    }catch(err){
        alert(`Error creating new note ${err}`);
    };

    
        
};

async function deletingNote(noteId){
    try{
        const res = await fetch(`/notes/note/${noteId}`,{
            method: "delete"
        }); 
        if(ensureLoggedIn(res)) return;
        const data = await res.json();
        return data;
    }catch(err){
        alert(`Error deleting note`);
    };
};

async function creatingNewBook(book){
    try{
        const res = await fetch(`/books`,{
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: book,
            })
        });
        if(ensureLoggedIn(res)) return;
        const data = await res.json();
        return data;
    }catch(err){
        alert(`Error creating new book ${err}`);
    };
};

async function loadBooks(){
    try{
        const res = await fetch(`/books/`,{cache:"no-store"});
        if(ensureLoggedIn(res)) return;
        const data = await res.json();
        return data;
    }catch(err){
        alert(`Error loading books ${err}`);
    };
};

async function deleteBook(bookId){
    try{
        const res = await fetch(`/books/${bookId}`, {
            method: "delete"
        });

        if(ensureLoggedIn(res)) return;
        const data = await res.json();
        return data;
    }catch(err){
        alert(`Error deleting book ${err}`)
    };
};


export {loadNotes, loadNoteById, updatingNote, creatingNewNote, deletingNote, creatingNewBook, loadBooks, deleteBook}