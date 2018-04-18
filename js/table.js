$(function(){
    var $table = $('#table');
	var columns = [
		  [ {
			 "field": "dates",
			 "id": "dates",
			"title": "date",
			"colspan": 1,
			"rowspan": 1
          }/*,{
			"field": "work",
			"id": "work",
			"title": "ПРОДОЛЖИТЕЛЬНОСТЬ (ч)",
			"colspan": 3,
			"rowspan": 1
		  },{
			 "field": "odometer",
			 "id": "odometer",
			"title": "ПРОБЕГ(км)"
		  },{
			 "field": "speed",
			 "id": "speed",
			"title": "СКОРОСТЬ(км/ч)"
		  },
		  {
			 "field": "spraying",
			 "id": "spraying",
			"title": "ОПРЫСКИВАНИЕ",
			"colspan": 7,
			"rowspan": 1
		  },
		  {
			 "field": "resume",
			 "id": "resume",
			"title": "ЭФФЕКТИВНОСТЬ(%)",
			"colspan": 2,
			"rowspan": 1
		  }*/		  
		], 
		[
            /*{
			"field": "start_date",
			"id": "dates.start_date",
			"title": "Начало",
			"sortable":"true",
			"sorter":"dateSorter",
			"colspan": 1,
			"rowspan": 1
		  }, {
			"field": "end_date",
			"id": "dates.end_date",
			"title": "Конец",
			"colspan": 1,
			"rowspan": 1
		  },
		  {
			"field": "totalTime",
			"id": "work.totalTime",
			"title": "Общая",
			"colspan": 1,
			"rowspan": 1
		  }, {
			"field": "parkTimeTotal",
			"id": "work.parkTimeTotal",
			"title": "Стоянки",
			"colspan": 1,
			"rowspan": 1
		  }, {
			"field": "travelTimeTotal",
			"id": "work.traveTimeTotal",
			"title": "Движения",
			"colspan": 1,
			"rowspan": 1
		  },
		  {
			"field": "odometer",
			"id": "odometer.odometer",
			"title": "Пробег",
			"colspan": 1,
			"rowspan": 1
		  }, {
			"field": "averageSpeed",
			"id": "averageSpeed.averageSpeed",
			"title": "Средняя рабочая",
			"colspan": 1,
			"rowspan": 1
		  }, {
			"field": "workTotalTravelTime",
			"id": "spraying.time",
			"title": "Общее время(ч)",
			"colspan": 1,
			"rowspan": 1
		  }, {
			"field": "workTotalDistance",
			"id": "spraying.odometer",
			"title": "Пробег(км)",
			"colspan": 1,
			"rowspan": 1
		  }, {
			"field": "workTotalArea",
			"id": "spraying.hectrage",
			"title": "Общ. кол. обраб. га",
			"colspan": 1,
			"rowspan": 1
		  }, {
			"field": "workTotalVolume",
			"id": "spraying.volume",
			"title": "Общ. лит. опрыс.(кЛ)",
			"colspan": 1,
			"rowspan": 1
		  }, {
			"field": "fillingFrequency",
			"id": "spraying.fillingFrequency",
			"title": "ЧЗ",
			"colspan": 1,
			"rowspan": 1
		  }, {
			"field": "liquidFilling",
			"id": "spraying.liquidFilling",
			"title": "Запр.(кЛ)",
			"colspan": 1,
			"rowspan": 1
		  }, {
			"field": "liquidBalance",
			"id": "spraying.liquidBalance",
			"title": "Ост. в баке(Л)",
			"colspan": 1,
			"rowspan": 1
		  }, {
			"field": "timeEfficiency",
			"id": "resume.time",
			"title": "По времени",
			"colspan": 1,
			"rowspan": 1
		  }, {
			"field": "workEfficiency",
			"id": "resume.work",
			"title": "По работе",
			"colspan": 1,
			"rowspan": 1
		  }*/
        ]
    ];
    var tdata = [];
    $('#toolbar').find('select').change(function () {
        $table.bootstrapTable('refreshOptions', {
        exportDataType: $(this).val()
        });
    });
    $table.bootstrapTable({
        data: tdata,
        columns: columns
    });
    $table.removeClass('hidden');
    $table.show();
    $("#jumpControlTableTotals").attr({
           "max" : tdata.length,
           "value" : Math.floor(tdata.length/2)
      });
      $(".mybtn-top").click(function () {
          $table.bootstrapTable('scrollTo', 0);
      });
      
      $(".mybtn-row").click(function () {
          var index = +$('.row-index').val(),
              top = 0;
          $table.find('tbody tr').each(function (i) {
              if (i < index) {
                  top += $(this).height();
              }
          });
          $table.bootstrapTable('scrollTo', top);
      });    
});