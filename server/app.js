const http = require('http')
const socketio = require('socket.io')
const fs = require('fs')
const randRange = (min, max) =>
  Math.round(Math.random() * (max - min) + min)

const server = http.createServer((req, res) => {
  const webroot = '../public'
  if (req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    const output = fs.readFileSync(`${webroot}/index.html`, 'utf-8')
    res.end(output)
  } else if (req.url === '/chat.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    const output = fs.readFileSync(`${webroot}/chat.html`, 'utf-8')
    res.end(output)
  } else if (req.url === '/chat.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript' })
    const output = fs.readFileSync(`${webroot}/chat.js`, 'utf-8')
    res.end(output)
  }
}).listen(process.env.VMC_APP_PORT || 3000, () => {
  console.log(`Server is listening on *:${process.env.VMC_APP_PORT || 3000}`)
})

const io = socketio.listen(server)
const users = []
const boardData = {}

io.sockets.on('connection', socket => {
  socket.on('enter', unparsedData => {
    const data = JSON.parse(unparsedData)
    users.push({
      id: socket.id,
      name: data.name
    })
    console.log('参加した')
    io.sockets.emit('entered', JSON.stringify(users))
    io.to(socket.id).emit('userIndex', users.length - 1)
  })
  socket.on('roll', () => {
    boardData.dice = randRange(1, 6)
    console.log(boardData)
    let finished = 0
    if (boardData.users[boardData.currentPlayerIndex].position + boardData.dice >= boardData.length) {
      boardData.users.forEach(user => {
        if (user.rank) {
          finished++
        }
      })
      boardData.users[boardData.currentPlayerIndex].rank = finished + 1
      boardData.users[boardData.currentPlayerIndex].position = boardData.length
      if (finished === boardData.users.length - 1) {
        // boardData.users[boardData.currentPlayerIndex].position = boardData.length
        boardData.isFinished = true
      }
    } else {
      boardData.users[boardData.currentPlayerIndex].position += boardData.dice
    }
    boardData.users[boardData.currentPlayerIndex].lastDice = boardData.dice
    do {
      if (boardData.currentPlayerIndex === users.length - 1) {
        boardData.currentPlayerIndex = 0
      } else {
        boardData.currentPlayerIndex++
      }
    } while (boardData.users[boardData.currentPlayerIndex].rank && boardData.users.length !== finished + 1)
    io.sockets.emit('rolled', JSON.stringify(boardData))
  })
  socket.on('start', () => {
    boardData.length = randRange(10, 100)
    boardData.currentPlayerIndex = 0
    boardData.users = []
    boardData.isFinished = false
    users.forEach(user => {
      boardData.users.push({
        id: user.id,
        name: user.name,
        position: 0,
        rank: null,
        lastDice: null
      })
    })
    io.sockets.emit('started', JSON.stringify(boardData))

    /*
    io.sockets.emit('started', JSON.stringify({
      users: {
        position
      }
      users: [
        {
          id: 'aaa',
          name: 'fuga',
          position: 0,
          lastDice: 5
        },
        {}
      ],
      length: makeSheet,
      currentPlayerIndex: 0
    }))
    */
  })
  // メッセージ送信（送信者にも送られる）
  socket.on('send', unparsedData => {
    const data = JSON.parse(unparsedData)
    // console.log(unparsedData)
    io.sockets.emit('deliver', JSON.stringify({
      name: users[socket.id],
      text: data.text,
      time: new Date()
    }))
  })
})
