/*!
 * jQuery Cookie Plugin
 * https://github.com/nico87/OpenModal
 *
 * Copyright 2012 Claudio Gabriele Nicolotti
 * Dual licensed under the MIT or GNU GPL V2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 * @name openmodal.js
 * @author Claudio Gabriele Nicolotti - http://github.com/nico87
 * @version 1.0.0
 * @date February 18, 2012
 * @category jQuery plugin
 * @copyright (c) 2012 Claudio Gabriele Nicolotti
 * @license http://www.opensource.org/licenses/mit-license.php
 * @license http://www.opensource.org/licenses/GPL-2.0
 */

(function( $ ) {
  $.openModal = function( settings ) {

		/*
		| -----------------------------------------
		|	Default settings
		| -----------------------------------------
		*/
		settings = $.extend({
			duration: 250, 						// fadeIn, fadeOut effect duration
			onLoad: null, 						// onLoad event callback
			onSuccess: null,					// onSuccess event callback
			onCancel: null,						// onCancel event callback
			onClose: null,						// onClose event callback
			onError: null,						// onError event callback
			html: '',							// HTML code shown in the modal window
			img: '',							// Image src to load in the modal window
			url: '',							// URL to load in the modal window
			width: 400,							// Width of the window. Height is calculated automatically
			buttonOk: true,						// Show the "Ok" button?
			buttonCancel: false,				// Show the "Cancel" button?
			cssId: "openmodal",					// CSS id of the OpenModal DOM object
			loaderUrl: "ajax-loader.gif",		// Url of the ajax loader image
			l10n: {
				lang_ok: "Ok",					// Localization for the "Ok" button
				lang_cancel: "Cancel"			// Localization for the "Cancel" button
			}
		}, settings);

		/*
		| -----------------------------------------
		|	Global vars
		| -----------------------------------------
		*/

		var openModal = this;					// Store this!
		var modal = null;						// Modal window's jQuery object
		var content = null;						// Modal window's content jQuery object
		var bg = null;							// Modal windows' background jQuery object
		var code = "";							// Contains the modal window's HTML code

		/*
		| -----------------------------------------
		|	Modal window HTML code
		| -----------------------------------------
		*/
		code  = "<div id=\"" + settings.cssId + "\">";
		code += "<div id=\"" + settings.cssId  + "_content\"></div>";
		code += "<div id=\"" +  settings.cssId  + "_buttons\">";
		code += "<a href=\"#\" id=\"" + settings.cssId + "_buttonok\">" + settings.l10n.lang_ok + "</a>";
		code += "<a href=\"#\" id=\"" + settings.cssId + "_buttoncancel\">" + settings.l10n.lang_cancel + "</a>";
		code += "</div>";

		/*
		| -----------------------------------------
		|	Public methods and properties
		| -----------------------------------------
		*/

		/*
		 * Get and set the text of the ok button.
		 */
		this.buttonOkText = function ( value ) {
			if ( popup !== null) {
				if ( value === undefined ) {
					return popup.find( "#" + settings.cssId + "_buttonok" ).html();
				} else {
					popup.find( "#" + settings.cssId + "_buttonok" ).html( value );
				}
				return true;
			}
			return false;
		}

		/*
		 * Get and set the text of the cancel button.
		 */
		this.buttonCancelText = function ( value ) {
			if ( popup !== null) {
				if ( value === undefined ) {
					return popup.find( "#" + settings.cssId + "_buttoncancel" ).html();
				} else {
					popup.find( "#" + settings.cssId + "_buttoncancel" ).html( value );
				}
				return true;
			}
			return false;
		};

		/*
		 * Return the modal window's DOM object
		 */
		this.DOMObject = function () {
			return modal;
		};

		/*
		| -----------------------------------------
		|	DOM manipulation and private functions
		| -----------------------------------------
		*/
		// Hide the modal window
		function _hide() {
			if ( popup !== null ) {
				popup.fadeOut( settings.duration, function () {
					$( this ).remove();
				})
			}
			if ( bg !== null ) {
				bg.fadeOut( settings.duration, function () {
					$( this ).remove();
				});
			}
			if ( settings.onClose !== null ) {
				settings.onClose( openModal );
			}
		}

		// Center the modal window
		function _center() {
			if ( popup !== null ) {
				var top = ( $(window).height() - popup.outerHeight() )/2;
				if ( top < 10 ) top = 10;
				var left = ( $(window).width() - popup.outerWidth() )/2;
				if ( left < 10 ) left = 10;
				popup.css({
					"top": top,
					"left": left
				});
			}
		}

		// Show the buttons
		function _buttons() {
			if ( settings.buttonOk || settings.buttonCancel ) {
				popup.find( "#" + settings.cssId + "_buttons" ).css( "display", "block" );
			}
			if ( !settings.buttonOk ) {
				popup.find( "#" + settings.cssId + "_buttonok" ).css( "display", "none" );
			}
			if ( !settings.buttonCancel ) {
				popup.find( "#" + settings.cssId + "_buttonCancel" ).css( "display", "none" );
			}
		}

		// Add the background
		$( "body" ).append( "<div id=\"" + settings.cssId + "_background\"></div>" );
		var bg = $( "#" + settings.cssId + "_background" );
		bg.fadeOut( 0 );

		// Add some nice CSS styles
		if ( /Firefox/.test(navigator.userAgent) )
			bg.css({
				"background-image": "-moz-radial-gradient(center 45deg, ellipse farthest-corner, rgb(150,150,150) 0%, rgb(60,60,60) 50%, rgb(0,0,0) 100%)"
			});
		else if ( /Chrome/.test(navigator.userAgent) )
			bg.css({
				"background" : "-webkit-gradient(radial, 50% 50%, 0, 50% 50%, 500, from(rgb(150,150,150)), to(rgb(0,0,0)))"
			});

		// If the buttons are not shown, the modal window is hidden by clicking on the background
		if ( !settings.buttonok && !settings.buttonCancel && !settings.fixedWindow )
			bg.click( _hide );

		// Show the background and append the popup code to the DOM
		bg.fadeTo( settings.duration, 0.5 );
		$( "body" ).append(code);
		popup = $( "#" + settings.cssId );
		popup.fadeOut( 0 );
		content = popup.find("#" + settings.cssId + "_content" );

		// Load the modal window content
		if ( settings.url !== null && settings.url !== "" ) {
			content.html( "<img src=\"" + settings.loaderUrl + "\">" );
			popup.width( 32 );
			_center();
			popup.fadeIn( settings.duration );
			$.ajax({
				url: settings.url,
				cache: false,
				type: "GET",
				success: function ( data ) {
					content.html( data );
					showButtons();
					popup.width( settings.width );
					centerPopup();
					if ( settings.onLoad !== null ) {
						settings.onLoad( openModal );
					}
				},
				error: function ( jqXHR, textStatus, errorThrown ) {
					content.html( settings.url + ": " + errorThrown );
					showButtons();
					popup.width( settings.width );
					_center();
					if ( settings.onError !== null ) {
						settings.onError( openModal );
					}
				}
			});
		} else if ( settings.html !== null && settings.html !== "" ) {
			content.html( settings.html );
			_buttons();
			popup.width( settings.width );
			_center();
			popup.fadeIn( settings.duration );
			if ( settings.onLoad !== null ) {
				settings.onLoad( openModal );
			}
		} else if (settings.img !== null && settings.img !== "" ) {
			// Show preloader
			popup.css( "position", "fixed" );
			content.html( "<img src=\"" + settings.loaderUrl + "\">" );
			_buttons();
			popup.width( 32 );
			_center();
			popup.fadeIn( settings.duration );

			// Load image
			var img = $( "<img>" );
			img.load(function () {
				$( this ).unbind( "load" );
				content.empty().append( $(this) );
				$( this ).css( "margin", 0 );
				var width = $( this ).width();
				var height = $( this ).height();
				if ( width > $(window).width() - 80 ) {
					height = height * ($( window ).width() - 80)/width;
					width = $( window ).width() - 80;
				}
				if ( height > $(window).height() - 80 ) {
					width = width * ($( window ).height() - 80)/height;
					height = $( window ).height() - 80;
				}
				popup.width( width ).height( height + popup.find( "#" + settings.cssId + "_buttons").outerHeight() );
				$( this ).width( width ).height( height );
				_center();

				if ( settings.onLoad !== null ) {
					settings.onLoad( openModal );
				}
			});
			img.attr( "src", settings.img );
		}
		if ( settings.buttonOk ) {
			popup.find( "#" + settings.cssId + "_buttonok" ).click(function () {
				if ( settings.onSuccess !== null ) {
					if ( settings.onSuccess(openModal) !== false ) {
						_hide();
					}
				} else
					_hide();
				// Do not execute the link
				return false;
			});
		}
		if ( settings.buttonCancel ) {
			popup.find( "#" + settings.cssId + "_buttoncancel" ).click(function () {
				if ( settings.onCancel !== null ) {
					if ( settings.onCancel(openModal) !== false ) {
						_hide();
					}
				} else
					_hide();
				// Do not execute the link
				return false;
			});
		}

		return this;

  };
})( jQuery );