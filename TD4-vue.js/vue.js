var app = new Vue({
  el: '#app',
  methods:{
    reverse: function () {
      this.message = this.message.split('').reverse().join('')
    },

    increment: function () {
      		this.count++;
    },

    add: function () {
      		this.names.push(this.newName);
      		this.newName="";
    }
  },
  data: {
    message: 'Hello Vue!',
    count: 0,
    newName:"",
    names: ['adam', 'julien', 'greg' ],
  }


})