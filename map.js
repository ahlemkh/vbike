const urlbase='http://localhost/project/vbike/table_bike.html';
$('document').ready(function(){
    checkConnection();
    $("#logout").click(function(){
        logout();

    });
    alertSuspendu();
    addmap();
    get_number_client();
    get_number_bike();
    rental();
    bike_statistics();
    suspended();
    get_sale_week();
    get_sale_month();
    table_rental();
    $('#month_input').attr("value",moment(new Date()).format("YYYY-MM"));
    rental_high(moment(new Date()).format("MM"));

    
    $('#month_input').change(function(){
        var da=moment($('#month_input').val()).format("MM");
        rental_high(da);
        
    })      
    
    $('#btn_show').click(function(){
        $('#content_rental_chart').show();
        rental();
    });
    


});


function rental_high(m)
{
   
    $('#container').empty();    
    $.ajax({
       
        url:"rental_time_month_high.php",
        method: "post",
        data: {d:m},
        success:function(dat){
            console.log(dat);
            d=JSON.parse(dat);
            
            var newdata=[];
            var options = { day: 'numeric' };
            for (var i = 0; i < d.length; i++) {
                var t=d[i].day;
                var date = t.replace(/[-]/g, '/');
                date = Date.parse(date);
                var jsDate = new Date(date);
    
                newdata.push({
                    x: jsDate.toLocaleDateString("en-US", options),
                    y: parseInt(d[i].rentals)
                });
            }
            console.log(newdata);
            if(m[0]=='0'){
                m=m[1];
        
            }
            const monthNames = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                                ];
            var options = {
                chart: {
                    renderTo: 'container',
                    type: 'line',
                    zoomType: 'x'
                },
                title: {
                    text: 'Rental statistics By Month'
                  },
                
                  subtitle: {
                    text: monthNames[m-1],
                  },
                
                  xAxis: {
                    categories: [],
                   
                  },
                  yAxis: [{ // left y axis
                    title: {
                      text: null
                    },
                    labels: {
                      align: 'left',
                      x: -7,
                      y: 16,
                      format: '{value:.,0f}'
                    },
                    showFirstLabel: false
                  }
                  ],
               
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -10,
                    y: 100,
                    borderWidth: 0
                },
                series: []
            };
            options.chart.renderTo = 'container';
            var dataSeries = {data: []};
            dataSeries.name="number of rentals";
            newdata.forEach(function (va) {
                options.xAxis.categories.push(va.x);
                dataSeries.data.push(va.y);
            })
            console.log(dataSeries);
            options.series.push(dataSeries);
            chart = new Highcharts.Chart(options)
          
             
          
            
        },
        error: function(){
            alert("connection failed!");
        }});
    
    
    /*$.getJSON( "rental_time_month_high.php", function( d ) {
        var newdata=[];
        var options = { weekday: 'short', month: 'long', day: 'numeric' };
        for (var i = 0; i < d.length; i++) {
            var t=d[i].day;
            var date = t.replace(/[-]/g, '/');
            date = Date.parse(date);
            var jsDate = new Date(date);

            newdata.push({
                x: jsDate.toLocaleDateString("en-US", options),
                y: parseInt(d[i].rentals)
            });
        }
        console.log(newdata);
        var options = {
            chart: {
                renderTo: 'container',
                type: 'line',
                zoomType: 'x'
            },
            title: {
                text: 'Rental statistics'
              },
            
              subtitle: {
                text: 'By Mounth'
              },
            
              xAxis: {
                categories: [],
               
              },
              yAxis: [{ // left y axis
                title: {
                  text: null
                },
                labels: {
                  align: 'left',
                  x: -7,
                  y: 16,
                  format: '{value:.,0f}'
                },
                showFirstLabel: false
              }
              ],
           
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 100,
                borderWidth: 0
            },
            series: []
        };
        options.chart.renderTo = 'container';
        var dataSeries = {data: []};
        dataSeries.name="number of rentals";
        newdata.forEach(function (va) {
            options.xAxis.categories.push(va.x);
            dataSeries.data.push(va.y);
        })
        console.log(dataSeries);
        options.series.push(dataSeries);
        chart = new Highcharts.Chart(options);
    
    })
    */
    /*$.getJSON( "rental_time_month_high.php", function( d ) {
        var newdata=[];
        for (var i = 0; i < d.length; i++) {
            var t=d[i].day;
            var date = t.replace(/[-]/g, '/');
            date = Date.parse(date);
            var jsDate = new Date(date);
            newdata.push({
                x: jsDate,
                y: parseInt(d[i].rentals)
            });
        }
        console.log(newdata);
        Highcharts.chart('container', {

            chart: {
              scrollablePlotArea: {
                minWidth: 700
              }
            },
          
            data: {
                table : newdata
              }
            ,
          
            title: {
              text: 'Rental statistics'
            },
          
            subtitle: {
              text: 'By Time'
            },
          
            xAxis: {
                type: 'datetime',
              tickInterval: 30 * 24 * 3600 * 1000, // one week
              tickWidth: 0,
              gridLineWidth: 1,
              labels: {
                align: 'left',
                x: 3,
                y: -3
              }
            },
          
            yAxis: [{ // left y axis
              title: {
                text: null
              },
              labels: {
                align: 'left',
                x: -7,
                y: 16,
                format: '{value:.,0f}'
              },
              showFirstLabel: false
            }
            ],
          
            legend: {
              align: 'left',
              verticalAlign: 'top',
              borderWidth: 0
            },
          
            tooltip: {
              shared: true,
              crosshairs: true
            },
          
            plotOptions: {
              series: {
                cursor: 'pointer',
                className: 'popup-on-click',
                marker: {
                  lineWidth: 1
                }
              }
            },
          
            series: [{
              name: 'All sessions',
              lineWidth: 4,
              marker: {
                radius: 4
              }
            }, {
              name: 'New users'
            }]
          });
    })*/
    

}
function functionDelete(bike_id){
    $.ajax({
       
        url:"delete_suspended.php",
        method: "post",
        data: {id:bike_id},
        success:function(data){
          
                
            alert(data);
            $("#table_suspended tbody").empty();
            suspended();
            $('#map_container').empty();
            addmap();
            $('#bike_not_available').empty();
            $('#bike_available').empty();
            $('#bike_suspended').empty();
            bike_statistics();
            alertSuspendu();

          
            
        },
        error: function(){
            alert("connection failed!");
        }});

}
function functionAdd(bike_id){
    $.ajax({
       
        url:"add_suspended.php",
        method: "post",
        data: {id:bike_id},
        success:function(data){
          
                
            alert(data);
            $("#table_suspended tbody").empty();
            suspended();
            $('#map_container').empty();
            addmap();
            $('#bike_not_available').empty();
            $('#bike_available').empty();
            $('#bike_suspended').empty();
            bike_statistics();
            alertSuspendu();

          
            
        },
        error: function(){
            alert("connection failed!");
        }});
        
}
function alertSuspendu(){
    $.getJSON("bike_dash.php",function(d){
        $('#div_number_suspendu').html(d.suspendu);
        $('#b_number_suspendu').html(d.suspendu);
        
       
    })
    
}
function suspended(){
    $.getJSON("suspended.php",function(d){
        $.each(d,function(index,r){
            $("#table_suspended tbody").append('<tr><td ><h4>'+r.rental_id+'</h4></td><td><h4>'+r.client_id+'</h4></td><td class="driver-devider"><img class="armada-pic2 zoom" alt=""src="'+r.img_link+'"><h3>'+r.bike_id+'</h3><br><p>'+r.bike_name+'</p></td><td><button type="button" class="btn btn-primary add" data-id="'+r.bike_id+'" onclick="functionAdd('+r.bike_id+')"><span class="entypo-check"></span></button></td><td><button type="button" class="btn btn-primary delete" data-id="'+r.bike_id+'" onclick="functionDelete('+r.bike_id+')"><span class="entypo-trash"></span></button></td></tr>');
            
            $('#table_suspended').footable({
                "paging": { 
                    "size": 4 // set the default page size to 5 rows
                  }
            });
                
            
        })
    })
}
function table_rental(){
    /*$.getJSON("table_rental_dash.php",function(d){
        $.each(d,function(index,r){
            $("#rent_table tbody").append("<tr><td>"+r.rental_id+"</td><td>"+r.client_id+"</td><td>"+r.bike_id+"</td><td style=' width: 1%; white-space: nowrap;'>"+r.start_time+"</td><td>"+r.end_time+"</td><td>"+r.total_price+"</td></tr>");
        })
    })*/
   
        
      
            $('.footable-res').footable({
                "columns": $.get('col.json'),
                "rows": $.getJSON('table_rental_dash.php'),
                "paging": { 
                    "size": 4 // set the default page size to 5 rows
                  }
            });
            
       
    
}
function addmap(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWhsZW1raCIsImEiOiJjbDhsZ2Fwa2QwMzVmM3ZxaDkwZWl6amh3In0.dRzrp6_Biv8v2mJz83ucHA';
    const map = new mapboxgl.Map({
      container: 'map_container', // Container ID
      style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
      center: [0.6179605500496166, 34.85587444537373], // Starting position [lng, lat]
      zoom: 6, // Starting zoom level
      
    });
    addmarker(map);};
