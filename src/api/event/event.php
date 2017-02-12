<?php


include 'get_event.php';


$event_id = intval($_GET['id']);

if (!$event_id)
    die("Invalid Event Id");

print_r(json_encode(get_event($event_id, false)));
