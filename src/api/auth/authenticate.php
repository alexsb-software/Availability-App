<?php
include '../db.php';

$header = getallheaders();

if (!$header['Authorization'])
{
    http_response_code(403);
    die("Invalid Request");
}

//$get_user = mysqli_prepare($conn, "SELECT id, name FROM `members` WHERE `auth_token` = ?");
//mysqli_stmt_bind_param($get_user, 's', $header['Authorization']);
//$get_user->execute();
//$result = $get_user->get_result();
//$user = $result->fetch_assoc();

$auth_token = $header['Authorization'];

// TODO Add parameter escaping
$get_user_query = "SELECT `id`, `name` FROM `members` WHERE `auth_token` = '$auth_token'";
$user = execute_query($get_user_query);

if (!$user->{'num_rows'})
{
    http_response_code(403);
    die("Invalid authentication token");
}