$('document').ready(function(){
    checkConnection();
    $("#logout").click(function(){
        logout();

    });
    pie();
    pie_client();
    age_chart_client();
    age_chart();
    add_client();
    column_chart_time_gender();
})

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

function pie(){
    $.getJSON( "dash.php", function( d ) {
        var cha = new CanvasJS.Chart("chartContainer",
        {
            title: {
                text: "Bike rental depends on gender",
                fontSize : 20,
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
                text: "number of clients depends on gender",
                fontSize : 20,
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
                horizontalAlign: "left",
                fontSize : 20,
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
                horizontalAlign: "left",
                fontSize: 20,
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

function add_client(){
    $('#client_table').footable({
        "columns": $.get('col_client.json'),
        "rows": $.getJSON('table_client.php'),
        "paging": { 
            "size": 3 // set the default page size to 5 rows
          }
    });
    
}
function create_row (item) {
    var row =('<tr id="'+item.client_id+'"><td hidden>' + item.client_id + '</td><td>' + item.client_first_name + '</td><td>' + item.client_last_name + '</td><td>' + item.client_email + '</td><td>'+item.client_birthdate+'</td><td>' + item.age+ '</td><td>' +item.client_gender+'</td><td>'+item.number+ '</td><td>' + item.total + '</td></tr>');
     return row;
       
};
