<?php
if (!isset($_GET["file"])) {
	die("No file specified.");
}
$target_dir = "/media/usb-storage/";
$location = $target_dir . basename($_GET["file"]);

if (!file_exists($location)) {
	die("File not found.");
}

header($_SERVER["SERVER_PROTOCOL"] . " 200 OK");
header("Content-Transfer-Encoding: Binary");
header("Content-Length:" . filesize($location));
header("Content-Disposition: attachment; filename=" . basename($_GET["file"]));
readfile($location);
?>