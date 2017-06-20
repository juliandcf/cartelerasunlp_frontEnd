<?php

include_once("libs/simple_html_dom.php");

// Devuelve un objeto a $html
var $html = file_get_html('http://www.google.com');

echo $html;

?>