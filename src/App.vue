<template>
  <div id="app">
    <Header/>
    <div id="content" class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";

export default {
  components: {
    Header,
  },
  name: 'App',
  methods: {
    components: {
      Header,
    },
  },
}


</script>

<style>
</style>
