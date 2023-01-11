<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta property="og:site_name" content="Evie's Clip Zone">
	<?php
	$keep = "files.json";
	$data = file_get_contents($keep);
	$obj = json_decode($data);
	$file = null;
	foreach ($obj->files as $f) {
		if ($f->name === $_GET["file"]) {
			$file = $f;
			break;
		}
	}
	if ($file === null) {
		echo '<!-- HTML Meta Tags -->
		<title>Evie\'s Clip Zone - Unknown Clip</title>
		<meta name="description" content="Evie\'s place to upload and share epic gamer moments! Unfortunately, this video seems to be missing...">

		<!-- Facebook Meta Tags -->
		<meta property="og:url" content="https://evieuwu.duckdns.org/clips/index.html">
		<meta property="og:type" content="website">
		<meta property="og:title" content="Evie\'s Clip Zone - Unknown Clip">
		<meta property="og:description" content="Evie\'s place to upload and share epic gamer moments! Unfortunately, this video seems to be missing...">
		<meta property="og:image" content="https://evieuwu.duckdns.org/clips/notfound.png">
		<meta property="og:image:type" content="image/png">
		<meta property="og:image:width" content="1920">
		<meta property="og:image:height" content="1080">

		<!-- Twitter Meta Tags -->
		<meta name="twitter:card" content="summary_large_image">
		<meta property="twitter:url" content="https://evieuwu.duckdns.org/clips/index.html">
		<meta name="twitter:title" content="Evie\'s Clip Zone - Unknown Clip">
		<meta name="twitter:description" content="Evie\'s place to upload and share epic gamer moments! Unfortunately, this video seems to be missing...">
		<meta name="twitter:image" content="https://evieuwu.duckdns.org/clips/notfound.png">';
	} else {
		echo '<!-- HTML Meta Tags -->
		<title>Evie\'s Clip Zone - ' . $f->readname . '</title>
		<meta name="description" content="Evie\'s place to upload and share epic gamer moments! Watch `' . $f->readname . '` on here now!">
		
		<!-- Facebook Meta Tags -->
		<meta property="og:url" content="https://evieuwu.duckdns.org/clips/view_clip.php?file=' . $_GET["file"] . '">
		<meta property="og:title" content="Evie\'s Clip Zone - ' . $f->readname . '">
		<meta property="og:type" content="video.other">
		<meta property="og:image" content="https://evieuwu.duckdns.org/clips/links/' . $_GET["file"] . '.jpg">
		<meta property="og:image:type" content="image/jpeg">
		<meta property="og:image:width" content="1920">
		<meta property="og:image:height" content="1080">
		<meta property="og:video" content="https://evieuwu.duckdns.org/clips/links/' . $_GET["file"] . '">
		<meta property="og:video:url" content="https://evieuwu.duckdns.org/clips/links/' . $_GET["file"] . '">
		<meta property="og:video:type" content="video/mp4">
		<meta property="og:video:width" content="1920">
		<meta property="og:video:height" content="1080">
		<meta property="og:description" content="Evie\'s place to upload and share epic gamer moments! Watch `' . $f->readname . '` on here now!">
		<meta property="og:image" content="https://evieuwu.duckdns.org/clips/links/' . $_GET["file"] . '.jpg">
		
		<!-- Twitter Meta Tags -->
		<meta name="twitter:card" content="player">
		<meta property="twitter:url" content="https://evieuwu.duckdns.org/clips/view_clip.php?file=' . $_GET["file"] . '">
		<meta name="twitter:title" content="Evie\'s Clip Zone - ' . $f->readname . '">
		<meta name="twitter:description" content="Evie\'s place to upload and share epic gamer moments! Watch `' . $f->readname . '` on here now!">
		<meta name="twitter:image" content="https://evieuwu.duckdns.org/clips/links/' . $_GET["file"] . '.jpg">
		<meta name="twitter:player:width" content="1920">
		<meta name="twitter:player:height" content="1080">
		<meta name="twitter:player" content=https://evieuwu.duckdns.org/clips/links/' . $_GET["file"] . '">';
	}
	echo '<meta property="twitter:domain" content="evieuwu.duckdns.org">
	<link rel="stylesheet" href="clips.css">
	<link rel="stylesheet" href="view_clip.css">
	<link rel="stylesheet" href="/index.css">
</head>
<body>
	<div id="head">
		<span id="back">
			<a href="index.html">
				<button>
					&lt; To index
				</button>
			</a>
		</span>
		<span id="title">
			Evie\'s Gaming Clip Zone
		</span>
	</div>
	<div id="viewclip">
		<div id="container">';
			if ($file === null) {
				echo '<img id="notfound" src="notfound.png"/>
				<span id="name">Failed to find file information.</span>';
			} else {
				echo '<video id="clip" controls src="links/' . $_GET["file"] . '"></video>
				<span id="name">
					' . $file->readname . '
				</span>
				<span id="filename">
					Filename: ' . $file->name . '
				</span>
				<span id="upload">
					Upload Time: ' . $file->uploadtime . '
				</span>
				<button onclick="window.location=`download_file.php?file='. $_GET["file"] . '`;">
					Download
				</button>
				<button onclick="navigator.clipboard.writeText(window.location.href);alert(`Copied!`);">
					Share
				</button>';
			}
			?>
		</div>
	</div>
	<footer id="footer">
		This site was made and maintained by <a href="https://github.com/EvieUwU"> EvieUwU </a>
	</footer>
</body>
</html>