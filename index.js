var GITHUB_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?';
var hh= {'Authorization':'Bearer AAAAAAAAAAAAAAAAAAAAAA2Y5wAAAAAA9waG9%2FayTP7wsxdBU5OuaJN8mIg%3DDA0fEoNguBHze10Tb9i72RunLr4lVVrqUNF8Ceiqpr20aJiTB0'};


var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' +
    '<span class="js-result-name"></span> by <span class="js-user-name"></span></h2>' +
  '<img id="photo" src= "" >' +'<span class="js-description"> user quotes</span>'+
    '<font size="5"><p>Time of Tweet 🕑:<span class="js-watchers-count"></span></p></font>' + 
    '<font size="5"><p>place 🌏: <span class="js-issues-count"></span></p></font>' +
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var settings = {
   url: GITHUB_SEARCH_URL,
    headers:hh,
    dataType: 'json',
    type: 'GET',
    data: {
      q: searchTerm,
      count: 80
    },
    
    success: callback
  };
  $.ajax(settings).done(function (response){console.log(response)});;
}


function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result-name").text(result.text);
  template.find(".js-user-name").text(result.user.name);
  template.find("#photo").attr("src",result.user.profile_image_url);
  template.find(".js-description").text(result.user.description);
  template.find(".js-watchers-count").text(result.created_at);
  template.find(".js-issues-count").text(result.user.location);
  return template;
}

function displayGitHubSearchData(data) {
  var results = data.statuses.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayGitHubSearchData);
  });
}

$(watchSubmit);
