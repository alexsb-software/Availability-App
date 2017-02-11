<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
    include_once 'config.php';
    include 'tokens.php';

    $header = getallheaders();
    if (!$header['Authorization'])
    {
        die("Invalid Request");
    }

    $sql = mysqli_prepare($conn, "SELECT id  FROM `members` WHERE `auth_token` = ?");

    if ( !$sql ) {
        http_response_code(500);
        die('mysqli error: '.mysqli_error($conn));
    }
//    //$sql->bind_params('s', $email);
    mysqli_stmt_bind_param($sql, "s", $header['Authorization']);

    $sql->execute();
    $result = $sql->get_result();
    $row = $result->fetch_assoc();

    if (!$row)
    {
        http_response_code(404);
        die("Invalid Auth Token");
    }

    $token = generate_token();
    $update_token = mysqli_prepare($conn, "UPDATE `members` SET auth_token = ? WHERE `id` = ?");

    mysqli_stmt_bind_param($update_token, "si", $token, $row['id']);

    if($update_token->execute())
    {
        http_response_code(200);
    } else {
        http_response_code(500);
        die('mysqli error: '.mysqli_error($conn));
    }
}
else
{
    http_response_code(403);
}