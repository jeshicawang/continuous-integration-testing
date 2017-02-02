module.exports = {

  nextId: 1,

  collection: [],

  get(id) {
    const note = this.collection.find(note => note.id == id);
    const errMsg = { err: 'No note with id ' + id };
    return Promise.resolve(Object.assign({}, note || errMsg));
  },

  getAll() {
    return Promise.resolve(this.collection.slice())
  },

  addOne(newNote) {
    const note = Object.assign({}, newNote, {
      id: this.nextId++,
      timestamp: new Date().toJSON()
    })
    this.collection.push(note)
    return Promise.resolve(Object.assign({}, note))
  },

  deleteOne(id) {
    const indexToSplice = this.collection.findIndex(note => note.id == id);
    this.collection.splice(indexToSplice, 1);
    return Promise.resolve(this.collection.slice())
  },

  update(id, newNote) {
    const noteToUpdate = this.collection.find(note => note.id == id);
    Object.assign(noteToUpdate, newNote);
    return Promise.resolve(Object.assign({}, noteToUpdate));
  }

}
