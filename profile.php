<?php
session_start();
include("connect.php");
if($_SESSION['admin_id'] )
{
    $query_select='SELECT * FROM bike_rental.admin WHERE admin_id=? ';
    $statementselect=$connection->prepare($query_select);
    $statementselect->execute([$_SESSION['admin_id']]);
    $row= $statementselect->fetch(PDO::FETCH_ASSOC);
    echo json_encode($row);
    
    }?>
