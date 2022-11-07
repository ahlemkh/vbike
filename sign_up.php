<?php

if(empty($_POST['email_admin'])&& empty($_POST['name_admin']) && empty($_POST['admin_pwd']))
{
    echo "Your information is incomplete please re-fell the fields";

}
else if(strcmp($_POST['password_admin'], $_POST['password_admin_repeat']) !== 0){

    echo "passwords are not equal please re-fell the fields ";

}
else {
    include("connect.php");
    $check=$connection->prepare("SELECT admin_email from  bike_rental.admin WHERE admin_email=?");
    $check->execute([$_POST['email_admin']]);
    if($check->rowCount()>0)
    {
         echo "your email already exists";
    }
else{
    $query_insert="INSERT INTO bike_rental.admin (admin_email,admin_full_name,admin_pwd) VALUES 
    (:admin_email,:admin_full_name,:admin_pwd)";
    $statementinsert=$connection->prepare($query_insert);

    if($statementinsert->execute([
    'admin_email'=>$_POST['email_admin'],
    'admin_full_name'=>$_POST['name_admin'],
    'admin_pwd'=>$_POST['password_admin'],
        ])){echo "You have been successfully registered, log in to see the list of bikes";}
    else{ echo "fail";}



}
    
}


?>
