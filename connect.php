<?php
error_reporting(E_STRICT);
$HOST='eu-central.connect.psdb.cloud';
$USERNAME='jrwdj1lvec0b6nmggu0f';
$PASSWORD='pscale_pw_xcaQa77LUySApLCiNkRJM1XycOE6KtejqAPHmP9kBJ4';
$DATABASE='bike_rental';
$options = array(
    PDO::MYSQL_ATTR_SSL_CA => "/etc/ssl/certs/ca-certificates.crt",
  );
$connection=new PDO('mysql:host='.$HOST.';db_name='.$DATABASE,
$USERNAME,$PASSWORD,$options);
