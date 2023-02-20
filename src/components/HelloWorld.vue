<template>
  <div class="hello">
    <q-btn color="secondary" label="Secondary" @click="printConsole"/>

    <div class="q-pa-md q-gutter-md">
    <div class="row justify-between">

      <p class="advice-font">{{ this.adviseText }}</p>

    </div>
  </div>

  </div>
</template>

<script>

// random advice - http://fucking-great-advice.ru/api/random

export default {
  name: 'HelloWorld',
  data() {
    return {
      adviseText: "GET YOUR FIRST ADVICE"
    }
  },

  methods: {
    
    async printConsole() {
      let advise = await this.getAdvice('http://fucking-great-advice.ru/api/random');
      this.adviseText = advise['text'].toUpperCase();
    },

    async getAdvice(url) {
      let advice  = ''
      let response = await fetch(url);
      document.body.style.backgroundImage = 'url(' + this.getRandomImage(); + ')';
    
      if (response.ok) { 
        advice = await response.json();
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
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.advice-font {
  font-family: "swiss";
  font-size: 5.5rem;
  line-height: .9;
  letter-spacing: 0;
  text-decoration-style: solid;
}



</style>
