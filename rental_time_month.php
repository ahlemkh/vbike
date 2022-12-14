<?php session_start();
include("connect.php");
$query_select_month="SELECT COALESCE(SUM(rental.total_price),0) AS month FROM bike_rental.rental WHERE month(rental.start_time)=month(now())";
$query_select_last_month="SELECT COALESCE(SUM(rental.total_price),1) as last_month FROM bike_rental.rental WHERE month(rental.start_time)=month(now()- INTERVAL 1 MONTH) ";
$statementselect_month=$connection->prepare($query_select_month);
$statementselect_last_month=$connection->prepare($query_select_last_month);
$statementselect_month->execute();
$statementselect_last_month->execute();
$row_month = $statementselect_month->fetch(PDO::FETCH_ASSOC);
$row_last_month = $statementselect_last_month->fetch(PDO::FETCH_ASSOC);
$increase=$row_month['month']-$row_last_month['last_month'];
$row_last_month['last_month']=round(($increase/$row_last_month['last_month'])*100,1);
$tab["month"]=$row_month['month'];
$tab["per_month"]=$row_last_month['last_month'];
echo json_encode($tab);