<?php
session_start();
include("connect.php");
if(isset($_POST))
{
    $query_select='SELECT bike.bike_id,bike.bike_name,bike.bike_model,bike.matricule,bike.img_link,bike.price,bike.bike_altitude,bike.bike_longitude,bike.is_available FROM bike_rental.bike  WHERE bike.bike_id=?';
    $statementselect=$connection->prepare($query_select);
    $statementselect->execute([$_POST["id"]]);
    $rows = $statementselect->fetch(PDO::FETCH_ASSOC);
    echo json_encode($rows);
    //:"SUSHI Bikes","bike_model":"Maki M1 (60cm) \u2022 E-City Bike \u2022 180+ cm","matricule":"11","img_link":"images\\'.03-10-2022-1664790643-10,"price":"15","bike_altitude":"36.6662","bike_longitude":"3.09162","is_available":"1
    

}

    ?>
