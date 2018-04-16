let fs = require("fs");
let CONFIG_FILE = "resources/config.json"
let CONFIG = JSON.parse(fs.readFileSync(CONFIG_FILE));
var restAPI = CONFIG["REST"]["url"] + ":" 
                + CONFIG["REST"]["port"];

    if(!restAPI.includes("http"))
        restAPI = "http://" + restAPI;

$(function(){
    let regime = window.location.hash;
    if(regime.length){
        regime = regime.replace("#",'');
        $("#singledate").val(regime);
    }

    

    let getHistoryTopics = $.get(restAPI+"/archive/stores");

    getHistoryTopics.done(function(data){
        var topicsHtml = "";
        var active = "active"
        data.sort(reverseSort).map(function(val){
            topicsHtml += "<a id='"+val+"' class='"+active+" card m-1 p-1 text-center filter-stat'>";
            topicsHtml += val;
            topicsHtml += "</a>";
            active = "";
        });
        $(".historical-topics")
            .html(topicsHtml)
            .on("click",".filter-stat",function(){
                $(".historical-topics > a.filter-stat").removeClass("active");
                $(this).addClass("active");
                loadView($(this).attr("id"));
            })
        loadView()
    });
    getHistoryTopics.fail(function(e){
        console.log(e);
    });
    function loadView(){
        let store = (arguments[0])? arguments[0] : $(".historical-topics > a.filter-stat.active").attr("id");
        
        let startdate = $("#startdate").datepicker('getDate',true);
        let enddate = $("#enddate").datepicker('getDate',true);
        var queryUrl = restAPI + "/archive/" + store + "/";
        if(startdate == enddate)
            queryUrl += startdate
        else
            queryUrl += startdate + "/" + enddate;        
        
        chartDiv(store,queryUrl);
        console.log(queryUrl);
    }

    function chartDiv(){
        //arguments[] // 0, storename arguments[1] full_url
        var html = "";
        let storename = arguments[0];
        html += "<div class='content-x charts' id='"+storename+"'>"
        html += "</div>";
        $(".container-x").html(html);
        
        var getStoreData = $.get(arguments[1]);
        getStoreData.done(function(serverData){
            var data = [];
            serverData.map(function(val){
                data.push(Array(val.key, val.value));
            })
            $.plot(".container-x > #"+storename, [data], {
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


    //configure datepickers 
    $('[data-toggle="datepicker"]').datepicker({
        format:"yyyy-mm-dd",
        autoPick : true
    }).on('pick.datepicker', function (e) {
        if(($(e.currentTarget).attr("id") == "enddate"
            && e.date < $("#startdate").datepicker('getDate')) 
        || e.date > new Date()
        || ($(e.currentTarget).attr("id") == "startdate"
            && e.date > $("#enddate").datepicker('getDate'))){
                e.preventDefault();
            }

      });
})