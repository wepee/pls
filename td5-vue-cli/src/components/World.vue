<template>
  <div>
    <h1>World</h1>
    <li><router-link to="/">Retour</router-link></li>
    <h3>{{$store.getters.msg}}</h3>
  </div>
</template>

<script>
export default {
  name: 'World',
  props: {
    msg: String
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
