import express from 'express'
import http from 'http'
import { matchRouter } from './routes/matches.js'
import { attachWebSocketServer } from './ws/server.js'

const port = Number(process.env.PORT || 8000)
const host = process.env.HOST || '0.0.0.0'

const app = express()
const server = http.createServer(app)

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/matches", matchRouter)

const { broadcastMatchCreated } = attachWebSocketServer(server)
app.locals.broadcastMatchCreated = broadcastMatchCreated

server.listen(port, host, () => {
  const baseURL = host === '0.0.0.0' ? `http://localhost:${port}` : `http://${host}:${port}`
  console.log(`Server started on ${baseURL}`)
  console.log(`WebSocket  server is running on ${baseURL.replace('http', 'ws')}/ws`)
})
