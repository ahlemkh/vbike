<?php
include_once 'mysql_conn.php';

$firstName = $_POST['inputFirstName'];
$lastName = $_POST['inputLastName'];
$clientEmail = $_POST['inputEmail'];
$clientPwd = $_POST['inputPassword'];
$clientRPwd = $_POST['inputRPassword'];
$clientDate = $_POST['date'];
$clientGender = $_POST['gender_select_id'];


//selection query
$sql = "SELECT count(*) FROM `client` WHERE client_email = ?"; 
$result = $conn->prepare($sql); 
$result->execute([$clientEmail]); 
$number_of_rows = $result->fetchColumn(); 

if($number_of_rows > 0) {
    echo ('Email already exists. Please chose another one!' . $number_of_rows);
    exit();
}
elseif(!filter_var($clientEmail, FILTER_VALIDATE_EMAIL)){
    echo 'email not valid';
    exit();
}
/*elseif(!filter_var($clientPwd, FILTER_VALIDATE_REGEXP)){
    echo 'password not valid';
}*/
elseif ($clientPwd != $clientRPwd){
    echo 'Passwords do not match!';
    exit();
}
else
{
    $insert_query = "INSERT INTO bike_rental.client (client_first_name, client_last_name, client_email, 
    client_pwd, client_birthdate, client_gender) VALUES(?, ?, ?, ?, ?, ?)";
    $insert_stmt = $conn->prepare($insert_query);

    if ($insert_stmt->execute([
        $firstName,
        $lastName,
        $clientEmail,
        $clientPwd,
        $clientDate,
        $clientGender
    ])) {
        echo 'executed successfully!';
            //$_SESSION['SIGNEDUP_USER_EMAIL'] = $clientEmail;
            //header ('location: login.html');
    }
    else {
        echo 'not executed';
    }
}