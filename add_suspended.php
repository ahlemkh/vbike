<?php 
 
 session_start();
 include("connect.php");

if(isset($_POST['id'])){
    $id=$_POST['id'];
    $query_select="UPDATE bike_rental.bike SET bike.is_available = '1' WHERE bike.bike_id = ?";
    $statementselect=$connection->prepare($query_select);
    if($statementselect->execute([$_POST['id']])){
        echo "done";
    }
    else{
        echo "error, try again";
    }
}
else{
    echo "error in sending data or this bike id doesn't exist , Try again";
}
