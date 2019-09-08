import { readEarthquakes } from './database'

// https://blog.risingstack.com/your-first-node-js-http-server/ tutorial to set up NodeJS server
const express = require('express')
const app = express()
const port = 8000

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

app.get('/', (req, resp) => {
  // Render webpage
  app.use('/', express.static(__dirname));
  resp.status(200).sendFile('index.html', { root: __dirname });
})

app.get('/earthquakes', (req, resp) => {
  // Read from database, return it to clients as JSON
  console.log('HELLO! This is /earthquakes.')
  let earthquakes = readEarthquakes()
  resp.setHeader('Content-Type', 'application/json')
  resp.status(200).end(JSON.stringify(earthquakes.slice(0, 1000)))
})