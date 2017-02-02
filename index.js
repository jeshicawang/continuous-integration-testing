const app = require('./app.js')

app.listen(PORT || 3000, () => {
  console.log(`Listening on port ${PORT || 3000}`) // eslint-disable-line
})