function addmarker(map){
        $.getJSON( "table_bike.php", function( data ) {
            //console.log(data);
            $.each( data, function(index,r) {
                var popup = new mapboxgl.Popup({className:"apple-popup"},{offset: 25})
                .setHTML('<div class="text-center" ><img  src="'+r.img_link+'" width="100px" height="80px"></div><br><p class="text-center" margin-top="100px" color:"black">name : '+ r.bike_name+ '<br>price : '+r.price+ '<div><a class="btn btn-default" href="'+urlbase+'#'+r.bike_id+'">Show more</a></div></p>');
                if(r.is_available==0){
                    var marker = new mapboxgl.Marker({color:'#44c662'}) // initialize a new marker
                .setLngLat([r.bike_longitude,r.bike_altitude]) // Marker [lng, lat] coordinates
                .setPopup(popup)
                .addTo(map)
                }
                else if (r.is_available==1){
                    var marker = new mapboxgl.Marker({color:'#c9182b'}) // initialize a new marker
                .setLngLat([r.bike_longitude,r.bike_altitude]) // Marker [lng, lat] coordinates
                .setPopup(popup)
                .addTo(map)

                }
                else{
                    var marker = new mapboxgl.Marker({color:'gray'}) // initialize a new marker
                .setLngLat([r.bike_longitude,r.bike_altitude]) // Marker [lng, lat] coordinates
                .setPopup(popup)
                .addTo(map)

                }
                
            });
        
})}
function bike_statistics(){
    $.getJSON("bike_dash.php",function(d){
        $('#bike_not_available').append("<span><i class='maki-bicycle'></i></span>"+d.rent+"<b>in rent</b>");
        $('#bike_available').append("<span><i class='maki-bicycle'></i></span>"+d.disponible+"<b> available</b>");
        $('#bike_suspended').append("<span><i class='maki-bicycle'></i></span>"+d.suspendu+"<b> suspended</b>");
       
    })
    
}
      
