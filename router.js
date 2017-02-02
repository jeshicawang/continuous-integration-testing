const { Router } = require('express')
const notes = require('./notes')

const router = new Router()

router.get('/', (req, res) => {
  notes
    .getAll()
    .then(notes => res.json(notes))
})

router.post('/', ({ body }, res) => {
  notes
    .addOne(body)
    .then(newNote => res.status(201).json(newNote))
})

router.get('/:id', ({ params }, res) => {
  notes
    .get(params.id)
    .then(note => res.json(note))
})

router.put('/:id', ({ body, params }, res) => {
  notes
    .update(params.id, body)
    .then(updatedNote => res.status(200).json(updatedNote))
})

router.delete('/:id', ({ params }, res) => {
  notes
    .deleteOne(params.id)
    .then(updatedNotes => res.status(200).json(updatedNotes))
})

module.exports = router
