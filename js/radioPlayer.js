/**
 * @file RadioPlayer jQuery Plugin
 * @author Boris Cherepakha <bcherepakha@gmail.com>
 *
 */

(function($){
    $.fn.radioPlayer = function( options, values ) {
        var $this = this; // this - ссылается на объект jQuery, но для сохранения символьности удобнее использовать $this

        //дефолтные настройки
        var defaults = {
            audioPlayerSelector : '#radioPlayer',
            playSelector        : '.play',
            nextSelector        : '.next',
            prevSelector        : '.prev',
            authorSelector      : '.author',
            songSelector        : '.song',
            playlist            : [
                {
                    author : 'Teatr G. L. Oldi',
                    song   : 'Баллада о кулаке',
                    src    : 'http://radio-player/media/TeatrG.L.Oldi_BalladaOKulake.mp3'
                },
                {
                    author : 'Медляк ФМ',
                    song   : 'online',
                    src    : 'http://online.radiorecord.ru:8102/mdl_128'
                },
                {
                    author : 'ГОП ФМ',
                    song   : 'online',
                    src    : 'http://online.radiorecord.ru:8102/gop_128'
                },
                {
                    author : 'Наше Радио 101,7FM',
                    song   : 'online',
                    src    : 'http://94.25.53.133/nashe-128.mp3'
                },
                {
                    author : 'Romantika 98,8FM',
                    song   : 'online',
                    src    : 'http://radio02-cn03.akadostream.ru:8113/radioromantika128.mp3'
                },
                {
                    author : 'Alfredo De Angelis',
                    song   : 'Sonar Y Nada Mas',
                    src    : 'http://radio-player/media/AlfredoDeAngelis_SonarYNadaMas.mp3'
                },
                {
                    author : 'Sexteto Milonguero',
                    song   : 'Chacarera Simple',
                    src    : 'http://radio-player/media/SextetoMilonguero_ChacareraSimple.mp3'
                },
                {
                    author : 'Berkut и Helavisa',
                    song   : 'Там высоко',
                    src    : 'http://radio-player/media/Berkut_Helavisa_Tam_vysoko.mp3'
                },
                {
                    author : 'Filigon',
                    song   : 'Жизненные принципы',
                    src    : 'http://radio-player/media/Filigon_ZHiznennye_princzipy.mp3'
                }
            ],
            currentPlayIndex : -1,
            autoLoad         : true
        };

        var methods = {
            destroy : function( values ) {
                $this.off('*.radioPlayer');
                var player = $this.find( options.audioPlayerSelector )[0];
                player.pause();
            }
        };

        if ( ( 'object' === typeof options ) || ( undefined == options ) ) {
            //инициализация плагина
            $this.data('radioPlayerOptions', $.extend({}, defaults, options));

            var settings = $this.data('radioPlayerOptions');
            var player = $this.find( settings.audioPlayerSelector )[0];

            //Вешаем обработчики на управляющие клавиши
            $this.on('click.radioPlayer', settings.playSelector, function( event ){
                event.preventDefault();
                var $button = $( this );
                $button.toggleClass('pause');

                if ( $button.hasClass('pause') ) {
                    player.play();
                } else {
                    player.pause();
                }
            });

            $this.on('click.radioPlayer', settings.prevSelector, function( event ){
                event.preventDefault();
                var settings = $this.data('radioPlayerOptions');
                var playListLength = settings.playlist.length;
                var player = $this.find( settings.audioPlayerSelector )[0];
                settings.currentPlayIndex--;

                if ( settings.currentPlayIndex < 0 )
                    settings.currentPlayIndex = playListLength - 1;

                if (settings.currentPlayIndex >= playListLength)
                    settings.currentPlayIndex = 0;

                if ( undefined != settings.playlist[prev] ) {
                    player.pause();
                    player.src = settings.playlist[prev].src;
                    player.play();
                    $this.find( settings.authorSelector).text( settings.playlist[prev].author );
                    $this.find( settings.songSelector).text( settings.playlist[prev].song );
                }
            });

            $this.on('click.radioPlayer', settings.nextSelector, function( event ){
                event.preventDefault();
                var settings = $this.data('radioPlayerOptions');
                var playListLength = settings.playlist.length;
                var player = $this.find( settings.audioPlayerSelector )[0];
                settings.currentPlayIndex++;

                if ( settings.currentPlayIndex < 0 )
                    settings.currentPlayIndex = playListLength - 1;

                if (settings.currentPlayIndex >= playListLength)
                    settings.currentPlayIndex = 0;

                if ( undefined != settings.playlist[ settings.currentPlayIndex ] ) {
                    player.pause();
                    player.src = settings.playlist[ settings.currentPlayIndex ].src;
                    player.play();
                    $this.find( settings.authorSelector).text( settings.playlist[ settings.currentPlayIndex ].author );
                    $this.find( settings.songSelector).text( settings.playlist[ settings.currentPlayIndex ].song );
                }
            });

            //Переключение треков
            $this.find( settings.audioPlayerSelector ).on('ended', function(){
                var settings = $this.data('radioPlayerOptions');
                $this.find( settings.nextSelector).trigger('click.radioPlayer');
            });

            if ( settings.autoLoad )
                $this.find( settings.nextSelector ).trigger('click.radioPlayer');

        } else if ( undefined != methods[options] ) {
            return methods[options]( values );
        }

        return $this;
    };
})(jQuery);