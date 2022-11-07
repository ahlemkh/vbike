<?php
session_start();
$test=true;
include("connect.php");
if(isset($_SESSION['admin_id']) )
{
    if(empty($_POST['admin_full_name'])&& empty($_POST['admin_email']) && empty($_POST['admin_password']) && empty($_POST['admin_repeat_password']))
{
    echo "Your information is incomplete please re-fell the fields";

}
else{
    $admin_full_name = $admin_email = $admin_password = $admin_repeat_password= "";
    $admin_full_name = test_input($_POST["admin_full_name"]);
    $admin_email = test_input($_POST["admin_email"]);
    $admin_password = test_input($_POST["admin_password"]);
    $admin_repeat_password= test_input($_POST["admin_repeat_password"]);
    if(strcmp($admin_password, $admin_repeat_password) !== 0)
    {
        $test=false;
        echo "passwords are not equal please re-fell the fields ";
        exit();

    }
    if (!preg_match("/^[a-zA-Z-' ]*$/",$admin_full_name)) {
        echo "Only letters and white space allowed";
        exit();
      }
    if (!filter_var($admin_email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit();
      }
      $query_update="UPDATE bike_rental.admin SET admin.admin_full_name=? ,admin.admin_email=?,admin.admin_pwd=? WHERE admin.admin_id = ?";
      $update=$connection->prepare($query_update);
      if($update->execute([$admin_full_name,$admin_email,$admin_password,$_SESSION['admin_id']]))
      {
        $query_select='SELECT * FROM bike_rental.admin WHERE admin_id=?';
        $statementselect=$connection->prepare($query_select);
        $statementselect->execute([$_SESSION['admin_id']]);
        $result=$statementselect->fetch();
        $_SESSION['admin_full_name']=$result['admin_full_name'];

        echo $result['admin_full_name']." ,your informations is updated with succes";
      }
      else
      {
        echo "error, please try again";
      }
      

}
}
else
{
    echo "you are not connected";
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>
