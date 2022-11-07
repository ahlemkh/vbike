<?php try {$connection=new PDO('mysql:host=localhost;db_name=bike_rental;charset=utf8','root','');}
        catch( Exeption $e)
        {
            die('Erreur : '.$e->getMessage());
        }
        /*,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]*/
        ?>