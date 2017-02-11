<?php
include 'config.php';
$header = getallheaders();

if (!$header['Authorization'])
{
    http_response_code(403);
    die("Invalid Request");
}

$get_user = mysqli_prepare($conn, "SELECT id, name FROM `members` WHERE `auth_token` = ?");
mysqli_stmt_bind_param($get_user, 's', $header['Authorization']);
$get_user->execute();
$result = $get_user->get_result();
$user = $result->fetch_assoc();

if (!$user)
{
    http_response_code(403);
    die("Invalid authentication token");
}