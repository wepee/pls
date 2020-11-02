<template>
  <div>
    <ul>
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/Hello">1- Hello</router-link></li>
      <li><router-link to="/World">2- World</router-link></li>
    </ul>
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
