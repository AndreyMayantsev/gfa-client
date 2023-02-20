<template>

<q-layout view="hHh lpR fFf">

  <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" elevated>
      <!-- drawer content -->
  </q-drawer>

  <q-page-container>
    <router-view />
    <HelloWorld/>
  </q-page-container>

  <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>
            <q-btn color="secondary" label="MENU" @click="showMenu"/>
          </div>
        </q-toolbar-title>
      </q-toolbar>
  </q-footer>

</q-layout>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data() {
    return {
      leftDrawerOpen: false
    }
  },

  methods: {
    showMenu() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    }
  }
  

}

</script>

<style>
#app {
  font-family: swiss;
  -webkit-font-smoothing: swiss;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@font-face {
  font-family: 'swiss';
  src: local('swiss'), local('Swiss 911 Compressed'),
      url('../src/assets/fonts/swiss911.ttf') format('ttf'),
      url('../src/assets/fonts/swiss911.woff2') format('woff2');
  font-weight: bold;
  font-style: normal;
}
</style>
