<?php 
session_start();
 include("connect.php"); 
// If file upload form is submitted 
if(isset($_POST["submit"])){ 
    if(!empty($_FILES["image_bike"]["name"])) { 
        // Get file info 
        $fileName = basename($_FILES["image_bike"]["name"]); 
        $fileType = pathinfo($fileName, PATHINFO_EXTENSION); 
         
        // Allow certain file formats 
        $allowTypes = array('jpg','png','jpeg','gif'); 

    
        if(in_array(strtolower($fileType), $allowTypes)){ 
            $image_tmp = $_FILES['image_bike']['tmp_name']; 
            $imgContent = addslashes(file_get_contents($image_tmp)); 
            $time = date("d-m-Y")."-".time();
            $image_name=$time."-".$fileName;
            $folder = "images\'.$image_name";
            if (move_uploaded_file($image_tmp, $folder)) {

                $upload =true;
                if(isset($_POST["bike_name"]) && isset($_POST["bike_model"])&& isset($_POST["matricule"])&& isset($_POST["price"])
                && isset($_POST["longitude"])&& isset($_POST["latitude"]))

                $query_insert="INSERT INTO bike (bike_name,bike_model,matricule, img_link,price,bike_altitude,bike_longitude) VALUES (?,?,?,?,?,?,?)";
                $statementinsert=$connection->prepare("INSERT INTO bike_rental.bike (bike_name,bike_model,matricule, img_link,price,bike_altitude,bike_longitude,is_available)VALUES (:bike_name,:bike_model,:matricule,:img_link,:price,:bike_altitude,:bike_longitude,:is_available)");
    
                $exct=$statementinsert->execute([
                    "bike_name"=>$_POST["bike_name"],
                    "bike_model"=>$_POST["bike_model"],
                    "matricule"=>$_POST["matricule"],
                    "img_link"=>$folder ,
                     "price"=>$_POST["price"],
                     "bike_altitude"=>$_POST["latitude"],
                     "bike_longitude"=>$_POST["longitude"],
                     "is_available"=>1,
                    
                ]);
                if($exct){
                        echo '<script type="text/javascript">'; 
                        echo 'alert("the bike data is saved with success");'; 
                        echo 'window.location.href = "add_bike.html";';
                        echo '</script>';
                        exit;
                    
                                            }
                else{
                    echo '<script>alert("something wrong ,please try again.")</script>';

                }
    
            }
            else{
    
                echo '<script>alert("Failed to upload image")</script>'; // "Failed to upload image";
            }
        } 
            else{ 
                echo '<script>alert("Sorry, only JPG, JPEG, PNG, & GIF files are allowed to upload.")</script>';
            } }
            
            
            else{ 
                echo '<script>alert("Please select an image file to upload.")</script>';
            } 
            }?>
             
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
  <title>Apricot v 1.3</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Le styles -->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.js"></script>

    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/loader-style.css">
    <link rel="stylesheet" href="assets/css/bootstrap.css">

    <link href="assets/js/iCheck/flat/all.css" rel="stylesheet">
    <link href="assets/js/iCheck/line/all.css" rel="stylesheet">

    <link href="assets/js/colorPicker/bootstrap-colorpicker.css" rel="stylesheet">
    <link href="assets/js/switch/bootstrap-switch.css" rel="stylesheet">
    <link href="assets/js/validate/validate.css" rel="stylesheet">
    <link href="assets/js/idealform/css/jquery.idealforms.css" rel="stylesheet">







    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    <!-- Fav and touch icons -->
    <link rel="shortcut icon" href="assets/ico/minus.png">

    <style>#map { 
        height: 500px; }
      </style>
</head>

<body>

    
<div class="col-sm-12">
    <div class="nest" id="basicClose">
        <div class="title-alt">
            <h6>Add a bike</h6>
            <div class="titleClose">
                <a class="gone" href="#basicClose">
                    <span class="entypo-cancel"></span>
                </a>
            </div>
            <div class="titleToggle">
                <a class="nav-toggle-alt" href="#basic">
                    <span class="entypo-up-open"></span>
                </a>
            </div>

        </div>
       

        <div class="body-nest" id="basic">
                 <a class="btn btn-primary " id="show_map" href="add_bike.html">
                            <span class="entypo-plus-squared"></span>&nbsp;&nbsp;go to the add bike page</a>  
                    </div>
                
            </div>


        </div>

    </div>
</div>

    <!-- END OF RIGHT SLIDER CONTENT-->



    <!-- MAIN EFFECT -->
    <script type="text/javascript" src="assets/js/preloader.js"></script>
    <script type="text/javascript" src="assets/js/bootstrap.js"></script>
    <script type="text/javascript" src="assets/js/app.js"></script>
    <script type="text/javascript" src="assets/js/load.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>









    <!-- /MAIN EFFECT -->
    <script type="text/javascript" src="assets/js/iCheck/jquery.icheck.js"></script>
    <script type="text/javascript" src="assets/js/switch/bootstrap-switch.js"></script>

    
</body>

</html>




