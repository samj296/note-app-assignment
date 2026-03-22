async function loadNotes(bookId){
    try{
        const res = await fetch(`/notes/${bookId}`);
        const data = await res.json();
        return data.notes
    }catch(err){
        console.log("Error loading notes", err);
    };
}

async function updatingNoteTitle(note){
    const updatedNoteTitle = await fetch(`notes/${note.id}`,{
        
    }); 
};

export {loadNotes, updatingNoteTitle}