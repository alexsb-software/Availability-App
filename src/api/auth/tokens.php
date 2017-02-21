<?php

    function generate_token() {
        //return $token = bin2hex(random_bytes(30));
        return bin2hex(openssl_random_pseudo_bytes(30));
    }

?>