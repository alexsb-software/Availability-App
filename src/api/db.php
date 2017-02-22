<?php

// Database Connection Parameters
define("DB_DOMAIN", "localhost");
define("DB_USER", "root");
define("DB_PASS", "");
define("DB_NAME", "");


// mysql connection object
$mysql;

// create $mysql connection object
function db_conn() {
    $mysql = new mysqli(DB_DOMAIN, DB_USER, DB_PASS, DB_NAME);
    // Set Timezone
    // $mysql->query("SET SESSION time_zone = '+02:00'");
    $mysql->set_charset("utf8");

    if ($mysql->connect_errno) {
        echo "Failed to connect to MySQL: (" . $mysql->connect_errno . ") " . $mysql->connect_error;
        exit;
    }

    return $mysql;
}

// execute query
function execute_query($q) {
    if (!isset($mysql) || $mysql == null)
        $mysql = db_conn();
    $res = $mysql->query($q);

    return $res;
}


// execute multi query
function execute_multi_query($q) {
    if (!isset($mysql) || $mysql == null)
        $mysql = db_conn();
    $res = $mysql->multi_query($q);

    return $res;
}

// execute query and return last id
function execute_query_return_id($q) {
    if (!isset($mysql) || $mysql == null) $mysql = db_conn();
    $mysql->query($q);

    return mysqli_insert_id($mysql);
}

// execute query and return affected rows
function execute_query_return_affected_rows($q) {
    if (!isset($mysql) || $mysql == null) $mysql = db_conn();
    $mysql->query($q);

    return $mysql->affected_rows;
}

// execute query and return arrays
function execute_query_ret_arr($q) {
    if (!isset($mysql) || $mysql == null) $mysql = db_conn();
    $res = $mysql->query($q);
    $rows = array();
    while ($row = $res->fetch_object()) $rows[] = $row;

    return $rows;
}

?>
