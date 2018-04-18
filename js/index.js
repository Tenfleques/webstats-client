let fs = require("fs");
let CONFIG_FILE = "resources/config.json"
let CONFIG = JSON.parse(fs.readFileSync(CONFIG_FILE));
var restAPI = CONFIG["REST"]["url"] + ":" 
                + CONFIG["REST"]["port"];

  if(!restAPI.includes("http"))
    restAPI = "http://" + restAPI;

$(function() {
  //check for REST online
  let getLiveDates = $.get(restAPI+"/live/dates");
  getLiveDates.done(function(data){
      var datesHtml = "";
          data.map(function(dateCount){
              let val = dateCount["key"];
              datesHtml += "<a href='history.html#"
                              +val+"' class='col-12'>";
              datesHtml += val;
              datesHtml += "</a>";
      })
      $(".live-dates").html(datesHtml);
  })
  getLiveDates.fail(function(e){
    return;
  })

  let getInstances = $.get(restAPI+"/instances");
  getInstances.done(function(data){
    var html = "";
    var heading =  "The statistics available"
    if(data.length == 0){
      html = "The server is up but there are no records to show. Go to <a href='history.html'>historical records</a>";
    }      
    else{
      data.storeNames.sort().map(function(val){
        html += "<a href='live.html#"+val+"' class='card p-3 m-1'>";
        html += val;
        html += "</a>";
      })
    }      
    $(".topic-header").html(heading)
    $(".main-view").html(html);
  })
  getInstances.fail(function(e){
    $(".main-view").connectionError();
  });
  
});
