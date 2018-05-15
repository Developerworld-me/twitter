var GITHUB_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/tweets/search/30day/dev.json?';
var hh= {'Authorization':'Bearer AAAAAAAAAAAAAAAAAAAAAA2Y5wAAAAAA9waG9%2FayTP7wsxdBU5OuaJN8mIg%3DDA0fEoNguBHze10Tb9i72RunLr4lVVrqUNF8Ceiqpr20aJiTB0'};


var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' +
    '<span class="js-result-name"></span> by <span class="js-user-name"></span></h2>' +
    '<font size="3"><p>Time of Tweet 🕑:<span class="js-watchers-count"></span></p></font>' + 
    '<font size="3"><p>place 🌏: <span class="js-issues-count"></span></p></font>' +
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var settings = {
   url: GITHUB_SEARCH_URL,
    headers:hh,
    dataType: 'json',
    type: 'GET',
    data: {
      query: searchTerm,
      maxResults: 100,
      fromDate: 201805010000,
      toDate:201805140000
    },
    
    success: callback
  };
  $.ajax(settings).done(function (response){console.log(response)});;
}


function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result-name").text(result.text);
  template.find(".js-user-name").text(result.id_str);
  template.find(".js-watchers-count").text(result.created_at);
  template.find(".js-issues-count").text(result.place);
  return template;
}

function displayGitHubSearchData(data) {
  var results = data.results.map(function(item, index) {
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
