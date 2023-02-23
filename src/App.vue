<template>

<q-layout view="lhr lpR fFf" class="bkgimg">

  <q-drawer class="bg-grey-8 text-white" v-model="leftDrawerOpen" side="left" overlay behavior="mobile" elevated>
      <!-- drawer content -->
      <q-toggle v-model="everyHour" label="Совет каждый час" />
  </q-drawer>

  <q-page-container>

        <q-img class = "bkgimg" v-bind:src="adviceImage">
          <div class="absolute-full text-subtitle2 flex flex-center advice-font" v-on:click="viewAdvice">
            {{ currentAdvice }}
          </div>
        </q-img>

    <!--<HelloWorld/>-->
  </q-page-container>

  <q-footer reveal elevated class="text-white blurtoolbar">
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
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    //HelloWorld
  },

  data() {
    return {
      leftDrawerOpen: false,
      everyHour: false,
      currentAdvice: "ПОЛУЧИ СВОЙ СОВЕТ",
      adviceImage: "https://cdn.quasar.dev/img/parallax2.jpg"
    }
  },

  methods: {
    showMenu() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    async getAdvice(url) {
      let advice  = ''
      let response = await fetch(url);
      //document.body.style.backgroundImage = 'url(' + this.getRandomImage(); + ')';
    
      if (response.ok) { 
        advice = await response.json();
        this.adviceImage = this.getRandomImage();
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
      return advice;
    },

    getRandomImage() {
      let ImageUrl = "https://fucking-great-advice.ru/data/frontpage/";
      let maxNumber = 70;

      console.log("Image: " + ImageUrl + Math.floor(Math.random() * maxNumber + 10) + ".jpg");
      return ImageUrl + Math.floor(Math.random() * maxNumber + 1) + ".jpg";
    },

    async viewAdvice() {
      let _currentAdvice = await this.getAdvice('http://fucking-great-advice.ru/api/random');
      this.currentAdvice = _currentAdvice['text']
    },

    async getAdviceTags() {
      // https://fucking-great-advice.ru/api/v2/tags

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
.bkgimg {
  position: absolute;
  padding: 0px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  min-width: 50%;
  min-height: 50%;
}
.advice-font {
  font-family: "swiss";
  font-size: 5.0rem;
  line-height: .9;
  letter-spacing: 0;
  text-decoration-style: solid;
  cursor: pointer;
}
.blurtoolbar {
  background-color: #0000001a;
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
}

</style>
