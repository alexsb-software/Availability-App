<?php

include 'auth/config.php';

$query = "SELECT * FROM session";

function execute_query_ret_arr($q) {
	global $conn;
    $res = $conn->query($q);
    $rows = array();
    while ($row = $res->fetch_object()) $rows[] = $row;

    return $rows;
}

$res = execute_query_ret_arr($query);

echo json_encode($res);

?>