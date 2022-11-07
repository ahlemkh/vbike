<?php session_start();
include("connect.php");
$query_select_week="SELECT COALESCE(SUM(rental.total_price),0) AS week FROM bike_rental.rental WHERE week(rental.start_time)=week(now())";
$query_select_last_week="SELECT COALESCE(SUM(rental.total_price),1) as last_week FROM bike_rental.rental WHERE week(rental.start_time)=week(now()- INTERVAL 1 WEEK) ";
$statementselect_week=$connection->prepare($query_select_week);
$statementselect_last_week=$connection->prepare($query_select_last_week);
$statementselect_week->execute();
$statementselect_last_week->execute();
$row_week = $statementselect_week->fetch(PDO::FETCH_ASSOC);
$row_last_week = $statementselect_last_week->fetch(PDO::FETCH_ASSOC);
$increase=$row_week['week']-$row_last_week['last_week'];
$row_last_week['last_week']=round(($increase/$row_last_week['last_week'])*100,1);
$tab["week"]=$row_week['week'];
$tab["per_week"]=$row_last_week['last_week'];
echo json_encode($tab);
/*
$query_select_year="SELECT SUM(rental.total_price) FROM bike_rental.rental WHERE year(rental.start_time)=year(now())";  
$query_select_last_year="SELECT COALESCE(SUM(rental.total_price),1) as last_year FROM bike_rental.rental WHERE year(rental.start_time)=year(now()- INTERVAL 1 YEAR) ";
$statementselect=$connection->prepare($query_select);
    $statementselect_male=$connection->prepare($query_select_male);
    $statementselect->execute();
    $statementselect_male->execute();
    $row = $statementselect->fetch();
    $row_male = $statementselect_male->fetch();
    $tab["female"]=$row["percentage"];
    $tab["male"]=$row_male["percentage"];*/
    