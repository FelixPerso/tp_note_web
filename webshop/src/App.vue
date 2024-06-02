<template>
  <div class=" container ">
    <MainMenu></MainMenu>
    <IndexPage></IndexPage>
  </div>
</template>

<script>
import MainMenu from "./components/MainMenu.vue"
import IndexPage from "./components/IndexPage.vue";

export default {
  name: 'App',
  components: {
    IndexPage,
    MainMenu
  }
}
</script>

<style></style>