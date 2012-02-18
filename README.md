jQuery.openModal
=========
Is a free and opensource modal window jQuery plugin.

Installation
------------
Include script after the jQuery library:

	<script src="jquery.openmodal.js" type="text/javascript"></script>

Usage
-----
To open the modal window simply use

	var opnMdl = $.openModal({ html: 'your html code' });

Options
-------
All options are passed trough a json object to the openModal function.

	url: null

The url where the modal window can get its content.

	html: null

If no URL is provided, this parameter is used to provide the HTML code to show inside the modal window.

	img: null

If no URL and HTML code are provided, this parameter is used to retrieve an image to show into the modal window.

	width: 400

The width of the window in case the url or html parameters are used. The height is calculated automatically.

	buttonOk: true

True to show the modal window's "Ok" button.

	buttonCancel: cancel

True to show the modal window's "Cancel" button.

	cssId: "openmodal"

The CSS id of the modal window's DOM object.
All the ids used in the modal window are based on this parameters.
If the cssId parameter is, in example, "openmodal":

+ the id of modal window's background DOM object is openmodal\_background.
+ the id of modal window's content DOM object is openmodal\_content.
+ the id of modal window's buttons DOM object is openmodal\_buttons.

In case you decide to use a different id than the default, you must change the CSS selectors in src/openmodal.css to match your id.

	loaderUrl: ajax-loader.gif

The image shown while Ajax is loading the window's content.

	l10n: { lang_ok: "Ok", lang_cancel: "Cancel" }

The localizations for both the buttons.

	duration: 250

Defines the duration of the fadeIn and fadeOut effects of the modal window.

	onLoad: function ( openModal ) { }

The onLoad callback function. It is called after the modal window has loaded its content.
The OpenModal window jQuery object is passed as parameter.

	onSuccess: function ( openModal ) { }

This callback is executed when the user presses the "Ok" button.

	onCancel: function ( openModal ) { }

This callback is executed when the user presses the "Cancel" button.

	onError: function ( openModal ) { }

This callback is executed when the URL parameter encounters an error during the Ajax loading.

	onClose: function ( openModal ) { }

This callback is executed when the modal window is being closed, after the onSuccess and onCancel callbacks.

Public Methods
--------------

	OpenModal.buttonOkText( value )

Changes the text of the "Ok" button when the OpenModal window is already shown. This is useful if you want to change the text
of the button to give a feedback to the user (like when you're saving some data via Ajax).

	OpenModal.buttonCancelText( value )

Changes the text of the "Cancel" button when the OpenModal window is already shown.

	OpenModal.DOMObject()

Returns the modal window's DOM object.

Licence
-------
This project is released under both [GNU GPL V2](http://www.gnu.org/licenses/gpl-2.0.html) and [MIT](http://www.opensource.org/licenses/mit-license.php) licences.