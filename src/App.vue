<template>
  <div id="app">
    <Enter 
      v-on:started="startGame"
      v-if="players.length === 0"
    ></Enter>
    <div v-else>
      <div
        class="gooooooooooal"
        v-if="players.length === countGoals()">ゴーーーーーーーーール！！！！</div>
      <div v-else>
        <div>{{ players[currentPlayer].name }}さんの番です</div>
        <Dice
          v-on:rolled="rolledDice"
        ></Dice>
      </div>
      <Sheet
        class="sheet"
        v-for="player in players"
        v-bind:key="player.id"
        v-bind:goal="goal"
        v-bind:position="player.position"
        v-bind:name="player.name"
        v-bind:rank="player.rank"
      ></Sheet>
    </div>
  </div>
</template>

<script>
import Dice from './components/Dice.vue'
import Sheet from './components/Sheet.vue'
import Enter from './components/Enter.vue'

export default {
  name: 'app',
  components: {
    Dice,
    Sheet,
    Enter
  },
  data () {
    return {
      players: [],
      goal: null,
      currentPlayer: null,
      ranks: []
    }
  },
  methods: {
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
    startGame ([players, goal]) {
      this.goal = goal
      this.currentPlayer = 0
      players.forEach(player => {
        this.players.push({
          name: player.name,
          position: 1,
          id: player.id,
          rank: null
        })
      })
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
    countGoals () {
      let goaled = 0
      this.players.forEach(player => {
        if (player.rank) {
          goaled++
        }
      })
      return goaled
    }
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
