const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile( __dirname + '/pages/home.html')
})

app.post('/post.html', function(request, response) {
  //var name =  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
