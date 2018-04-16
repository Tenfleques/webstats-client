$(function() {
    //let URL = "http://localhost:7070/stats/hits/all";
    let updateInterval = 1000;
    //let liveChartDiv = "#live-chart";

    //liveSingleStat("http://localhost:7070/stats/referer-sales/all","#live-chart");
    

    function processBarChart(data,chartDiv){        
        $.plot(chartDiv, data, {
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
    }
    function liveSingleStat(URL,chartDiv) {
        var getServerInstances = $.get(URL);
        getServerInstances.done(function(serverData){
            var data = [];
            serverData.map(function(val){
                data.push(Array(val.key, val.value));
            })
            processBarChart([data],chartDiv);
            setTimeout(liveSingleStat, updateInterval);
        })
        getServerInstances.fail(exceptionHandler)        
    }
});