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
<h1>Настройки</h1>

<style>
    #settings {
        display: table;
        width: 100%;
    }
    #settings p {
        overflow: hidden;
        display: table-row;
    }

    #settings p label {
        display: table-cell;
        width: 40%;
    }
    #settings p input, #settings p select, #settings p textarea {
        display: table-cell;
        width: 300px;
    }

    #settings p textarea {
        height: 120px;
    }

    #settings .song {
        padding-left: 20px;
        margin-bottom: 20px;
		position: relative;
		display: table;
    }

	#settings .song .removeSong {
		position: absolute;
		top: 0;
		right: -20px;
		width: 20px;
		height: 20px;
		background: red;
		color: #fff;
		text-align: center;
		line-height: 20px;
		display: block;
		cursor: pointer;
	}

	#settings .addSong {
		width: 20px;
		height: 20px;
		background: green;
		color: #fff;
		text-align: center;
		line-height: 20px;
		display: block;
		cursor: pointer;
	}

</style>

<?php
if ( count($_POST) > 0 ) {
    $settings = json_encode( $_POST['songs']);
    file_put_contents('playlist.opt', $settings);
}
?>
<h1>Настройки плеера</h1>
<form id="settings" method="post">
    <?php $settings = json_decode( file_get_contents('playlist.opt') ); ?>

    <div id="playList">
        <?php foreach ( $settings as $i => $song ) : ; ?>
        <div class="song">
			<a class="removeSong">-</a>
            <p>
                <label>Автор:</label>
                <input type="text" name="songs[<?php echo $i; ?>][author]" value="<?php echo $song->author; ?>">
            </p>
            <p>
                <label>Название:</label>
                <input type="text" name="songs[<?php echo $i; ?>][song]" value="<?php echo $song->song; ?>">
            </p>
            <p>
                <label>Путь:</label>
                <input type="text" name="songs[<?php echo $i; ?>][src]" value="<?php echo $song->src; ?>">
            </p>
        </div>
        <?php endforeach; ?>
		<a class="addSong">+</a>
    </div>
    <p><input type="submit" value="Сохранить"></p>
</form>

<script>
    (function($){
        var i = <?php echo $i++; ?>;
        var $playList = $('#playList');

        $playList.on('click', '.removeSong', function( event ){
            $( this).closest('.song').remove();
        });

        $playList.on('click', '.addSong', function( event ){
            event.preventDefault();
            i++;
            var $song = $('<div class="song">' +
                            '<a class="removeSong">-</a>' +
                            '<p>' +
                                '<label>Автор:</label>' +
                                '<input type="text" name="songs[' + i +'][author]" value="">' +
                            '</p>' +
                            '<p>' +
                                '<label>Название:</label>' +
                                '<input type="text" name="songs[' + i +'][song]" value="">' +
                            '</p>' +
                            '<p>' +
                                '<label>Путь:</label>' +
                                '<input type="text" name="songs[' + i +'][src]" value="">' +
                            '</p>' +
                        '</div>');

            $playList.append( $song );
        });
    })(jQuery);
</script>

</body>
</html>