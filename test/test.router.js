const { expect } = require('chai');
const request = require('request');
const app = require('../app');

const PORT = 3000;
const TEST_URL = 'http://localhost:' + PORT;

describe('notesAPI', () => {

  let server;

  before((done) => {
    server = app.listen(PORT || 3000, () => {
      console.log(`Listening on port ${PORT || 3000}`)
      done();
    })
  })

  after(() => {
    server.close();
  })

  describe('GET /notes', () => {
    it('returns a list of notes', (done) => {
      const options = { json: true }
      request(TEST_URL + '/notes', options, (err, res, body) => {
        expect(err).to.be.null;
        expect(body).to.be.an('array');
        done();
      })
    })
  })

  describe('POST /notes', () => {
    it('creates and returns a new note', (done) => {
      const body = { text: 'Hello, this is a new note.' };
      const options = { method: 'POST', json: true, body };
      request(TEST_URL + '/notes', options, (err, res, body) => {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(201);
        expect(body).to.be.an('object');
        expect(body).to.include.keys('id', 'timestamp', 'text');
        done();
      })
    })
  })

  describe('PUT /notes/:id', () => {
    it('updates a note by id and returns the updated note', (done) => {
      let body = { text: 'Hello, this is another new note.' };
      let options = { method: 'POST', json: true, body };
      request(TEST_URL + '/notes', options, (err, res, { id: originalId, text: originalText }) => {
        body = { text: 'This is the updated note text.' };
        options = { method: 'PUT', json: true, body };
        request(TEST_URL + '/notes/' + originalId, options, (err, res, body) => {
          expect(err).to.be.null;
          expect(res.statusCode).to.equal(200);
          expect(body).to.be.an('object');
          expect(body.id).to.equal(originalId);
          expect(body.text).to.not.equal(originalText);
          done();
        })
      })
    })
  })

  describe('GET /notes/:id', () => {
    it('finds a single note by id and returns it', (done) => {
      const body = { text: 'Hello, this is another new note.' };
      const options = { method: 'POST', json: true, body };
      request(TEST_URL + '/notes', options, (err, res, { id: originalId }) => {
        request(TEST_URL + '/notes/' + originalId, { json: true }, (err, res, body) => {
          expect(err).to.be.null;
          expect(body).to.be.an('object');
          expect(body).to.include.keys('id', 'timestamp', 'text');
          expect(body.id).to.equal(originalId);
          done();
        })
      })
    })
    it('returns an error message when no note can be found', (done) => {
      request(TEST_URL + '/notes/' + 777, { json: true }, (err, res, body) => {
        expect(body).to.be.an('object');
        expect(body).to.include.keys('err');
        done();
      })
    })
  })

  describe('DELETE /notes/:id', () => {
    it('deletes a note by id and returns the updated notes collection', (done) => {
      let body = { text: 'Hello, this is another new note.' };
      let options = { method: 'POST', json: true, body };
      request(TEST_URL + '/notes', options, (err, res, { id: originalId }) => {
        options = { method: 'DELETE', json: true };
        request(TEST_URL + '/notes/' + originalId, options, (err, res, body) => {
          expect(err).to.be.null;
          expect(res.statusCode).to.equal(200);
          expect(body).to.be.an('array');
          expect(!!body.find(note => note.id == originalId)).to.be.false;
          done();
        })
      })
    })
  })

})
