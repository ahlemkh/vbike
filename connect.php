<?php
$dsn = "mysql:host={$_ENV['HOST']};dbname={$_ENV['DATABASE']}";
  $options = array(
    PDO::MYSQL_ATTR_SSL_CA => "/etc/ssl/ca-bundle.pem",
  );
echo $_ENV['HOST'];

  $connection = new PDO($dsn, $_ENV["USERNAME"], $_ENV["PASSWORD"], $options);

