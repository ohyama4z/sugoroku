<template>
  <div id="app">
    {{ name }}<br>出目：{{ dice }}
    <div v-if="rank">
      {{ rank }}着！
    </div>
    <div
      class="square"
      v-for="i in goal"
      v-bind:key="i"
    >
      {{ i }}<br>
      <div v-if="i === position">{{ name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sheet',
  props: [
    'position',
    'goal',
    'name',
    'rank',
    'dice'
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
  border: solid 1px #aaaaaa;
}
</style>
