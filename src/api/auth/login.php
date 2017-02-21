<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
//    include_once 'config.php';
    include '../db.php';
    include 'tokens.php';

    /*$email = $_POST['email'];
    $password = $_POST['password'];*/

    $input = file_get_contents('php://input');
    $requestParams = json_decode($input);
    if (!$requestParams) {
        die("invalid params");
    }

//    echo $requestParams->{'email'};
//    echo $requestParams->{'password'};
//    $email = $requestParams->{'email'};
//    $password = $requestParams->{'password'};
//

//    $sql = mysqli_prepare($conn, "SELECT id, password FROM `members` WHERE `email` = ?");
//
//    if ( !$sql ) {
//        http_response_code(500);
//        die('mysqli error: '.mysqli_error($conn));
//    }
////    //$sql->bind_params('s', $email);
//    mysqli_stmt_bind_param($sql, "s", $requestParams->{'email'});
//
//    $sql->execute();
//    $result = $sql->get_result();
//    $row = $result->fetch_assoc();

    $email = htmlspecialchars($requestParams->{'email'});
    $password = htmlspecialchars($requestParams->{'password'});

    $get_user_query = "SELECT `id`,`password` FROM `members` WHERE email = '$email'";
    $user = execute_query_ret_arr($get_user_query);

//    if(mysqli_num_rows($result) && /*password_verify($password, $result['password'])*/ $requestParams->{'password'} == $row['password'])
    if($user[0] && $user[0]->{'password'} == $password)
    {
        $user_id = $user[0]->{'id'};
//        $auth_query = mysqli_prepare($conn, "SELECT id FROM `members` WHERE `auth_token` = ?");
        $auth_query = "SELECT id FROM `members` WHERE `auth_token` = ";
        $token = "";

        do {
            $token = generate_token();
            $user_with_this_auth = execute_query_return_affected_rows($auth_query . ' ' . $token);
//            mysqli_stmt_bind_param($auth_query, 's', $token);
//            $user_with_this_auth = $auth_query->execute();
//            $user_with_this_auth = $auth_query->get_result();
//            $user_with_this_auth = $user_with_this_auth->fetch_assoc();
        } while ($user_with_this_auth != -1);


////        $update_auth = mysqli_prepare($conn, "UPDATE `members` SET auth_token = ? WHERE `id` = ?");
//        if (!$update_auth) {
//            http_response_code(500);
//            die('mysqli error: '.mysqli_error($conn));
//        }
//
//        mysqli_stmt_bind_param($update_auth, "si", $token, $row['id']);
//        if ($update_auth->execute()) {
//            http_response_code(200);
//            header("Authorization: {$token}");
//        } else {
//            http_response_code(500);
//            die('mysqli error: '.mysqli_error($conn));
//        }
        $update_auth_query = "UPDATE `members` SET auth_token = '$token' WHERE `id` = '$user_id'";

        if(execute_query($update_auth_query)) {
            http_response_code(200);
            header("Authorization: {$token}");
        } else {
            http_response_code(500);
        }

    } else {
        http_response_code(403);
    }
} else {
    http_response_code(403);
}

?>