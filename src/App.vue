<template>
  <div id="app">
    <h1 v-if="position === goal">ゴーーーーール！！！！！！！！！</h1>
    <Dice
      v-else
      v-on:rolled="rolledDice"
    ></Dice>
    <Sheet 
      v-bind:goal="goal"
      v-bind:position="position"
    ></Sheet>
  </div>
</template>

<script>
import Dice from './components/Dice.vue'
import Sheet from './components/Sheet.vue'

export default {
  name: 'app',
  components: {
    Dice,
    Sheet
  },
  data () {
    return {
      goal: 12,
      position: 1
    }
  },
  methods: {
    rolledDice (num) {
      if (this.position + num > this.goal) {
        this.position = this.goal
      } else {
        this.position += num
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
