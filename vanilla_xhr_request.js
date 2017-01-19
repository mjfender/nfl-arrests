const URL = 'https://www.googleapis.com/books/v1/volumes?q=ruby+programming'

let request = new XMLHttpRequest();

request.open('GET', URL, true);

request.onload = function(){
  console.log(this.response)
  let data = JSON.parse( this.response )
  console.log(data)
}

request.send()
console.log('sending the request')


function send(){
  // whenever the response comes back
  this.onload()
}
