<?php

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $username = $_POST["username"];
    $pwd = $_POST["pwd"];

    try {
        require_once "dbhinc.php";

        $query = "insert into usuarios (username, pwd) VALUES (?,?,?);";

        $stmt = $pdo->prepare($query);

        $stmt->execute([$username, $pwd]);

        $pdo = null;
        $stmt = null;

    header("Location: ../index.html");

        die();

    } catch (PDOException $e) {
        die("Query failed: " . $e->getMessage());
    }

}
else{
    header("Location: ../index.html");
}
