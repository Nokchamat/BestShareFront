<template>
  <div id="app">
    <Header/>
    <div id="content" class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/layout/Header.vue";

export default {
  components: {
    Header,
  },
  name: 'App',
  data() {
    return {
      price1: 60,
      price2: 80,
      count: 0,
      responseContents: []
    }
  },
  methods: {
    components: {
      Header,
    },
    getData() {
      axios
      .get("http://localhost:8080/v1/pageshareboard")
      .then((res) => {
        console.log(res.data);
        this.responseContents = res.data.content;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

}


</script>

<style>
</style>
