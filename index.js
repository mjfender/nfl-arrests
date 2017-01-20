// -- TEAM SEARCH --
 // http://nflarrest.com/api/v1/team/search?term=steeler
 /* [
  {
    "teams_full_name": "Steelers",
    "team_code": "PIT",
    "city": "Pittsburgh"
  }
]*/


// -- ARRESTS BY TEAM -- 
//  http://nflarrest.com/api/v1/team/arrests/PIT
/* [
  {
    "arrest_stats_id": "13",
    "Date": "2015-03-15",
    "Team": "PIT",
    "Team_name": "Steelers",
    "Team_city": "Pittsburgh",
    "Name": "Antwon Blake",
    "Position": "CB",
    "Encounter": "Arrested",
    "Category": "Public intoxication",
    "Description": "Accused of being drunk in public in Oceanside, Calif.",
    "Outcome": "Resolution undetermined.",
    "general_category_id": "7",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2015",
    "Month": "3",
    "Day": "15"
  },
  {
    "arrest_stats_id": "45",
    "Date": "2014-08-20",
    "Team": "PIT",
    "Team_name": "Steelers",
    "Team_city": "Pittsburgh",
    "Name": "LeGarrette Blount",
    "Position": "RB",
    "Encounter": "Detained",
    "Category": "Drugs",
    "Description": "Was riding in passenger seat when police pulled over car driven by teammate Le'Veon Bell. Suspected of possessing bag with about 20 ounces of marijuana.",
    "Outcome": "Diversion program, 50 hours of community service in exchange for dismissal of charge.",
    "general_category_id": "3",
    "legal_level_id": "1",
    "resolution_category_id": "1",
    "Year": "2014",
    "Month": "8",
    "Day": "20"
  },*/


$(document).ready(addFormEventHandler)


function addFormEventHandler (){
  $('form#team-form').submit(handleFormSubmit)
}

function handleFormSubmit (event){
  console.log(event)
  event.preventDefault()
  findAndRenderTeams()
}

function findAndRenderTeams(){
  const TEAM_URL = 'http://nflarrest.com/api/v1/team/search'
  // find the user's search query and interpolate that into the URL
  let $teamInput = $('input#team-query')
  let userTeamInput = $teamInput.val()
  let teamQuery = userTeamInput.split(' ').join('+')
  $teamInput.val('')
  var $arrestList = $('ul.js--arrest-list')
  $arrestList.html('')
  var $arrestStats = $('div.js--team-stats')
  $arrestStats.html('<ul class="js--team-stats"></ul>')
  
  $.ajax({
    url: `${TEAM_URL}?term=${teamQuery}`,
    success: findTeamCodeAndRenderArrests
  })

}

function findTeamCodeAndRenderArrests (data) {
  if ( nullChecker(data) ) {
    let $hiddenFields = $('.hidden')
    $hiddenFields.toggleClass('hidden')
    let teamHeadline = $('div.js--team-headline')
    teamHeadline.html('')
    teamHeadline.html(`<h3>${data[0].city} ${data[0].teams_full_name}</h3>`)
    findAndRenderTeams(data[0].team_code)
  }

  function findAndRenderTeams(team_code){
  const ARREST_URL = 'http://nflarrest.com/api/v1/team/arrests/'

  $.ajax({
    url: `${ARREST_URL}/${team_code}`,
    success: displayArrests
  })
}

  function displayArrests(data) {
    var $arrestList = $('ul.js--arrest-list')
    var $arrestCounter = $('div.js--team-stats')
    $arrestCounter.html(`<h4>${data.length} arrests</h4>`)
    var $arrestStats = $('div.js--team-stats')

   var arrests = {}
   // START FOREACH LOOP
    data.forEach(renderArrest)
    
     function renderArrest(arrest, index, array) {
       let date = arrest.Date
       let name = arrest.Name
       let category = arrest.Category
       let description = arrest.Description
       let outcome = arrest.Outcome
       if (!!arrests[category]) {
        arrests[category] ++
       }
       else {
        arrests[category] = 1
       }
       // insert logic for populating object of arrest types

       if (index !== array.length - 1) {
         $arrestList.append(`
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Name:</strong>&nbsp;${name}<li>
          <li><strong>Arrest Type:</strong>&nbsp;${category}</li>
          <li><strong>Description:</strong>&nbsp;${description}</li>
          <li><strong>Outcome:</strong>&nbsp;${outcome}</li>
          <br><hr><br>`)}
         else {
          $arrestList.append(`
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Name:</strong>&nbsp;${name}<li>
          <li><strong>Arrest Type:</strong>&nbsp;${category}<li>
          <li><strong>Description:</strong>&nbsp;${description}<li>
          <li><strong>Outcome:</strong>&nbsp;${outcome}<li>
          <br>`)}

         }

         for (var property in arrests) {
          if (arrests.hasOwnProperty(property)) {
            $arrestStats.append(`<li>${property}: ${arrests[property]}</li>`)
          }
        }
      }
}



function nullChecker(data) {
  if (data.length < 1) {
    alert('No results found. Try again.')
    return false
  }
  else {
    return true
  }
}






//   function renderTeamName (  team ) {
//     let teamName = team.volumeInfo.title
//     bookList.append(`<li class='collection-item'>${title}</li>`)
//   }

//   data.items.forEach(renderBook)
// }

//
// for (var i = 0; i < array.length; i++) {
//   // every pass through the loop, we get a new i
//   // otherwise, we overwrite what i is
//   array[i]
// }
