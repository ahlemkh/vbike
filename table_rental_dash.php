<?php session_start();
include("connect.php");
$query_select="SELECT rental.rental_id,rental.client_id,rental.bike_id,
rental.start_time ,
DATE(rental.end_time)AS end_time,rental.end_time,rental.total_price FROM bike_rental.rental ";
    $statementselect=$connection->prepare($query_select);
    $statementselect->execute();
    $row = $statementselect->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($row);