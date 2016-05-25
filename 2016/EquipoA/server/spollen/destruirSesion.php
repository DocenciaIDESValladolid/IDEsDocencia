<?php
session_start();
session_destroy();
header("Location:../carro/index.php");
?>