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

var dog = {
  sayHello: function(){
    console.log('Woof!@')
  }
}

dog.sayHello()

var $ = {
  ajax: function (opts){
    let url = opts.url
    let successFunction = opts.successFunction

    function onLoad(){
      let data = JSON.parse(this.response)
      successFunction(data)
    }

    let request = new XMLHttpRequest();

    request.open('GET', url, true);

    request.onload = onLoad

    request.send()
  }
}


function ajax(opts){
  let url = opts.url
  let successFunction = opts.successFunction

  function onLoad(){
    let data = JSON.parse(this.response)
    successFunction(data)
  }

  let request = new XMLHttpRequest();

  request.open('GET', url, true);

  request.onload = onLoad

  request.send()
}
