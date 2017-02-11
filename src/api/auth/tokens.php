<?php

    function generate_token() {
        return $token = bin2hex(random_bytes(30));
    }

?>