<template>

<q-layout view="lhr lpR fFf" class="bkgimg">

  <q-drawer class="bg-grey-8 text-white" v-model="leftDrawerOpen" side="left" overlay behavior="mobile" elevated>
      <!-- drawer content -->
      <q-toggle v-model="everyHour" label="Совет каждый час" />
      <div v-for="tag in adviceTags" :key="tag.id">
        #{{ tag.name }}
      </div>
  </q-drawer>

  <q-page-container>

        <q-img class = "bkgimg" v-bind:src="adviceImage">
          <div v-bind:class="adviceFont" v-on:click="viewAdvice">
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
      adviceImage: "https://cdn.quasar.dev/img/parallax2.jpg",
      adviceTags: [],
      adviceFont: "absolute-full text-subtitle2 flex flex-center advice-font"
    }
  },

  methods: {
    async showMenu() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
      this.adviceTags = await this.getAdviceTags();
      console.log("Categories: " + JSON.stringify(this.adviceTags));
    },

    async getAdvice(url) {
      let advice  = '';
      let response = await fetch(url);
    
      if (response.ok) { 
        advice = await response.json();

        this.adviceImage = this.getRandomImage();
      } else {
        advice = "Включи блять интернет!"
        alert("Ошибка HTTP: " + response.status);
      }
      return advice;
    },

    getRandomImage() {
      let imageUrl = "https://fucking-great-advice.ru/data/frontpage/";
      let maxNumber = 70;
      let randomImage = imageUrl + Math.floor(Math.random() * maxNumber + 1) + ".jpg";

      if (randomImage != this.adviceImage) {
        return randomImage;
      } else {
        return imageUrl + Math.floor(Math.random() * maxNumber + 1) + ".jpg";
      }        
    },

    async viewAdvice() {
      let _currentAdvice = await this.getAdvice('http://fucking-great-advice.ru/api/random');
      this.setAdviceFont(_currentAdvice['text']);
      this.currentAdvice = _currentAdvice['text'];
    },

    async getAdviceTags() {
      let url = "https://fucking-great-advice.ru/api/v2/tags";
      let categories  = {};
      let response = await fetch(url);
      //document.body.style.backgroundImage = 'url(' + this.getRandomImage(); + ')';
    
      if (response.ok) { 
        categories = await response.json();
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
      return categories.data;
    },

    isLongWordsContained(advice) {
        let extraMaxAbc = 10;
        let maxAbc = 8;
        let isLongWordsContainedAdvice = "standart";
        let adviceMass = advice.split(' ');
        
        for(let adv in adviceMass) {
          if (adviceMass[adv].length > maxAbc & adviceMass[adv].length < extraMaxAbc) {
            isLongWordsContainedAdvice = "small";
            console.log("В совете есть длиное слово!");
            return isLongWordsContainedAdvice;
          } else if (adviceMass[adv].length > extraMaxAbc) {
            isLongWordsContainedAdvice = "extra-small";
            console.log("В совете есть ОЧЕНЬ длиное слово!");
            return isLongWordsContainedAdvice;
          } else {
            isLongWordsContainedAdvice = "standart";
          }
        }
        return isLongWordsContainedAdvice;
      },

      setAdviceFont(advice) {
        let extraSmall = "absolute-full text-subtitle2 flex flex-center advice-font-extra-small";
        let small = "absolute-full text-subtitle2 flex flex-center advice-font-small";
        let standart = "absolute-full text-subtitle2 flex flex-center advice-font";

        if(this.isLongWordsContained(advice) == "small") {
          this.adviceFont = small;
        } else if (this.isLongWordsContained(advice) == "extra-small"){
          this.adviceFont = extraSmall;         
        } else {
          this.adviceFont = standart;
        }
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
.advice-font-small {
  font-family: "swiss";
  font-size: 3.8rem;
  line-height: .9;
  letter-spacing: 0;
  text-decoration-style: solid;
  cursor: pointer;
}
.advice-font-extra-small {
  font-family: "swiss";
  font-size: 3.0rem;
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
