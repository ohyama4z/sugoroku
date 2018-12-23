<template>
  <div id="app">
    <Dice v-on:rolled="diceRolled"></Dice>
  </div>
</template>

<script>
import Dice from './components/Dice.vue'

export default {
  name: 'app',
  components: {
    Dice
  },
  methods: {
    diceRolled (num) {
      console.log(num)
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
