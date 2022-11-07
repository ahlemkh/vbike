
<?php 
session_start();
include("connect.php");
$query_select='SELECT rental.rental_id,rental.client_id,rental.bike_id,bike.img_link,bike.bike_name FROM bike_rental.rental INNER JOIN bike_rental.bike ON rental.bike_id=bike.bike_id WHERE bike.is_available=2 AND rental.on_off=0 ORDER BY rental.end_time DESC';
    $statementselect=$connection->prepare($query_select);
    $statementselect->execute();
    $rows = $statementselect->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);