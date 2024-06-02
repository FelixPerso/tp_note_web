<template>
  <div class="container">
    <MainMenu />
    <IndexPage />
  </div>
</template>

<script>
import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import MainMenu from './components/MainMenu.vue';
import IndexPage from './components/IndexPage.vue';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

export default {
  name: 'App',
  components: {
    IndexPage,
    MainMenu
  },
  render: h => h(App)
};
</script>

<style>

</style>
