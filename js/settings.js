let fs = require("fs");
let CONFIG_PATH = "resources/config.json"
let DEFAULT_CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH));
$(function(){
    $(".form-control").map(function(index,val){
        let nm = $(val).attr("name");
        $(val).val(DEFAULT_CONFIG["REST"][nm]);
    })
    $("body").on("submit",".settings-form",function(e){
        e.preventDefault();
        var i = 0;
        var config = "{";
        $(this).find(".form-control").map(function(index,val){
            var nm = $(val).attr("name");
            let value = $(val).val();
            if(i != 0)  
                    config += ",";
            if(value.length){                
                config += "\"" + nm + "\":\"" + value + "\"" ;
            }else{
                config += "\"" + nm + "\":\"" + DEFAULT_CONFIG["REST"][nm] + "\"" ;
            }
            i++;
        })
        config += "}";
        DEFAULT_CONFIG["REST"] = JSON.parse(config);
        fs.writeFileSync(CONFIG_PATH,JSON.stringify(DEFAULT_CONFIG));
        $(".btn-primary").addClass("btn-success").attr("disabled",true);
    })
})