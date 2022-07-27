var apiCall = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=";
var apiKeyCall = "&type=video&key=AIzaSyDhveCUnM4G3fkKp_W1S2YUhGMOkknN-uY";
var searchField = $("#search-field");
var searchBtn = $("#search-button");
var mainVidField = $("#main-video-field");
var relatedVidField = $("#related-videos-field");
var titleField = $("#video-title-field");
var wikiApiCall = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=";
var wikiField = $("#wiki-text-field");
var readMore = $("#readmore");

function searchYouTube(event) {
    event.preventDefault();
    var searchText = $(searchField).val();
    console.log(searchText)
    fetch(apiCall+searchText+apiKeyCall) 
        .then (function(response) {
            return response.json()
        })
        .then (function(data) {
            showMainVideo(data);
        })
}

function showMainVideo(data) {
    var allVids = data;
    var mainVid = data.items[0];
    var videoLink = mainVid.id.videoId;
    var searchLink = "https://www.youtube.com/embed/"+videoLink;
    mainVidField.attr("src", searchLink);
    showTitle(mainVid);
    showRelatedVideos(allVids)
};

function showTitle(mainVid) {
    var titleEl = $("<h3>");
    titleField.append(titleEl);
    titleEl.text(mainVid.snippet.title);
}

function showRelatedVideos(allVids) {
  // FOR EVERY VIDEO BESIDES THE MOST POPULAR ONE
  for (i = 1; i < allVids.items.length; i++) {
    // BUILD THE EMBEDING LINK FOR THAT YOUTUBE VIDEO
    var videoLink = allVids.items[i].id.videoId;
    var searchLink = "https://www.youtube.com/embed/" + videoLink;
    // MAKE AN IFRAME ELEMENT AND SET THE ATTRIBUTES TO DISPLAY THE CURRENT VIDEO
    var vidEl = $("<iframe>");
    vidEl.attr("src", searchLink);
    vidEl.attr("height", "220");
    vidEl.attr("width", "300");
    relatedVidField.append(vidEl);
  }
}

function searchWiki() {
  // GRAB THE TERM TO SEARCH FROM THE SEARCH FIELD
  var pageToSearch = $(searchField).val();
  // CALL THE API USING THE API CALL + THE SEARCH TERM
  fetch(wikiApiCall + pageToSearch)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // MAKE A VARIABLE FOR THE SEARCH RESULTS
      var searchResults = data.query.search;
      // PUT THE INFORMATION ON THE SCREEN USING THE SHOWWIKI FUNCTION
      showWiki(searchResults);
    });
}

function showWiki(searchResults) {
  // REMOVE ANY OTHER INFORMATION FROM PREVIOUS SEARCHES
  wikiField.children().remove();
  // MAKE A PARAGRAPH ELEMENT AND SET THE TEXT TO THE INFORMATION FROM THE API
  var paraEl = $("<p>");
  paraEl.html(searchResults[0].snippet);
  wikiField.append(paraEl);
  // GRAB THE ID OF THE PAGE TO SEND TO LEARNMOREBUTTON TO MAKE A BUTTON DIRECTION TO THE WIKI PAGE
  var pageId = searchResults[0].pageid;
  learnMoreBtn(pageId);
}

function learnMoreBtn(pageId) {
  // USING THE PAGE ID BUILD A LINK TO THAT WIKI PAGE
  var wikiPage = "https://en.wikipedia.org/wiki?curid=" + pageId;
  // USING THE LINK BUILD AN ANCHOR TAG TO DIRECT TO THAT PAGE
  var aTag = $("<a>");
  aTag.attr("href", wikiPage);
  aTag.attr("target", "_blank");
  aTag.text("Learn More");
  aTag.addClass("btn btn-sm btn-warning");
  wikiField.append(aTag);
}

// ON BUTTON CLICK RUN THE SEARCHYOUTUBE FUNCTION
searchBtn.on("click", searchYouTube);
// ON BUTTON CLICK RUN THE SEARCH WIKI FUNCTION
searchBtn.on("click", searchWiki);
