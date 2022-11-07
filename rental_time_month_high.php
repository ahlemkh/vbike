<?php 
session_start();
include("connect.php");
if(isset($_POST['d'])){
    $table=array();
    $n=cal_days_in_month(CAL_GREGORIAN,$_POST['d'],date("Y"));
    for($i=1;$i<=$n;$i++)
    {
        if($i<10)
        {
            $str=date("Y")."-".$_POST['d']."-0".$i;  
            array_push($table, array('day' =>$str));

        }
        else{
            $str=date("Y")."-".$_POST['d']."-".$i;  
            array_push($table, array('day' =>$str));
        }
        
    }
    $result=array();
    $query_select_month="SELECT DATE(rental.start_time) AS day ,COUNT(rental.rental_id) AS rentals  
    FROM bike_rental.rental 	WHERE month(rental.start_time)= ? GROUP BY  
    DATE(rental.start_time) order by DATE(rental.start_time) asc";
    $statementselect_month=$connection->prepare($query_select_month);
    $statementselect_month->execute([$_POST['d']]);
    $rows = $statementselect_month->fetchAll(PDO::FETCH_ASSOC);
    foreach($table as $t)
    {
        $new=array(
            'day' =>$t['day'] ,
            'rentals' => '0'
        );
       
        foreach($rows as $r)
        {
           
            
            if(strcmp($t['day'],$r['day'])==0)
            {
                $new=array('day' =>$t['day'] ,
                'rentals' => $r['rentals']);

            }
        }
        array_push($result, $new);  
    }    
    echo json_encode($result);

}
