var apiCall = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=";
var apiKeyCall = "&type=video&key=AIzaSyDhveCUnM4G3fkKp_W1S2YUhGMOkknN-uY";
var searchField = $("#search-field");
var searchBtn = $("#search-button");
var mainVidField = $("#main-video-field");
var relatedVidField = $("#related-videos-field");
var titleField = $("#video-title-field");

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
    console.log(allVids);
    for (i=1; i < allVids.items.length; i++) {
        var videoLink = allVids.items[i].id.videoId;
        var searchLink = "https://www.youtube.com/embed/"+videoLink;
        var vidEl = $("<iframe>");
        vidEl.attr("src", searchLink);
        vidEl.attr("height", "200");
        vidEl.attr("width", "25%-vh");
        relatedVidField.append(vidEl);
    }
};

searchBtn.on("click", searchYouTube); 