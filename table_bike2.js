var longPrecedent;
var latPrecedent;
const url='http://localhost/project/vbike/table_bike.html#test1';
const urlbase='http://localhost/project/vbike/table_bike.html';


$('document').ready(function(){
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
        });;
        
        
        $("#footable-rese tr button:eq(0)").click(function() {
            id_tr=$('this').attr('id');
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
       /* $("#footable-rese tr").click(function() {
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
         });*/
       
       
      });
      
      
      
    });

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
    $("#bike_form").css({display:'none'});
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
function create_row (item,map) {
    var status=item.is_available;
    var total=item.total;
    console.log(status);
    if(status=='1'){
        if(total){
            var row = $('<tr  id="id'+item.bike_id+'"><td hidden>' + item.bike_id + '</td><td>' + item.bike_name + '</td><td>' + item.bike_model + '</td><td>' + item.matricule + '</td><td  data-value='+item.img_link+'><img class="zoom" src="'+item.img_link+'" width="100px" height="80px"></td><td>' + item.price + '</td><td>' + item.bike_altitude+ '</td><td>' + item.bike_longitude + '</td><td data-value="1"><span class="status-metro status-suspended" title="Active">Available</span></td><td>' + item.total + '</td><td><button class="btn btn_location" id='+item.bike_id+'>Location</button></td><td><button class="btn" onclick="functionupdate()">update</button></td><td><button class="btn" onclick="functiondelete()">delete</button></td></tr>'); 
            return row;
        }
        else{
            var row = $('<tr id="id'+item.bike_id+'"><td hidden>' + item.bike_id + '</td><td>' + item.bike_name + '</td><td>' + item.bike_model + '</td><td>' + item.matricule + '</td><td  data-value='+item.img_link+'><img class="zoom" src="'+item.img_link+'" width="100px" height="80px"></td><td>' + item.price + '</td><td>' + item.bike_altitude+ '</td><td>' + item.bike_longitude + '</td><td data-value="1"><span class="status-metro status-suspended" title="Active">Available</span></td><td>' + 0 + '</td><td><button class="btn">hi</button></td></tr>');
            return row;
        }
       }
    if(status =='0'){
        if(total){
            var row = $('<tr id="id'+item.bike_id+'"><td hidden>' + item.bike_id + '</td><td>' + item.bike_name + '</td><td>' + item.bike_model + '</td><td>' + item.matricule + '</td><td  data-value='+item.img_link+'><img class="zoom" src="'+item.img_link+'" width="100px" height="80px"></td><td>' + item.price + '</td><td>' + item.bike_altitude+ '</td><td>' + item.bike_longitude + '</td><td data-value="1"><span class="status-metro status-active" title="Disabled">In rent</span></td><td>' + item.total + '</td><td><button class="btn">hi</button></td></tr>');
            return row;
        }
        else{
            var row = $('<tr id="id'+item.bike_id+'"><td hidden>' + item.bike_id + '</td><td>' + item.bike_name + '</td><td>' + item.bike_model + '</td><td>' + item.matricule + '</td><td  data-value='+item.img_link+'><img class="zoom" src="'+item.img_link+'" width="100px" height="80px"></td><td>' + item.price + '</td><td>' + item.bike_altitude+ '</td><td>' + item.bike_longitude + '</td><td data-value="2"><span class="status-metro status-active" title="Disabled">In rent</span></td><td>' + 0 + '</td><td><button class="btn">hi</button></td></tr>');
            return row;
        }
        
        }
        if(status =='2'){
            if(total){
                var row = $('<tr id="id'+item.bike_id+'"><td hidden>' + item.bike_id + '</td><td>' + item.bike_name + '</td><td>' + item.bike_model + '</td><td>' + item.matricule + '</td><td  data-value='+item.img_link+'><img class="zoom" src="'+item.img_link+'" width="100px" height="80px"></td><td>' + item.price + '</td><td>' + item.bike_altitude+ '</td><td>' + item.bike_longitude + '</td><td data-value="1"><span class="status-metro status-disabled" title="Disabled">Suspended</span></td><td>' + item.total + '</td><td><button class="btn">hi</button></td></tr>');
                return row;
            }
            else{
                var row = $('<tr id="id'+item.bike_id+'"><td hidden>' + item.bike_id + '</td><td>' + item.bike_name + '</td><td>' + item.bike_model + '</td><td>' + item.matricule + '</td><td  data-value='+item.img_link+'><img class="zoom" src="'+item.img_link+'" width="100px" height="80px"></td><td>' + item.price + '</td><td>' + item.bike_altitude+ '</td><td>' + item.bike_longitude + '</td><td data-value="2"><span class="status-metro status-disabled" title="Disabled">Suspended</span></td><td>' + 0 + '</td><td><button class="btn">hi</button></td></tr>');
                return row;
            }
            
            }


    };
function addmap(){
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
                
                addmarker(map,r);
                
            });
            
           
           
          });
    };
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


        /*.my_table tbody tr:hover {
  background-color: blue;
}*/ 
    
    };
function addColorMarker(map2,tr) {
   
    var popup = new mapboxgl.Popup({offset: 25})
    .setHTML('<p class="text-center">name : '+tr.children("td:eq(1)").html()+ '<br>price : '+tr.children("td:eq(5)").html()+ ' $<br>'+tr.children("td:eq(4)").html()+'<div><a class="btn btn-info" href="id'+urlbase+'#'+tr.children("td:eq(0)").html()+'">Show more</a><div></p>');
    var marker = new mapboxgl.Marker({color:'red'}) // initialize a new marker
    .setLngLat([tr.children("td:eq(7)").html(),tr.children("td:eq(6)").html()]) // Marker [lng, lat] coordinates
    .setPopup(popup)
    .addTo(map2)};
    function addColorMarker2(map,r) {
        var popup = new mapboxgl.Popup({className:"apple-popup"},{offset: 25})
    .setHTML('<div class="text-center" ><img  src="'+r.img_link+'" width="100px" height="80px"></div><br><p class="text-center" margin-top="100px" color:"black">name : '+ r.bike_name+ '<br>price : '+r.price+ '<div><a class="btn btn-default" href="'+urlbase+'#id'+r.bike_id+'">Show more</a></div></p>');
    var marker = new mapboxgl.Marker({color:'green'}) // initialize a new marker
    .setLngLat([r.bike_longitude,r.bike_altitude]) // Marker [lng, lat] coordinates
    .setPopup(popup)
    .addTo(map);};




   


   


    




/*
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