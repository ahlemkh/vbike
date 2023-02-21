<?php
  $dsn = "mysql:host={$_ENV["HOST"]};dbname={$_ENV["DATABASE"]}";
  $options = array(
    PDO::MYSQL_ATTR_SSL_CA => "/etc/ssl/certs/ca-certificates.crt",
  );

 //$connection = new PDO($dsn, $_ENV["USERNAME"], $_ENV["PASSWORD"], $options);

$HOST='eu-central.connect.psdb.cloud';
$USERNAME='jrwdj1lvec0b6nmggu0f';
$PASSWORD='pscale_pw_xcaQa77LUySApLCiNkRJM1XycOE6KtejqAPHmP9kBJ4';
$DATABASE='bike_rental';
$connection=new PDO('mysql:host='.$HOST.';db_name='.$DATABASE.';charset=utf8',$USERNAME,$PASSWORD);
?>
