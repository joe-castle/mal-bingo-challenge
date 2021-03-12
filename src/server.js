const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()

function fetchFromUrl(url, response) {
  return fetch(url)
  .then(res => {
    if (!res.ok) {
      throw Error(res)
    }
    
    return res.json()
  })
  .catch(err => {
    response.status(404).json(err)
  })
}

app.use(cors())

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, 'build')));
}

app.get('/anime/:id', (req, response) => {
  fetchFromUrl(`https://api.jikan.moe/v3/anime/${req.params.id}/`, response)
    .then(json => response.json(json))
})

app.get('/anime/search/:query', (req, response) => {
  fetchFromUrl(`https://api.jikan.moe/v3/search/anime/?q=${req.params.query}&limit=5`, response)
    .then(results => {
      response.json(results)
    })
})

app.listen(3001, () => console.log(`Listening on ${3001}`))