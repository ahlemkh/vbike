<?php session_start();
include("connect.php");
$query_select="SELECT bike.bike_model ,COUNT(rental.total_price) as total FROM bike_rental.bike LEFT JOIN bike_rental.rental ON bike.bike_id=rental.bike_id GROUP BY bike.bike_model ORDER BY total ASC";
    $statementselect=$connection->prepare($query_select);
    $statementselect->execute();
    $row = $statementselect->fetchAll();
    $array=array();
    $i=1;
    foreach ($row as $r){
        $new=array(
                    'y'=>intval($r['total']),
                    'label'=>$r['bike_model']);
        array_push($array,$new);
        ;



    }
    echo json_encode($array);