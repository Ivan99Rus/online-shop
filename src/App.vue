<template>
  <div id="app">
    <v-select 
      :options="options"
      @select="optionSelect"
      :selected="selected"
    />
    <v-main-wrapper></v-main-wrapper>
  </div>
</template>

<script>

import vMainWrapper from './components/v-main-wrapper'
import vSelect from './components/v-select'

export default {
  name: 'App',
  components: {
    vMainWrapper,
    vSelect
  },
  data() {
    return {
      options: [
        { name: 'Option 1', value: 1},
        { name: 'Option 2', value: 2},
        { name: 'Option 3', value: 3},
        { name: 'Option 4', value: 4}
      ],
      selected: 'Select'
    }
  },
  methods: {
    optionSelect(option) {
      this.selected = option.name;
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
