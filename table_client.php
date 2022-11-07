
<?php 
session_start();
include("connect.php");
$query_select='SELECT client.client_id,client.client_first_name,client.client_last_name, client.client_email,client.client_birthdate,TIMESTAMPDIFF(YEAR,client.client_birthdate, CURRENT_DATE()) AS age,client.client_gender, COALESCE(COUNT(rental.total_price), 0 ) as number,coalesce(SUM(rental.total_price),0) as total FROM bike_rental.client LEFT JOIN bike_rental.rental ON client.client_id=rental.client_id GROUP BY client.client_id';
    $statementselect=$connection->prepare($query_select);
    $statementselect->execute();
    $rows = $statementselect->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);