var longPrecedent;
var latPrecedent;
const url='http://localhost/project/vbike/table_bike.html#test1';
const urlbase='http://localhost/project/vbike/table_bike.html';


$('document').ready(function(){
    includeHTML();
    
    checkConnection();
    $("#logout").click(function(){
        logout();

    });
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWhsZW1raCIsImEiOiJjbDhsZ2Fwa2QwMzVmM3ZxaDkwZWl6amh3In0.dRzrp6_Biv8v2mJz83ucHA';
        const map = new mapboxgl.Map({
          container: 'test1', // Container ID
          style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
          center: [0.6179605500496166, 34.85587444537373], // Starting position [lng, lat]
          zoom: 6, // Starting zoom level
          
        });
    
   

    $.getJSON( "table_bike.php", function( data ) {
        console.log(data);
        
        $.each( data, function(index,r) {
            var row = create_row(r,map);
            
            $('#footable-rese tbody').append(row);
            addmarker(map,r);
            
        });
        $(function() {
            $('#footable-rese').footable();
            $('#footable-rese').removeClass('footable');

        });
        $("#footable-rese tr").click(function() {
            if(longPrecedent!= null && latPrecedent!= null)
            {
                addStandardMarker(map,longPrecedent,latPrecedent);
            }
            var lo=$(this).children("td:eq(7)").html();
            var la=$(this).children("td:eq(6)").html();
            addColorMarker(map,$(this));
            longPrecedent=$(this).children("td:eq(7)").html();
            latPrecedent=$(this).children("td:eq(6)").html();
            window.location = url;
         });
        
       
       
       
      });
      
     
      $("#btn_chart").click(function(){
        $("#content_rental_chart").show();
        column_chart_model();
      })


      $("#add_bike_form").submit(function(event) {
        
            event.stopImmediatePropagation()
            event.preventDefault();
            
        $.ajax({
            url: "update_bike.php",
            type: "post",
            data: $(this).serialize(),

            error   : function () {
            alert('try again');
            },
            success : function (data) {
                alert(data);
                
            }
        });
       

        
        
        
    });
      
      
    });

    function includeHTML() {
        var z, i, elmnt, file, xhttp;
        /* Loop through a collection of all HTML elements: */
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
          elmnt = z[i];
          /*search for elements with a certain atrribute:*/
          file = elmnt.getAttribute("w3-include-html");
          if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4) {
                if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                /* Remove the attribute, and call this function once more: */
                elmnt.removeAttribute("w3-include-html");
                includeHTML();
              }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
          }
        }
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

function functionupdate(){
    $("#bike_form").css({display:'block'});
}
function closeForm(){
    location.reload();
}

