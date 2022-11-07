<?php
session_start();
include("connect.php");
if(isset($_POST['admin_mail']) && isset($_POST['admin_password']))
{
    $query_select='SELECT * FROM bike_rental.admin WHERE admin_email=? AND admin_pwd=?';
    $statementselect=$connection->prepare($query_select);
    $statementselect->execute([$_POST['admin_mail'],$_POST['admin_password']]);
    if($statementselect->rowCount()>0)
        {
            
           $result= $statementselect->fetch();
           $_SESSION['admin_id']=$result['admin_id'];
           $_SESSION['admin_full_name']=$result['admin_full_name'];
           echo ("welcome  ". $result['admin_full_name']."  you are connected");
            //header('location:index.php');
            exit;
            
        }
        else
        {
            echo "email or password is incorrect";
            
            
        }
    }?>
