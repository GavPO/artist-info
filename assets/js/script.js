var apiCall =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=";
var apiKeyCall = "&type=video&key=AIzaSyB6ZL2SWCczxWWj67wt_pNSu8XC5VXWNPk";
var searchField = $("#search-field");
var searchBtn = $("#search-button");
var mainVidField = $("#main-video-field");
var relatedVidField = $("#related-videos-field");
var titleField = $("#video-title-field");
var wikiApiCall =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=";
var wikiField = $("#wiki-text-field");
var readMore = $("#readmore");
var audioDBcall = "https://theaudiodb.com/api/v1/json/2/discography.php?s=";
var discolist = $("#discoList");

// USING THE TEXT IN THE SEARCH BOX SEARCH YOUTUBE FOR THAT TEXT
function searchYouTube(event) {
  event.preventDefault();
  // CLEAR ANY VIDEOS IN THE RELATED FIELD FROM ANY PRIOR SEARCHES
  relatedVidField.children().remove();
  // GRAB THE TEXT TO SEARCH
  var searchText = $(searchField).val();
  // CALL THE API USING THE API CALL + THE SEARCH TERM + THE API KEY
  fetch(apiCall + searchText + apiKeyCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // USING THE OBJECT GOTTEN FROM THE API SHOW THE MAIN VIDEO
      showMainVideo(data);
    });
}

function showMainVideo(data) {
  // SAVE A VARIABLE WITH ALL OF THE VIDEOS FROM THE OBJECT
  var allVids = data;
  // SAVE A VARIABLE FOR THE MOST POPULAR VIDEO
  var mainVid = data.items[0];
  // GRAB THE ID FOR THE MAINVID
  var videoLink = mainVid.id.videoId;
  // BUILD THE EMBEDING LINK FOR THAT YOUTUBE VIDEO
  var searchLink = "https://www.youtube.com/embed/" + videoLink;
  // CHANGE THE SOURCE OF THE IFRAME IN THE HTML
  mainVidField.attr("src", searchLink);
  // MAKE A TITLE FOR THE MAIN VIDEO USING THE SHOWTITLE FUNCTION
  showTitle(mainVid);
  // SHOW OTHER VIDEOS BY THAT ARTIST USING THE SHOWRELATEDVIDEOS FUNCTION
  showRelatedVideos(allVids);
}

function showTitle(mainVid) {
  // MAKE A HEADER ELEMENT AND SET THE TEXT TO THE TITLE OF THE MAIN VIDEO
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
    vidEl.attr("width", "315");
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

searchBtn.on("click", searchAudioDB);

// USING THE TEXT IN THE SEARCH BOX SEARCH YOUTUBE FOR THAT TEXT
function searchAudioDB(event) {
  event.preventDefault();

  // GRAB THE TEXT TO SEARCH
  var searchText = $(searchField).val();
  // CALL THE API USING THE API CALL + THE SEARCH TERM + THE API KEY
  fetch(audioDBcall + searchText)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var albums = data.album;
      showDisco(albums);
    });
}
var currentArrayitem = 0;

function showDisco(albums) {
  for (i = 1; i < albums.length; i++) {
    var disEl = $("<li>");
    disEl.html(albums[currentArrayitem].strAlbum);
    discolist.append(disEl);
    currentArrayitem += 1;
  }
}
