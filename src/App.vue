<template>
  <div id="app">
    <div 
      v-on:started="startGame"
      v-if="!wasJoined"
    >
      <input type="text" v-model="playerName" placeholder="君の名は。">
      <button v-on:click="enter()">参加</button>
    </div>
    <div v-else-if="!isStarted">
      参加中のユーザー
      <div v-for="user in users" v-bind:key="user.id">
        {{ user.name }}
      </div>
      <button v-on:click="startGame()">開始</button>
  
    </div>
    <div v-else>
      <div
        class="gooooooooooal"
        v-if="board.isFinished">ゴーーーーーーーーール！！！！</div>
      <div v-else-if="board.currentPlayerIndex === myIndex">
        <div>あなたの番です</div>
        <button v-on:click="rollDice()">サイコロを回す</button>
      </div>
      <Sheet
        class="sheet"
        v-for="user in board.users"
        v-bind:key="user.id"
        v-bind:goal="board.length"
        v-bind:position="user.position"
        v-bind:name="user.name"
        v-bind:rank="user.rank"
        v-bind:dice="user.lastDice"
      ></Sheet>
    </div>
  </div>
</template>

<script>
// import Dice from './components/Dice.vue'
import Sheet from './components/Sheet.vue'
// import Enter from './components/Enter.vue'

export default {
  name: 'app',
  components: {
    // Dice,
    Sheet,
    // Enter
  },
  data () {
    return {
      isStarted: false,
      board: {},
      myIndex: null,
      wasJoined: false,
      playerName: '',
      players: [],
      users: [],
      goal: null,
      currentPlayer: null,
      ranks: []
    }
  },
  sockets: {
    entered (unparsedUsers) {
      this.users = JSON.parse(unparsedUsers)
      console.log('参加したい')
    },
    userIndex (userIndex) {
      this.myIndex = userIndex
    },
    started (unparsedData) {
      this.board = JSON.parse(unparsedData)
      this.isStarted = true
    },
    rolled (unparsedData) {
      this.board = JSON.parse(unparsedData)
    }
  },
  methods: {
    enter () { 
      this.wasJoined = true
      this.$socket.emit('enter', JSON.stringify({
        name: this.playerName }))
    },
    rollDice () { this.$socket.emit('roll') },
    rolledDice (num) {
      const player = this.players[this.currentPlayer]
      if (player.position + num >= this.goal) {
        player.position = this.goal
        player.rank = this.countGoals() + 1
      } else {
        player.position += num
      }
      this.players[this.currentPlayer] = player

      this.goNext()
    },
    startGame () {
      this.$socket.emit('start')
      // this.goal = goal
      // this.currentPlayer = 0
      // players.forEach(player => {
      //   this.players.push({
      //     name: player.name,
      //     position: 1,
      //     id: player.id,
      //     rank: null
      //   })
      // })
    },
    goNext () {
      // if (this.currentPlayer === this.players.length - 1) {
      //   this.currentPlayer = 0
      // } else {
      //   this.currentPlayer += 1
      // }
      do {
        if (this.currentPlayer === this.players.length - 1) {
          this.currentPlayer = 0
        } else {
          this.currentPlayer += 1
        }
    } while (this.players[this.currentPlayer].rank && this.players.length !== this.countGoals())
    },
    // owareeeeee () {
    //   let goaled = 0
    //   this.players.forEach(player => {
    //     if (player.rank) {
    //       goaled++
    //     }
    //   })
    //   return goaled
    // }
  } 
} 
</script>

<style>
body {
  background-color: #111111;
  color: #aaaaaa;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  margin-top: 60px;
}
.gooooooooooal {
  font-size: 200px;
}
.sheet {
  display: inline-block;
}
</style>
