<?php session_start();
include("connect.php");
$query_select="SELECT CASE WHEN `age` < 20 THEN 'under 20' 
WHEN `age` BETWEEN 20 and 29 THEN '20-29'
 WHEN `age` BETWEEN 30 and 39 THEN '30-39'
  WHEN `age` BETWEEN 40 and 49 THEN '40-49'
  WHEN `age` > 49 THEN 'over 50' END as RANGE_AGE, count(`client_id`) as y FROM 
(SELECT rental.client_id,COALESCE(TIMESTAMPDIFF(YEAR,client.client_birthdate, CURRENT_DATE()),0) AS age FROM 
 bike_rental.client LEFT JOIN bike_rental.rental ON client.client_id=rental.client_id ) AS t 
GROUP BY RANGE_AGE ORDER BY RANGE_AGE";
    $statementselect=$connection->prepare($query_select);
    $statementselect->execute();
    $row = $statementselect->fetchAll();
    $full_array=array();
    array_push($full_array,array(
        'label'=>'under 20',
        'y'=>0));
    array_push($full_array,array(
            'label'=>"20-29",
            'y'=>0));
    array_push($full_array,array(
                'label'=>"30-39",
                'y'=>0));
array_push($full_array,array(
                'label'=>"40-49",
                'y'=>0));
array_push($full_array,array(
                'label'=>"over 50",
                'y'=>0));
  
    foreach ($row as $r){
        for($i=0;$i<count($full_array);$i++){
            if($full_array[$i]['label'] == $r['RANGE_AGE'] )
            {
                $full_array[$i]['label']=$r['RANGE_AGE'];
                $full_array[$i]['y']=intval($r['y']);
            }
        }
        
        

    };


    echo json_encode($full_array);