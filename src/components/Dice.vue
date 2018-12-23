<template>
  <div>
    <button v-on:click="rollDice()">サイコロを回す</button>
    {{ diceNum }}
  </div>
</template>

<script>
  export default {
    name: 'Dice',
    data () {
      return {
        diceNum: null
      }
    },
    methods: {
      rollDice (){
        this.diceNum = Math.round( Math.random()*5+1 );
        this.$emit('rolled', this.diceNum)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
