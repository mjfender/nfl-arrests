$(document).ready(addFormEventHandler)


function addFormEventHandler (){
  $('form#book-form').submit(handleFormSubmit)
}

function handleFormSubmit (event){
  console.log(event)
  event.preventDefault()
  findAndRenderBooks()
}

function findAndRenderBooks(){
  const URL = 'https://www.googleapis.com/books/v1/volumes'
  // find the user's search query and interpolate that into the URL
  let $input = $('input#query')
  let userInput = $input.val()
  let query = userInput.split(' ').join('+')
  $input.val('')
  // 1. Find what the user put in the input field and then append that into the url as so
  // 'https://www.googleapis.com/books/v1/volumes?q=ruby+programming'
  // 'https://www.googleapis.com/books/v1/volumes?q=dogs'

  // 1. Fire an XHR reqeust to the google books API

  $.ajax({
    url: `${URL}?q=${query}`,
    success: renderBooks
  })
}

function renderBooks (data){
  // 2. When the response comes back, append some lis to my ul for the user
  let bookList = $('.js--book-list')
  bookList.html('')

  function renderBook (  book ) {
    let title = book.volumeInfo.title
    bookList.append(`<li class='collection-item'>${title}</li>`)
  }

  data.items.forEach(renderBook)
}

//
// for (var i = 0; i < array.length; i++) {
//   // every pass through the loop, we get a new i
//   // otherwise, we overwrite what i is
//   array[i]
// }
