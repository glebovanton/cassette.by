<?php
// Email Submit
// Note: filter_var() requires PHP >= 5.2.0
if (isset($_POST['email']) && isset($_POST['name']) && isset($_POST['subject']) && isset($_POST['message'])) {

    // detect & prevent header injections
    $test = "/(content-type|bcc:|cc:|to:)/i";
    foreach ($_POST as $key => $val) {
        if (preg_match($test, $val)) {
            exit;
        }
    }
    $to = 'workglebov@gmail.com,molokova.sveta@yandex.ru';
    $headers = 'From: ' . $_POST["name"] . '<' . $_POST["email"] . '>' . "\r\n" .
        'Reply-To: ' . $_POST["name"] . '<' . $_POST["email"] . '>' . "\r\n" .
        'Return-Path: ' . $_POST["name"] . '<' . $_POST["email"] . '>' . "\r\n" .
        'MIME-Version: 1.0' . "\r\n" .
        'Content-Type: text/html; charset=utf-8' . "\r\n" .
        'X-Priority: 1' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    // На случай если какая-то строка письма длиннее 70 символов мы используем wordwrap()
    $message = wordwrap( $_POST['message'] ."\r\n". $_POST['email'] ."\r\n". $_POST['name']);

    mail($to, $_POST['subject'], $message, $headers);

    //			^
    //  Replace with your email
}
?>
