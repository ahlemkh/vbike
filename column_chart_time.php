<?php session_start();
include("connect.php");
$query_select="SELECT DAYNAME(rental.start_time)as Days, COALESCE(COUNT(rental.total_price), 0 ) as number FROM bike_rental.client LEFT JOIN bike_rental.rental ON client.client_id=rental.client_id WHERE client.client_gender='female' GROUP BY DAYNAME(rental.start_time) ";
    $statementselect=$connection->prepare($query_select);
    $statementselect->execute();
    $row = $statementselect->fetchAll();
    $array=array(0,0,0,0,0,0,0);
    $full_array=array();
    array_push($full_array,array(
        'label'=>'Sunday',
        'y'=>0));
    array_push($full_array,array(
            'label'=>"Monday",
            'y'=>0));
    array_push($full_array,array(
                'label'=>"Tuesday",
                'y'=>0));
array_push($full_array,array(
                'label'=>"Wednesday",
                'y'=>0));
array_push($full_array,array(
                'label'=>"Thursday",
                'y'=>0));
array_push($full_array,array(
                'label'=>"Friday",
                'y'=>0));
array_push($full_array,array(
                'label'=>"Saturday",
                'y'=>0)) ; 
  
    foreach ($row as $r){
        for($i=0;$i<count($full_array);$i++){
            if($full_array[$i]['label'] == $r['Days'] )
            {
                $full_array[$i]['label']=$r['Days'];
                $full_array[$i]['y']=intval($r['number']);
                $array[$i]=intval($r['number']);
            }
        }
        
        

    };
    
    $query_select_male="SELECT DAYNAME(rental.start_time)as Days, COALESCE(COUNT(rental.total_price), 0 ) as number FROM bike_rental.client LEFT JOIN bike_rental.rental ON client.client_id=rental.client_id WHERE client.client_gender='male' GROUP BY DAYNAME(rental.start_time) ";
    $statementselect_male=$connection->prepare($query_select_male);
    $statementselect_male->execute();
    $row_male = $statementselect_male->fetchAll();
    $array_male=array(0,0,0,0,0,0,0);
    $full_array_male=array();
    array_push($full_array_male,array(
        'label'=>'Sunday',
        'y'=>0));
    array_push($full_array_male,array(
            'label'=>"Monday",
            'y'=>0));
    array_push($full_array_male,array(
                'label'=>"Tuesday",
                'y'=>0));
array_push($full_array_male,array(
                'label'=>"Wednesday",
                'y'=>0));
array_push($full_array_male,array(
                'label'=>"Thursday",
                'y'=>0));
array_push($full_array_male,array(
                'label'=>"Friday",
                'y'=>0));
array_push($full_array_male,array(
                'label'=>"Saturday",
                'y'=>0)) ; 
foreach ($row_male as $r_male){
    for($i=0;$i<count($full_array_male);$i++){
        if($full_array_male[$i]['label'] == $r_male['Days'] )
            {
                $full_array_male[$i]['label']=$r_male['Days'];
                $full_array_male[$i]['y']=intval($r_male['number']);
                $array_male[$i]=intval($r_male['number']);
            }
       }
                   
            
        };
    
    $data=array();
    $data['male']=$full_array_male;
    $data['female']=$full_array;

    echo json_encode($data);