function functionessai(bike_id)
{
   
    
    $(".form-popup").toggle();
    
    $("#bike_id").val(bike_id);  
    $.ajax({
       
        url:"bike.php",
        method: "post",
        data: {id:bike_id},
        success:function(r){
            
            data=JSON.parse(r);
            
            addmap(data.bike_longitude,data.bike_altitude); 
            
            $("#bike_name").val(data.bike_name);
            $("#bike_model").val(data.bike_model);
            $("#matricule").val(data.matricule);
            
            $("#price").val(data.price);
            
            $("#longitude").val(data.bike_longitude);
            
            $("#latitude").val(data.bike_altitude);
            
           
           
            
            
           
            
            
           
        },
        error: function(){
            alert("connection failed!");
        }});
}
function create_row (item,map) {
    var status=item.is_available;
    var total=item.total;
    console.log(status);
    if(status=='1'){
        if(total){
            var row = $('<tr  id="id'+item.bike_id+'"><td hidden>' + item.bike_id + '</td><td>' + item.bike_name + '</td><td>' + item.bike_model + '</td><td>' + item.matricule + '</td><td  data-value='+item.img_link+'><img class="zoom" src="'+item.img_link+'" width="100px" height="80px"></td><td>' + item.price + '</td><td>' + item.bike_altitude+ '</td><td>' + item.bike_longitude + '</td><td data-value="1"><span class="status-metro status-suspended" title="Active">Available</span></td><td>' + item.total + '</td><td><button type="button" class="btn btn-default btnZ" id="'+item.bike_id+'" onclick="functionessai('+item.bike_id+')"><span class="entypo-pencil"></span>&nbsp;&nbsp;Edit</button></td></tr>'); 
            return row;
        }
        else{
            var row = $('<tr id="id'+item.bike_id+'"><td hidden>' + item.bike_id + '</td><td>' + item.bike_name + '</td><td>' + item.bike_model + '</td><td>' + item.matricule + '</td><td  data-value='+item.img_link+'><img class="zoom" src="'+item.img_link+'" width="100px" height="80px"></td><td>' + item.price + '</td><td>' + item.bike_altitude+ '</td><td>' + item.bike_longitude + '</td><td data-value="1"><span class="status-metro status-suspended" title="Active">Available</span></td><td>' + 0 + '</td><td><button type="button" class="btn btn-default btnZ" id="'+item.bike_id+'" onclick="functionessai('+item.bike_id+')"><span class="entypo-pencil"></span>&nbsp;&nbsp;Edit</button></td></tr>');
            return row;
        }
       }
    if(status =='0'){
        if(total){
            var row = $('<tr id="id'+item.bike_id+'"><td hidden>' + item.bike_id + '</td><td>' + item.bike_name + '</td><td>' + item.bike_model + '</td><td>' + item.matricule + '</td><td  data-value='+item.img_link+'><img class="zoom" src="'+item.img_link+'" width="100px" height="80px"></td><td>' + item.price + '</td><td>' + item.bike_altitude+ '</td><td>' + item.bike_longitude + '</td><td data-value="1"><span class="status-metro status-active" title="Disabled">In rent</span></td><td>' + item.total + '</td><td><button type="button" class="btn btn-default btnZ" id="'+item.bike_id+'" onclick="functionessai('+item.bike_id+')"><span class="entypo-pencil"></span>&nbsp;&nbsp;Edit</button></td></tr>');
            return row;
        }
        else{
            var row = $('<tr id="id'+item.bike_id+'"><td hidden>' + item.bike_id + '</td><td>' + item.bike_name + '</td><td>' + item.bike_model + '</td><td>' + item.matricule + '</td><td  data-value='+item.img_link+'><img class="zoom" src="'+item.img_link+'" width="100px" height="80px"></td><td>' + item.price + '</td><td>' + item.bike_altitude+ '</td><td>' + item.bike_longitude + '</td><td data-value="2"><span class="status-metro status-active" title="Disabled">In rent</span></td><td>' + 0 + '</td><td><button type="button" class="btn btn-default btnZ" id="'+item.bike_id+'" onclick="functionessai('+item.bike_id+')"><span class="entypo-pencil"></span>&nbsp;&nbsp;Edit</button></td></tr>');
            return row;
        }
        
        }
        if(status =='2'){
            if(total){
                var row = $('<tr id="id'+item.bike_id+'"><td hidden>' + item.bike_id + '</td><td>' + item.bike_name + '</td><td>' + item.bike_model + '</td><td>' + item.matricule + '</td><td  data-value='+item.img_link+'><img class="zoom" src="'+item.img_link+'" width="100px" height="80px"></td><td>' + item.price + '</td><td>' + item.bike_altitude+ '</td><td>' + item.bike_longitude + '</td><td data-value="1"><span class="status-metro status-disabled" title="Disabled">Suspended</span></td><td>' + item.total + '</td><td><button type="button" class="btn btn-default btnZ" id="'+item.bike_id+'" onclick="functionessai('+item.bike_id+')"><span class="entypo-pencil"></span>&nbsp;&nbsp;Edit</button></td></tr>');
                return row;
            }
            else{
                var row = $('<tr id="id'+item.bike_id+'"><td hidden>' + item.bike_id + '</td><td>' + item.bike_name + '</td><td>' + item.bike_model + '</td><td>' + item.matricule + '</td><td  data-value='+item.img_link+'><img class="zoom" src="'+item.img_link+'" width="100px" height="80px"></td><td>' + item.price + '</td><td>' + item.bike_altitude+ '</td><td>' + item.bike_longitude + '</td><td data-value="2"><span class="status-metro status-disabled" title="Disabled">Suspended</span></td><td>' + 0 + '</td><td><button type="button" class="btn btn-default btnZ" id="'+item.bike_id+'" onclick="functionessai('+item.bike_id+')"><span class="entypo-pencil"></span>&nbsp;&nbsp;Edit</button></td></tr>');
                return row;
            }
            
            }


    };

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
   
