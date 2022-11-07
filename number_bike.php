<?php session_start();
include("connect.php");
$query_select=" SELECT COUNT(bike.bike_id) AS number  FROM bike_rental.bike ";
    $statementselect=$connection->prepare($query_select);
    $statementselect->execute();
    $row = $statementselect->fetch(PDO::FETCH_ASSOC);
    echo json_encode($row);