const express = require("express");
const path = require("path");
const urlEncodedParser = require('body-parser').urlencoded({extended: false})
const multer = require('multer')



const NotesHandler = require(path.resolve("business", "note", "NotesHandler.js"))
const routes = express.Router()

let notesHandler = new NotesHandler()


// Set multer
routes.use(multer({dest: path.resolve("uploads")}).any());

routes.get('/notes', (req, res) => {
    let notes = Array.from(notesHandler.getAllNotes())
    if (req.query.completionDateOrder === "newest"){
        notes.sort((note1, note2) => -note1.completionDate.localeCompare(note2.completionDate))
    } else if (req.query.completionDateOrder === "oldest"){
        notes.sort((note1, note2) => note1.completionDate.localeCompare(note2.completionDate))
    }

    if (req.query.statusFilter === "to do"){
        notes = notes.filter((note) => note.status === "to do")
    } else if (req.query.statusFilter === "in progress"){
        notes = notes.filter((note) => note.status === "in progress")
    } else if (req.query.statusFilter === "done"){
        notes = notes.filter((note) => note.status === "done")
    }

    res.json(notes)
})

routes.get('/about', (req, res) => {
    res.json({aboutText: "this is about text"})
})

routes.post('/notes', (req, res) =>{

    const o_date = new Intl.DateTimeFormat;
    const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
    const m_date = o_date.formatToParts().reduce(f_date, {});
    const formattedDate = `${m_date.year}-${m_date.month}-${m_date.day}`;

    let note = {
        title: "",
        status: "to do",
        completionDate: formattedDate,
        text: "",
        files: [],
    }

    note = notesHandler.addNote(note)
    res.status(201).json(note)
})

routes.get('/notes/:noteId', (req, res) =>{
    let note = notesHandler.getNote(req.params.noteId)
    if (note !== undefined){
        res.status(200).json(note)
    } else {
        res.status(404).send()
    }
})

routes.put('/notes/:noteId', urlEncodedParser, (req, res) =>{

    let oldNote = notesHandler.getNote(req.params.noteId)
    let newFiles = oldNote.files
    for (const file in newFiles) {
        newFiles.push(file)
    }
    let note = {
        id: req.params.noteId,
        title: req.body.title,
        status: req.body.status,
        completionDate: req.body.completionDate,
        text: req.body.text,
        files: newFiles,
    }
    notesHandler.updateNote(note)
    res.status(201).json(note)
})

routes.delete('/notes/:noteId', urlEncodedParser, (req, res) =>{
    if (notesHandler.removeNote(req.params.noteId)){
        res.status(200).send()
    } else {
        res.status(404).send()
    }
})
module.exports = routes