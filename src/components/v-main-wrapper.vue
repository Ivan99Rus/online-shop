<template>
  <div class="v-main-wrapper">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'v-main-wrapper',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  watch: {},
}
</script>

<style>
  .v-main-wrapper {
    display: flex;
    align-self: center;
    justify-content: center;
    flex-direction: column;
    max-width: 90%;
    margin: 0 auto;
  }
</style>
