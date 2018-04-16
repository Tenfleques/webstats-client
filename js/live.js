let fs = require("fs");
let CONFIG_FILE = "resources/config.json"
let CONFIG = JSON.parse(fs.readFileSync(CONFIG_FILE));
var restAPI = CONFIG["REST"]["url"] + ":" 
                + CONFIG["REST"]["port"];

if(!restAPI.includes("http"))
    restAPI = "http://" + restAPI;
var refreshRate = Number(CONFIG["REST"]["refreshrate"])*1000;
$(function() {
  //check for REST online
  //get dates involved in the live feed
  $("#refresh-rate").val(refreshRate/1000).on("change",function(){
        refreshRate =  $(this).val() * 1000;
  })
    let getLiveDates = $.get(restAPI+"/live/dates");
    getLiveDates.done(function(data){
        var datesHtml = "";
            data.map(function(dateCount){
                let val = dateCount["key"];
                datesHtml += "<a href='history.html#"
                                +val+"' class='card col-12'>";
                datesHtml += val;
                datesHtml += "</a>";
        })
        $(".live-dates").html(datesHtml);
    })
    getLiveDates.fail(function(e){
        console.log("error occured getiing dates")
    })

    let regime = window.location.hash;
    if(regime.length)
        regime = regime.replace("#",'');
    
    let getInstances = $.get(restAPI+ "/instances"); //get list of instances 
    var topicsHtml = "";  
    getInstances.done(function(data){
        var html = "";
        if(data.length == 0){
            html = "The server is up but there are no records to show. Go to <a href='history.html'> historical records</a>";
            $(".main-view").addClass("card-columns").html(html)
        }      
        else{
            var active = "active"
            data.storeNames.sort(reverseSort).map(function(val){
                if(regime.length == 0) {
                    topicsHtml += "<a id='"+val+"' class='"+active+" card m-1 p-1 text-center filter-stat'>";
                    active = "";
                }else{
                    if(regime == val){
                        topicsHtml += "<a id='"+val+"' class='"+active+" card m-1 p-1 text-center filter-stat'>";
                    active = "";
                    }else{
                        topicsHtml += "<a id='"+val+"' class='card m-1 p-1 text-center filter-stat'>";
                    }
                }
                topicsHtml += val;
                topicsHtml += "</a>";
            }); 
            
            $(".live-topics")
            .html(topicsHtml)
            .on("click",".filter-stat",function(){
                $(".live-topics > a.filter-stat").removeClass("active");
                $(this).addClass("active");
                loadView($(this).attr("id"));
            })  
            loadView();           
            
        }          
    })
    getInstances.fail(function(e){
        exceptionHandler(e);
    });
    

   let timer
    function loadView(){
        let store = (arguments[0])? arguments[0] : $(".live-topics > a.filter-stat.active").attr("id");
        var queryUrl = restAPI + "/live/" + store + "/all";        
        if(timer)
            clearInterval(timer);
        drawChart(queryUrl);
        timer = setInterval(function tick(){
            drawChart(queryUrl);
        },refreshRate)
    }
    function drawChart(queryUrl){
        var getStoreData = $.get(queryUrl);
        getStoreData.done(function(serverData){
            var data = [];
            serverData.map(function(val){
                data.push(Array(val.key, val.value));
            })           
            
            $.plot(".container-x", [data], {
                series: {
                    bars: {
                        show: true,
                        barWidth: 0.6,
                        align: "center"
                    }
                },
                xaxis: {
                    mode: "categories",
                    tickLength: 0
                }
            });
        })
        getStoreData.fail(function(e){
            console.log(e);
        })
    }
});
