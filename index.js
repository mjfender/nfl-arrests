$(document).ready(function(){
  $('form#book-form').submit(function(event){
    event.preventDefault()
    const URL = 'https://www.googleapis.com/books/v1/volumes?'
    // find the user's search query and interpolate that into the URL
    $.ajax({
      url:
    })
    // 1. Fire an XHR reqeust to the google books API
    // 2. When the response comes back, append some lis to my ul for the user
  })

})
