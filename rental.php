<?php session_start();
include("connect.php");
$query_select=" SELECT DATE(rental.start_time) AS day ,COUNT(rental.rental_id) AS rentals  FROM bike_rental.rental GROUP BY  DATE(rental.start_time) order by DATE(rental.start_time) desc";
    $statementselect=$connection->prepare($query_select);
    $statementselect->execute();
    $row = $statementselect->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($row);