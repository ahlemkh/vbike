<?php
$dsn = "mysql:host={$_ENV['HOST']};dbname={$_ENV['DATABASE']}";
  $options = array(
    PDO::MYSQL_ATTR_SSL_CA => "/etc/ssl/cert.pem",
  );

  $pdo = new PDO($dsn, $_ENV["USERNAME"], $_ENV["PASSWORD"], $options);
