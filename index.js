$('document').ready(function(){
    rental();
    get_sale_week();
    get_sale_month();
    get_number_client();
    get_number_bike();
    column_chart_model();
    column_chart_time_gender()
   
    //checkConnection();
    /*$("#logout").click(function(){
        logout();

    });
    */


});
function rental(){
        $.getJSON( "rental.php", function( d ) {
            console.log("first");
        var data=[];
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
        console.log(data);
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
        $('#value_week_per').append("<p class='h1' style='margin: 0; position: absolute; top: 50%;left: 50%;transform: translate(-50%, -50%); font-size:25px;'> "+d.per_week+" %<i class='fa  fa-lg' aria-hidden='true' id='icon_per_week'></i></p><b></b>");
        $('#value_week_percentage').append(d.per_week+"% &#160;From Last Week");
        if(d.per_week>0){
            $('#value_week_percentage i').addClass('fa-caret-up');
            $('#value_week_percentage i').css({color:'green'});
            $('#icon_per_week').addClass('fa-arrow-up');
            $('#icon_per_week').css({color:'green'});
        }
        else{
            $('#value_week_percentage i').addClass('fa-caret-down');
            $('#value_week_percentage i').css({color:'red'});
            $('#icon_per_week').addClass('fa fa-arrow-down'); 
            $('#icon_per_week').css({color:'red'})
        }
    });
    

}
function get_sale_month(){
    $.getJSON( "rental_time_month.php", function( d ) {
        $('#value_month').append("<p class='h1' style='margin: 0; position: absolute; top: 50%;left: 50%;transform: translate(-50%, -50%); font-size:25px;'>"+d.month+"  $ </p>"+"<span> </span>");
        $('#value_month_per').append("<p class='h1' style='margin: 0; position: absolute; top: 50%;left: 50%;transform: translate(-50%, -50%); font-size:25px;'> "+d.per_month+"  %<i class='fa  ' aria-hidden='true' id='icon_per_month'></i></p><b></b>");
        $('#value_month_percentage').append(d.per_month+"% &#160;From Last Month");
        if(d.per_month>0){
            $('#value_month_percentage i').addClass('fa-caret-up');
            $('#value_month_percentage i').css({color:'green'});
            $('#icon_per_month').addClass('fa-arrow-up');
            $('#icon_per_month').css({color:'green'});
        }
        else{
            $('#value_month_percentage i').addClass('fa-caret-down');
            $('#value_month_percentage i').css({color:'red'});
            $('#icon_per_month').addClass('fa fa-arrow-down');
            $('#icon_per_month').css({color:'red'});
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
        console.log(d);
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
        console.log(d);
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
        console.log(female);

        console.log(d['male']);
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