function addmarker(map,r){
    var popup = new mapboxgl.Popup({className:"apple-popup"},{offset: 25})
    .setHTML('<div class="text-center" ><img  src="'+r.img_link+'" width="100px" height="80px"></div><br><p class="text-center" margin-top="100px" color:"black">name : '+ r.bike_name+ '<br>price : '+r.price+ '<div><a class="btn btn-default" href="'+urlbase+'#id'+r.bike_id+'">Show more</a></div></p>');
    var marker = new mapboxgl.Marker() // initialize a new marker
    .setLngLat([r.bike_longitude,r.bike_altitude]) // Marker [lng, lat] coordinates
    .setPopup(popup)
    .addTo(map)};
    function addStandardMarker(map,long,lat) { 
        var marker = new mapboxgl.Marker() // initialize a new marker
        .setLngLat([long,lat]) // Marker [lng, lat] coordinates
        .addTo(map);


     
    
    };
function addColorMarker(map,tr) {
   
    var popup = new mapboxgl.Popup({offset: 25})
    .setHTML('<p class="text-center">name : '+tr.children("td:eq(1)").html()+ '<br>price : '+tr.children("td:eq(5)").html()+ ' $<br>'+tr.children("td:eq(4)").html()+'<div><a class="btn btn-info" href="id'+urlbase+'#'+tr.children("td:eq(0)").html()+'">Show more</a><div></p>');
    var marker = new mapboxgl.Marker({color:'red'}) // initialize a new marker
    .setLngLat([tr.children("td:eq(7)").html(),tr.children("td:eq(6)").html()]) // Marker [lng, lat] coordinates
    .setPopup(popup)
    .addTo(map)};
   



   


   


    




