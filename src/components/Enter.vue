<template>
  <div>
    <input
      type="number"
      v-model.number="squares"
      placeholder="コースの長さを入力してね！！！！！"
      class="course">
    <div v-for="player in players" v-bind:key="player.id">
      <input 
        type="text"
        v-model="player.name"
      >
    </div>
    <button v-on:click="addPlayer()">プレイヤーを追加</button>
    <button 
      v-bind:disabled="!squares"
      v-on:click="startGame()"
    >ゲームスタート！</button>
  </div>
</template>

<script>
export default {
  name: 'Enter',
  data () {
    return {
      players: [
        {
          name: '',
          id: 0
        }
      ],
      squares: null
    }
  },
  methods: {
    addPlayer () {
      this.players.push({
        name: '',
        id: this.players.length
      })
    },
    startGame () {
      this.$emit('started', [this.players, this.squares])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.course {
  width: 200px;
}
</style>
