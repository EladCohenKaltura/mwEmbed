( function( mw, $ ) {"use strict";

mw.PluginManager.add( 'infoScreen', mw.KBaseScreen.extend({

	defaultConfig: {
		parent: "topBarContainer",
		order: 3,
		align: "right",
		tooltip: 'Info',
		showTooltip: true,
		usePreviewPlayer: false,
		previewPlayerEnabled: false,
		title:  gM( 'mwe-embedplayer-info' ),
		templatePath: 'components/info/info.tmpl.html',
		smartContainer: 'morePlugins',
		smartContainerCloseEvent: 'hideScreen'
	},
	iconBtnClass: "icon-info",
	setup: function () {
		if (mw.isNativeApp()) {
			this.setConfig("showTooltip",false);
			this.setConfig("usePreviewPlayer",false);
		}
		this.addBindings();
	},
	addBindings: function () {
		var _this = this;
		var embedPlayer = this.getPlayer();
		this.bind('preShowScreen', function (event, screenName) {
			if ( screenName === "infoScreen" ){
				_this.getScreen().then(function(screen){
					screen.addClass('semiTransparentBkg');
					$("#"+embedPlayer.getPlayerElement().id).addClass("blur");
					embedPlayer.getPlayerPoster().addClass("blur");
					embedPlayer.disablePlayControls();
				});
			}
		});
		this.bind('preHideScreen', function (event, screenName) {
			if ( screenName === "infoScreen" ){
				embedPlayer.enablePlayControls();
			}
		});

	},
	addScreenBindings: function(){
		if (mw.isNativeApp()) {
			$(".infoScreen .panel-right").removeClass("panel-right");
		}
	},
	isSafeEnviornment: function() {
		return !mw.isIpad() || ( mw.isIpad() && mw.getConfig('EmbedPlayer.EnableIpadHTMLControls') !== false );
	},
	closeScreen: function(){
		if (this.getPlayer().getPlayerElement()) {
			$( "#" + this.getPlayer().getPlayerElement().id ).removeClass( "blur" );
			this.getPlayer().getPlayerPoster().removeClass( "blur" );
		}
		this.hideScreen();
	}

}));

} )( window.mw, window.jQuery );