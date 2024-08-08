<?php

$dsn = "mysql:host=localhost;dbname=luti_vinculacion";
$dbusername = "root";
$dbpassword = "";

try{
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e){
    echo "Connection failed: " . $e->getMessage();
}
