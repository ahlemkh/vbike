<?php 
 
 session_start();
 include("connect.php");

if(isset($_POST['id'])){
    $query_select="UPDATE bike_rental.rental SET rental.on_off= '1' WHERE rental.bike_id=? AND on_off= '0'";
    $statementselect=$connection->prepare($query_select);
    $statementselect->execute([$_POST['id']]);
    $id=$_POST['id'];
    $query_select="DELETE FROM bike_rental.bike  WHERE bike.bike_id = ?";
    $statementselect=$connection->prepare($query_select);
    if($statementselect->execute([$_POST['id']])){
        echo "done";}
        else{
            echo "error, Try again";
        }
   
   
   
}
