<template>
  <div>
    <h1>Hello</h1>
    <router-link to="/">Retour</router-link>

    <p>Entrez un mot, vous le retrouverez par magie dans l'autre page</p>
    <label for="msg">votre message</label>
    <input id="msg" v-model="msg" @input="changed">
  </div>
</template>

<script>
export default {
  name: 'Hello',
  props: {
    msg: String
  },
  methods:{
    changed: function (){
      this.$store.commit('change',this.msg)
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
</style>
