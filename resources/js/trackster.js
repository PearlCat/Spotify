$(document).ready(function(){

  var Trackster = {};

  $('#search-btn').click(function(){
  Trackster.searchTracksByTitle($("input").val());
  });

  $('#search-str').on("keydown", function(event){
    if (event.which===13) {
      Trackster.searchTracksByTitle($("input").val());
    }
  });

  Trackster.searchTracksByTitle = function(title){
  $.ajax({
    url: "https://api.spotify.com/v1/search?type=track&q=" + title,
    success: function(response){
      Trackster.renderTracks(response.tracks.items);
      }
    });
  };

  Trackster.renderTracks = function(tracks){
    var $trackList = $("#track-list");
    $trackList.empty();
    for (var i = 0; i < tracks.length; i++){
      var track = tracks[i];
      var rowHTML = '<div class="row track">' +
                    '<div class="col-xs-1">' +
                    '<a href="' + track.preview_url + '" target="_blank">' +
                    '<span><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i></span></a>' + '</div>' +
                    '<div class="col-xs-4">' + track.name + '</div>' +
                    '<div class="col-xs-2">' + track.artists[0].name + '</div>' +
                    '<div class="col-xs-2">' + track.album.name + '</div>' +
                    '<div class="col-xs-1" id="popularity">' + track.popularity + '  </div>' +
                    '<div class="col-xs-1" id="play-time">' + ((track.duration_ms)/60000).toPrecision(3) + '</div>' +
                    '</div>';
                    $("#track-list").append(rowHTML);
                    }
  };

});
