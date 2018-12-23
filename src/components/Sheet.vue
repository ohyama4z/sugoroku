<template>
  <div id="app">
    <div
      class="square"
      v-for="i in goal"
      v-bind:key="i"
    >
      {{ i }}<br>
      <div v-if="i === position">あんパン</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sheet',
  props: [
    'position',
    'goal'
  ],
  components: {
  },
  methods: {
  }
}
</script>

<style>
.square {
  width: 100px;
  height: 100px;
  border: solid 1px #000000;
}
</style>