function rental(){
        $.getJSON( "rental.php", function( d ) {
            console.log("first");
            console.log(d);
        for (var i = 0; i < d.length; i++) {
            var t=d[i].day;
            var date = t.replace(/[-]/g, '/');
            date = Date.parse(date);
            var jsDate = new Date(date);
            data.push({
                x: jsDate,
                y: parseInt(d[i].rentals)
            });
        }
        //console.log(data);
    var chart = new CanvasJS.Chart("container_rental", {
        zoomEnabled: true,
        title: {
            text: "Rentals",
            fontSize: 18,
            fontColor: "#9EA7B3",
        },
        axisX: {
            valueFormatString: "MMM YYYY"
        },
        axisY2: {
            title: "number of times to rent",
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        data: [
            {
            type:"line",
            axisYType: "secondary",
            name: "Rentals",
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "$#,###k",
            dataPoints: data
           

        }]
    });
    chart.render();
});
}
function toogleDataSeries(e){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else{
		e.dataSeries.visible = true;
	}
	chart.render();
}

function get_number_bike(){
    $.getJSON( "number_bike.php", function( d ) {
        $('#value_bike').append(d.number+"<b> bikes</b>");
    });

}
function get_sale_week(){

    $.getJSON( "rental_time.php", function( d ) {
        
        $('#value_week').append("<p class='h1' style='margin: 0; position: absolute; top: 50%;left: 50%;transform: translate(-50%, -50%); font-size:25px;'>"+d.week+" $</p><b></b>");
        $('#value_week_percentage').append(d.per_week+"% &#160;From Last Week");
        if(d.per_week>0){
            $('#value_week_percentage i').addClass('fa-caret-up');
            $('#value_week_percentage i').css({color:'green'});
        }
        else{
            $('#value_week_percentage i').addClass('fa-caret-down');
            $('#value_week_percentage i').css({color:'red'});
        }
    });
    

}
function get_sale_month(){
    $.getJSON( "rental_time_month.php", function( d ) {
        $('#value_month').append("<p class='h1' style='margin: 0; position: absolute; top: 50%;left: 50%;transform: translate(-50%, -50%); font-size:25px;'>"+d.month+"  $ </p>"+"<span> </span>");
        $('#value_month_percentage').append(d.per_month+"% &#160;From Last Month");
        if(d.per_month>0){
            $('#value_month_percentage i').addClass('fa-caret-up');
            $('#value_month_percentage i').css({color:'green'});
           
        }
        else{
            $('#value_month_percentage i').addClass('fa-caret-down');
            $('#value_month_percentage i').css({color:'red'});
           
        }
    });
}


function get_number_client(){
    $.getJSON( "number_client.php", function( d ) {
        $('#value_client').append(d.number+"<b> clients</b>");
    });

}
function pie(){
    $.getJSON( "dash.php", function( d ) {
        var cha = new CanvasJS.Chart("chartContainer",
        {
            title: {
                text: "Bike rental depends on gender"
            },
            data: [{
                    type: "pie",
                    startAngle: 45,
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabel: "{label} ({y})",
                    yValueFormatString:"#,##0.#"%"",
                    dataPoints: [
                        { label: "male", y: d.male},
                        { label: "female", y: d.female },
                        
                        
                    ]
            }]
        });
        cha.render();
    });    
    
};
function pie_client(){
    $.getJSON( "dash_client.php", function( d ) {
        var cha = new CanvasJS.Chart("chart_container_client",
        {
            title: {
                text: "number of clients depends on gender"
            },
            data: [{
                    type: "pie",
                    startAngle: 45,
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabel: "{label} ({y})",
                    yValueFormatString:"#,##0.#"%"",
                    dataPoints: [
                        { label: "male", y: d.male},
                        { label: "female", y: d.female },
                        
                        
                    ]
            }]
        });
        cha.render();
    });    
    
};
function age_chart_client(){
    $.getJSON( "chart_age_client.php", function( d ) {
        //console.log(d);
        var chart = new CanvasJS.Chart("age_chart_client", {
            animationEnabled: true,
            title:{
                text: "Age groups of clients",
                horizontalAlign: "left"
            },
            data: [{
                type: "doughnut",
                startAngle: 60,
                //innerRadius: 60,
                indexLabelFontSize: 17,
                indexLabel: "{label} - #percent%",
                toolTipContent: "<b>{label}:</b> {y} (#percent%)",

                dataPoints: d
            }]
        });
        chart.render();
    });
    
}
function age_chart(){
    $.getJSON( "chart_age.php", function( d ) {
        //console.log(d);
        var chart = new CanvasJS.Chart("age_chart", {
            animationEnabled: true,
            title:{
                text: "Bike rental depends on age",
                horizontalAlign: "left"
            },
            data: [{
                type: "doughnut",
                startAngle: 60,
                //innerRadius: 60,
                indexLabelFontSize: 17,
                indexLabel: "{label} - #percent%",
                toolTipContent: "<b>{label}:</b> {y} (#percent%)",

                dataPoints: d
            }]
        });
        chart.render();
    });
}

function column_chart_time_gender(){
    $.getJSON( "column_chart_time.php", function( d ) {
        var male=[];
        for (var i = 0; i < d['male'].length; i++) {
            male.push({
                label: d['male'][i].label,
                y: d['male'][i].y
            });
        }
        var female=[];
        for (var i = 0; i < d['female'].length; i++) {
            female.push({
                label: d['female'][i].label,
                y: d['female'][i].y
            });
        }
        //console.log(female);

        //console.log(d['male']);
        var c = new CanvasJS.Chart("chart_column_time_gender", {
            animationEnabled: true,
            title:{
                text: "Bike rental by day name and gender"
            },
           
            toolTip: {
                shared: true
            },
            legend: {
                reversed: true,
                verticalAlign: "center",
                horizontalAlign: "right"
            },
            data: [{
                type: "stackedColumn",
                name: "female",
                showInLegend: true,
                dataPoints: d['female']
            }, 
            {
                type: "stackedColumn",
                name: "male",
                showInLegend: true,
                dataPoints: d['male']
            }]
        });
        c.render();

    });

}

function column_chart_model(){
    $.getJSON( "column_chart_model.php", function( d ) {
        var chart = new CanvasJS.Chart("chart_column_Container",
        {
            animationEnabled: true,
	
	title:{
		text:"Bike rental depends on model"
	},
	axisX:{
		interval: 1
	},
    axisY2:{
		interlacedColor: "rgba(1,77,101,.2)",
		gridColor: "rgba(1,77,101,.1)",
		title: "number of times to rent"
	},
            data:  [{        
                type: "bar",
		        name: "models",
		        axisYType: "secondary",
		        color: "#014D65",
                dataPoints: d
            }]
        });
        chart.render();
        
        });
    
}
function getGenderPercentage(){
    var r;
    $.getJSON( "dash.php", function( data ) {
    r=data;
    
       
    });
    return r;
}
function logout(){
    $.ajax({
        url:"logout.php",
        method: "post",
        success:function(data){
            if(data=="logout")
            {
                checkConnection();
                
            }
            else{
                alert("Error Try again!");
            }
          
            
        },
        error: function(){
            alert("Error Try again!");
        }

    });
};
function checkConnection(){
        $.ajax({
        url:"check_connection.php",
        method: "post",
        success:function(data){
            if(data=="not connected")
            {
                alert("not connected");
                window.location.replace("http://localhost/project/vbike/sign_up.html");
                
            }
            else{
                $("#admin_con li a:eq(0)").append("Hi, "+data+" <b class='caret'></b>");
                $("#admin_con").show();
            }
          
            
        },
        error: function(){
            alert("Error Try again!");
        }

    });


};