<?php
require $_SERVER['DOCUMENT_ROOT'] . "/vendor/autoload.php";
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

# trust me, you're never guessing the password and user-agent
if ($_POST["password"] !== $_ENV["PASSWORD"] || $_SERVER['HTTP_USER_AGENT'] !== $_ENV["USERAGENT"]) {
	die();
}

if (!isset($_FILES["file"])) {
	die(json_encode(array("status"=>"fail","msg"=>"Missing file.")));
}

if (!isset($_POST["game"])) {
	die(json_encode(array("status"=>"fail","msg"=>"Missing game.")));
}

if (!isset($_POST["name"])) {
	die(json_encode(array("status"=>"fail","msg"=>"Missing human-readable name.")));
}

$game = $_POST["game"];
$valid_games = array("Team Fortress 2", "Valorant", "Minecraft", "Other");

if (!in_array($game, $valid_games)) {
	die(json_encode(array("status"=>"fail","msg"=>"Invalid game '" . $game . "'")));
}

$target_dir = "/media/usb-storage/";
$fn = str_replace(" ", "", basename($_FILES["file"]["name"]));
$target_file = $target_dir . $fn;

// Check if file already exists
if (file_exists($target_file)) {
	die(json_encode(array("status"=>"fail","msg"=>"File already exists.")));
}

// Check file size
if ($_FILES["file"]["size"] > 200 * 1000 * 1000) {
	die(json_encode(array("status"=>"fail","msg"=>"File is too large (Max 200MB)")));
}

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
	if (!symlink($target_file, "links/" . $fn)) {
		unlink($target_file);
		die(json_encode(array("status"=>"fail","msg"=>"Failed to create symlink")));
	}
	$ffmpeg = FFMpeg\FFMpeg::create();
	$video = $ffmpeg->open($target_file);
	$frame = $video->frame(FFMpeg\Coordinate\TimeCode::fromSeconds(0));
	$frame->save("links/" . $fn . ".jpg");
	$keep = "files.json";
	$data = file_get_contents($keep);
	$obj = json_decode($data);
	$size = $_FILES["file"]["size"];
	$idx = 0;
	$suffixes = array("B", "KB", "MB", "GB", "TB");
	while ($size > 1024) {
		$size /= 1024;
		$idx++;
	}
	array_push($obj->files, array(	"name"=>$fn, "game"=>$game, "readname"=>$_POST["name"],
									"uploadtime"=>gmdate("d/m/Y H:i:s"), "filesize"=>number_format($size, 2) . $suffixes[$idx]));
	$obj->games = $valid_games;
	$obj->num_files++;
	$to_store = json_encode($obj);
	chmod($target_file, 0777);
	$file = fopen($keep, "w");
	if ($file === false) {
		unlink($target_file);
		die(json_encode(array("status"=>"fail","msg"=>"Could not update database.")));
	}
	fwrite($file, $to_store);
	fclose($file);
	die(json_encode(array("status"=>"success", "link"=>"https://evieuwu.duckdns.org/clips/view_clip.php?file=" . $fn)));
} else {
	die(json_encode(array("status"=>"fail","msg"=>"An unknown error has occurred.")));
}
?>