/*
$("#footable-rese tr td button").click(function() {
            id_tr=$("#footable-rese tr").children("td:eq(10)").html();
            alert(id_tr);
            tr=$('#id'+id_tr);
            if(longPrecedent!= null && latPrecedent!= null)
            {
                addStandardMarker(map,longPrecedent,latPrecedent);
            }
            var lo=tr.children("td:eq(7)").html();
            var la=tr.children("td:eq(6)").html();
            addColorMarker(map,tr);
            longPrecedent=tr.children("td:eq(7)").html();
            latPrecedent=tr.children("td:eq(6)").html();
            window.location = url;
         });
function functionlocation(id,map2){
    alert("hhhhh");
   if(longPrecedent!= null && latPrecedent!= null)
            {
                addStandardMarker(map2,longPrecedent,latPrecedent);
            }
            tr=$('#id'+id);
            addColorMarker(map2,tr);
            longPrecedent=tr.children("td:eq(6)").html();
            latPrecedent=tr.children("td:eq(7)").html();
            window.location = url;
         

}
function functionlocation(id,map2){
    alert("hhhhh");
   if(longPrecedent!= null && latPrecedent!= null)
            {
                addStandardMarker(map2,longPrecedent,latPrecedent);
            }
            tr=$('#id'+id);
            addColorMarker(map2,tr);
            longPrecedent=tr.children("td:eq(6)").html();
            latPrecedent=tr.children("td:eq(7)").html();
            window.location = url;
         

}
 function addmap(lng,lat){
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWhsZW1raCIsImEiOiJjbDhsZ2Fwa2QwMzVmM3ZxaDkwZWl6amh3In0.dRzrp6_Biv8v2mJz83ucHA';
        const mapp = new mapboxgl.Map({
          container: 'test2', // Container ID
          style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
          center: [lng,lat], // Starting position [lng, lat]
          zoom: 6, // Starting zoom level
          
        });
        const marker = new mapboxgl.Marker() // initialize a new marker
      .setLngLat([lng, lat]) // Marker [lng, lat] coordinates
      .addTo(mapp);
      const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      placeholder: 'Search for places in Algeria',
      marker: false,
      bbox: [-8.667992,18.956237,11.994246,37.1692786], // Boundary for Algeria
      proximity: {
        longitude: -0.6337376,
        latitude: 35.6976541
      }, // Coordinates of oran
      language:"fr",
      types: 'country,region,district,place,postcode,locality,neighborhood,poi,address'
     //Type:("poi","country" , "region" , "prefecture" , "postcode" , "district" , "place" , "city" , "locality" , "oaza" ,
      //"neighborhood" , "chome" , "block" , "street" , "address")
    
    });
    
    // Add the geocoder to the map
    mapp.addControl(geocoder);
    // After the map style has loaded on the page,
    // add a source layer and default styling for a single point
    mapp.on('load', () => {
        mapp.addSource('single-point', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': []
        }
        });
         
        mapp.addLayer({
        'id': 'point',
        'source': 'single-point',
        'type': 'circle',
        'paint': {
        'circle-radius': 10,
        'circle-color': '#448ee4'
        }
        });
        var output = document.getElementById('output');
         
        // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
        //  Add a marker at the result's coordinates
        geocoder.on('result', (event) => {
            
            mapp.getSource('single-point').setData(event.result.geometry);
            $("form #longitude").val(event.result.center[0]);
            $("form #latitude").val(event.result.center[1]);
            console.log( $("form #latitude").val());
        
        });
        });
    
    
    
    }

 function addColorMarker2(map,r) {
        var popup = new mapboxgl.Popup({className:"apple-popup"},{offset: 25})
    .setHTML('<div class="text-center" ><img  src="'+r.img_link+'" width="100px" height="80px"></div><br><p class="text-center" margin-top="100px" color:"black">name : '+ r.bike_name+ '<br>price : '+r.price+ '<div><a class="btn btn-default" href="'+urlbase+'#id'+r.bike_id+'">Show more</a></div></p>');
    var marker = new mapboxgl.Marker({color:'green'}) // initialize a new marker
    .setLngLat([r.bike_longitude,r.bike_altitude]) // Marker [lng, lat] coordinates
    .setPopup(popup)
    .addTo(map);};

 function update_table(){
        $.getJSON( "table_bike.php", function( data ) {
            $('#footable-rese tbody').empty();
            $('#test1').empty();
            mapboxgl.accessToken = 'pk.eyJ1IjoiYWhsZW1raCIsImEiOiJjbDhsZ2Fwa2QwMzVmM3ZxaDkwZWl6amh3In0.dRzrp6_Biv8v2mJz83ucHA';
        const map2 = new mapboxgl.Map({
          container: 'test1', // Container ID
          style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
          center: [0.6179605500496166, 34.85587444537373], // Starting position [lng, lat]
          zoom: 6, // Starting zoom level
          
        });
            
           
            $.each( data, function(index,r) {
                var row = create_row(r,map2);
                
                $('#footable-rese tbody').append(row);
                addmarker(map2,r);
                
            });
           
            $("#footable-rese tr").click(function() {
                if(longPrecedent!= null && latPrecedent!= null)
                {
                    addStandardMarker(map2,longPrecedent,latPrecedent);
                }
                var lo=$(this).children("td:eq(7)").html();
                var la=$(this).children("td:eq(6)").html();
                addColorMarker(map2,$(this));
                longPrecedent=$(this).children("td:eq(7)").html();
                latPrecedent=$(this).children("td:eq(6)").html();
                window.location = url;
             });
        
        })
    }
 <thead>
                                        <tr>
                                            <th>
                                               id
                                            </th>
                                            <th>
                                                Bike Name
                                            </th>
                                            <th>
                                                Bike Model
                                            </th>
                                            <th >
                                                price
                                            </th>
                                            <th>
                                                image
                                            </th>
                                            <th>
                                                lat
                                            </th>
                                            <th>
                                               lon
                                            </th>
                                            <th >
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                       
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="50">
                                                <div class="pagination pagination-centered"></div>
                                            </td>
                                        </tr>
                                    </tfoot>


function bike(){
    $.ajax({
        url:"table_bike.php",
        method: "post",
        success:function(data){
            var fs = require('fs');
            fs.writeFile('row.json', data, 'utf8', callback);  
            
          },
        error: function(){
            alert("Form submission failed!");
            
        }

    });


}*/