<?php 
    $table=array();
    $n=cal_days_in_month(CAL_GREGORIAN,10,date("Y"));
    echo $n;
    for($i=1;$i<=$n;$i++)
    {
        if($i<10)
        {
            $str=date("Y")."-10-0".$i;  
            array_push($table, array('day' =>$str));

        }
        else{
            $str=date("Y")."-10-".$i;  
            array_push($table, array('day' =>$str));
        }
        
    }
    $result=array();
    $rows=array(array('day'=>'2022-10-04', 'rentals'=> '2'));
    var_dump($rows);
    foreach($table as $t)
    {
        $new=array(
            'day' =>$t['day'] ,
            'rentals' => '0'
        );
        echo "+++++++++++     ".$t['day'];
        foreach($rows as $r)
        {
            echo "         row    ".$r['day']." str ".strcmp($t['day'],$r['day']);
            
            if(strcmp($t['day'],$r['day'])==0)
            {
                $new=array('day' =>$t['day'] ,
                'rentals' => $r['rentals']);
                echo "         *************table   ";

            }
        }
        array_push($result, $new);  
    }    
    var_dump($result);