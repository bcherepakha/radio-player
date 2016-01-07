<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Radio player</title>	
	
	<script src="js/jquery.js"></script>	
<!--	<script src="js/mediaelement-and-player.min.js"></script>-->
	<script src="js/radioPlayer.js"></script>
	<link rel="stylesheet" href="css/style.css" />
<!--	<link rel="stylesheet" href="css/mediaelementplayer.css" />-->
</head>
<body>

<h1>Radio</h1>

<div id="music">
	<p class="author"></p>
	<p class="song"></p>
	<div class="songButtons">
		<a href="#" class="prev">prev</a>
		<a href="#" class="play">play/pause</a>
		<a href="#" class="next">next</a>
	</div>
	<audio id="radioPlayer" src="" type="audio/mp3" style="display: none;"></audio>
</div>

<script>
    $('#music').radioPlayer({ "playlist" : <?php echo file_get_contents('playlist.opt'); ?> });
</script>

</body>
</html>