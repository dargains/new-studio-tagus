<?php
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
$city = $_POST['city'];
$region = $_POST['region'];
$country = $_POST['country'];
$myemail = 'contato@studiotagus.com,andredargains@gmail.com,diego.boarutto.fortes@gmail.com';

$email_subject = "Contato de $name";
$email_body = "Name: $name \nFrom $city, $region, $country \n".
"Email: $email_address\n Mensagem: \n $message";
$headers = "From: $email_address\n";
mail($myemail,$email_subject,$email_body,$headers);
?>
