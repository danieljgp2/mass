<template>
  <div id="app">
    <b-loading :active="this.isLoading()"/>
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    loading: true
  }),
  methods: {
    ...mapGetters([
      'isLoading'
    ])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
