module.exports = class NotesHandler{
    idToNote;
    freeIdentifier;
    constructor() {
        this.idToNote = new Map();
        this.freeIdentifier = 0;
    }
    addNote(note){
        note.id = this.freeIdentifier
        this.idToNote.set(note.id, note)
        this.freeIdentifier++
        console.log('NotesHandler added note' + note.toString())
        console.log(this.idToNote)
        return note
    }

    removeNote(noteId){
        return this.idToNote.delete(noteId)
    }

    updateNote(note){
        if (this.idToNote.delete(note.id)){
            this.idToNote.set(note.id, note)
            return true
        }
        return false
    }

    getNote(noteId){
        console.log(this.idToNote)
        return this.idToNote.get(noteId)
    }
    getAllNotes(){
        return this.idToNote.values();
    }


}