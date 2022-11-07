<?php 
session_start();
 include("connect.php"); 
// If file upload form is submitted 
if(isset($_POST) ){
    
    $query_insert="UPDATE bike_rental.bike SET bike_name =:bike_name, bike_model =:bike_model,
    matricule=:matricule,price=:price,bike_altitude=:latitude,bike_longitude=:longitude
     WHERE bike.bike_id =:id";
    $statementinsert=$connection->prepare($query_insert);

    $exct=$statementinsert->execute([
        "bike_name"=>$_POST["bike_name"],
        "bike_model"=>$_POST["bike_model"],
        "matricule"=>$_POST["matricule"],
         "price"=>$_POST["price"],
         "latitude"=>$_POST["latitude"],
         "longitude"=>$_POST["longitude"],
         "id"=>$_POST["bike_id"]]);
    if($exct){
        echo "Bike information has been successfully updatedd";
    }
    else{
        echo "somthing wrong, try again !";
    }
    }