

$('document').ready(function(){
    checkConnection();
    $("#logout").click(function(){
        logout();

    });
    addmap();
    
    
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
                $("#admin_con li a:eq(0)").html('<img alt="" class="admin-pic img-circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXE2EnvtncW3k1h3k6U40vIXvskkGQxg7WPw&usqp=CAU">Hi, '+data+' <b class="caret"></b>');
                $("#admin_con").show();
            }
          
            
        },
        error: function(){
            alert("Error Try again!");
        }

    });


};


function check_file(){
    if( $("#image_bike").val()=="")
    {
        alert('please upload the image again');
        $("#image_bike").val('');
        return false;}
    else{
        var file = $("#image_bike")[0].files[0];
            var fileType = file.type;
            var match = ['image/jpeg', 'image/png', 'image/jpg'];
            if(!((fileType == match[0]) || (fileType == match[1]) || (fileType == match[2]))){
                alert('Sorry, only JPG, JPEG, & PNG files are allowed to upload.');
                $("#image_bike").val('');
                return false;
            }
            else {return true;}
        
    }
}
function check_location(){
    if( ($("#longitude").val()=="") || ($("#latitude").val()=="") )
    {
        alert('please set the location of the bike');
        return false;}
    else{
        return true;
    }
}


function addmap(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWhsZW1raCIsImEiOiJjbDhsZ2Fwa2QwMzVmM3ZxaDkwZWl6amh3In0.dRzrp6_Biv8v2mJz83ucHA';
    const map = new mapboxgl.Map({
      container: 'test1', // Container ID
      style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
      center: [0.6179605500496166, 34.85587444537373], // Starting position [lng, lat]
      zoom: 6, // Starting zoom level
      
    });
    const marker = new mapboxgl.Marker() // initialize a new marker
  .setLngLat([-0.6337376, 35.6976541]) // Marker [lng, lat] coordinates
  .addTo(map);
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
map.addControl(geocoder);
// After the map style has loaded on the page,
// add a source layer and default styling for a single point
map.on('load', () => {
    map.addSource('single-point', {
    'type': 'geojson',
    'data': {
    'type': 'FeatureCollection',
    'features': []
    }
    });
     
    map.addLayer({
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
        
        map.getSource('single-point').setData(event.result.geometry);
        $("form #longitude").val(event.result.center[0]);
        $("form #latitude").val(event.result.center[1]);
        console.log( $("form #latitude").val());
    
    });
    });



}
/*$("#add_bike_form").submit(function(event) {
        //e.stopImmediatePropagation();
        //e.preventDefault(); 
        if(check_location() && check_file()) {
            event.stopImmediatePropagation()
        event.preventDefault();
            

            var fd = new FormData( this );
        var file_data = $('#image_bike').prop('files')[0];
        fd.append('file', file_data);
        for (var [key, value] of fd.entries()) { 
            console.log(key, value); //I'm trying to see the content of the formdata and everything is good
          }
    
        $.ajax({
            url: "add_bike.php",
            type: "post",
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function(){
                $( "#longitude" ).prop( "disabled", false );
                $( "#latitude" ).prop( "disabled", false );
                $('#btn_add_bike').attr("disabled","disabled");
                $('#add_bike_form').css("opacity",".5");
            },
            complete: function(){
                $( "#longitude" ).prop( "disabled", true );
                $( "#latitude" ).prop( "disabled", true );
                $('#add_bike_form').css("opacity","");
                $("#btn_add_bike").removeAttr("disabled");
            },
            error   : function () {
                console.log('try again');
            },
            success : function (data) {
                console.log('Thank God it worked!');
            }
        });
       

        }
        
        
    });*/
    /*function submitForm(){
    $(document).ready(function(){
        if(check_location() && check_file()) {
            var fd = new FormData(document.getElementById("add_bike_form"));
        var file_data = $('#image_bike').prop('files')[0];
        fd.append('file', file_data);
        for (var [key, value] of fd.entries()) { 
            console.log(key, value); //I'm trying to see the content of the formdata and everything is good
          }
          $.ajax({
            url: "add_bike.php",
            type: "POST",
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function(){
                $( "#longitude" ).prop( "disabled", false );
                $( "#latitude" ).prop( "disabled", false );
                $('#btn_add_bike').attr("disabled","disabled");
                $('#add_bike_form').css("opacity",".5");
            },
            complete: function(){
                $( "#longitude" ).prop( "disabled", true );
                $( "#latitude" ).prop( "disabled", true );
                $('#add_bike_form').css("opacity","");
                $("#btn_add_bike").removeAttr("disabled");
            },
            error   : function () {
                console.log('try again');
            },
            success : function (data) {
                console.log("********************************************************************************");
                console.log("<br>"+fd);
            }
        });
    

        }
        
       
});}*/




